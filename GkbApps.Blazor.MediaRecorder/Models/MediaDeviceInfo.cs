namespace GkbApps.Blazor.MediaRecorder.Models;
public class MediaDeviceInfo
{
    public string DeviceId { get; set; } = default!;
    public string GroupId { get; set; } = default!;
    public string Label { get; set; } = default!;
    public MediaDeviceKind Kind { get; set; } = default!;
}