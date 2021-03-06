import * as THREE from 'three'

import presetScene from '../../scene-preset'

// https://threejs.org/docs/api/en/materials/MeshMatcapMaterial.html
 
export default function MeshMatcapMaterial() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}