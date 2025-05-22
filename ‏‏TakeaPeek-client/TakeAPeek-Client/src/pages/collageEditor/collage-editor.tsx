// "use client"

// import type React from "react"

// import { useState, useRef, useEffect } from "react"
// import { toPng } from "html-to-image"
// import { ImageUploader } from "./image-uploader"
// import { TemplateSelector } from "./template-selector"
// import { AspectRatioSelector } from "./aspect-ratio-selector"
// import { BackgroundColorPicker } from "./background-color-picker"
// import { CollageCanvas } from "./collage-canvas"
// import {
//   Divider,
//   Button,
//   Box,
//   Typography,
//   Paper,
//   IconButton,
//   Tooltip,
//   Tabs,
//   Tab,
//   Menu,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   type SelectChangeEvent,
// } from "@mui/material"
// import DownloadIcon from "@mui/icons-material/Download"
// import TextFieldsIcon from "@mui/icons-material/TextFields"
// import FilterIcon from "@mui/icons-material/Filter"
// import UndoIcon from "@mui/icons-material/Undo"
// import RedoIcon from "@mui/icons-material/Redo"
// import { useTheme } from "@mui/material/styles"
// import { AspectRatio, CollageImage, CollageText, Template } from "../../types/types"

// // Define filters
// const filters = [
//   { id: "none", name: "None" },
//   { id: "grayscale", name: "Grayscale" },
//   { id: "sepia", name: "Sepia" },
//   { id: "vintage", name: "Vintage" },
//   { id: "warm", name: "Warm" },
//   { id: "cool", name: "Cool" },
//   { id: "dramatic", name: "Dramatic" },
// ]

// const CollageEditor = () => {
//   const theme = useTheme()
//   const [images, setImages] = useState<CollageImage[]>([])
//   const [texts, setTexts] = useState<CollageText[]>([])
//   const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
//   const [aspectRatio, setAspectRatio] = useState<AspectRatio>({ id: "1:1", name: "Square (1:1)", value: 1 })
//   const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff")
//   const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
//   const [selectedTextId, setSelectedTextId] = useState<string | null>(null)
//   const [activeTab, setActiveTab] = useState<number>(0)
//   const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null)
//   const [selectedFilter, setSelectedFilter] = useState<string>("none")
//   const [addTextDialogOpen, setAddTextDialogOpen] = useState<boolean>(false)
//   const [newTextContent, setNewTextContent] = useState<string>("")
//   const [newTextColor, setNewTextColor] = useState<string>("#000000")
//   const [newTextSize, setNewTextSize] = useState<number>(24)
//   const [history, setHistory] = useState<Array<{ images: CollageImage[]; texts: CollageText[] }>>([])
//   const [historyIndex, setHistoryIndex] = useState<number>(-1)
//   const collageRef = useRef<HTMLDivElement>(null)
//   const [canvasWidth, setCanvasWidth] = useState<number>(600)
//   const [canvasHeight, setCanvasHeight] = useState<number>(600)

//   // Initialize history with empty state
//   useEffect(() => {
//     setHistory([{ images: [], texts: [] }])
//     setHistoryIndex(0)
//   }, [])

//   // Add to history when images or texts change
//   useEffect(() => {
//     if (images.length > 0 || texts.length > 0) {
//       // Only add to history if it's a user action, not an undo/redo
//       if (historyIndex === history.length - 1) {
//         setHistory((prev) => [...prev.slice(0, historyIndex + 1), { images, texts }])
//         setHistoryIndex((prev) => prev + 1)
//       }
//     }
//   }, [images, texts])

//   useEffect(() => {
//     const updateCanvasSize = () => {
//       const maxWidth = window.innerWidth * 0.8 // Limit canvas width to 80% of the viewport
//       const maxHeight = window.innerHeight * 0.5 // Limit canvas height to 50% of the viewport
//       const calculatedWidth = Math.min(maxWidth, 600) // Ensure it doesn't exceed 600px
//       const calculatedHeight = calculatedWidth / aspectRatio.value
//       setCanvasWidth(calculatedWidth)
//       setCanvasHeight(Math.min(calculatedHeight, maxHeight)) // Ensure height fits within the viewport
//     }

//     updateCanvasSize()
//     window.addEventListener("resize", updateCanvasSize)
//     return () => window.removeEventListener("resize", updateCanvasSize)
//   }, [aspectRatio])

