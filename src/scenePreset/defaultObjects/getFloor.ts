import * as THREE from 'three'

export default function addFloor(): THREE.Mesh {
    const material = new THREE.MeshStandardMaterial({ color: 0xcccccc })

    material.color.convertSRGBToLinear()

    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200), 
        material
    )
    
    mesh.rotation.x = -Math.PI / 2
    mesh.receiveShadow = true
    mesh.castShadow = false

    return mesh
}