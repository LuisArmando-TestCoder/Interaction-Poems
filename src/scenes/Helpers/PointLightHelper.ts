import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/helpers/PointLightHelper.html
 
export default function PointLightHelper() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}