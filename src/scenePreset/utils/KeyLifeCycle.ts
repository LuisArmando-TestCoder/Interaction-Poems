import keysState, {
    KeyLifeCycleObject,
} from '../state/keys'

export default class KeyLifeCycle {
    keyLifeCycleObject: KeyLifeCycleObject

    constructor(key: string) {
        this.keyLifeCycleObject = keysState.keys[key]
    }

    start(callback: Function) {
        this.keyLifeCycleObject.start.push(callback)

        return this.keyLifeCycleObject.start
    }

    present(callback: Function) {
        this.keyLifeCycleObject.present.push(callback)

        return this.keyLifeCycleObject.present
    }

    end(callback: Function) {
        this.keyLifeCycleObject.end.push(callback)

        return this.keyLifeCycleObject.end
    }
}