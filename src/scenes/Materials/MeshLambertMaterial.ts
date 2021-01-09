import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/materials/MeshLambertMaterial.html
 
export default function MeshLambertMaterial() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}