export function assignDotNetHelper(videoElement, dotNetHelper) {
    videoElement.dotNetHelper = dotNetHelper;
}
export async function shareDisplayMedia(videoElement, constraints) {

    try {
        videoElement.srcObject = await navigator.mediaDevices.getDisplayMedia(constraints);
        muteVideoAndAssignOnEnded(videoElement);
    }
    catch (error) {
        throw error.message;
    }
}

export async function shareUserMedia(videoElement, constraints) {

    try {
        videoElement.srcObject = await navigator.mediaDevices.getUserMedia(constraints);
        muteVideoAndAssignOnEnded(videoElement);
        var videoTracks = videoElement.srcObject.getVideoTracks();
        if (videoTracks.length > 0) {
            videoElement.videoTrackId = videoTracks[0].id;
        }

        var audioTracks = videoElement.srcObject.getAudioTracks();
        if (audioTracks.length > 0) {
            videoElement.audioTrackId = audioTracks[0].id;
        }
    }
    catch (error) {
        throw error.message;
    }
}

function muteVideoAndAssignOnEnded(videoElement) {
    videoElement.muted = true;

    var track = videoElement.srcObject.getTracks()[0];
    if (track) {
        track.onended = async function onTrackEnded() {
            await videoElement.dotNetHelper.invokeMethodAsync("TrackEnded");
        }
    }
}
export async function addAudioTrack(videoElement, constraints) {
    try {
        if (videoElement.srcObject) {
            stopTrack(videoElement.audioTrackId, videoElement);
            videoElement.audioTrackId = await addTrackAndReturnTrackId(videoElement, constraints);
        }
    }
    catch (error) {
        throw error.message;
    }
}

export async function addVideoTrack(videoElement, constraints) {
    try {
        if (videoElement.srcObject) {
            stopTrack(videoElement.videoTrackId, videoElement);
            videoElement.videoTrackId = await addTrackAndReturnTrackId(videoElement, constraints);
        }
    }
    catch (error) {
        throw error.message;
    }
}


function stopTrack(trackId, videoElement) {

    var track = videoElement.srcObject.getTrackById(trackId);

    if (track) {
        track.stop();
        videoElement.srcObject.removeTrack(track);
    }
}

async function addTrackAndReturnTrackId(videoElement, constraints) {

    var media = await navigator.mediaDevices.getUserMedia(constraints);
    var track = media.getTracks()[0];
    videoElement.srcObject.addTrack(track);
    track.onended = async function onTrackEnded() {
        await videoElement.dotNetHelper.invokeMethodAsync("TrackEnded");
    }
    return track.id;
}

export function stopTracks(videoElement) {

    if (videoElement.srcObject) {
        videoElement.srcObject.getTracks().forEach(track => {
            track.stop();
        });
        videoElement.srcObject = null;
    }
}

export function getRecorder(videoElement) {

    try {
        if (videoElement.srcObject) {

            let recorder = null;
            let options = null;
            let ext = "webm";

            if (videoElement.srcObject.getVideoTracks().length == 0) {
                 if (MediaRecorder.isTypeSupported('audio/mp4;codecs=mp4a')) {
                     options = { mimeType: "audio/mp4;codecs=mp4a" }
                    ext = "mp4";
                 } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
                     options = { mimeType: "audio/mp4" }
                     ext = "mp4";
                 }
                else if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
                    options = { mimeType: "audio/webm;codecs=opus" }
                }
                else {
                    options = { mimeType: "audio/webm" }
                }
            }
            else if (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1')) {
                options = { mimeType: "video/mp4;codecs=avc1" }
                ext = "mp4";
            } else if (MediaRecorder.isTypeSupported('video/mp4')) {
                options = { mimeType: "video/mp4" }
                ext = "mp4";
            }
            else if (MediaRecorder.isTypeSupported('video/webm;codecs=h264')) {
                options = { mimeType: "video/webm;codecs=h264" }
            }

            else if (videoElement.srcObject.getAudioTracks().length == 0) {
                if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
                    options = { mimeType: "video/webm;codecs=vp8" }
                }
                else {
                    options = { mimeType: "video/webm" }
                }
            }
            else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8,vorbis')) {
                options = { mimeType: "video/webm;codecs=vp8,vorbis" }
            }
            else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus')) {
                options = { mimeType: "video/webm;codecs=vp8,opus" }
            }
            else {
                options = { mimeType: "video/webm" }
            }



            if (videoElement.srcObject.getAudioTracks().length > 1) {
                var combinedStream = mergeAudio(videoElement);
                recorder = new MediaRecorder(combinedStream, options);
            }
            else {
                recorder = new MediaRecorder(videoElement.srcObject, options);
            }


            let chunks = [];
            recorder.ondataavailable = function onDataAvailable(e) {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            }

            recorder.onstop = function onStop() {
                var blob = new Blob(chunks, { type: options });
                var mediaBlobUrl = URL.createObjectURL(blob);


                videoElement.dotNetHelper.invokeMethodAsync("RecordingStopped", mediaBlobUrl,ext);

            }

            return recorder;
        }

    }
    catch (error) {
        throw error.message;
    }
}

function mergeAudio(videoElement) {

    var combinedStream = new MediaStream();

    if (videoElement.srcObject) {
        videoElement.srcObject.getVideoTracks().forEach(track => {
            combinedStream.addTrack(track);
        });
    }

    var stream1 = new MediaStream();
    stream1.addTrack(videoElement.srcObject.getAudioTracks()[0]);

    var stream2 = new MediaStream();
    stream2.addTrack(videoElement.srcObject.getAudioTracks()[1]);

    var context = new AudioContext();
    var audioDestinationNode = context.createMediaStreamDestination();
    var systemSource = context.createMediaStreamSource(stream1);
    systemSource.connect(audioDestinationNode);

    var micSource = context.createMediaStreamSource(stream2);
    micSource.connect(audioDestinationNode);

    audioDestinationNode.stream.getAudioTracks().forEach(track => {
        combinedStream.addTrack(track);
    });

    return combinedStream;
}