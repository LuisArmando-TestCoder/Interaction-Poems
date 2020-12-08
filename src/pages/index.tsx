import React, { useEffect } from 'react'
import getScene from '../sceneSetup/getScene'
import Canvas from '../components/Canvas'
import './global.css'

export default function Home() {
  useEffect(() => {
    getScene('RingBufferGeometry')
    .then(scene => scene())
  }, [])
  return <Canvas/>
}
