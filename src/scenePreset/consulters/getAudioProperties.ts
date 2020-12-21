import audiosState from '../state/audios'

interface AudioProperties {
    audio: HTMLMediaElement;
    audioContext: AudioContext;
    analyser: AnalyserNode;
    source: MediaElementAudioSourceNode;
    frequencies: Uint8Array;
    amplitudes: Uint8Array;
    averageFrequecy: number;
    averageAmplitude: number;
}

const {
    audios,
    audioContexts,
    analysers,
    sources,
} = audiosState

function getAverage(array: Uint8Array): number {
    return array.reduce((a, b) => a + b) / array.length
}

function getFrequencies(analyser: AnalyserNode): Uint8Array {
    const audioArray = new Uint8Array(analyser.frequencyBinCount)

    analyser.getByteFrequencyData(audioArray)

    return audioArray
}

function getAmplitudes(analyser: AnalyserNode): Uint8Array {
    const audioArray = new Uint8Array(analyser.frequencyBinCount)

    analyser.getByteTimeDomainData(audioArray)

    return audioArray
}

function setNewAudioStateItems(audio: HTMLMediaElement) {
    const audioContext = new AudioContext()
    const analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaElementSource(audio)

    audios.push(audio)
    audioContexts.push(audioContext)
    analysers.push(analyser)
    sources.push(source)

    source.connect(analyser)
    analyser.connect(audioContext.destination)
}

function getProcessedAudioProperties(audio: HTMLMediaElement): AudioProperties {
    const audioIndex = audios.indexOf(audio)
    const analyser = analysers[audioIndex]
    const frequencies = getFrequencies(analyser)
    const amplitudes = getAmplitudes(analyser)

    return {
        audio,
        audioContext: audioContexts[audioIndex],
        analyser,
        source: sources[audioIndex],
        frequencies,
        amplitudes,
        averageFrequecy: getAverage(frequencies),
        averageAmplitude: getAverage(amplitudes),
    }
}

export default function getAudioProperties(audio: HTMLMediaElement): AudioProperties {
    if (!audios.includes(audio)) {
        setNewAudioStateItems(audio)
    }

    return getProcessedAudioProperties(audio)
}