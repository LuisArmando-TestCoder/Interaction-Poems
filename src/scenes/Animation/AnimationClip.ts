import * as THREE from 'three'
import getSetupScene from '../../sceneSetup/getSetupScene'
// https://threejs.org/docs/api/en/animation/AnimationClip.html
export default function AnimationClip() {
  getSetupScene({
    setup({ renderer, scene, camera, defaultScene }) {
    },
    animate({ renderer, scene, camera, defaultScene }) {
    },
  })
}