//   const handleImageUpload = (files: File[]) => {
//     const newImages = files.map((file) => {
//       const id = `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
//       return {
//         id,
//         file,
//         url: URL.createObjectURL(file),
//         width: 200,
//         height: 200,
//         x: Math.random() * (canvasWidth - 200),
//         y: Math.random() * (canvasHeight - 200),
//         rotation: 0,
//         flipped: false,
//         scale: 1,
//         opacity: 1,
//         borderRadius: 0,
//         shadow: false,
//       }
//     })

//     setImages((prevImages) => [...prevImages, ...newImages])

//     // Apply template if selected
//     if (selectedTemplate && newImages.length > 0) {
//       applyTemplate([...images, ...newImages])
//     }
//   }

//   const applyTemplate = (imagesToArrange: CollageImage[] = images) => {
//     if (!selectedTemplate || imagesToArrange.length === 0) return

//     const arrangedImages = [...imagesToArrange]
//     const templatePositions = selectedTemplate.layout

//     // Apply template positions to images
//     for (let i = 0; i < Math.min(arrangedImages.length, templatePositions.length); i++) {
//       const position = templatePositions[i]
//       arrangedImages[i] = {
//         ...arrangedImages[i],
//         x: position.x * canvasWidth,
//         y: position.y * canvasHeight,
//         width: position.width * canvasWidth,
//         height: position.height * canvasHeight,
//         scale: 1,
//         rotation: 0,
//         flipped: false,
//       }
//     }

//     setImages(arrangedImages)
//   }

//   const handleTemplateSelect = (template: Template) => {
//     setSelectedTemplate(template)
//     applyTemplate()
//   }

//   const handleAspectRatioChange = (ratio: AspectRatio) => {
//     setAspectRatio(ratio)
//   }

//   const handleBackgroundColorChange = (color: string) => {
//     setBackgroundColor(color) // Update background color immediately
//   }

//   const handleImageSelect = (id: string) => {
//     setSelectedImageId(id)
//   }

//   const handleTextSelect = (id: string) => {
//     setSelectedTextId(id)
//   }

//   const handleImageUpdate = (updatedImage: CollageImage) => {
//     setImages(images.map((img) => (img.id === updatedImage.id ? updatedImage : img)))
//   }

//   const handleTextUpdate = (updatedText: CollageText) => {
//     setTexts(texts.map((txt) => (txt.id === updatedText.id ? updatedText : txt)))
//   }

//   const handleImageRemove = (id: string) => {
//     setImages(images.filter((img) => img.id !== id))
//     if (selectedImageId === id) {
//       setSelectedImageId(null)
//     }
//   }

//   const handleTextRemove = (id: string) => {
//     setTexts(texts.filter((txt) => txt.id !== id))
//     if (selectedTextId === id) {
//       setSelectedTextId(null)
//     }
//   }

//   const handleAddText = () => {
//     setAddTextDialogOpen(true)
//   }

//   const handleAddTextConfirm = () => {
//     if (newTextContent.trim()) {
//       const id = `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
//       const newText: CollageText = {
//         id,
//         content: newTextContent,
//         x: canvasWidth / 2 - 100,
//         y: canvasHeight / 2 - 25,
//         width: 200,
//         height: 50,
//         fontFamily: "Arial",
//         fontSize: newTextSize,
//         color: newTextColor,
//         bold: false,
//         italic: false,
//         underline: false,
//         align: "center",
//         opacity: 1,
//         backgroundColor: "transparent",
//         borderRadius: 0,
//         shadow: false,
//       }
//       setTexts([...texts, newText])
//       setNewTextContent("")
//       setNewTextColor("#000000")
//       setNewTextSize(24)
//     }
//     setAddTextDialogOpen(false)
//   }

//   const handleAddTextCancel = () => {
//     setAddTextDialogOpen(false)
//     setNewTextContent("")
//     setNewTextColor("#000000")
//     setNewTextSize(24)
//   }

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setActiveTab(newValue)
//   }

//   const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setFilterMenuAnchor(event.currentTarget)
//   }

//   const handleFilterMenuClose = () => {
//     setFilterMenuAnchor(null)
//   }

//   const handleFilterSelect = (filterId: string) => {
//     setSelectedFilter(filterId)
//     handleFilterMenuClose()
//   }

//   const handleUndo = () => {
//     if (historyIndex > 0) {
//       const newIndex = historyIndex - 1
//       setHistoryIndex(newIndex)
//       const { images: prevImages, texts: prevTexts } = history[newIndex]
//       setImages(prevImages)
//       setTexts(prevTexts)
//     }
//   }

