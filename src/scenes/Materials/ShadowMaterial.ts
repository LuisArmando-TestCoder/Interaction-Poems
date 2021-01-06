import * as THREE from 'three'

import presetScene from '../../scenePreset'

// https://threejs.org/docs/api/en/materials/ShadowMaterial.html
 
export default function ShadowMaterial() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}