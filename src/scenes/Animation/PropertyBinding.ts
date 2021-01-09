import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/animation/PropertyBinding.html
 
export default function PropertyBinding() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}