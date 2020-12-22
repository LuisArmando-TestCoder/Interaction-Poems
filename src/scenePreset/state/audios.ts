export class AudioProperties {
    audioContext: AudioContext
    analyser: AnalyserNode
    source: MediaElementAudioSourceNode
    frequencies: Uint8Array
    amplitudes: Uint8Array
    averageFrequecy: number
    averageAmplitude: number
}


export class AudiosState {
    audios: HTMLMediaElement[] = []
    // put everything but audios in objects
    audioPropertiesGroup: AudioProperties[] = []
}

const audiosState: AudiosState = new AudiosState()

export default audiosState