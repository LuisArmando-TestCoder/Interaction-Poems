import * as THREE from 'three'

import presetScene from '../../scenePreset'

// https://threejs.org/docs/api/en/lights/HemisphereLight.html
 
export default function HemisphereLight() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}