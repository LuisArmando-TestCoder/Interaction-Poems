import * as THREE from 'three'
import {
  setFirstPersonPosition,
  updateFirstPersonPosition,
} from './camera/controller/setFirstPersonPosition'
import setFirstPersonDirection from './camera/controller/setFirstPersonDirection'
import setFirstPersonZoom from './camera/controller/setFirstPersonZoom'

const ambientColor = 0xffffff

interface FrameUtils {
    renderer: THREE.Renderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    defaultSceneObjects: {
        floor: THREE.Mesh,
        defaultObject: THREE.Mesh,
        lights: [THREE.Light, THREE.Light]
    }
}

interface CanvasUtils {
    canvas: HTMLCanvasElement,
    renderer: THREE.Renderer,
    camera: THREE.Camera
}

interface SetupScene {
    setup: Function,
    animate: Function
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

function getLights(): [THREE.Light, THREE.Light] {
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

function addFloor(scene: THREE.Scene): THREE.Mesh {
    const material = new THREE.MeshStandardMaterial({ color: 0xeeeeee })
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

function addDefaultObject(scene: THREE.Scene): THREE.Mesh {
    const height = 1
    const material = new THREE.MeshStandardMaterial({ color: 0x44ffff })
    const mesh = new THREE.Mesh(
        new THREE.BoxBufferGeometry(height, height, height),
        material
    )
    mesh.position.y = height / 2
    mesh.castShadow = true
    mesh.receiveShadow = false

    return mesh
}

export default function getSetupScene(setupScene: SetupScene): THREE.Scene {
    const canvas = document.querySelector('canvas')
    const camera = new THREE.PerspectiveCamera(32, getAspectRatio(canvas), 1)
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    })
    const lights = getLights()
    const [hemiLight, dirLight] = lights
    const floor = addFloor(scene)
    const defaultObject = addDefaultObject(scene)
    const frameUtils = {
        renderer,
        scene,
        camera,
        defaultSceneObjects: {
            floor,
            defaultObject,
            lights
        }
    }

    scene.fog = new THREE.Fog(ambientColor, 5, 1000)
    renderer.shadowMap.enabled = true
    renderer.outputEncoding = THREE.sRGBEncoding

    setupScene.setup && setupScene.setup(frameUtils)

    setAnimationFrame(frameUtils, setupScene.animate)
    setFirstPersonPosition(canvas)
    setFirstPersonDirection(camera, canvas)
    setFirstPersonZoom(camera)
    handleCanvasSize({ canvas, renderer, camera })

    scene.add(floor)
    scene.add(defaultObject)
    scene.add(hemiLight)
    scene.add(dirLight)
    renderer.setClearColor(ambientColor, 1)
    camera.lookAt(new THREE.Vector3())
    canvas.focus()

    return scene
}
