"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  LinearProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material"
import {
  CloudUpload as UploadIcon,
  Close as CloseIcon,
  FolderOpen as FolderIcon,
  InsertDriveFile as FileIcon,
} from "@mui/icons-material"
import axios from "axios"

const API_BASE_URL = "http://localhost:5293" // Update to your API URL

interface UploadDialogProps {
  open: boolean
  onClose: () => void
  onUploadComplete: () => void
  currentFolder: string | null
}

export function UploadDialog({ open, onClose, onUploadComplete, currentFolder }: UploadDialogProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files))
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const triggerFolderInput = () => {
    if (folderInputRef.current) {
      folderInputRef.current.click()
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    if (files.length === 0) return

    setUploading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      files.forEach((file) => formData.append("files", file))
      formData.append("FolderId", currentFolder || "0")
      formData.append("OwnerId", "1") // Replace with actual user ID

      // Use axios to upload with progress tracking
      await axios.post(`${API_BASE_URL}/files`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(percentCompleted)
          }
        },
      })

      // Wait a bit to show 100% before closing
      setTimeout(() => {
        setUploading(false)
        setFiles([])
        onUploadComplete()
        onClose()
      }, 500)
    } catch (error) {
      console.error("Error uploading files:", error)
      setUploading(false)
    }
  }

  const handleClose = () => {
    if (!uploading) {
      setFiles([])
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload Files</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Upload images to your gallery. You can select multiple files or drag and drop them here.
        </Typography>

        <Box
          sx={{
            mt: 2,
            p: 3,
            border: "2px dashed",
            borderColor: files.length > 0 ? "primary.main" : "divider",
            borderRadius: 2,
            bgcolor: files.length > 0 ? "primary.light" : "background.default",
            opacity: files.length > 0 ? 0.1 : 1,
            textAlign: "center",
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {files.length === 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <UploadIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Drag and drop files here or click to select
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <Button variant="outlined" startIcon={<FileIcon />} onClick={triggerFileInput} size="small">
                  Select Files
                </Button>
                <Button variant="outlined" startIcon={<FolderIcon />} onClick={triggerFolderInput} size="small">
                  Select Folder
                </Button>
              </Box>
            </Box>
          ) : null}
        </Box>

        {files.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              {files.length} files selected
            </Typography>
            <List dense sx={{ maxHeight: 200, overflow: "auto" }}>
              {files.map((file, index) => (
                <ListItem key={index}>
                  <ListItemText primary={file.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => removeFile(index)} size="small">
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {uploading && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2">Uploading...</Typography>
              <Typography variant="body2">{progress}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          multiple
          accept="image/*"
        />
<input
  type="file"
  ref={folderInputRef}
  onChange={handleFileChange}
  style={{ display: "none" }}
  multiple
  {...{ webkitdirectory: true, directory: true } as any}
/>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={uploading}>
          Cancel
        </Button>
        <Button onClick={uploadFiles} disabled={files.length === 0 || uploading} variant="contained" color="primary">
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
