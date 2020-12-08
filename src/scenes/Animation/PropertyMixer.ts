import * as THREE from 'three'
import getSetupScene from '../../sceneSetup/getSetupScene'
// https://threejs.org/docs/api/en/animation/PropertyMixer.html
export default function PropertyMixer() {
  getSetupScene({
    setup({ renderer, scene, camera, defaultSceneObjects }) {
    },
    animate({ renderer, scene, camera, defaultSceneObjects }) {
    },
  })
}