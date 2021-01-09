import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/geometries/RingGeometry.html
 
export default function RingGeometry() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}