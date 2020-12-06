import * as THREE from 'three'
import getSetupScene from '../getSetupScene'
// https://threejs.org/docs/api/en/helpers/DirectionalLightHelper.html
export default function DirectionalLightHelper() {
  getSetupScene({
    setup({ renderer, scene, camera }) {
    },
    animate({ renderer, scene, camera }) {
    },
  })
}