# Polyforce <!-- omit in toc -->

Subtractive polyphonic synthesizer built with Tone.js and Vue.js
---

Recommended browsers: Firefox | Chrome

# Table of content <!-- omit in toc -->

- [1. Project setup](#1-project-setup)
- [2. Overview](#2-overview)
  - [2.1. Introduction](#21-introduction)
    - [2.1.1. Oscillators](#211-oscillators)
    - [2.1.2. Filter](#212-filter)
    - [2.1.3. Modulation](#213-modulation)
    - [2.1.4. Master Effects](#214-master-effects)
  - [2.2. Audio Path](#22-audio-path)
  - [2.3. Controlling Knobs](#23-controlling-knobs)
  - [2.4. Keyboard](#24-keyboard)
  - [2.5. Controlling Presets](#25-controlling-presets)
- [3. Components](#3-components)
  - [3.1. Oscillator](#31-oscillator)
  - [3.2. Mixer](#32-mixer)
  - [3.3. Envelope Generators](#33-envelope-generators)
  - [3.4. LFOs](#34-lfos)
  - [3.5. Filter](#35-filter)
  - [3.6. Master](#36-master)
  - [3.7. Modulation Matrix](#37-modulation-matrix)
  - [3.8. Oscilloscope](#38-oscilloscope)
  - [3.9. Master Effects](#39-master-effects)
    - [3.9.1. Distortion](#391-distortion)
    - [3.9.2. Chorus](#392-chorus)
    - [3.9.3. Delay](#393-delay)
    - [3.9.4. Reverb](#394-reverb)
    - [3.9.5. Limiter](#395-limiter)
- [4. Tips on Reducing CPU Usage](#4-tips-on-reducing-cpu-usage)
- [5. Technical Notes](#5-technical-notes)
  - [5.1. Oscillator](#51-oscillator)
  - [5.2. LFO](#52-lfo)
  - [5.3. Envelope](#53-envelope)
  - [5.4. Master Effects](#54-master-effects)
  - [5.5. Modulation](#55-modulation)
  - [5.6. Voice Management](#56-voice-management)
- [6. References and inspiration](#6-references-and-inspiration)

# 1. Project setup

Install dependencies:

```js
npm install
```

Run command to compile and hot-reload for development:

```js
npm run serve
```

# 2. Overview

## 2.1. Introduction

Polyforce is an 8-voices virtual polyphonic synthesizer designed for creating music in web browser.

![synth][synth]

### 2.1.1. Oscillators

Polyforce houses 2 unison oscillators, which generate 4 basic waveforms:

- sine
- sawtooth
- triangle
- square

Each oscillator is capable of producing 4 unison voices, adding up to a total 8 voices per note. With its 8 notes of polyphony this means you can play up to 64 voices simultaneously.
Polyforce is equipped with additional one White Noise Generator.

### 2.1.2. Filter

For sound shaping purposes Polyforce offers one filter with 3 basic types (lowpass, bandpass, lowpass), 2 rolloff slopes (12 and 24 dB/oct) and bypass mode.

### 2.1.3. Modulation

To sculpt the sound Polyforce provides 2 polyphonic LFO's which can be used to modulate a whole set of different parameters. Next to it, it is possible to use the amplitude envelope and filter envelope as the source of modulation.

### 2.1.4. Master Effects

The master effects section offers five sound effects:

- Distortion - eight types of distortion;
- Chorus - stereo chorus effect;
- Delay - feedback delay effect;
- Reverb - effect with adjustable size and pre-delay;
- Limiter - brickwall limiter with adjustable threshold parameter for overload protection.

## 2.2. Audio Path

Polyforce is built on a classic *voice* architecture, that dynamically allocates a limited amount of voices during playtime. The scheme below shows the internal structure of the audio path of this synthesizer.

![Structure of synthesizer][diagram]  

The advantage of this design is reduced demand for resources (a polyphonic synth does not need to provide a separate voice for every note, sort of playing them in parallel - vide [paraphonic synthesizer][1]), but, on the other hand, this approach forms a little additional overhead in creating logic for dynamic voices management.

## 2.3. Controlling Knobs

Rotary knobs, faders and other controls can be controlled by clicking the handle and **dragging** up or down in the vertical direction. For higher accuracy hold the ***Shift*** key while dragging the mouse. The current knob value will be displayed for a short amount of time on the *preset display*.

![Controlling Knobs][knobControl]  
If you want to know the exact value of a parameter, but you do not wish to change it, you can simply **click** a knob once. This will display its value on the screen without changing it.  
**Double clicking** on a control resets its value to default.  
To speed up your workflow rotary knobs and sliders allow you to change its value using the **mouse wheel**.

## 2.4. Keyboard

Playing piano notes with just a mouse is not ideal (or even possible for chords). However it is possible to use your desktop keyboard to trigger keys signals. The keyboard section at the bottom of the user interface consist of a 4-octave keyboard that will display stroked keys if the note does not exceed its range. Switching the current keyboard octave down and up is possible with keys **Z** and **X** respectively.

## 2.5. Controlling Presets

Polyforce is shipped with simple preset manager with option to preview pre-defined programs.  
![Preset display][preset]  

On both sides of the display there are two buttons to change current preset to previous/next program respectively.

# 3. Components

In this chapter each synthesizer components will be discussed one by one.

## 3.1. Oscillator

![Oscillator][oscillator]  

***Wave***  
Values: sine | sawtooth | triangle | square  
By dragging the waveform selector you can select of type to generate.

***Octave***  
Range: ± 3600 cents (±3 octaves)  
Tune oscillator voices up/down in octave range.

***Seminote***  
Range: ± 1200 cents (±12 seminotes)  
Tune oscillator voices up/down in seminotes range.

***Finetune***  
Range: ± 100 cents (±1 seminote)  
Fine-tune oscillator pitch voices between two half notes.

***Phase***  
Range: [0, 360]  
Change start phase of waveform. This parameter does not have impact on wave, if *RETRIG* button is disabled.

***Retrigger***  
Values: on | off  
Force all voices to start at the exact same location every time a new note is triggered. That location can be changed using the *Phase* knob.

***Voices***  
Range: [0, 4]  
Select number of generated unison voices. You can turn off oscillator by setting the number of voices to 0.

## 3.2. Mixer

![mixer][mixer]  

The mixer section allows you to control the level and panorama of oscillators 1-2 and Noise Generator.

***Volume***  
Range: [0, 1]  
Set the output volume of the oscillator.

***Pan***  
Range: [-1, 1]  
Change panorama of oscillator output to the left(-1) or right(1) channel.  

## 3.3. Envelope Generators

Polyforce offers two ADSR (Attack, Decay, Sustain, Release) envelopes:

- Filter Env - controls filter frequency;
- AMP Env - controls the progression of the volume of a sound;

![eg][eg]  

Both work in the same manner and can be used as modulation souce in Modulation Matrix.

***Attack***  
Range: [1ms, 10s]  
Specifies the duration it takes for the amplitude envelope to go from zero to its maximum level.

***Decay***  
Range: [1ms, 10s]  
Specifies the duration of the decay stage, i.e. how long it takes the amplitude to fall back to the sustain level.

***Sustain***  
Range: [0, 1]  
Specifies the sustain level that is reached after the decay stage ends. The sustain stage lasts as long as a key is pressed.

***Release***  
Range: [1ms, 10s]  
This stage is reached whenever a key is released. This parameter specifies the duration it takes the envelope to hit zero.

## 3.4. LFOs

Low Frequency Oscillators are similar to Oscillators but they usally generate signal in an inaudible range used to continually change aspects of the sound, like modulating a volume or pitch.

![lfo][lfo]  

***Wave***  
Values: sine | sawtooth | triangle | square  
By dragging the waveform selector you can select the type to generate.

***Frequency***  
Range: [0.2Hz, 10Hz]  
Change pitch of oscillator.

***Phase***  
Range: [0, 360]  
Change start phase of waveform. This parameter does not have an impact on wave, if *Retrig* button is disabled.

***Retrigger***  
Values: on | off  
Force LFO to start at the exact same location every time a new note is triggered. That location can be changed using the *Phase* knob.

***Gain***  
Values: [0, 1]  
Sets the amplitude of LFO signal.

## 3.5. Filter

![filter][filter]  

***Type***  
Values: LP12 | LP24 | BP12 | BP24 | HP12 | HP24 | NONE  
Specifies type of filter:

- LP (low-pass) filter damps frequencies above cutoff frequency;
- BP (band-pass) filter damps frequencies around the cutoff frequency;
- HP (high-pass) filter damps frequencies passes signal above the cutoff frequency unchanged.
- NONE - allpass filter and that allows all frequencies to pass.  
  
Numbers next to filter type specify filter's rolloff slope as `dB per octave`, 12dB/oct and 24dB/oct respectively.

***Cutoff***  
Range: [20Hz, 20kHz]  
The most important parameter in the filter. Specifies the corner frequency where filter operates.

***Resonance***  
Range: [0, 10]  
Controls filter resonance at cutoff frequency. In Band-pass mode controls the width of the band. The width becomes narrower as the value increases.

***Envelope***  
Range: [0, 1]  
Controls how much the filter envelope affects the cutoff frequency. Set to zero, the filter envelope has no effect on the cutoff frequency. At 1 the envelope spans the entire cutoff range. If you want to set envelope amount to negative value use [Modulation Matrix](#modulation-matrix) instead with *Envelope* amount set to zero.

## 3.6. Master

The master section is the last part of the audio path in the synthesizer before the signal is sent to your speakers.
On the right side of the Master panel is a VU meter which measures the output level. The red color indicates the signal is too loud and you should turn the volume down to prevent clipping.

![master][master]  

***Gain***  
Range: [0, 1]  
Controls the overall volume of the entire synthesizer.

***FX***  
Values: on | off  
Toggle [Master Effects](#39-master-effects) section.

## 3.7. Modulation Matrix

![matrix][matrix]  

The Modulation Matrix allows you to create more complex patches by linking the selected source with one or more available parameters. It offers 5 slots that can be used to connect different parameters.  
All sources are converted to the same range: [0, 1] for unipolar and [-1, 1] for bipolar sources. The LFO's are bipolar, all other sources are unipolar. The current value of a source is **multiplied** with the *Amount* value [-1, 1] in the same modulation slot. The result of the multiplication is then **multiplied** again with selected parameter modulation range and **added** to destination value.

## 3.8. Oscilloscope

![scope][scope]  

The Oscilloscope display is hidden by default behind the Modulation Matrix and can be toggled by clicking on the button placed in top right corner of Matrix section. It displays the waveform shape on the synthesizer output in real time.

## 3.9. Master Effects

The Master FX panel is hidden by default behind the keyboard and can be open by clicking on the *FX* button placed in the [*Master*](#36-master) section of the synthesizer, next to the [*Modulation Matrix*](#37-modulation-matrix).

![fx][fx]  

Each effect is shipped with an **ON/OFF** button placed in top right corner of each effect panel and a **WET** knob which controls the effect depth and sets the ratio between the wet and original input signal (except *Limiter* effect). A value of 0 will mute the effect, while a value of 1 will pass only the original - dry - signal.

### 3.9.1. Distortion

Polyforce offer eight types of waveshaping distortion algorithms:

- Sine;
- Gloubi Boulga *(waveshaping algorithm by Laurent de Soras)*;
- Fold Back;
- Soft Clip;
- Saturation;
- Bit Crusher;
- Tarrabia *(waveshaping algorithm by Partice Tarrabia and Bram de Jong)*;
- Fuzz.  
  
Each algorithm offers different sound and harmonic content. Switch between them by clicking on the display and selecting one from the dropdown list.

***Amount***  
Range: [0, 1]  
Controls the effect intensity.

### 3.9.2. Chorus

Creates an effect that sounds like multiple instruments being played simultaneously.

***Delay***  
Range: [2ms, 20ms]  
The output of chorus is a mix of the input signal with delayed copy of it. Controls the delay offset in miliseconds.

***Depth***  
Range: [0, 1]  
Controls internal LFO modulation intensity *(amplitude)*.

***Feedback***  
Range: [0, 1]  
Controls the amount of signal from the output that returns back into the input of the effect, which can be used to create a flanging effect.

***Fequency***  
Range: [10Hz, 10kHz]  
Controls the frequency of the LFO which modulates the *Delay* parameter.

***Spread***  
Range: [0, 180]  
Controls the amount of stereo spread. At 0, both LFO's will be panned centrally, while at 180, LFO's will be spread hard to left and right.

### 3.9.3. Delay

The Feedback delay effect that can be used to create echoing sound effects.

***Delay***  
Range: [50ms, 1s]  
Controls delay time.

***Feedback***  
Range: [0, 1]  
Controls the speed with which the delays will fade away.

### 3.9.4. Reverb

The Reverb effect simulates sound reflections from surrounding walls or objects. Make sound more realistic and add depth to it.

***Size***  
Range: [100ms, 5s]  
Controls the duration of effect. Larger values give perception of larger room.

***Predelay***  
Range: [100ms, 5s]  
Adjusts the onset of the reverberated signal. Controls the amount of time before the reverb is fully ramped in.

### 3.9.5. Limiter

Brickwall limiter which limits the loudness of incoming signal.

***Threshold***  
Range: [-96dB, 0dB]  
Controls the level at which gain reduction begins.

# 4. Tips on Reducing CPU Usage

When using a lot of synthesizer and audio effects at the same time, CPU usage can become a problem. Here are some tips to reduce CPU usage:

- **Envelope Generators**  
Try to keep the *Decay* and *Release* parameters as small as possible. Sound with smaller release will fade faster and use less polyphony voices.
- **Effects**  
  Disable any master effects you don't use.
- **Modulation Matrix**  
Clear unused sources and destinations slots from matrix. Synthesizer core will not process these nodes, if you do not need them. Even if you set *AMOUNT* parameter to 0, Polyforce will still send signals to connected nodes.
- **Disable oscilloscope**  
Oscilloscope is generated in canvas element using *requestAnimationFrame* Web API method that allows to create high performance visual content, but require some additional resources. Disabling this element can significantly reduce CPU usage.
- **Reduce polyphony usage**  
Playing complex chords is fun and Polyforce give you possibility to play up to 8 notes at the same time, but remember, it is just a JavaScript app, not highly optimized VST plugin designed to use in professional DAW's, but only in your web browser.

If you still experience any problems with this app try to reload the webpage or even close the current tab and wait a minute or so to let your browser clear its memory and cache on its own.

---

# 5. Technical Notes

Tone.js is an awesome framework that offers a bunch of high quality components, but for this project I decided to tweak some of them a little to provide additional functionalities.
This section explains (in short) the technical differences between Tone.js components and their customized implementations used in this project.

## 5.1. Oscillator

- add support for multiple detuning units, allows you to tune the oscillator easily to any note:
  - octave - control pitch in octaves,
  - seminote - control pitch in seminotes,
  - finetune - control pitch in cents.
- allow you to set voices number to zero and disable completely,
- oscillator *free* phase mode - generate random phase for every new note, disable this effect, and sync all voices phase, by enabling *RETRIGGER* button.

## 5.2. LFO

- add retrigger switch - start LFO from the same phase position each note.

## 5.3. Envelope

- custom shape for decay curve - build in exponential curve sounds great with short decay values, its sharp and snappy, but the used algorithm is - IMHO - *too* sharp. Enlarging the decay value does not provide a significant change in sound amplitude, signal fades very fast and reaches sustain level very quickly. Project implementation uses an exponential function to shape the linear curve in the range [1, 0] slope which is next eased to fitthe  dedicated range using this formula:

<img src="https://latex.codecogs.com/svg.latex?g(x,l,u)&space;=&space;f(\frac{x-l}{u-l})(u-l)&space;&plus;&space;l" title="g(x,l,u) = f(\frac{x-l}{u-l})(u-l) + l" />

where:  
x - signal value,  
u - upper signal value (1),  
l - lower signal value (which is *sustain* value in range [0, 1])

![decayeg][decayeg]
*Custom envelope shape in comparison to built-in Tone.js Envelope with exponential decay curve. Settings values: decay time=1.5s, sustain=0.5, hold time=2s*.  
\
Custom generated shape fades progressively in time and still does not sound as artificial as linear curve.

## 5.4. Master Effects

- disables effect in effect chain - Tone.js, for most of their effects components, provide only one parameter to control the effect intensity - *WET*. This parameter - however - does not prevent from using CPU usage, signal is still passed and processed by effect. Dedicated *ON/OFF* switch completely disconnect effect from audio chain and let orginal signal to pass through.

## 5.5. Modulation

Tone.js (and Web Audio API in general) does not offer any native support of the independent control for a modulated parameter. Every parameter, connected to any modualation source, automatically recieves status ***overridden*** which prevents any value changes from being sent directly to this property. WAAPI architecture, however, allows you to connect multiple signals to one property where they are are summed together in the parameter input. Every modulatable parameter has been wrapped in a custom *MODULATION* function that provides dedicated input for a constant source value and modulation output. This way it has become possible to control the parameter base value independently from any modulation source connected to it.

The simplified implementation is presented on this diagram:

```
Parameter Signal
                ↘
                (+) -→ Parameter
                ↗
Modulation Signals
```

Parameter can receive any modulation signal and sill be able to update its base value.

## 5.6. Voice Management

Due to the static and rigid nature of components relationships, I have decided to drop down the voice management system that the Tone.js *PolySynth* object has to offer, i.e. dynamic voice creation and removal of allocated voices. In the current implementation all polyphonic voices are initialized only once at start and allocated dynamically during playtime. This way the synthesizer can avoid potential latency time problems caused by expensive voice creation/initialization or removal, but at the overall cost of the synthesizer initialization time.

# 6. References and inspiration

- [Tone.js](https://tonejs.github.io/)
- [Sound on Sound - Synth Secrets](https://www.soundonsound.com/techniques/whats-sound)
- [Developing a Digital Synthesizer in C++ by Peter Goldsborough](https://issuu.com/petergoldsborough/docs/thesis_3c166f78d5673b)
- [Musicdsp.org](https://www.musicdsp.org/en/latest/index.html)
- [Making Audio Plugins - Martin Finke's Blog](http://www.martin-finke.de/blog/articles/)

<!-- links -->
  [1]: https://www.soundonsound.com/techniques/polyphony-digital-synths

<!-- images -->
  [synth]: media/synth.png?raw=true
  [diagram]: media/diagram.png?raw=true
  [knobControl]: media/controls.png?raw=true
  [preset]: media/preset-display.png?raw=true
  [eg]: media/eg.png?raw=true
  [filter]: media/filter.png?raw=true
  [matrix]: media/matrix.png?raw=true
  [lfo]: media/lfo.png?raw=true
  [mixer]: media/mixer.png?raw=true
  [master]: media/master.png?raw=true
  [oscillator]: media/oscillator.png?raw=true
  [scope]: media/scope.png?raw=true
  [fx]: media/fx.png?raw=true
  [decayeg]: media/decayeg.png?raw=true
