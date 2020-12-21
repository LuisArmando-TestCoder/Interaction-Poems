import { CanvasState } from '../../state/canvases'

export default function setCameraAutoFocus(canvasState: CanvasState) {
    canvasState.canvas.addEventListener('mouseout', () => {
        canvasState.canvas.blur()
    })
    canvasState.canvas.addEventListener('mouseenter', () => {
        canvasState.canvas.focus()
    })
}