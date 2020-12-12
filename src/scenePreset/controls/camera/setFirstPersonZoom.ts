import { CanvasState } from '../canvasesState'

export default function setFirstPersonZoom(canvasState: CanvasState) {
    window.addEventListener('wheel', event => {
        setControlOnWheel(event, canvasState)
    })
}

function setControlOnWheel(event: WheelEvent, canvasState: CanvasState) {
    const delta = -Math.sign(event.deltaY)
    const zoom = Math.min(
        canvasState.presetConfiguration.camera.zoom.max,
        Math.max(
            canvasState.presetConfiguration.camera.zoom.min,
            canvasState.camera['getFocalLength']() + delta
        )
    )
    
    canvasState.camera['setFocalLength'](zoom)
}