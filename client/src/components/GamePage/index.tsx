import { useState } from 'react'
import { Canvas } from './Canvas'
import './styles.scss'

export const GamePage = () => {
  const [drawingColor, setDrawingColor] = useState<Colors>(Colors.Black)
  const [lineWidth, setLineWidth] = useState<number>(5)
  const [currentTool, setCurrentTool] = useState<Tools>(Tools.Pencil)

  enum Colors {
    Black = 'black',
    Blue = 'blue',
    Green = 'green',
    Orange = 'orange',
    Pink = 'pink',
    Purple = 'purple',
    Red = 'red',
    White = 'white'
  }
  
  enum Tools {
    Pencil = 'edit',
    Line = 'pen_size_1',
    Bucket = 'colors',
    Eraser = 'ink_eraser'
  }

  const handleColorChange = (e) => {
    setDrawingColor(e.target.classList[1])
  }

  const changeLineWidth = (direction: string) => {
    if (direction === 'increase') return setLineWidth((prev) => prev += 1)
    
    if (lineWidth === 1) return
    return setLineWidth((prev) => prev -= 1)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  const colorBox = (color: Colors, isClickable: boolean=true) => {
    if (!isClickable) return <div className={`color-box ${color}`}></div>
    
    return <div className={`color-box ${color}`} key={color} onClick={(e) => handleColorChange(e)}></div>
  }

  const toolBox = (tool: Tools) => {
    return <span className="material-symbols-outlined tool-box" key={tool}>{tool}</span>
  }

  // pulls colors from enum list and returns a colorbox jsx element for the color selector
  const getColors = () => Object.values(Colors).map((color) => colorBox(color))

  const getTools = () => Object.values(Tools).map((tool) => toolBox(tool))
  return (
    <div className="game-page">
      <div className="flex-container top-row">
        <h1>WeSketch</h1>
        <div className="current-tool-container">
          <div className="flex-container">
            <div>{lineWidth}px</div>
            <span>{colorBox(drawingColor)}</span>
            <span><div className="tool-box"><span className="material-symbols-outlined">{currentTool}</span></div></span>
          </div>
          <div className="flex-container">
            <button className="line-width-button material-symbols-outlined" onClick={() => changeLineWidth('increase')}>add</button>
            <button className="line-width-button" onClick={() => setLineWidth(5)}>Reset</button>
            <button className="line-width-button material-symbols-outlined" onClick={() => changeLineWidth('decrease')}>remove</button>
          </div>
        </div>
        <div className="tools-container">
          <div className="tools">
            {getTools()}
          </div>
          <div className="color-selector">
            {getColors()}
          </div>
          <button className="clear-button" onClick={clearCanvas}>Clear Canvas</button>
        </div>
      </div>
      <div className="flex-container game-area">
        <div className="flex-container chat-container">
          <div className="player-list">Player List</div>
          <div className="game-chat">Game Chat</div>
          <div className="general-chat">General Chat</div>
        </div>
        <Canvas drawingColor={drawingColor} lineWidth={lineWidth}/>
      </div>
    </div>
  )
}
