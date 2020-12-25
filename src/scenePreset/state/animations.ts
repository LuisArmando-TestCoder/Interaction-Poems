import { CanvasStateCallback } from './canvases'

class AnimationsState {
    initialized = false
}

export const animationsState = new AnimationsState()

const animations: CanvasStateCallback[] = []

export default animations