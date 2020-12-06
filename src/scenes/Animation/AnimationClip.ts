import * as THREE from 'three'
import getSetupScene from '../getSetupScene'
// https://threejs.org/docs/api/en/animation/AnimationClip.html
export default function AnimationClip() {
  getSetupScene({
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}