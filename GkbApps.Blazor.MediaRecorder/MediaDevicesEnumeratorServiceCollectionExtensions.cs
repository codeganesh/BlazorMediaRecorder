using GkbApps.Blazor.MediaRecorder.Services;
using Microsoft.Extensions.DependencyInjection;

namespace GkbApps.Blazor.MediaRecorder;
public static class MediaDevicesEnumeratorServiceCollectionExtensions
{
    public static IServiceCollection AddMediaDevicesEnumerator(this IServiceCollection services)
    {
        return services.AddScoped<MediaDevicesEnumerator>();
    }
}