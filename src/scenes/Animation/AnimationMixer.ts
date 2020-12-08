import * as THREE from 'three'
import getSetupScene from '../../sceneSetup/getSetupScene'
// https://threejs.org/docs/api/en/animation/AnimationMixer.html
export default function AnimationMixer() {
  getSetupScene({
    setup({ renderer, scene, camera, defaultSceneObjects }) {
    },
    animate({ renderer, scene, camera, defaultSceneObjects }) {
    },
  })
}