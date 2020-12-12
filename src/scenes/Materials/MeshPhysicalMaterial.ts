import * as THREE from 'three'
import presetScene from '../../scenePreset'
// https://threejs.org/docs/api/en/materials/MeshPhysicalMaterial.html
export default function MeshPhysicalMaterial() {
  presetScene({
    setup({ renderer, scene, camera, defaultScene }) {
    },
    animate({ renderer, scene, camera, defaultScene }) {
    },
  })
}