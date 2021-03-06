import * as THREE from 'three'

import presetScene from '../../scene-preset'

// https://threejs.org/docs/api/en/lights/AmbientLight.html
 
export default function AmbientLight() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}