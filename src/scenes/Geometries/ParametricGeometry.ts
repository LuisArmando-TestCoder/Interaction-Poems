import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/geometries/ParametricGeometry.html
 
export default function ParametricGeometry() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}