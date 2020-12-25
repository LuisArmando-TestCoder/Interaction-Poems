import * as THREE from 'three'

import componentNames from '../componentNames'

export type CanvasStateCallback = (canvasState: CanvasState) => void

export class PresetConfiguration {
    objectsFilter = {
        whitelist: [],
        blacklist: [],
        disableAll: false,
    }
    controlsBlacklist: string[] = []
    componentNames = componentNames
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
    setup: CanvasStateCallback
    animate: CanvasStateCallback
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

    presetConfiguration = new PresetConfiguration()
}

export type CanvasesState = { [index: string]: CanvasState }

const canvasesState: CanvasesState = {}

export default canvasesState