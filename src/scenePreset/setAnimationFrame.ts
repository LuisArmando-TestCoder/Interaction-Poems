import canvasesState, { CanvasState } from './canvasesState'

export default function setAnimationFrame(canvasSelector: string) {
    const canvasState: CanvasState = canvasesState[canvasSelector]

    if (!canvasState.animations) canvasState.animations = []

    canvasState.animations.forEach(animation => {
        animation(canvasState)
    })
    canvasState.renderer.render(canvasState.scene, canvasState.camera)
    requestAnimationFrame(() => setAnimationFrame(canvasSelector))
}