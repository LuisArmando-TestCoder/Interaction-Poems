import * as THREE from 'three'
import getSetupScene from '../getSetupScene'
// https://threejs.org/docs/api/en/audio/AudioAnalyser.html
export default function AudioAnalyser() {
  getSetupScene({
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}