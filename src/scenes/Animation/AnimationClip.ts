import * as THREE from 'three'

import presetScene from '../../scenePreset'

// https://threejs.org/docs/api/en/animation/AnimationClip.html
 
export default function AnimationClip() {
  presetScene({ 
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}