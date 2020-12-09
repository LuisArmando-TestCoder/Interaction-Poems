import * as THREE from 'three'
import getSetupScene from '../../scenePreset/getSetupScene'
// https://threejs.org/docs/api/en/math/Interpolant.html
export default function Interpolant() {
  getSetupScene({
    setup({ renderer, scene, camera, defaultScene }) {
    },
    animate({ renderer, scene, camera, defaultScene }) {
    },
  })
}