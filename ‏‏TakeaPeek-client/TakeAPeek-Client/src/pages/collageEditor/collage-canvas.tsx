"use client"

import type React from "react"

import { forwardRef, useRef, useState, useEffect } from "react"
import { Box, IconButton, Slider, TextField, Typography, Menu, MenuItem, Tooltip } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import RotateRightIcon from "@mui/icons-material/RotateRight"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import ZoomInIcon from "@mui/icons-material/ZoomIn"
import ZoomOutIcon from "@mui/icons-material/ZoomOut"
import FlipIcon from "@mui/icons-material/Flip"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill"
import OpacityIcon from "@mui/icons-material/Opacity"
import { CollageImage, CollageText } from "../../types/types"

interface CollageCanvasProps {
  images: CollageImage[]
  texts: CollageText[]
  backgroundColor: string
  width: number
  height: number
  selectedImageId: string | null
  selectedTextId: string | null
  onImageSelect: (id: string) => void
  onTextSelect: (id: string) => void
  onImageUpdate: (image: CollageImage) => void
  onTextUpdate: (text: CollageText) => void
  onImageRemove: (id: string) => void
  onTextRemove: (id: string) => void
  onTextAdd: (text: CollageText) => void
  filter: string
}

interface ResizingState {
  id: string
  direction: string
  type: "image" | "text"
}

interface ResizeStartState {
  x: number
  y: number
  width: number
  height: number
}

