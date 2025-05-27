"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  Divider,
  Slider,
  Grid,
  Button,
} from "@mui/material"
import {
  Close,
  EmojiEmotions,
  Pets,
  LocalFlorist,
  Celebration,
  Favorite,
  Star,
  Public,
  Bolt,
  LocalFireDepartment,
} from "@mui/icons-material"

interface StickersToolProps {
  onSelectSticker: (sticker: string, size: number) => void
  onClose: () => void
}

const StickersTool: React.FC<StickersToolProps> = ({ onSelectSticker, onClose }) => {
  const theme = useTheme()
  const [selectedSticker, setSelectedSticker] = useState<string>("emoji1")
  const [stickerSize, setStickerSize] = useState<number>(50)

  // Emoji stickers
  const emojiStickers = [
    { id: "emoji1", emoji: "😊", label: "חיוך" },
    { id: "emoji2", emoji: "😍", label: "אוהב" },
    { id: "emoji3", emoji: "🎨", label: "ציור" },
    { id: "emoji4", emoji: "🌟", label: "כוכב" },
    { id: "emoji5", emoji: "🌈", label: "קשת" },
    { id: "emoji6", emoji: "🦄", label: "חד קרן" },
    { id: "emoji7", emoji: "🐶", label: "כלב" },
    { id: "emoji8", emoji: "🐱", label: "חתול" },
    { id: "emoji9", emoji: "🌺", label: "פרח" },
    { id: "emoji10", emoji: "🍦", label: "גלידה" },
    { id: "emoji11", emoji: "🎁", label: "מתנה" },
    { id: "emoji12", emoji: "❤️", label: "לב" },
    { id: "emoji13", emoji: "🔥", label: "אש" },
    { id: "emoji14", emoji: "✨", label: "ניצוצות" },
    { id: "emoji15", emoji: "🎵", label: "מוזיקה" },
    { id: "emoji16", emoji: "🚀", label: "טיל" },
  ]

  // Icon stickers
  const iconStickers = [
    { id: "icon1", icon: <EmojiEmotions color="primary" />, label: "סמיילי" },
    { id: "icon2", icon: <Pets color="secondary" />, label: "חיה" },
    { id: "icon3", icon: <LocalFlorist sx={{ color: "#4CAF50" }} />, label: "פרח" },
    { id: "icon4", icon: <Celebration sx={{ color: "#FF9800" }} />, label: "חגיגה" },
    { id: "icon5", icon: <Favorite sx={{ color: "#F44336" }} />, label: "לב" },
    { id: "icon6", icon: <Star sx={{ color: "#FFC107" }} />, label: "כוכב" },
    { id: "icon7", icon: <Public sx={{ color: "#2196F3" }} />, label: "עולם" },
    { id: "icon8", icon: <Bolt sx={{ color: "#FFEB3B" }} />, label: "ברק" },
    { id: "icon9", icon: <LocalFireDepartment sx={{ color: "#FF5722" }} />, label: "אש" },
  ]

  const handleStickerSelect = (sticker: string) => {
    setSelectedSticker(sticker)
    // הסרנו את הקריאה ל-onSelectSticker כאן
  }

  const handleSizeChange = (_event: Event, newValue: number | number[]) => {
    const size = newValue as number
    setStickerSize(size)
    // הסרנו את הקריאה ל-onSelectSticker כאן
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: "300px",
        p: 2,
        borderRadius: "12px",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e2e6ea 100%)",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          מדבקות
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle2" gutterBottom>
        אימוג׳י:
      </Typography>
      <Grid container spacing={1} sx={{ mb: 2 }}>
        {emojiStickers.map((sticker) => (
          <Grid item key={sticker.id}>
            <Tooltip title={sticker.label}>
              <Box
                onClick={() => handleStickerSelect(sticker.id)}
                sx={{
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  backgroundColor:
                    selectedSticker === sticker.id ? alpha(theme.palette.primary.main, 0.2) : "transparent",
                  border: selectedSticker === sticker.id ? `2px solid ${theme.palette.primary.main}` : "none",
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    transform: "scale(1.1)",
                  },
                }}
              >
                {sticker.emoji}
              </Box>
            </Tooltip>
          </Grid>
        ))}
      </Grid>

      <Typography variant="subtitle2" gutterBottom>
        אייקונים:
      </Typography>
      <Grid container spacing={1} sx={{ mb: 2 }}>
        {iconStickers.map((sticker) => (
          <Grid item key={sticker.id}>
            <Tooltip title={sticker.label}>
              <IconButton
                onClick={() => handleStickerSelect(sticker.id)}
                sx={{
                  backgroundColor:
                    selectedSticker === sticker.id ? alpha(theme.palette.primary.main, 0.2) : "transparent",
                  border: selectedSticker === sticker.id ? `2px solid ${theme.palette.primary.main}` : "none",
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                {sticker.icon}
              </IconButton>
            </Tooltip>
          </Grid>
        ))}
      </Grid>

      <Typography variant="subtitle2" gutterBottom>
        גודל: {stickerSize}px
      </Typography>
      <Slider value={stickerSize} min={20} max={150} onChange={handleSizeChange} color="primary" />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" color="primary" onClick={onClose} sx={{ borderRadius: "8px" }}>
          סגור
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSelectSticker(selectedSticker, stickerSize)}
          sx={{ borderRadius: "8px" }}
        >
          הוסף מדבקה
        </Button>
      </Box>
    </Paper>
  )
}

export default StickersTool