//   const handleRedo = () => {
//     if (historyIndex < history.length - 1) {
//       const newIndex = historyIndex + 1
//       setHistoryIndex(newIndex)
//       const { images: nextImages, texts: nextTexts } = history[newIndex]
//       setImages(nextImages)
//       setTexts(nextTexts)
//     }
//   }

//   const handleDownload = async () => {
//     if (!collageRef.current) return

//     try {
//       const dataUrl = await toPng(collageRef.current, { quality: 0.95 })

//       // Create a link element
//       const link = document.createElement("a")
//       link.href = dataUrl
//       link.download = `collage-${new Date().toISOString().slice(0, 10)}.png`

//       // Append to the document, click it, and remove it
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//     } catch (error) {
//       console.error("Error generating image:", error)
//     }
//   }

//   const handleTextSizeChange = (event: SelectChangeEvent<number>) => {
//     setNewTextSize(Number(event.target.value))
//   }

//   return (
//     <Box
//       sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, p: 3, maxWidth: "90%", mx: "auto" }}
//     >
//       {/* Title and Controls */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
//         <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
//           Collage Editor
//         </Typography>
//         <Box sx={{ display: "flex", gap: 1 }}>
//           <Tooltip title="Undo">
//             <IconButton onClick={handleUndo} disabled={historyIndex <= 0} sx={{ bgcolor: "grey.100" }}>
//               <UndoIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Redo">
//             <IconButton onClick={handleRedo} disabled={historyIndex >= history.length - 1} sx={{ bgcolor: "grey.100" }}>
//               <RedoIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Apply filter">
//             <IconButton onClick={handleFilterMenuOpen} sx={{ bgcolor: "grey.100" }}>
//               <FilterIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Add text">
//             <IconButton onClick={handleAddText} sx={{ bgcolor: "grey.100" }}>
//               <TextFieldsIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Download">
//             <IconButton
//               onClick={handleDownload}
//               sx={{ bgcolor: "primary.main", color: "white", "&:hover": { bgcolor: "primary.dark" } }}
//             >
//               <DownloadIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Box>

//       {/* Canvas Section */}
//       <Box
//         sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 3, mb: 3, flexWrap: "wrap" }}
//       >
//         {/* Canvas */}
//         <CollageCanvas
//           ref={collageRef}
//           images={images}
//           texts={texts}
//           backgroundColor={backgroundColor}
//           width={canvasWidth}
//           height={canvasHeight}
//           selectedImageId={selectedImageId}
//           selectedTextId={selectedTextId}
//           onImageSelect={handleImageSelect}
//           onTextSelect={handleTextSelect}
//           onImageUpdate={handleImageUpdate}
//           onTextUpdate={handleTextUpdate}
//           onImageRemove={handleImageRemove}
//           onTextRemove={handleTextRemove}
//           onTextAdd={handleAddText}
//           filter={selectedFilter}
//         />

//         {/* Upload and Download Section */}
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 250 }}>
//           <ImageUploader onUpload={handleImageUpload} />
//           <Button variant="contained" color="primary" onClick={handleDownload} startIcon={<DownloadIcon />} fullWidth>
//             Download Collage
//           </Button>
//         </Box>
//       </Box>

//       <Divider sx={{ width: "100%", my: 2 }} />

//       {/* Options Section */}
//       <Paper sx={{ p: 3, bgcolor: theme.palette.background.paper, width: "100%" }}>
//         <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
//           <Tab label="Templates" />
//           <Tab label="Aspect Ratio" />
//           <Tab label="Background" />
//         </Tabs>

//         {activeTab === 0 && <TemplateSelector onSelect={handleTemplateSelect} />}

//         {activeTab === 1 && <AspectRatioSelector selectedRatio={aspectRatio} onChange={handleAspectRatioChange} />}

//         {activeTab === 2 && <BackgroundColorPicker color={backgroundColor} onChange={handleBackgroundColorChange} />}
//       </Paper>

//       {/* Filter Menu */}
//       <Menu anchorEl={filterMenuAnchor} open={Boolean(filterMenuAnchor)} onClose={handleFilterMenuClose}>
//         {filters.map((filter) => (
//           <MenuItem
//             key={filter.id}
//             onClick={() => handleFilterSelect(filter.id)}
//             selected={selectedFilter === filter.id}
//           >
//             {filter.name}
//           </MenuItem>
//         ))}
//       </Menu>

