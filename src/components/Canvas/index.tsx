import React from 'react'
import './style.module.scss'

export default function Home() {
  return <canvas
            className="scene"
            contentEditable="true"
            onContextMenu={e => e.preventDefault()}
         />
}