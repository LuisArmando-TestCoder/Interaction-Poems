import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/materials/LineBasicMaterial.html
 
export default function LineBasicMaterial() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}