import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/audio/Audio.html
 
export default function Audio() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}