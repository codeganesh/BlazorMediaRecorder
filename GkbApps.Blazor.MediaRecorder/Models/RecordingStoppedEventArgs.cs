namespace GkbApps.Blazor.MediaRecorder.Models;
public class RecordingStoppedEventArgs
{
    public string MediaBlobUrl { get; set; } = string.Empty;
    public string FileExtension { get; set; } = "webm";
}