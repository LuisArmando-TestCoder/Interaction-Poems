import { AudioProperties } from "../types/utils"

export class AudiosState {
  audios: HTMLMediaElement[] = []
  audioPropertiesGroup: AudioProperties[] = []
}

export type AudioChannels = { [index: string]: HTMLAudioElement };

// this could to go on state
export const audioChannels: AudioChannels = {}

const audiosState: AudiosState = new AudiosState()

export default audiosState
