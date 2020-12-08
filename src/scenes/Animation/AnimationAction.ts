import * as THREE from 'three'
import getSetupScene from '../../sceneSetup/getSetupScene'
// https://threejs.org/docs/api/en/animation/AnimationAction.html
export default function AnimationAction() {
  getSetupScene({
    setup({ renderer, scene, camera, defaultSceneObjects }) {
    },
    animate({ renderer, scene, camera, defaultSceneObjects }) {
    },
  })
}