import React, { useEffect } from 'react'

import { getScenes } from '../scenes/getScene'

import Canvas from '../components/Canvas'
import Keyboard from '../components/KeyBoard'

import './global.scss'

export default function Home() {
  useEffect(() => {
    getScenes([
      'RingBufferGeometry',
      'WireframeGeometry',
      'CylinderBufferGeometry',
    ])
    .then(scenes => scenes.forEach(scene => scene())) 
  }, [])
  return (
    <div>
      <Canvas/>
      <Keyboard/>
      <audio controls={true} id='audio' src='../audio/Only You.mp3'/>
    </div>
  )
}
