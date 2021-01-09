import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/lights/SpotLight.html
 
export default function SpotLight() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}