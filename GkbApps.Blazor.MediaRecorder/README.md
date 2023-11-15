# Blazor Media Recorder

A Razor component that lets us record screen, camera, and mic audio.

## Installation

```
install-package GkbApps.Blazor.MediaRecorder
```

## Include the following namespaces in _Imports.razor

```
@using GkbApps.Blazor.MediaRecorder
@using GkbApps.Blazor.MediaRecorder.Enums
```

## Usage (.NET 8 and above)

### Apply a render mode to a component definition

At the top of the page/component where you are using BlazorMediaRecorder, specify the render mode

#### For Interactive Server mode, the page/component must be in the Server project.

```
@rendermode InteractiveServer
```

#### For Interactive WebAssembly mode, the page/component must be in the Client project.

```
@rendermode InteractiveWebAssembly
```

#### For Interactive Auto mode, the page/component must be in the Client project.

```
@rendermode InteractiveAuto
```

### Alternatively, apply a render mode to a component instance

The following example sets the component's render mode to InteractiveServer. In a similar manner, you can set the render mode to InteractiveWebAssembly or InteractiveAuto. Just make sure that the component is present in the Client project for the InteractiveWebAssembly and InteractiveAuto render modes.

```
  <BlazorMediaRecorder @rendermode="InteractiveServer"
                       Options="RecorderOptions.ScreenAndMicAudio">
    </BlazorMediaRecorder>
```

## Usage (.NET 7 and earlier versions)

Simply use the component and pass any parameters (see below).

### Record media

#### To record screen only

```
  <BlazorMediaRecorder Options="RecorderOptions.Screen">
    </BlazorMediaRecorder>
```

#### To record screen and mic audio

```
  <BlazorMediaRecorder Options="RecorderOptions.ScreenAndMicAudio">
    </BlazorMediaRecorder>
```

#### To record camera only

```
  <BlazorMediaRecorder Options="RecorderOptions.Camera">
    </BlazorMediaRecorder>
```

#### To record camera and mic audio

```
  <BlazorMediaRecorder Options="RecorderOptions.CameraAndMicAudio">
    </BlazorMediaRecorder>
```

#### To record mic audio only

```
  <BlazorMediaRecorder Options="RecorderOptions.MicAudio">
    </BlazorMediaRecorder>
```

