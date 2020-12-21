import {
    CanvasState,
} from '../state/canvases'

import Triggerer from './Triggerer'

export default class KeyHandler {
    canvasState: CanvasState
    triggerer: Triggerer
    keyEventNames = ['keydown', 'keyup'] as const

    constructor(canvasState: CanvasState, triggerer: Triggerer) {
        this.canvasState = canvasState
        this.triggerer = triggerer
    }

    keydown(key: string) {
        const { keysQueue: queue } = this.canvasState

        // adding key to queue
        if (!queue.includes(key)) {
            queue.push(key)

            // executes start just once
            this.triggerer.triggerQueue('start')
        }
    }

    keyup(key: string) {
        const { keysQueue: queue } = this.canvasState

        this.triggerer.triggerQueue('end')

        // deleting key from queue
        queue.splice(queue.indexOf(key), 1)
    }

    listenActions() {
        this.keyEventNames.forEach(keyEventName => {
            this.canvasState.canvas.addEventListener(
                keyEventName,
                (event: KeyboardEvent) => {
                    this[keyEventName](event.key.toLowerCase())
                }
            ) 
        })
    }
}
