import * as THREE from 'three'
import {
  setFirstPersonPositionControllers,
  updateFirstPersonPosition,
} from './camera/controller/position'
import setFirstPersonDirectionControllers from './camera/controller/direction'

interface FrameUtils {
    renderer: THREE.Renderer,
    scene: THREE.Scene,
    camera: THREE.Camera
}

interface CanvasUtils {
    canvas: HTMLCanvasElement,
    renderer: THREE.Renderer,
    camera: THREE.Camera
}

function setAnimationFrame(frameUtils: FrameUtils, animate: Function) {
    animate && animate(frameUtils)
    updateFirstPersonPosition()
    frameUtils.renderer.render(frameUtils.scene, frameUtils.camera)
    requestAnimationFrame(() => setAnimationFrame(frameUtils, animate))
}

function getAspectRatio(canvas) {
    return canvas.clientWidth / canvas.clientHeight
}

function getLight(): [THREE.Light, THREE.Light] {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
    hemiLight.position.set(0, 20, 0)
    
    const dirLight = new THREE.DirectionalLight( 0xffffff )
    dirLight.position.set(3, 10, 10)
    dirLight.shadow.camera.top = 2
    dirLight.shadow.camera.bottom = - 2
    dirLight.shadow.camera.left = - 2
    dirLight.shadow.camera.right = 2
    dirLight.shadow.camera.near = 0.1
    dirLight.shadow.camera.far = 40
    dirLight.castShadow = true

    return [hemiLight, dirLight]
}

function handleCanvasSize(canvasUtils: CanvasUtils) {
    const parent = canvasUtils.canvas.parentElement

    setCanvasToElementSize(canvasUtils, parent)

    new window['ResizeObserver'](() => {
        setCanvasToElementSize(canvasUtils, parent)
    }).observe(parent)
}

function setCanvasToElementSize(canvasUtils: CanvasUtils, element: HTMLElement) {
    canvasUtils.canvas.width = element.clientWidth
    canvasUtils.canvas.height = element.clientHeight
    canvasUtils.camera['aspect'] = window.innerWidth / window.innerHeight

    canvasUtils.camera['updateProjectionMatrix']()
    canvasUtils.renderer.setSize(window.innerWidth, window.innerHeight)
}

interface SetupScene {
    setup: Function,
    animate: Function, 
}

export default function getSetupScene(setupScene: SetupScene): THREE.Scene {
    const canvas = document.querySelector('canvas')
    const camera = new THREE.PerspectiveCamera(32, getAspectRatio(canvas), 1, 500)
    const scene = new THREE.Scene()
    const ambientColor = '#fff'
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    })
    const [hemiLight, dirLight] = getLight()
    const frameUtils = { renderer, scene, camera }

    scene.fog = new THREE.Fog(ambientColor, 5, 1000)
    renderer.shadowMap.enabled = true

    renderer.setClearColor(ambientColor, 1)
    camera.lookAt(new THREE.Vector3())
    scene.add(hemiLight)
    scene.add(dirLight)
    canvas.focus()

    setupScene.setup && setupScene.setup(frameUtils)

    setAnimationFrame(frameUtils, setupScene.animate)
    setFirstPersonPositionControllers(canvas)
    setFirstPersonDirectionControllers(camera, canvas)
    handleCanvasSize({ canvas, renderer, camera })
    addDefaultObject(scene)
    addFloor(scene)

    return scene
}

function addFloor(scene: THREE.Scene): THREE.Object3D {
    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200), 
        new THREE.MeshStandardMaterial({ color: '#eee' })
    )

    mesh.rotation.x = -Math.PI / 2
    mesh.position.y = -1
    mesh.receiveShadow = true
    mesh.castShadow = true
    scene.add(mesh)

    return mesh
}

function addDefaultObject(scene: THREE.Scene): THREE.Object3D {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshStandardMaterial({ color: '#4ff' })
    )

    mesh.castShadow = true
    mesh.receiveShadow = true
    scene.add(mesh)

    return mesh
}
