import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/audio/PositionalAudio.html
 
export default function PositionalAudio() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}