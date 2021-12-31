import * as THREE from 'three'

import presetScene, { state } from '../../scene-preset'

// https://threejs.org/docs/api/en/geometries/PlaneGeometry.html
 
export default function PlaneGeometry() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
      state.audiosState.audioChannels[
        'trance'
      ] = document.getElementById('audio') as HTMLAudioElement
    },
    animate({ renderer, scene, camera }) {
    },
  })
}