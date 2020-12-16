import * as THREE from 'three'

import { CanvasState } from '../../canvasesState'

export default function addFloor(canvasState: CanvasState): THREE.Mesh {
    const material = new THREE.MeshStandardMaterial({ color: 0xcccccc })

    material.color.convertSRGBToLinear()

    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200), 
        material
    )
    
    mesh.rotation.x = -Math.PI / 2
    mesh.receiveShadow = true
    mesh.castShadow = false
    mesh.name = canvasState.presetConfiguration.componentNames.FLOOR

    return mesh
}