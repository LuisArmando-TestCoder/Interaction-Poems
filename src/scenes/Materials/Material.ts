import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/materials/Material.html
 
export default function Material() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}