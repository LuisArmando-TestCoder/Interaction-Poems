import { AudioProperties } from "../types/utils"

export type AudioChannels = { [index: string]: HTMLAudioElement };

export const audioChannels: AudioChannels = {}

export class AudiosState {
  audioChannels = audioChannels
  audios: HTMLMediaElement[] = []
  audioPropertiesGroup: AudioProperties[] = []
}
const audiosState: AudiosState = new AudiosState()

export default audiosState
