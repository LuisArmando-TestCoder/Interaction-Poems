import {
    CanvasState,
} from '../canvasesState'

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
        const { keyCombinationsQueue: queue } = this.canvasState

        // adding key to queue
        if (!queue.includes(key)) {
            queue.push(key)

            // executes start just once
            this.triggerer.triggerQueue(queue.join(''), 'start')
        }
    }

    keyup(key: string) {
        const { keyCombinationsQueue: queue } = this.canvasState

        this.triggerer.triggerQueue(queue.join(''), 'end')
        deleteKeyFromQueue(key, queue)
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

function deleteKeyFromQueue(key: string, queue: string[]) {
    queue.splice(queue.indexOf(key), 1)
}