import React, { useEffect } from 'react'
import { getScenes } from '../scenes/getScene'
import Canvas from '../components/Canvas'
import './global.css'

export default function Home() {
  useEffect(() => {
    getScenes(['RingBufferGeometry', 'WireframeGeometry'])
    .then(scenes => scenes.forEach(scene => scene())) 
  }, [])
  return (
    <div>
      <audio controls={true} id='audio' src='../audio/Only You.mp3'></audio>
      <Canvas/>
    </div>
  )
}
