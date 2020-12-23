import { CanvasState } from '../../state/canvases'

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

export default function setFirstPersonZoom(canvasState: CanvasState) {
    canvasState.canvas.addEventListener('wheel', event => {
        setControlOnWheel(event, canvasState)
    })
}