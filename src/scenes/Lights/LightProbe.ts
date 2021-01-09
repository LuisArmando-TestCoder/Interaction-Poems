import * as THREE from 'three'

import presetScene from '../../scene-preset'

// https://threejs.org/docs/api/en/lights/LightProbe.html
 
export default function LightProbe() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}