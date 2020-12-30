import * as THREE from 'three'

import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'

import canvasesState from '../state/canvases'

let VRToggler: HTMLElement

export default function toggleVR(canvasSelector: string) {
    const renderer: THREE.WebGLRenderer = canvasesState[canvasSelector].renderer

    if (!VRToggler) {
        VRToggler = VRButton.createButton(renderer)
    }

    VRToggler.click()
}