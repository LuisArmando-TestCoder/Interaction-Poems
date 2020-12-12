import * as THREE from 'three'
import { CanvasState } from '../canvasesState'

export default function setCameraDirectionLookingAtObject(object: THREE.Object3D, canvasState: CanvasState) {
    canvasState.camera.lookAt(object.position)
}