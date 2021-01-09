import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/animation/AnimationObjectGroup.html
 
export default function AnimationObjectGroup() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}