export const CollageCanvas = forwardRef<HTMLDivElement, CollageCanvasProps>(
  (
    {
      images,
      texts,
      backgroundColor,
      width,
      height,
      selectedImageId,
      selectedTextId,
      onImageSelect,
      onTextSelect,
      onImageUpdate,
      onTextUpdate,
      onImageRemove,
      onTextRemove,
      onTextAdd,
      filter,
    },
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const [draggingId, setDraggingId] = useState<string | null>(null)
    const [draggingType, setDraggingType] = useState<"image" | "text" | null>(null)
    const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const [resizing, setResizing] = useState<ResizingState | null>(null)
    const [resizeStart, setResizeStart] = useState<ResizeStartState>({ x: 0, y: 0, width: 0, height: 0 })
    const [editingTextId, setEditingTextId] = useState<string | null>(null)
    const [textMenuAnchor, setTextMenuAnchor] = useState<null | HTMLElement>(null)
    const [colorMenuAnchor, setColorMenuAnchor] = useState<null | HTMLElement>(null)
    const canvasRef = useRef<HTMLDivElement>(null)

    const textColors = [
      "#ffffff",
      "#000000",
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4caf50",
      "#8bc34a",
      "#cddc39",
      "#ffeb3b",
      "#ffc107",
      "#ff9800",
      "#ff5722",
    ]

    const fontFamilies = [
      "Arial",
      "Helvetica",
      "Times New Roman",
      "Courier New",
      "Georgia",
      "Trebuchet MS",
      "Impact",
      "Comic Sans MS",
    ]

    // Handle keyboard events for selected image or text
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (selectedImageId) {
          const selectedImage = images.find((img) => img.id === selectedImageId)
          if (!selectedImage) return

          const step = e.shiftKey ? 10 : 1
          const updatedImage = { ...selectedImage }

          switch (e.key) {
            case "ArrowLeft":
              updatedImage.x -= step
              break
            case "ArrowRight":
              updatedImage.x += step
              break
            case "ArrowUp":
              updatedImage.y -= step
              break
            case "ArrowDown":
              updatedImage.y += step
              break
            case "r":
              updatedImage.rotation = (updatedImage.rotation + 90) % 360
              break
            case "f":
              updatedImage.flipped = !updatedImage.flipped
              break
            case "Delete":
            case "Backspace":
              onImageRemove(selectedImageId)
              return
            default:
              return
          }

          e.preventDefault()
          onImageUpdate(updatedImage)
        } else if (selectedTextId) {
          const selectedText = texts.find((txt) => txt.id === selectedTextId)
          if (!selectedText) return

          const step = e.shiftKey ? 10 : 1
          const updatedText = { ...selectedText }

          switch (e.key) {
            case "ArrowLeft":
              updatedText.x -= step
              break
            case "ArrowRight":
              updatedText.x += step
              break
            case "ArrowUp":
              updatedText.y -= step
              break
            case "ArrowDown":
              updatedText.y += step
              break
            case "Delete":
            case "Backspace":
              if (!editingTextId) {
                onTextRemove(selectedTextId)
                return
              }
              break
            default:
              return
          }

          e.preventDefault()
          onTextUpdate(updatedText)
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [
      selectedImageId,
      selectedTextId,
      images,
      texts,
      onImageUpdate,
      onImageRemove,
      onTextUpdate,
      onTextRemove,
      editingTextId,
    ])

    const handleMouseDown = (e: React.MouseEvent, id: string, type: "image" | "text") => {
      e.stopPropagation()

      if (type === "image") {
        const image = images.find((img) => img.id === id)
        if (!image) return
        onImageSelect(id)
        onTextSelect("")
      } else {
        const text = texts.find((txt) => txt.id === id)
        if (!text) return
        onTextSelect(id)
        onImageSelect("")
      }

      // Start dragging
      setDraggingId(id)
      setDraggingType(type)

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const handleMouseMove = (e: React.MouseEvent) => {
      if (draggingId && draggingType) {
        e.preventDefault()

        const canvasRect = canvasRef.current?.getBoundingClientRect()
        if (!canvasRect) return

        const newX = e.clientX - canvasRect.left - dragOffset.x
        const newY = e.clientY - canvasRect.top - dragOffset.y

        if (draggingType === "image") {
          const image = images.find((img) => img.id === draggingId)
          if (!image) return

          onImageUpdate({
            ...image,
            x: newX,
            y: newY,
          })
        } else {
          const text = texts.find((txt) => txt.id === draggingId)
          if (!text) return

          onTextUpdate({
            ...text,
            x: newX,
            y: newY,
          })
        }
      } else if (resizing) {
        e.preventDefault()

        const canvasRect = canvasRef.current?.getBoundingClientRect()
        if (!canvasRect) return

        const deltaX = e.clientX - canvasRect.left - resizeStart.x
        const deltaY = e.clientY - canvasRect.top - resizeStart.y

        let newWidth = resizeStart.width
        let newHeight = resizeStart.height
        let newX = 0
        let newY = 0

        if (resizing.type === "image") {
          const image = images.find((img) => img.id === resizing.id)
          if (!image) return
          newX = image.x
          newY = image.y

          // Handle different resize directions
          switch (resizing.direction) {
            case "e":
              newWidth = resizeStart.width + deltaX
              break
            case "w":
              newWidth = resizeStart.width - deltaX
              newX = resizeStart.x + deltaX
              break
            case "s":
              newHeight = resizeStart.height + deltaY
              break
            case "n":
              newHeight = resizeStart.height - deltaY
              newY = resizeStart.y + deltaY
              break
            case "se":
              newWidth = resizeStart.width + deltaX
              newHeight = resizeStart.height + deltaY
              break
            case "sw":
              newWidth = resizeStart.width - deltaX
              newHeight = resizeStart.height + deltaY
              newX = resizeStart.x + deltaX
              break
            case "ne":
              newWidth = resizeStart.width + deltaX
              newHeight = resizeStart.height - deltaY
              newY = resizeStart.y + deltaY
              break
            case "nw":
              newWidth = resizeStart.width - deltaX
              newHeight = resizeStart.height - deltaY
              newX = resizeStart.x + deltaX
              newY = resizeStart.y + deltaY
              break
          }

          // Ensure minimum size
          newWidth = Math.max(50, newWidth)
          newHeight = Math.max(50, newHeight)

          onImageUpdate({
            ...image,
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight,
          })
        } else {
          const text = texts.find((txt) => txt.id === resizing.id)
          if (!text) return
          newX = text.x
          newY = text.y

          // Handle different resize directions for text
          switch (resizing.direction) {
            case "e":
              newWidth = resizeStart.width + deltaX
              break
            case "w":
              newWidth = resizeStart.width - deltaX
              newX = resizeStart.x + deltaX
              break
            case "s":
              newHeight = resizeStart.height + deltaY
              break
            case "n":
              newHeight = resizeStart.height - deltaY
              newY = resizeStart.y + deltaY
              break
            case "se":
              newWidth = resizeStart.width + deltaX
              newHeight = resizeStart.height + deltaY
              break
            case "sw":
              newWidth = resizeStart.width - deltaX
              newHeight = resizeStart.height + deltaY
              newX = resizeStart.x + deltaX
              break
            case "ne":
              newWidth = resizeStart.width + deltaX
              newHeight = resizeStart.height - deltaY
              newY = resizeStart.y + deltaY
              break
            case "nw":
              newWidth = resizeStart.width - deltaX
              newHeight = resizeStart.height - deltaY
              newX = resizeStart.x + deltaX
              newY = resizeStart.y + deltaY
              break
          }

          // Ensure minimum size
          newWidth = Math.max(50, newWidth)
          newHeight = Math.max(30, newHeight)

          onTextUpdate({
            ...text,
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight,
          })
        }
      }
    }

    const handleMouseUp = () => {
      setDraggingId(null)
      setDraggingType(null)
      setResizing(null)
    }

    const startResize = (e: React.MouseEvent, id: string, direction: string, type: "image" | "text") => {
      e.stopPropagation()

      if (type === "image") {
        const image = images.find((img) => img.id === id)
        if (!image) return
        onImageSelect(id)
        onTextSelect("")

        setResizing({ id, direction, type })

        const canvasRect = canvasRef.current?.getBoundingClientRect()
        if (!canvasRect) return

        setResizeStart({
          x: e.clientX - canvasRect.left,
          y: e.clientY - canvasRect.top,
          width: image.width,
          height: image.height,
        })
      } else {
        const text = texts.find((txt) => txt.id === id)
        if (!text) return
        onTextSelect(id)
        onImageSelect("")

        setResizing({ id, direction, type })

        const canvasRect = canvasRef.current?.getBoundingClientRect()
        if (!canvasRect) return

        setResizeStart({
          x: e.clientX - canvasRect.left,
          y: e.clientY - canvasRect.top,
          width: text.width,
          height: text.height,
        })
      }
    }

    const handleCanvasClick = () => {
      onImageSelect("")
      onTextSelect("")
      setEditingTextId(null)
    }

    const handleRotate = (id: string, clockwise: boolean) => {
      const image = images.find((img) => img.id === id)
      if (!image) return

      onImageUpdate({
        ...image,
        rotation: (image.rotation + (clockwise ? 90 : -90)) % 360,
      })
    }

    const handleFlip = (id: string) => {
      const image = images.find((img) => img.id === id)
      if (!image) return

      onImageUpdate({
        ...image,
        flipped: !image.flipped,
      })
    }

    const handleResize = (id: string, scale: number) => {
      const image = images.find((img) => img.id === id)
      if (!image) return

      onImageUpdate({
        ...image,
        width: image.width * scale,
        height: image.height * scale,
      })
    }

    const handleTextEdit = (id: string) => {
      setEditingTextId(id)
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!editingTextId) return

      const text = texts.find((txt) => txt.id === editingTextId)
      if (!text) return

      onTextUpdate({
        ...text,
        content: e.target.value,
      })
    }

    const handleTextBlur = () => {
      setEditingTextId(null)
    }

    const handleTextMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setTextMenuAnchor(event.currentTarget)
    }

    const handleTextMenuClose = () => {
      setTextMenuAnchor(null)
    }

    const handleColorMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setColorMenuAnchor(event.currentTarget)
    }

    const handleColorMenuClose = () => {
      setColorMenuAnchor(null)
    }

    const handleFontChange = (fontFamily: string) => {
      if (!selectedTextId) return

      const text = texts.find((txt) => txt.id === selectedTextId)
      if (!text) return

      onTextUpdate({
        ...text,
        fontFamily,
      })
      handleTextMenuClose()
    }

    const handleColorChange = (color: string) => {
      if (!selectedTextId) return

      const text = texts.find((txt) => txt.id === selectedTextId)
      if (!text) return

      onTextUpdate({
        ...text,
        color,
      })
      handleColorMenuClose()
    }

    const handleTextOpacityChange = (event: Event, newValue: number | number[]) => {
      if (!selectedTextId) return

      const text = texts.find((txt) => txt.id === selectedTextId)
      if (!text) return

      onTextUpdate({
        ...text,
        opacity: (newValue as number) / 100,
      })
    }

    const getFilterStyle = () => {
      switch (filter) {
        case "grayscale":
          return { filter: "grayscale(1)" }
        case "sepia":
          return { filter: "sepia(0.7)" }
        case "vintage":
          return { filter: "sepia(0.3) contrast(1.1) brightness(0.9)" }
        case "warm":
          return { filter: "saturate(1.3) contrast(1.1) brightness(1.1)" }
        case "cool":
          return { filter: "saturate(0.8) hue-rotate(30deg)" }
        case "dramatic":
          return { filter: "contrast(1.4) brightness(0.9)" }
        default:
          return {}
      }
    }

    return (
      <Box
        ref={(node: HTMLDivElement | null) => {
          // Assign the ref to both the forwarded ref and the local ref
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          canvasRef.current = node
        }}
        sx={{
          position: "relative",
          overflow: "hidden",
          border: "1px solid",
          borderColor: "grey.300",
          borderRadius: 1,
          boxShadow: 3,
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor,
          cursor: draggingId || resizing ? "grabbing" : "default",
          top: 70,
          ...getFilterStyle(),
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
      >
        {/* Images */}
        {images.map((image) => {
          const isSelected = image.id === selectedImageId

          return (
            <Box
              key={image.id}
              sx={{
                position: "absolute",
                left: `${image.x}px`,
                top: `${image.y}px`,
                width: `${image.width}px`,
                height: `${image.height}px`,
                transform: `rotate(${image.rotation}deg) scaleX(${image.flipped ? -1 : 1})`,
                cursor: draggingId === image.id ? "grabbing" : "grab",
                border: isSelected ? "2px solid #1976d2" : "none",
                zIndex: isSelected ? 10 : 1,
                opacity: image.opacity || 1,
                transition: "box-shadow 0.2s ease",
                boxShadow: isSelected
                  ? "0 0 10px rgba(25, 118, 210, 0.5)"
                  : image.shadow
                    ? "0 4px 8px rgba(0,0,0,0.3)"
                    : "none",
              }}
            >
              <img
                src={image.url || "/placeholder.svg"}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: image.borderRadius || 0,
                }}
                onMouseDown={(e) => handleMouseDown(e, image.id, "image")}
                draggable={false}
              />

              {isSelected && (
                <>
                  {/* Resize handles */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 12,
                      height: 12,
                      bgcolor: "white",
                      border: "1px solid #1976d2",
                      cursor: "nw-resize",
                    }}
                    onMouseDown={(e) => startResize(e, image.id, "nw", "image")}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: 12,
                      height: 12,
                      bgcolor: "white",
                      border: "1px solid #1976d2",
                      cursor: "ne-resize",
                    }}
                    onMouseDown={(e) => startResize(e, image.id, "ne", "image")}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: 12,
                      height: 12,
                      bgcolor: "white",
                      border: "1px solid #1976d2",
                      cursor: "sw-resize",
                    }}
                    onMouseDown={(e) => startResize(e, image.id, "sw", "image")}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 12,
                      height: 12,
                      bgcolor: "white",
                      border: "1px solid #1976d2",
                      cursor: "se-resize",
                    }}
                    onMouseDown={(e) => startResize(e, image.id, "se", "image")}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 12,
                      height: 12,
                      bgcolor: "white",
                      border: "1px solid #1976d2",
                      cursor: "n-resize",
                    }}
                    onMouseDown={(e) => startResize(e, image.id, "n", "image")}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 12,
                      height: 12,
                      bgcolor: "white",
                      border: "1px solid #1976d2",
                      cursor: "s-resize",
                    }}
                    onMouseDown={(e) => startResize(e, image.id, "s", "image")}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 12,
                      height: 12,
                      bgcolor: "white",
                      border: "1px solid #1976d2",
                      cursor: "w-resize",
                    }}
                    onMouseDown={(e) => startResize(e, image.id, "w", "image")}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 12,
                      height: 12,
                      bgcolor: "white",
                      border: "1px solid #1976d2",
                      cursor: "e-resize",
                    }}
                    onMouseDown={(e) => startResize(e, image.id, "e", "image")}
                  />

                  {/* Image controls */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -48,
                      left: "50%",
                      transform: "translateX(-50%)",
                      bgcolor: "white",
                      borderRadius: 1,
                      boxShadow: 2,
                      p: 0.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      zIndex: 20,
                    }}
                  >
                    <Tooltip title="Rotate left">
                      <IconButton size="small" onClick={() => handleRotate(image.id, false)}>
                        <RotateLeftIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Rotate right">
                      <IconButton size="small" onClick={() => handleRotate(image.id, true)}>
                        <RotateRightIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Flip">
                      <IconButton size="small" onClick={() => handleFlip(image.id)}>
                        <FlipIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Zoom in">
                      <IconButton size="small" onClick={() => handleResize(image.id, 1.1)}>
                        <ZoomInIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Zoom out">
                      <IconButton size="small" onClick={() => handleResize(image.id, 0.9)}>
                        <ZoomOutIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" sx={{ color: "error.main" }} onClick={() => onImageRemove(image.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              )}
            </Box>
          )
        })}

        {/* Text Elements */}
        {texts.map((text) => {
          const isSelected = text.id === selectedTextId

          return (
            <Box
              key={text.id}
              sx={{
                position: "absolute",
                left: `${text.x}px`,
                top: `${text.y}px`,
                width: `${text.width}px`,
                minHeight: `${text.height}px`,
                cursor: draggingId === text.id ? "grabbing" : "move",
                border: isSelected ? "2px dashed #1976d2" : "none",
                zIndex: isSelected ? 20 : 5,
                display: "flex",
                alignItems: "center",
                justifyContent: text.align || "center",
                padding: 1,
                boxSizing: "border-box",
                backgroundColor: text.backgroundColor || "transparent",
                borderRadius: text.borderRadius || 0,
                opacity: text.opacity || 1,
                overflow: "hidden",
              }}
              onMouseDown={(e) => handleMouseDown(e, text.id, "text")}
            >
              {editingTextId === text.id ? (
                <TextField
                  fullWidth
                  multiline
                  variant="standard"
                  value={text.content}
                  onChange={handleTextChange}
                  onBlur={handleTextBlur}
                  autoFocus
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      fontFamily: text.fontFamily || "Arial",
                      fontSize: text.fontSize || 16,
                      fontWeight: text.bold ? "bold" : "normal",
                      fontStyle: text.italic ? "italic" : "normal",
                      textDecoration: text.underline ? "underline" : "none",
                      color: text.color || "#000000",
                      textAlign: (text.align as any) || "center",
                      width: "100%",
                      padding: 0,
                    },
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <Typography
                  sx={{
                    fontFamily: text.fontFamily || "Arial",
                    fontSize: text.fontSize || 16,
                    fontWeight: text.bold ? "bold" : "normal",
                    fontStyle: text.italic ? "italic" : "normal",
                    textDecoration: text.underline ? "underline" : "none",
                    color: text.color || "#000000",
                    textAlign: (text.align as any) || "center",
                    width: "100%",
                    wordBreak: "break-word",
                    textShadow: text.shadow ? "1px 1px 3px rgba(0,0,0,0.3)" : "none",
                  }}
                  onDoubleClick={() => handleTextEdit(text.id)}
                >
                  {text.content}
                </Typography>
              )}

              {isSelected && (
                <>
                  {/* Resize handles for text */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 10,
                      height: 10,
                      bgcolor: "white",
                      border: "1px solid #1976d2",
                      cursor: "nw-resize",
                    }}
                    onMouseDown={(e) => startResize(e, text.id, "nw", "text")}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: 10,
                      height: 10,
                      bgcolor: "white",
                      border: "1px solid #1976d2",
                      cursor: "ne-resize",
                    }}
                    onMouseDown={(e) => startResize(e, text.id, "ne", "text")}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: 10,
                      height: 10,
                      bgcolor: "white",
                      border: "1px solid #1976d2",
                      cursor: "sw-resize",
                    }}
                    onMouseDown={(e) => startResize(e, text.id, "sw", "text")}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 10,
                      height: 10,
                      bgcolor: "white",
                      border: "1px solid #1976d2",
                      cursor: "se-resize",
                    }}
                    onMouseDown={(e) => startResize(e, text.id, "se", "text")}
                  />

                  {/* Text controls */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -48,
                      left: "50%",
                      transform: "translateX(-50%)",
                      bgcolor: "white",
                      borderRadius: 1,
                      boxShadow: 2,
                      p: 0.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      zIndex: 20,
                    }}
                  >
                    <Tooltip title="Edit text">
                      <IconButton size="small" onClick={() => handleTextEdit(text.id)}>
                        <TextFieldsIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Font family">
                      <IconButton size="small" onClick={handleTextMenuOpen}>
                        <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                          A
                        </Typography>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Text color">
                      <IconButton
                        size="small"
                        onClick={handleColorMenuOpen}
                        sx={{
                          color: text.color || "#000000",
                          bgcolor: "transparent",
                        }}
                      >
                        <FormatColorFillIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Opacity">
                      <IconButton size="small">
                        <OpacityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" sx={{ color: "error.main" }} onClick={() => onTextRemove(text.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {/* Opacity slider - appears when opacity icon is clicked */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: -120,
                      bgcolor: "white",
                      borderRadius: 1,
                      boxShadow: 2,
                      p: 1,
                      width: 100,
                      zIndex: 20,
                    }}
                  >
                    <Slider
                      size="small"
                      value={text.opacity ? text.opacity * 100 : 100}
                      onChange={handleTextOpacityChange}
                      aria-label="Opacity"
                      min={10}
                      max={100}
                    />
                  </Box>
                </>
              )}
            </Box>
          )
        })}

        {/* Font Family Menu */}
        <Menu anchorEl={textMenuAnchor} open={Boolean(textMenuAnchor)} onClose={handleTextMenuClose}>
          {fontFamilies.map((font) => (
            <MenuItem key={font} onClick={() => handleFontChange(font)} sx={{ fontFamily: font }}>
              {font}
            </MenuItem>
          ))}
        </Menu>

        {/* Color Menu */}
        <Menu
          anchorEl={colorMenuAnchor}
          open={Boolean(colorMenuAnchor)}
          onClose={handleColorMenuClose}
          sx={{ maxWidth: 220 }}
        >
          <Box sx={{ p: 1, display: "flex", flexWrap: "wrap", gap: 0.5, maxWidth: 200 }}>
            {textColors.map((color) => (
              <Box
                key={color}
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: color,
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor: "grey.300",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </Box>
        </Menu>
      </Box>
    )
  },
)

CollageCanvas.displayName = "CollageCanvas"
