import React, { useEffect } from 'react'

import { actions, types } from '../scenePreset'

import { getScenes } from '../scenes/getScene'

import Canvas from '../components/Canvas'
import Keyboard from '../components/KeyBoard'
import Audio from '../components/Audio'

import './global.scss'

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
      <Canvas/>
      <Keyboard/>
      <Audio src='../audio/samba do moço bonito.mp3'/>
    </div>
  )
}
