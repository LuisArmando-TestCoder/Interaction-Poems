import * as THREE from 'three'

import presetScene from '../../scene-preset'

// https://threejs.org/docs/api/en/lights/PointLight.html
 
export default function PointLight() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}