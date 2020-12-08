import React from 'react'
import './style.css'

export default function Home() {
  return <canvas
            className="scene"
            contentEditable="true"
            onContextMenu={e => e.preventDefault()}
         />
}