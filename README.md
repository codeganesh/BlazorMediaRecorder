# Blazor Media Recorder

A Razor component that lets us record screen, camera, and mic audio.

## Installation

```
install-package GkbApps.Blazor.MediaRecorder
```

## Include the namespaces in _Imports.razor

```
@using GkbApps.Blazor.MediaRecorder.Enums
```

## Usage

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

To do that, create a wrapper component and put the BlazorMediaRecorder component inside it.
Then, apply the render mode to the wrapper component instance.

```
  <BlazorMediaRecorderWrapper @rendermode="InteractiveServer">
    </BlazorMediaRecorderWrapper>
```

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
