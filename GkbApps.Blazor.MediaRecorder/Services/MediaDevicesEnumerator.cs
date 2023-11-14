using Microsoft.JSInterop;
using GkbApps.Blazor.MediaRecorder.Models;
namespace GkbApps.Blazor.MediaRecorder.Services;

public class MediaDevicesEnumerator 
{
    private readonly IJSRuntime jsRuntime;
    public MediaDevicesEnumerator(IJSRuntime jsRuntime)
    {
        this.jsRuntime = jsRuntime;
    }
    public async Task<List<MediaDeviceInfo>> EnumerateDevicesAsync()
    {

        var devices = await GetDevicesAsync(audio: true, video: true);
        return devices;
    }

    public async Task<List<MediaDeviceInfo>> EnumerateAudioDevicesAsync()
    {

        var devices = await GetDevicesAsync(audio: true, video: false);
        var audioDevices = devices.Where(d => d.Kind == MediaDeviceKind.AudioInput).ToList();
        return audioDevices;
    }

    public async Task<List<MediaDeviceInfo>> EnumerateVideoDevicesAsync()
    {

        var devices = await GetDevicesAsync(audio: false, video: true);
        var videoDevices = devices.Where(d => d.Kind == MediaDeviceKind.VideoInput).ToList();
        return videoDevices;
    }

    private async Task<List<MediaDeviceInfo>> GetDevicesAsync(bool audio = true, bool video = true)
    {
        try
        {
       
            var devices = await jsRuntime.InvokeAsync<List<MediaDeviceInfo>>("navigator.mediaDevices.enumerateDevices");
            return devices;
        }
        catch
        {
            return new();
        }
    }
}