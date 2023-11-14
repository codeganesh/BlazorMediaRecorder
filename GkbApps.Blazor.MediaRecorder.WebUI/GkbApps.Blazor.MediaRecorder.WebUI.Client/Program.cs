using GkbApps.Blazor.MediaRecorder;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.Services.AddMediaDevicesEnumerator();

await builder.Build().RunAsync();
