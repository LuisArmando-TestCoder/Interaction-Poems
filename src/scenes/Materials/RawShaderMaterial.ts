import * as THREE from 'three'
import getSetupScene from '../../sceneSetup/getSetupScene'
// https://threejs.org/docs/api/en/materials/RawShaderMaterial.html
export default function RawShaderMaterial() {
  getSetupScene({
    setup({ renderer, scene, camera, defaultSceneObjects }) {
    },
    animate({ renderer, scene, camera, defaultSceneObjects }) {
    },
  })
}