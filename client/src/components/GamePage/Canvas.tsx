import { useState, useRef, useEffect } from 'react'
import { useSocketStore } from '../../stores/socketStore'
// import { getPixel, setPixel } from '../../helpers/canvasHelpers';

type Position = {
  x: number
  y: number
}

const STARTING_POS = { x: 0, y: 0 }

export const Canvas = ({
  drawingColor,
  lineWidth,
}: {
  drawingColor: string
  lineWidth: number
}) => {
  const socket = useSocketStore((state) => state.socket)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPos, setLastPos] = useState<Position>(STARTING_POS)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const getOffsetX = (e: React.MouseEvent): number => {
      const rect = canvas.getBoundingClientRect()
      return e.clientX - rect.left
    }

    const getOffsetY = (e: React.MouseEvent): number => {
      const rect = canvas.getBoundingClientRect()
      return e.clientY - rect.top
    }

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

      socket?.emit('draw', {
        x: getOffsetX(e),
        y: getOffsetY(e),
        color: drawingColor,
        lineWidth,
      })
    }

    const stopDrawing = () => setIsDrawing(false)

    canvas.addEventListener(
      'mousedown',
      startDrawing as unknown as EventListener
    )
    canvas.addEventListener('mousemove', draw as unknown as EventListener)
    canvas.addEventListener('mouseup', stopDrawing as unknown as EventListener)
    canvas.addEventListener('mouseout', stopDrawing as unknown as EventListener)

    socket?.on('draw', (data) => {
      const { x, y } = data
      context.lineWidth = data.lineWidth
      context.lineCap = 'round'
      context.strokeStyle = data.color

      context.lineTo(x, y)
      context.stroke()
      context.beginPath()
      context.moveTo(x, y)
    })

    return () => {
      canvas.removeEventListener(
        'mousedown',
        startDrawing as unknown as EventListener
      )
      canvas.removeEventListener('mousemove', draw as unknown as EventListener)
      canvas.removeEventListener(
        'mouseup',
        stopDrawing as unknown as EventListener
      )
      canvas.removeEventListener(
        'mouseout',
        stopDrawing as unknown as EventListener
      )
      socket?.off('draw')
    }
  }, [isDrawing, lastPos, drawingColor, lineWidth, socket])

  return (
    <div className="canvas-container">
      <canvas id="room-canvas" ref={canvasRef} height={600} width={600} />
    </div>
  )
}
