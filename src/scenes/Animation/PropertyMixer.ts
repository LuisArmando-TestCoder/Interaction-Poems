import * as THREE from 'three'
import getSetupScene from '../getSetupScene'
// https://threejs.org/docs/api/en/animation/PropertyMixer.html
export default function PropertyMixer() {
  getSetupScene({
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}