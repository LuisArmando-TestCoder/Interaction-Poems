import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/geometries/ParametricBufferGeometry.html
 
export default function ParametricBufferGeometry() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}