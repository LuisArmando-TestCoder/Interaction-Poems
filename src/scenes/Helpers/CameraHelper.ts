import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/helpers/CameraHelper.html
 
export default function CameraHelper() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}