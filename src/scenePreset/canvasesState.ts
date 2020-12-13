import * as THREE from 'three'

export class PresetConfiguration {
    ambient = {
        color: 0xffffff,
        alpha: 1,
    }
    renderer = {
        antialias: true,
    }
    camera = {
        fov: 32,
        near: 0.1,
        far: 2000,
        zoom: {
            max: 100,
            min: 10,
        }
    }
    shadowMapEnabled = true
    near = 5
    far = 1000
}

export interface PresetSceneCallbacks {
    setup: (canvasState: CanvasState) => void
    animate: (canvasState: CanvasState) => void
}

export interface IntersectionUtils {
    matrices: {
        callbacks: Function[][]
        objects: THREE.Object3D[][]
    }
    raycaster: THREE.Raycaster
}

export interface DefaultScene {
    floor: THREE.Mesh
    objects: THREE.Group
    lights: THREE.Group
}

export class CanvasState {
    intersectionUtils: IntersectionUtils
    defaultScene: DefaultScene
    
    canvasSelector: string
    canvas: HTMLCanvasElement

    renderer: THREE.Renderer
    camera: THREE.Camera
    scene: THREE.Scene

    animations: Function[]

    presetConfiguration = new PresetConfiguration()
}

export type CanvasesState = { [index: string]: CanvasState }

const canvasesState: CanvasesState = {}

export default canvasesState