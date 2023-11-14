using System.Text.Json.Serialization;

namespace GkbApps.Blazor.MediaRecorder.Models;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum MediaDeviceKind
{
    AudioInput,VideoInput,AudioOutput
}