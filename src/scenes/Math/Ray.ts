import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/math/Ray.html
 
export default function Ray() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}