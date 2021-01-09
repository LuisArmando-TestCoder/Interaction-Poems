import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/materials/MeshToonMaterial.html
 
export default function MeshToonMaterial() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}