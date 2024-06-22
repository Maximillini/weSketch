import { useState } from 'react'
import { Canvas } from './Canvas'
import { ChatWrapper } from './ChatWrapper'
import { Colors, Tools } from 'types/canvasTypes'
import './styles.scss'
import { CountdownTimer } from './CountdownTimer'

export const GamePage = () => {
  const [drawingColor, setDrawingColor] = useState<Colors>(Colors.Black)
  const [lineWidth, setLineWidth] = useState<number>(5)
  const [currentTool, setCurrentTool] = useState<Tools>(Tools.Pencil)

  const handleColorChange = (e: React.MouseEvent<HTMLElement>) => {
    setDrawingColor((e.target as HTMLElement).classList[1] as Colors)
  }

  const handleToolChange = (e: React.MouseEvent<HTMLSpanElement>) => {
    setCurrentTool((e.target as HTMLDivElement).classList[1] as Tools)
  }

  const changeLineWidth = (direction: string) => {
    if (direction === 'increase') return setLineWidth((prev) => (prev += 1))

    if (lineWidth === 1) return
    return setLineWidth((prev) => (prev -= 1))
  }

  const colorBox = (color: Colors, isClickable: boolean = true) => {
    if (!isClickable) return <div className={`color-box ${color}`}></div>

    return (
      <div
        className={`color-box ${color}`}
        key={color}
        onClick={(e) => handleColorChange(e)}
      ></div>
    )
  }

  const toolBox = (tool: Tools) => {
    return (
      <span
        className="material-symbols-outlined tool-box"
        key={tool}
        onClick={(e) => handleToolChange(e)}
      >
        {tool}
      </span>
    )
  }

  // pulls colors from enum list and returns a colorbox jsx element for the color selector
  const getColors = () => Object.values(Colors).map((color) => colorBox(color))

  const getTools = () => Object.values(Tools).map((tool) => toolBox(tool))

  return (
    <div className="game-page">
      <CountdownTimer seconds={0} />
      <div className="flex-container top-row">
        <div className="logo">weSketch</div>
        <div className="flex-container row-wrap">
          <div className="current-tool-container">
            <div className="flex-container">
              <div>{lineWidth}px</div>
              <span>{colorBox(drawingColor)}</span>
              <span>
                <div className="tool-box">
                  <span className="material-symbols-outlined">
                    {currentTool}
                  </span>
                </div>
              </span>
            </div>
            <div className="flex-container">
              <button
                className="line-width-button material-symbols-outlined"
                onClick={() => changeLineWidth('increase')}
              >
                add
              </button>
              <button
                className="line-width-button"
                onClick={() => setLineWidth(5)}
              >
                Reset
              </button>
              <button
                className="line-width-button material-symbols-outlined"
                onClick={() => changeLineWidth('decrease')}
              >
                remove
              </button>
            </div>
          </div>
          <div className="tools-container">
            <div className="tools">{getTools()}</div>
            <div className="color-selector">{getColors()}</div>
            <button
              className="clear-button"
              onClick={() => console.log('clear canvas')}
            >
              Clear Canvas
            </button>
          </div>
        </div>
      </div>
      <div className="flex-container game-area">
        <ChatWrapper />
        <Canvas drawingColor={drawingColor} lineWidth={lineWidth} />
      </div>
    </div>
  )
}
