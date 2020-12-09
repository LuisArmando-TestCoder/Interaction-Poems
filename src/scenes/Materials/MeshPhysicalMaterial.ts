import * as THREE from 'three'
import getSetupScene from '../../scenePreset/getSetupScene'
// https://threejs.org/docs/api/en/materials/MeshPhysicalMaterial.html
export default function MeshPhysicalMaterial() {
  getSetupScene({
    setup({ renderer, scene, camera, defaultScene }) {
    },
    animate({ renderer, scene, camera, defaultScene }) {
    },
  })
}