//       {/* Add Text Dialog */}
//       <Dialog open={addTextDialogOpen} onClose={handleAddTextCancel}>
//         <DialogTitle>Add Text</DialogTitle>
//         <DialogContent>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1, minWidth: 300 }}>
//             <TextField
//               autoFocus
//               label="Text Content"
//               fullWidth
//               value={newTextContent}
//               onChange={(e) => setNewTextContent(e.target.value)}
//               multiline
//               rows={2}
//             />
//             <Box sx={{ display: "flex", gap: 2 }}>
//               <FormControl fullWidth>
//                 <InputLabel id="text-size-label">Size</InputLabel>
//                 <Select labelId="text-size-label" value={newTextSize} label="Size" onChange={handleTextSizeChange}>
//                   <MenuItem value={16}>Small</MenuItem>
//                   <MenuItem value={24}>Medium</MenuItem>
//                   <MenuItem value={36}>Large</MenuItem>
//                   <MenuItem value={48}>Extra Large</MenuItem>
//                 </Select>
//               </FormControl>
//               <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//                 <Typography variant="body2">Color</Typography>
//                 <input
//                   type="color"
//                   value={newTextColor}
//                   onChange={(e) => setNewTextColor(e.target.value)}
//                   style={{ width: 80, height: 40, padding: 0, border: "none" }}
//                 />
//               </Box>
//             </Box>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAddTextCancel}>Cancel</Button>
//           <Button onClick={handleAddTextConfirm} variant="contained" color="primary">
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }

// export default CollageEditor

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { toPng } from "html-to-image"
import { ImageUploader } from "./image-uploader"
import { TemplateSelector } from "./template-selector"
import { AspectRatioSelector } from "./aspect-ratio-selector"
import { BackgroundColorPicker } from "./background-color-picker"
import { CollageCanvas } from "./collage-canvas"
import {
  Divider,
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
} from "@mui/material"
import DownloadIcon from "@mui/icons-material/Download"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import FilterIcon from "@mui/icons-material/Filter"
import UndoIcon from "@mui/icons-material/Undo"
import RedoIcon from "@mui/icons-material/Redo"
import { useTheme } from "@mui/material/styles"
import { CollageImage, CollageText, Template, AspectRatio } from "../../types/types"

// Define filters
const filters = [
  { id: "none", name: "None" },
  { id: "grayscale", name: "Grayscale" },
  { id: "sepia", name: "Sepia" },
  { id: "vintage", name: "Vintage" },
  { id: "warm", name: "Warm" },
  { id: "cool", name: "Cool" },
  { id: "dramatic", name: "Dramatic" },
]

