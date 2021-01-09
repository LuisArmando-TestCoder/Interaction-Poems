import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/materials/ShadowMaterial.html
 
export default function ShadowMaterial() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}