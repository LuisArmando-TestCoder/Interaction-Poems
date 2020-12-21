export class AudiosState {
    audios: HTMLMediaElement[] = []
    analysers: AnalyserNode[] = []
    sources: MediaElementAudioSourceNode[] = []
    audioContexts: AudioContext[] = []
}

const audiosState: AudiosState = new AudiosState()

export default audiosState