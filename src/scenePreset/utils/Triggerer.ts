import keysState, {
    KeyLifeCycleName,
} from '../state/keys'

export default class Triggerer {
    triggerQueue(keyLifeCycleName: KeyLifeCycleName) {
        for (const key of keysState.queue) {
            const lifeCycle = keysState.keys[key]

            if (lifeCycle) {
                const callbacks = lifeCycle[keyLifeCycleName]

                callbacks.forEach((callback: Function) => {
                    callback(keysState.events[key])
                })
            }
        }
    }
    
    triggerPresentCallbacks() {
        this.triggerQueue('present')
    }
}