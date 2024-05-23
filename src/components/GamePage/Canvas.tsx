import { useState, useRef, useEffect } from 'react'

type Position = {
  x: number,
  y: number
}

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

const STARTING_POS = { x: 0, y: 0 }

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPos, setLastPos] = useState<Position>(STARTING_POS)
  const [drawingColor, setDrawingColor] = useState<Colors>(Colors.Black)
  const [lineWidth, setLineWidth] = useState<number>(5)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const getOffsetX = (e: React.MouseEvent): number => {
      const rect = canvas.getBoundingClientRect();
      return e.clientX - rect.left;
    };

    const getOffsetY = (e: React.MouseEvent): number => {
      const rect = canvas.getBoundingClientRect();
      return e.clientY - rect.top;
    };


    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDrawing(true)
      setLastPos({ x: getOffsetX(e), y: getOffsetY(e) })
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return

      context.lineWidth = lineWidth
      context.lineCap = 'round'
      context.strokeStyle = drawingColor

      context.beginPath()
      context.moveTo(lastPos.x, lastPos.y)
      context.lineTo(getOffsetX(e), getOffsetY(e))
      context.stroke()
      setLastPos({ x: getOffsetX(e), y: getOffsetY(e) })
    }

    const stopDrawing = () => setIsDrawing(false)

    canvas.addEventListener('mousedown', startDrawing as unknown as EventListener)
    canvas.addEventListener('mousemove', draw as unknown as EventListener)
    canvas.addEventListener('mouseup', stopDrawing as unknown as EventListener)
    canvas.addEventListener('mouseout', stopDrawing as unknown as EventListener)

    return () => {
      canvas.removeEventListener('mousedown', startDrawing as unknown as EventListener)
      canvas.removeEventListener('mousemove', draw as unknown as EventListener)
      canvas.removeEventListener('mouseup', stopDrawing as unknown as EventListener)
      canvas.removeEventListener('mouseout', stopDrawing as unknown as EventListener)
    }
  }, [isDrawing, lastPos, drawingColor, lineWidth])

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  const handleColorChange = (e) => {
    setDrawingColor(e.target.classList[1])
  }

  const colorBox = (color: string) => {
    return <div className={`color-box ${color}`} key={color} onClick={(e) => handleColorChange(e)}></div>
  }

  // pulls colors from enum list and returns a colorbox jsx element for the color selector
  const getColors = () => Object.values(Colors).map((color) => colorBox(color))

  const changeLineWidth = (direction: string) => {
    if (direction === 'increase') return setLineWidth((prev) => prev += 1)
    
    if (lineWidth === 1) return
    return setLineWidth((prev) => prev -= 1)
  }

  return (
    <div className="canvas-container">
      <canvas
        id="room-canvas" 
        ref={canvasRef}
        height={600}
        width={800}
      />
      <div className="flex-container">
        <div className="current-tool-container">
          <div>Line Width</div>
          <div>{lineWidth}px</div>
          <span>{colorBox(drawingColor)}</span>
          <div className="flex-container">
            <button className="line-width-button material-symbols-outlined" onClick={() => changeLineWidth('increase')}>add</button>
            <button className="line-width-button material-symbols-outlined" onClick={() => changeLineWidth('decrease')}>remove</button>
          </div>
        </div>
        <div className="tools-container">
        <div className="tools">
          <div className="tool-box"><span className="material-symbols-outlined">edit</span></div>
          <div className="tool-box"><span className="material-symbols-outlined">pen_size_1</span></div>
        </div>
        <div className="color-selector">
          {getColors()}
        </div>
        <button className="clear-button" onClick={clearCanvas}>Clear Canvas</button>
      </div>
      </div>
    </div>
  )
}
