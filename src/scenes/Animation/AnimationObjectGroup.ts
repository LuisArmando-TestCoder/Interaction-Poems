import * as THREE from 'three'
import getSetupScene from '../getSetupScene'
// https://threejs.org/docs/api/en/animation/AnimationObjectGroup.html
export default function AnimationObjectGroup() {
  getSetupScene({
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}