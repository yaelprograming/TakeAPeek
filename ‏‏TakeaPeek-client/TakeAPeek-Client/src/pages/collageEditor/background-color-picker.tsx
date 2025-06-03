"use client"

import type React from "react"

import { useState } from "react"
import { Box, Typography, Button, Popover, Grid, Tabs, Tab } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import CheckIcon from "@mui/icons-material/Check"

const predefinedColors = [
  "#ffffff", // White
  "#f8f9fa", // Light gray
  "#e9ecef", // Lighter gray
  "#dee2e6", // Light blue gray
  "#ced4da", // Blue gray
  "#adb5bd", // Gray
  "#6c757d", // Dark gray
  "#495057", // Darker gray
  "#343a40", // Very dark gray
  "#212529", // Almost black
  "#000000", // Black
  "#f8f9d7", // Light yellow
  "#e3f2fd", // Light blue
  "#ffebee", // Light red
  "#f3e5f5", // Light purple
  "#e8f5e9", // Light green
]

// Gradient presets
const gradients = [
  "linear-gradient(to right, #ff9a9e, #fad0c4)",
  "linear-gradient(to right, #a1c4fd, #c2e9fb)",
  "linear-gradient(to right, #d4fc79, #96e6a1)",
  "linear-gradient(to right, #84fab0, #8fd3f4)",
  "linear-gradient(to right, #cfd9df, #e2ebf0)",
  "linear-gradient(to right, #f6d365, #fda085)",
  "linear-gradient(to right, #fbc2eb, #a6c1ee)",
  "linear-gradient(to right, #ffecd2, #fcb69f)",
  "linear-gradient(to right, #a18cd1, #fbc2eb)",
  "linear-gradient(to bottom, #30cfd0, #330867)",
  "linear-gradient(to bottom, #ff758c, #ff7eb3)",
  "linear-gradient(to bottom, #f093fb, #f5576c)",
]

// Patterns
const patterns = [
  "repeating-linear-gradient(45deg, #f5f5f5 0px, #f5f5f5 10px, #e0e0e0 10px, #e0e0e0 20px)",
  "repeating-linear-gradient(90deg, #f5f5f5 0px, #f5f5f5 10px, #e0e0e0 10px, #e0e0e0 20px)",
  "radial-gradient(circle, #ffffff 0%, #f5f5f5 100%)",
  "repeating-radial-gradient(circle at 50% 50%, #f5f5f5, #f5f5f5 10px, #e0e0e0 10px, #e0e0e0 20px)",
  "linear-gradient(45deg, #f5f5f5 25%, transparent 25%, transparent 75%, #f5f5f5 75%, #f5f5f5), linear-gradient(45deg, #f5f5f5 25%, transparent 25%, transparent 75%, #f5f5f5 75%, #f5f5f5)",
  "linear-gradient(45deg, #efefef 25%, transparent 25%, transparent 75%, #efefef 75%, #efefef), linear-gradient(45deg, #efefef 25%, transparent 25%, transparent 75%, #efefef 75%, #efefef)",
]

interface BackgroundColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export const BackgroundColorPicker = ({ color, onChange }: BackgroundColorPickerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [tabValue, setTabValue] = useState(0)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleColorSelect = (selectedColor: string) => {
    onChange(selectedColor)
    handleClose()
  }

  const handleGradientSelect = (gradient: string) => {
    onChange(gradient)
    handleClose()
  }

  const handlePatternSelect = (pattern: string) => {
    onChange(pattern)
    handleClose()
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const isGradientOrPattern = color.includes("gradient") || color.includes("repeating")

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="subtitle1" fontWeight="medium">
        Background
      </Typography>

      <Button
        variant="outlined"
        fullWidth
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          justifyContent: "space-between",
          background: isGradientOrPattern ? color : color,
          color: isGradientOrPattern ? "#000000" : isLightColor(color) ? "#000000" : "#ffffff",
          borderColor: "grey.300",
          "&:hover": {
            borderColor: "grey.400",
            background: isGradientOrPattern ? color : color,
          },
          height: 48,
          transition: "all 0.2s ease",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!isGradientOrPattern && (
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                border: "1px solid",
                borderColor: "grey.300",
                backgroundColor: color,
              }}
            />
          )}
          <Typography variant="body2">{isGradientOrPattern ? "Custom Background" : color.toUpperCase()}</Typography>
        </Box>
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2, width: 320 }}>
          <Tabs value={tabValue} onChange={(event, newValue) => handleTabChange(event, newValue)} variant="fullWidth" sx={{ mb: 2 }}>
            <Tab label="Colors" />
            <Tab label="Gradients" />
            <Tab label="Patterns" />
          </Tabs>

          {tabValue === 0 && (
            <>
              <Grid container spacing={1}>
                {predefinedColors.map((c) => (
                  <Grid item key={c} xs={3}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1,
                        border: "1px solid",
                        borderColor: "grey.300",
                        backgroundColor: c,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          borderColor: "primary.main",
                          transform: "scale(1.1)",
                        },
                      }}
                      onClick={() => handleColorSelect(c)}
                    >
                      {c === color && (
                        <CheckIcon sx={{ fontSize: 16, color: isLightColor(c) ? "#000000" : "#ffffff" }} />
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Custom Color
                </Typography>
                <input
                  type="color"
                  value={!isGradientOrPattern ? color : "#ffffff"}
                  onChange={(e) => onChange(e.target.value)}
                  style={{ width: "100%", height: 32, padding: 0, border: "none" }}
                />
              </Box>
            </>
          )}

          {tabValue === 1 && (
            <Grid container spacing={1}>
              {gradients.map((gradient, index) => (
                <Grid item key={index} xs={6}>
                  <Box
                    sx={{
                      width: "100%",
                      height: 48,
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: "grey.300",
                      background: gradient,
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                        transform: "scale(1.05)",
                      },
                    }}
                    onClick={() => handleGradientSelect(gradient)}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 2 && (
            <Grid container spacing={1}>
              {patterns.map((pattern, index) => (
                <Grid item key={index} xs={6}>
                  <Box
                    sx={{
                      width: "100%",
                      height: 48,
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: "grey.300",
                      background: pattern,
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                        transform: "scale(1.05)",
                      },
                    }}
                    onClick={() => handlePatternSelect(pattern)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Popover>
    </Box>
  )
}

// Helper function to determine if a color is light or dark
function isLightColor(color: string): boolean {
  // Only process hex colors
  if (!color.startsWith("#")) return true

  // Convert hex to RGB
  const hex = color.replace("#", "")
  const r = Number.parseInt(hex.substr(0, 2), 16)
  const g = Number.parseInt(hex.substr(2, 2), 16)
  const b = Number.parseInt(hex.substr(4, 2), 16)

  // Calculate brightness (YIQ formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  return brightness > 128
}