const CollageEditor = () => {
  const theme = useTheme()
  const [images, setImages] = useState<CollageImage[]>([])
  const [texts, setTexts] = useState<CollageText[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>({ id: "1:1", name: "Square (1:1)", value: 1 })
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff")
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<number>(0)
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null)
  const [selectedFilter, setSelectedFilter] = useState<string>("none")
  const [addTextDialogOpen, setAddTextDialogOpen] = useState<boolean>(false)
  const [newTextContent, setNewTextContent] = useState<string>("")
  const [newTextColor, setNewTextColor] = useState<string>("#000000")
  const [newTextSize, setNewTextSize] = useState<number>(24)
  const [history, setHistory] = useState<Array<{ images: CollageImage[]; texts: CollageText[] }>>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const collageRef = useRef<HTMLDivElement>(null)
  const [canvasWidth, setCanvasWidth] = useState<number>(600)
  const [canvasHeight, setCanvasHeight] = useState<number>(600)

  // Initialize history with empty state
  useEffect(() => {
    setHistory([{ images: [], texts: [] }])
    setHistoryIndex(0)
  }, [])

  // Add to history when images or texts change
  useEffect(() => {
    if (images.length > 0 || texts.length > 0) {
      // Only add to history if it's a user action, not an undo/redo
      if (historyIndex === history.length - 1) {
        setHistory((prev) => [...prev.slice(0, historyIndex + 1), { images, texts }])
        setHistoryIndex((prev) => prev + 1)
      }
    }
  }, [images, texts])

  useEffect(() => {
    const updateCanvasSize = () => {
      const maxWidth = window.innerWidth * 0.8 // Limit canvas width to 80% of the viewport
      const maxHeight = window.innerHeight * 0.5 // Limit canvas height to 50% of the viewport
      const calculatedWidth = Math.min(maxWidth, 600) // Ensure it doesn't exceed 600px
      const calculatedHeight = calculatedWidth / aspectRatio.value
      setCanvasWidth(calculatedWidth)
      setCanvasHeight(Math.min(calculatedHeight, maxHeight)) // Ensure height fits within the viewport
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    return () => window.removeEventListener("resize", updateCanvasSize)
  }, [aspectRatio])

  const handleImageUpload = (files: File[]) => {
    const newImages = files.map((file) => {
      const id = `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      return {
        id,
        file,
        url: URL.createObjectURL(file),
        width: 200,
        height: 200,
        x: Math.random() * (canvasWidth - 200),
        y: Math.random() * (canvasHeight - 200),
        rotation: 0,
        flipped: false,
        scale: 1,
        opacity: 1,
        borderRadius: 0,
        shadow: false,
      }
    })

    setImages((prevImages) => [...prevImages, ...newImages])

    // Apply template if selected
    if (selectedTemplate && newImages.length > 0) {
      applyTemplate([...images, ...newImages])
    }
  }

  const applyTemplate = (imagesToArrange: CollageImage[] = images) => {
    if (!selectedTemplate || imagesToArrange.length === 0) return

    const arrangedImages = [...imagesToArrange]
    const templatePositions = selectedTemplate.layout

    // Apply template positions to images
    for (let i = 0; i < Math.min(arrangedImages.length, templatePositions.length); i++) {
      const position = templatePositions[i]
      arrangedImages[i] = {
        ...arrangedImages[i],
        x: position.x * canvasWidth,
        y: position.y * canvasHeight,
        width: position.width * canvasWidth,
        height: position.height * canvasHeight,
        scale: 1,
        rotation: 0,
        flipped: false,
      }
    }

    setImages(arrangedImages)
  }

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    applyTemplate()
  }

  const handleAspectRatioChange = (ratio: AspectRatio) => {
    setAspectRatio(ratio)
  }

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color) // Update background color immediately
  }

  const handleImageSelect = (id: string) => {
    setSelectedImageId(id)
  }

  const handleTextSelect = (id: string) => {
    setSelectedTextId(id)
  }

  const handleImageUpdate = (updatedImage: CollageImage) => {
    setImages(images.map((img) => (img.id === updatedImage.id ? updatedImage : img)))
  }

  const handleTextUpdate = (updatedText: CollageText) => {
    setTexts(texts.map((txt) => (txt.id === updatedText.id ? updatedText : txt)))
  }

  const handleImageRemove = (id: string) => {
    setImages(images.filter((img) => img.id !== id))
    if (selectedImageId === id) {
      setSelectedImageId(null)
    }
  }

  const handleTextRemove = (id: string) => {
    setTexts(texts.filter((txt) => txt.id !== id))
    if (selectedTextId === id) {
      setSelectedTextId(null)
    }
  }

  const handleAddText = () => {
    setAddTextDialogOpen(true)
  }

  const handleAddTextConfirm = () => {
    if (newTextContent.trim()) {
      const id = `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const newText: CollageText = {
        id,
        content: newTextContent,
        x: canvasWidth / 2 - 100,
        y: canvasHeight / 2 - 25,
        width: 200,
        height: 50,
        fontFamily: "Arial",
        fontSize: newTextSize,
        color: newTextColor,
        bold: false,
        italic: false,
        underline: false,
        align: "center",
        opacity: 1,
        backgroundColor: "transparent",
        borderRadius: 0,
        shadow: false,
      }
      setTexts([...texts, newText])
      setNewTextContent("")
      setNewTextColor("#000000")
      setNewTextSize(24)
    }
    setAddTextDialogOpen(false)
  }

  const handleAddTextCancel = () => {
    setAddTextDialogOpen(false)
    setNewTextContent("")
    setNewTextColor("#000000")
    setNewTextSize(24)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterMenuAnchor(event.currentTarget)
  }

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null)
  }

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId)
    handleFilterMenuClose()
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      const { images: prevImages, texts: prevTexts } = history[newIndex]
      setImages(prevImages)
      setTexts(prevTexts)
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      const { images: nextImages, texts: nextTexts } = history[newIndex]
      setImages(nextImages)
      setTexts(nextTexts)
    }
  }

  const handleDownload = async () => {
    if (!collageRef.current) return

    try {
      const dataUrl = await toPng(collageRef.current, { quality: 0.95 })

      // Create a link element
      const link = document.createElement("a")
      link.href = dataUrl
      link.download = `collage-${new Date().toISOString().slice(0, 10)}.png`

      // Append to the document, click it, and remove it
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error generating image:", error)
    }
  }

  const handleTextSizeChange = (event: SelectChangeEvent<number>) => {
    setNewTextSize(Number(event.target.value))
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, p: 3, maxWidth: "90%", mx: "auto" }}
    >
      {/* Title and Controls */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          Collage Editor
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Undo">
            <IconButton onClick={handleUndo} disabled={historyIndex <= 0} sx={{ bgcolor: "grey.100" }}>
              <UndoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Redo">
            <IconButton onClick={handleRedo} disabled={historyIndex >= history.length - 1} sx={{ bgcolor: "grey.100" }}>
              <RedoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Apply filter">
            <IconButton onClick={handleFilterMenuOpen} sx={{ bgcolor: "grey.100" }}>
              <FilterIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add text">
            <IconButton onClick={handleAddText} sx={{ bgcolor: "grey.100" }}>
              <TextFieldsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download">
            <IconButton
              onClick={handleDownload}
              sx={{ bgcolor: "primary.main", color: "white", "&:hover": { bgcolor: "primary.dark" } }}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Canvas Section */}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 3, mb: 3, flexWrap: "wrap" }}
      >
        {/* Canvas */}
        <CollageCanvas
          ref={collageRef}
          images={images}
          texts={texts}
          backgroundColor={backgroundColor}
          width={canvasWidth}
          height={canvasHeight}
          selectedImageId={selectedImageId}
          selectedTextId={selectedTextId}
          onImageSelect={handleImageSelect}
          onTextSelect={handleTextSelect}
          onImageUpdate={handleImageUpdate}
          onTextUpdate={handleTextUpdate}
          onImageRemove={handleImageRemove}
          onTextRemove={handleTextRemove}
          onTextAdd={handleAddText}
          filter={selectedFilter}
        />

        {/* Upload and Download Section */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 250 }}>
          <ImageUploader onUpload={handleImageUpload} />
          <Button variant="contained" color="primary" onClick={handleDownload} startIcon={<DownloadIcon />} fullWidth>
            Download Collage
          </Button>
        </Box>
      </Box>

      <Divider sx={{ width: "100%", my: 2 }} />

      {/* Options Section */}
      <Paper sx={{ p: 3, bgcolor: theme.palette.background.paper, width: "100%" }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
          <Tab label="Templates" />
          <Tab label="Aspect Ratio" />
          <Tab label="Background" />
        </Tabs>

        {activeTab === 0 && <TemplateSelector onSelect={handleTemplateSelect} />}

        {activeTab === 1 && <AspectRatioSelector selectedRatio={aspectRatio} onChange={handleAspectRatioChange} />}

        {activeTab === 2 && <BackgroundColorPicker color={backgroundColor} onChange={handleBackgroundColorChange} />}
      </Paper>

      {/* Filter Menu */}
      <Menu anchorEl={filterMenuAnchor} open={Boolean(filterMenuAnchor)} onClose={handleFilterMenuClose}>
        {filters.map((filter) => (
          <MenuItem
            key={filter.id}
            onClick={() => handleFilterSelect(filter.id)}
            selected={selectedFilter === filter.id}
          >
            {filter.name}
          </MenuItem>
        ))}
      </Menu>

      {/* Add Text Dialog */}
      <Dialog open={addTextDialogOpen} onClose={handleAddTextCancel}>
        <DialogTitle>Add Text</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1, minWidth: 300 }}>
            <TextField
              autoFocus
              label="Text Content"
              fullWidth
              value={newTextContent}
              onChange={(e) => setNewTextContent(e.target.value)}
              multiline
              rows={2}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="text-size-label">Size</InputLabel>
                <Select labelId="text-size-label" value={newTextSize} label="Size" onChange={handleTextSizeChange}>
                  <MenuItem value={16}>Small</MenuItem>
                  <MenuItem value={24}>Medium</MenuItem>
                  <MenuItem value={36}>Large</MenuItem>
                  <MenuItem value={48}>Extra Large</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body2">Color</Typography>
                <input
                  type="color"
                  value={newTextColor}
                  onChange={(e) => setNewTextColor(e.target.value)}
                  style={{ width: 80, height: 40, padding: 0, border: "none" }}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddTextCancel}>Cancel</Button>
          <Button onClick={handleAddTextConfirm} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CollageEditor
