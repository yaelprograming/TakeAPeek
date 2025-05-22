"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Box, Typography, LinearProgress, IconButton, Paper, Button } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import CloseIcon from "@mui/icons-material/Close"
import ImageIcon from "@mui/icons-material/Image"

interface UploadingFile {
  name: string
  id: string
}

interface ImageUploaderProps {
  onUpload: (files: File[]) => void
}

export const ImageUploader = ({ onUpload }: ImageUploaderProps) => {
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const [recentFiles, setRecentFiles] = useState<{ name: string; preview: string }[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Create upload progress entries for each file
      const newUploadProgress: { [key: string]: number } = {}
      const newUploadingFiles = acceptedFiles.map((file) => {
        const id = `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        newUploadProgress[id] = 0
        return { name: file.name, id }
      })

      // Create previews for recent files
      const newRecentFiles = acceptedFiles.slice(0, 3).map((file) => ({
        name: file.name,
        preview: URL.createObjectURL(file),
      }))

      setRecentFiles((prev) => [...newRecentFiles, ...prev].slice(0, 3))
      setUploadingFiles((prev) => [...prev, ...newUploadingFiles])
      setUploadProgress((prev) => ({ ...prev, ...newUploadProgress }))

      // Simulate upload progress
      newUploadingFiles.forEach(({ id }) => {
        let progress = 0
        const interval = setInterval(() => {
          progress += Math.floor(Math.random() * 10) + 5
          if (progress >= 100) {
            progress = 100
            clearInterval(interval)

            // Remove from uploading files after a delay
            setTimeout(() => {
              setUploadingFiles((prev) => prev.filter((file) => file.id !== id))
            }, 500)
          }

          setUploadProgress((prev) => ({ ...prev, [id]: progress }))
        }, 200)
      })

      // Pass files to parent component
      onUpload(acceptedFiles)
    },
    [onUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: true,
  })

  const removeUploadingFile = (id: string) => {
    setUploadingFiles((prev) => prev.filter((file) => file.id !== id))
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="subtitle1" fontWeight="medium">
        Upload Images
      </Typography>

      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed",
          borderColor: isDragActive ? "primary.main" : "grey.300",
          borderRadius: 1,
          p: 3,
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.2s",
          bgcolor: isDragActive ? "primary.50" : "transparent",
          "&:hover": {
            borderColor: "primary.light",
            bgcolor: "rgba(25, 118, 210, 0.04)",
          },
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 40, color: isDragActive ? "primary.main" : "text.secondary" }} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {isDragActive ? "Drop to upload" : "Drag images here or click to select"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          JPG, PNG, GIF, WEBP
        </Typography>
      </Box>

      {/* Recent uploads preview */}
      {recentFiles.length > 0 && (
        <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
          {recentFiles.map((file, index) => (
            <Box
              key={index}
              sx={{
                width: 60,
                height: 60,
                borderRadius: 1,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <img
                src={file.preview || "/placeholder.svg"}
                alt={file.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          ))}
        </Box>
      )}

      {uploadingFiles.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {uploadingFiles.map((file) => (
            <Paper key={file.id} variant="outlined" sx={{ p: 1, bgcolor: "grey.50" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                  {file.name}
                </Typography>
                <IconButton size="small" onClick={() => removeUploadingFile(file.id)} sx={{ color: "text.secondary" }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              <LinearProgress
                variant="determinate"
                value={uploadProgress[file.id]}
                sx={{
                  height: 4,
                  borderRadius: 2,
                  bgcolor: "grey.200",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "primary.main",
                  },
                }}
              />
            </Paper>
          ))}
        </Box>
      )}

      {/* Sample images for quick testing */}
      <Box sx={{ mt: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
          Or use sample images:
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<ImageIcon />}
            onClick={() => {
              // Create a sample image and convert to File
              fetch("/placeholder.svg?height=400&width=400")
                .then((res) => res.blob())
                .then((blob) => {
                  const file = new File([blob], "sample1.jpg", { type: "img/png" })
                  onUpload([file])
                })
            }}
          >
            Sample 1
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<ImageIcon />}
            onClick={() => {
              // Create another sample image
              fetch("/placeholder.svg?height=400&width=400")
                .then((res) => res.blob())
                .then((blob) => {
                  const file = new File([blob], "sample2.png", { type: "image/png" })
                  onUpload([file])
                })
            }}
          >
            Sample 2
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
