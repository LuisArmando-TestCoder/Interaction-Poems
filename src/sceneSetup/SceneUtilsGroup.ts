import * as THREE from 'three'

export interface CanvasUtils {
    canvas: HTMLCanvasElement,
    renderer: THREE.Renderer,
    camera: THREE.Camera
}

export interface SetupScene {
    setup: (sceneUtils: SceneUtils) => void,
    animate: (sceneUtils: SceneUtils) => void
}

export class SceneUtils {
    renderer: THREE.Renderer
    scene: THREE.Scene
    camera: THREE.Camera
    defaultScene: {
        floor: THREE.Mesh,
        objects: THREE.Group,
        lights: THREE.Group
    }
}

export type SceneUtilsGroup = { [index: string]: SceneUtils }

const sceneUtilsGroup: SceneUtilsGroup = {}

export default sceneUtilsGroup