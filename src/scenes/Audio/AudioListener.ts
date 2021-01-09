import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/audio/AudioListener.html
 
export default function AudioListener() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}