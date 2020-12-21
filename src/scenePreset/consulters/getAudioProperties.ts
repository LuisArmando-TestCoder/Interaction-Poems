import animations from '../state/animations'
import audiosState, { AudioProperties } from '../state/audios'

const {
    audios,
    audioPropertiesGroup
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
    audioPropertiesGroup.push({
        audioContext,
        analyser,
        source,
        frequencies: null,
        amplitudes: null,
        averageFrequecy: null,
        averageAmplitude: null,
    })

    source.connect(analyser)
    analyser.connect(audioContext.destination)
}

function setProcessedAudioProperties(audio: HTMLMediaElement, audioIndex: number) {
    const audioProperties = audioPropertiesGroup[audioIndex]
    const { analyser } = audioProperties
    const frequencies = getFrequencies(analyser)
    const amplitudes = getAmplitudes(analyser)

    audioProperties.frequencies = frequencies
    audioProperties.amplitudes = amplitudes
    audioProperties.averageFrequecy = getAverage(frequencies)
    audioProperties.averageAmplitude = getAverage(amplitudes)
}

export default function getAudioProperties(audio: HTMLMediaElement): AudioProperties {
    if (!audios.includes(audio)) {
        setNewAudioStateItems(audio)

        animations.push(() => setProcessedAudioProperties(audio, audios.indexOf(audio)))
    }

    const audioIndex = audios.indexOf(audio)

    setProcessedAudioProperties(audio, audioIndex)

    return audioPropertiesGroup[audioIndex]
}