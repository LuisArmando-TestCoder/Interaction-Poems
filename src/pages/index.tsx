import React, { useEffect } from 'react'

import { actions, types } from '../scene-preset'

import { getScenes } from '../scenes/getScene'

import Canvas from '../components/Canvas'
import Keyboard from '../components/KeyBoard'
import Audio from '../components/Audio'

import './global.module.scss'

function setScenes() {
  getScenes([
    'WireframeGeometry',
    'CylinderBufferGeometry',
    'TorusBufferGeometry',
    'SphereBufferGeometry',
    'RingBufferGeometry',
    'BoxBufferGeometry',
  ])
  .then(scenes => {
    scenes.forEach(scene => scene())
  }) 
}

function changeState() {
  actions.addSceneSetupIntrude((canvasState: types.state.CanvasState) => {
    // canvasState.presetConfiguration.ambient.color = 0x101010
  })
}

export default function Home() {
  useEffect(() => {
    changeState()
    setScenes()
  }, [])
  return (
    <div id="mainSceneWrapper">
      <section className="canvas-wrapper" style={{height: window.innerHeight}}>
        <Canvas/>
      </section>
      <Keyboard/>
      <Audio src='../audio/Downloading System.mp3'/>
    </div>
  )
}
