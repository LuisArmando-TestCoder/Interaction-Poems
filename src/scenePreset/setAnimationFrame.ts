import sceneUtilsGroup, {
    SceneUtils
} from './SceneUtilsGroup'

type AnimationGroup = { [index: string]: Function[] }

export const animationGroup: AnimationGroup = {}

export default function setAnimationFrame(canvasSelector: string) {
    const sceneUtils: SceneUtils = sceneUtilsGroup[canvasSelector]
    animationGroup[canvasSelector].forEach(animation => {
        animation(sceneUtils)
    })
    sceneUtils.renderer.render(sceneUtils.scene, sceneUtils.camera)
    requestAnimationFrame(() => setAnimationFrame(canvasSelector))
}