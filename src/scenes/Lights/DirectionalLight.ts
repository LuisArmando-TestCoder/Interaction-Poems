import * as THREE from 'three'

import presetScene from '../../scenePreset'

// https://threejs.org/docs/api/en/lights/DirectionalLight.html
 
export default function DirectionalLight() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}