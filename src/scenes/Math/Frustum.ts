import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/math/Frustum.html
 
export default function Frustum() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}