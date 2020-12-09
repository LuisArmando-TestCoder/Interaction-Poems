import * as THREE from 'three'
import getSetupScene from '../../scenePreset/getSetupScene'
// https://threejs.org/docs/api/en/audio/AudioAnalyser.html
export default function AudioAnalyser() {
  getSetupScene({
    setup({ renderer, scene, camera, defaultScene }) {
    },
    animate({ renderer, scene, camera, defaultScene }) {
    },
  })
}