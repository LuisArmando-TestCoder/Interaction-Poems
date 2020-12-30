import React, { useEffect } from 'react'

import { getScenes } from '../scenes/getScene'

import Canvas from '../components/Canvas'
import Keyboard from '../components/KeyBoard'
import Audio from '../components/Audio'

import './global.scss'

export default function Home() {
  useEffect(() => {
    getScenes([
      'WireframeGeometry',
      'CylinderBufferGeometry',
      'TorusBufferGeometry',
      'SphereBufferGeometry',
      'RingBufferGeometry',
      'BoxBufferGeometry',
    ])
    .then(scenes => scenes.forEach(scene => scene())) 
  }, [])
  return (
    <div id="mainSceneWrapper">
      <Canvas/>
      <Keyboard/>
      <Audio src='../audio/Palace - Heaven Up There.mp3'/>
    </div>
  )
}
