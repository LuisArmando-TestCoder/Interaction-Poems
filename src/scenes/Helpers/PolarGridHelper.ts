import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/helpers/PolarGridHelper.html
 
export default function PolarGridHelper() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}