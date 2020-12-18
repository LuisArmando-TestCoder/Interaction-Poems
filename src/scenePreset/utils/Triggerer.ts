import {
    CanvasState,
    KeyCombination,
    KeyLifeCycleObject,
    CanvasStateCallback,
    LifeCycleKey,
} from '../canvasesState'

export default class Triggerer {
    canvasState: CanvasState

    constructor(canvasState: CanvasState) {
        this.canvasState = canvasState
    }

    triggerQueue(queue: string, lifeCycleKey: LifeCycleKey) {
        const { sorted, unsorted } = this.canvasState.keyCombinationOrders

        if (sorted && sorted[queue]) this.triggerSortedQueue(sorted[queue], lifeCycleKey)
        if (unsorted) this.triggerUnsortedQueue(unsorted, queue, lifeCycleKey)
    }
    
    triggerSortedQueue(keyLifeCycleObject: KeyLifeCycleObject, lifeCycleKey: LifeCycleKey) {
        const callbacks = keyLifeCycleObject[lifeCycleKey]

        callbacks.forEach((callback: CanvasStateCallback) => {
            callback(this.canvasState)
        })
    }
    
    triggerUnsortedQueue(keyCombination: KeyCombination, queue: string, lifeCycleKey: LifeCycleKey) {
        for (const key in keyCombination) {
            const sortedQueue = getSortedString(queue)
            const sortedKey = getSortedString(key)

            if (sortedQueue === sortedKey) {
                const keyLifeCycleObject = keyCombination[key]
                const callbacks = keyLifeCycleObject[lifeCycleKey]

                callbacks.forEach((callback: CanvasStateCallback) => {
                    callback(this.canvasState)
                })
            }
        }
    }
    
    triggerPresentCallbacks() {
        const { keyCombinationsQueue: queue } = this.canvasState

        this.triggerQueue(queue.join(''), 'present')
    }
}

function getSortedString(string: string) {
    const array = string.split('')
    const numberMap = array.map(character => character.charCodeAt(0))
    const sortedArray = numberMap.sort((a, b) => b - a)
    const stringMap = sortedArray.map(number => String.fromCharCode(number))
    const stringNumberValue = stringMap.join('')

    return stringNumberValue
}