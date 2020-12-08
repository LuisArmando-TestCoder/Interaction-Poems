import React, { useEffect } from 'react'
import getScene from '../sceneSetup/getScene'
import './global.css'

export default function Home() {
  useEffect(() => {
    getScene('RingBufferGeometry')
    .then(scene => scene())
  }, [])
  return <canvas contentEditable="true" onContextMenu={e => e.preventDefault()}/>
}
