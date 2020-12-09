import * as THREE from 'three'
import getSetupScene from '../../scenePreset/getSetupScene'
// https://threejs.org/docs/api/en/materials/RawShaderMaterial.html
export default function RawShaderMaterial() {
  getSetupScene({
    setup({ renderer, scene, camera, defaultScene }) {
    },
    animate({ renderer, scene, camera, defaultScene }) {
    },
  })
}