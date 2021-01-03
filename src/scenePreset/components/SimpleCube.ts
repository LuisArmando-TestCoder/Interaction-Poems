import * as THREE from 'three'

import { componentNames } from '../../state'

export default class SimpleCube {
    height = 1
    material = new THREE.MeshStandardMaterial({ color: 0x44ffff })
    geometry = new THREE.BoxBufferGeometry(height, height, height)
    mesh: THREE.Mesh

    constructor(): THREE.Mesh {
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        this.mesh.position.y = this.height / 2
        this.mesh.castShadow = true
        this.mesh.receiveShadow = false
        this.mesh.name = componentNames.SimpleCube

        return this.mesh
    }
}