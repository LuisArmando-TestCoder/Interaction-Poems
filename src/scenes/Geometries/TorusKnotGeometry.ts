import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/geometries/TorusKnotGeometry.html
 
export default function TorusKnotGeometry() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}