import { useState, useRef, useEffect } from 'react'

type Position = {
  x: number,
  y: number
}

// enum Colors {
//   Black = 'black',
//   Blue = 'blue',
//   Green = 'green',
//   Orange = 'orange',
//   Pink = 'pink',
//   Purple = 'purple',
//   Red = 'red',
//   White = 'white'
// }

// enum Tools {
//   Pencil = 'edit',
//   Line = 'pen_size_1',
//   Bucket = 'colors',
//   Eraser = 'ink_eraser'
// }

const STARTING_POS = { x: 0, y: 0 }

export const Canvas = ({ drawingColor, lineWidth }: { drawingColor: string, lineWidth: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPos, setLastPos] = useState<Position>(STARTING_POS)
  // const [drawingColor, setDrawingColor] = useState<Colors>(Colors.Black)
  // const [lineWidth, setLineWidth] = useState<number>(5)
  // const [currentTool, setCurrentTool] = useState<Tools>(Tools.Pencil)
  
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

  // const clearCanvas = () => {
  //   const canvas = canvasRef.current
  //   if (!canvas) return

  //   const context = canvas.getContext('2d')
  //   if (!context) return

  //   context.clearRect(0, 0, canvas.width, canvas.height)
  // }

  // const handleColorChange = (e) => {
  //   setDrawingColor(e.target.classList[1])
  // }

  // const colorBox = (color: Colors, isClickable: boolean=true) => {
  //   if (!isClickable) return <div className={`color-box ${color}`}></div>
    
  //   return <div className={`color-box ${color}`} key={color} onClick={(e) => handleColorChange(e)}></div>
  // }

  // const toolBox = (tool: Tools) => {
  //   return <span className="material-symbols-outlined tool-box" key={tool}>{tool}</span>
  // }

  // pulls colors from enum list and returns a colorbox jsx element for the color selector
  // const getColors = () => Object.values(Colors).map((color) => colorBox(color))

  // const getTools = () => Object.values(Tools).map((tool) => toolBox(tool))

  // const changeLineWidth = (direction: string) => {
  //   if (direction === 'increase') return setLineWidth((prev) => prev += 1)
    
  //   if (lineWidth === 1) return
  //   return setLineWidth((prev) => prev -= 1)
  // }

  return (
    <div className="canvas-container">
      <canvas
        id="room-canvas" 
        ref={canvasRef}
        height={600}
        width={600}
      />
    </div>
  )
}
