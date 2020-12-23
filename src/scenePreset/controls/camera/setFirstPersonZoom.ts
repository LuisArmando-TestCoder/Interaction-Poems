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
    const scroll = {
        x: window.scrollX,
        y: window.scrollY,
    }
    canvasState.canvas.addEventListener('wheel', event => {
        setControlOnWheel(event, canvasState)
    })
    window.addEventListener('scroll', (event) => {
        event.preventDefault()

        if (canvasState.canvas === document.activeElement) {
            window.scrollTo(scroll.x, scroll.y)
            return
        }

        scroll.x = window.scrollX
        scroll.y = window.scrollY
    })
}