"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material"
import { Close as CloseIcon, CreateNewFolder as FolderIcon } from "@mui/icons-material"

interface CreateFolderProps {
  open: boolean
  onClose: () => void
  onCreateFolder: (folderName: string) => void
}

export function CreateFolder({ open, onClose, onCreateFolder }: CreateFolderProps) {
  const [folderName, setFolderName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    // Validate folder name
    if (!folderName.trim()) {
      setError("שם התיקיה לא יכול להיות ריק")
      return
    }

    // Check for invalid characters
    const invalidChars = /[\\/:*?"<>|]/
    if (invalidChars.test(folderName)) {
      setError('שם התיקיה לא יכול להכיל את התווים הבאים: \\ / : * ? " < > |')
      return
    }

    onCreateFolder(folderName)
    setFolderName("")
    setError("")
    onClose()
  }

  const handleClose = () => {
    setFolderName("")
    setError("")
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          width: "100%",
          maxWidth: "450px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "primary.main",
          color: "white",
          py: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FolderIcon />
          <Typography variant="h6">יצירת תיקיה חדשה</Typography>
        </Box>
        <IconButton onClick={handleClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        {/* <Typography variant="body2" sx={{ mb: 2 }}>
          צור תיקיה חדשה בתוך התיקיה הנוכחית. התיקיה תופיע מיד בגלריה שלך.
        </Typography> */}

        <TextField
          autoFocus
          margin="dense"
          label="שם התיקיה"
          type="text"
          fullWidth
          variant="outlined"
          value={folderName}
          onChange={(e) => {
            setFolderName(e.target.value)
            setError("")
          }}
          error={!!error}
          helperText={error}
          InputProps={{
            sx: { borderRadius: "8px" },
          }}
          sx={{
            direction: "rtl",
            "& .MuiInputLabel-root": {
              right: 14,
              left: "auto",
              transformOrigin: "right top",
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: "8px" }}>
          ביטול
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            "&:hover": {
              boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
            },
          }}
        >
          צור תיקיה
        </Button>
      </DialogActions>
    </Dialog>
  )
}



