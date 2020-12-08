import * as THREE from 'three'
import getSetupScene from '../../sceneSetup/getSetupScene'
// https://threejs.org/docs/api/en/audio/AudioListener.html
export default function AudioListener() {
  getSetupScene({
    setup({ renderer, scene, camera, defaultSceneObjects }) {
    },
    animate({ renderer, scene, camera, defaultSceneObjects }) {
    },
  })
}