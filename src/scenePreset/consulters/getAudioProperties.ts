import animations from '../state/animations'
import audiosState, { AudioProperties } from '../state/audios'

const {
    audios,
    audioPropertiesGroup
} = audiosState

function getAudioArray(analyser) {
    const defaultFrequencyBinCount = 1024

    return new Uint8Array(analyser ? analyser.frequencyBinCount : defaultFrequencyBinCount)
}

function getAverage(array: Uint8Array): number {
    return array.reduce((a, b) => a + b) / array.length
}

function getFrequencies(analyser: AnalyserNode): Uint8Array {
    const audioArray = getAudioArray(analyser)

    if (analyser) analyser.getByteFrequencyData(audioArray)

    return audioArray
}

function getAmplitudes(analyser: AnalyserNode): Uint8Array {
    const audioArray = getAudioArray(analyser)

    if (analyser) analyser.getByteTimeDomainData(audioArray)

    return audioArray
}

function setNewAudioStateItems(audio: HTMLMediaElement) {
    const audioContext = new AudioContext()
    const analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaElementSource(audio)
    const audioProperties = audioPropertiesGroup[audioPropertiesGroup.length - 1]

    audioProperties.audioContext = audioContext
    audioProperties.analyser = analyser
    audioProperties.source = source

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
    if (!audios.includes(audio)) { // set addeventlistener audio,pla
        audios.push(audio)
        audioPropertiesGroup.push(new AudioProperties())
        animations.push(() => setProcessedAudioProperties(audio, audios.indexOf(audio)))
        audio.addEventListener('play', () => {
            setNewAudioStateItems(audio)
        })
    }

    const audioIndex = audios.indexOf(audio)

    setProcessedAudioProperties(audio, audioIndex)

    return audioPropertiesGroup[audioIndex]
}