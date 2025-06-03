"use client"

import type React from "react"

import { useState } from "react"
import { Box, Typography, RadioGroup, Radio, Grid, Paper } from "@mui/material"
import { Template } from "../../types/types"
// import { useLanguage } from "../../context/LanguageContext";

// Define template thumbnails
const templates: Template[] = [
  {
    id: "grid-2x2",
    name: "Grid 2x2",
    layout: [
      { x: 0, y: 0, width: 0.5, height: 0.5 },
      { x: 0.5, y: 0, width: 0.5, height: 0.5 },
      { x: 0, y: 0.5, width: 0.5, height: 0.5 },
      { x: 0.5, y: 0.5, width: 0.5, height: 0.5 },
    ],
    thumbnail: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "grid-3x3",
    name: "Grid 3x3",
    layout: [
      { x: 0, y: 0, width: 0.33, height: 0.33 },
      { x: 0.33, y: 0, width: 0.33, height: 0.33 },
      { x: 0.66, y: 0, width: 0.33, height: 0.33 },
      { x: 0, y: 0.33, width: 0.33, height: 0.33 },
      { x: 0.33, y: 0.33, width: 0.33, height: 0.33 },
      { x: 0.66, y: 0.33, width: 0.33, height: 0.33 },
      { x: 0, y: 0.66, width: 0.33, height: 0.33 },
      { x: 0.33, y: 0.66, width: 0.33, height: 0.33 },
      { x: 0.66, y: 0.66, width: 0.33, height: 0.33 },
    ],
    thumbnail: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "horizontal-3",
    name: "Horizontal 3",
    layout: [
      { x: 0, y: 0, width: 0.33, height: 1 },
      { x: 0.33, y: 0, width: 0.33, height: 1 },
      { x: 0.66, y: 0, width: 0.33, height: 1 },
    ],
    thumbnail: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "vertical-3",
    name: "Vertical 3",
    layout: [
      { x: 0, y: 0, width: 1, height: 0.33 },
      { x: 0, y: 0.33, width: 1, height: 0.33 },
      { x: 0, y: 0.66, width: 1, height: 0.33 },
    ],
    thumbnail: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "featured",
    name: "Featured Image",
    layout: [
      { x: 0.25, y: 0, width: 0.5, height: 0.5 },
      { x: 0, y: 0, width: 0.25, height: 0.25 },
      { x: 0, y: 0.25, width: 0.25, height: 0.25 },
      { x: 0.75, y: 0, width: 0.25, height: 0.25 },
      { x: 0.75, y: 0.25, width: 0.25, height: 0.25 },
      { x: 0, y: 0.5, width: 0.33, height: 0.5 },
      { x: 0.33, y: 0.5, width: 0.33, height: 0.5 },
      { x: 0.66, y: 0.5, width: 0.33, height: 0.5 },
    ],
    thumbnail: "/placeholder.svg?height=80&width=80",
  },
  // New creative templates
  {
    id: "diagonal",
    name: "Diagonal",
    layout: [
      { x: 0, y: 0, width: 0.33, height: 0.33 },
      { x: 0.33, y: 0.33, width: 0.33, height: 0.33 },
      { x: 0.66, y: 0.66, width: 0.33, height: 0.33 },
    ],
    thumbnail: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "polaroid",
    name: "Polaroid",
    layout: [
      { x: 0.1, y: 0.1, width: 0.35, height: 0.35 },
      { x: 0.55, y: 0.1, width: 0.35, height: 0.35 },
      { x: 0.1, y: 0.55, width: 0.35, height: 0.35 },
      { x: 0.55, y: 0.55, width: 0.35, height: 0.35 },
    ],
    thumbnail: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "central-focus",
    name: "Central Focus",
    layout: [
      { x: 0.25, y: 0.25, width: 0.5, height: 0.5 }, // Center
      { x: 0, y: 0, width: 0.25, height: 0.25 }, // Top left
      { x: 0.75, y: 0, width: 0.25, height: 0.25 }, // Top right
      { x: 0, y: 0.75, width: 0.25, height: 0.25 }, // Bottom left
      { x: 0.75, y: 0.75, width: 0.25, height: 0.25 }, // Bottom right
    ],
    thumbnail: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "mosaic",
    name: "Mosaic",
    layout: [
      { x: 0, y: 0, width: 0.25, height: 0.25 },
      { x: 0.25, y: 0, width: 0.5, height: 0.25 },
      { x: 0.75, y: 0, width: 0.25, height: 0.25 },
      { x: 0, y: 0.25, width: 0.25, height: 0.5 },
      { x: 0.25, y: 0.25, width: 0.5, height: 0.5 },
      { x: 0.75, y: 0.25, width: 0.25, height: 0.5 },
      { x: 0, y: 0.75, width: 0.25, height: 0.25 },
      { x: 0.25, y: 0.75, width: 0.5, height: 0.25 },
      { x: 0.75, y: 0.75, width: 0.25, height: 0.25 },
    ],
    thumbnail: "/placeholder.svg?height=80&width=80",
  },
]

interface TemplateSelectorProps {
  onSelect: (template: Template) => void
}

export const TemplateSelector = ({ onSelect }: TemplateSelectorProps) => {
  // const { language } = useLanguage();


  // const t = translations[language];
  const t = "תבניות קולאז"
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("")

  const handleTemplateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const templateId = event.target.value
    setSelectedTemplateId(templateId)
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      onSelect(template)
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="subtitle1" fontWeight="medium">
        {t}
      </Typography>

      <RadioGroup value={selectedTemplateId} onChange={handleTemplateChange}>
        <Grid container spacing={1}>
          {templates.map((template) => (
            <Grid item xs={4} sm={3} key={template.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 1,
                  textAlign: "center",
                  border: "2px solid",
                  borderColor: selectedTemplateId === template.id ? "primary.main" : "grey.300",
                  borderRadius: 1,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: selectedTemplateId === template.id ? "primary.main" : "grey.400",
                    bgcolor: "grey.50",
                    transform: "translateY(-2px)",
                  },
                }}
                onClick={() => {
                  setSelectedTemplateId(template.id)
                  const selectedTemplate = templates.find((t) => t.id === template.id)
                  if (selectedTemplate) onSelect(selectedTemplate)
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                  <Box sx={{ width: 64, height: 64, bgcolor: "grey.100", borderRadius: 1, position: "relative" }}>
                    {/* Template preview visualization */}
                    {template.layout.map((position, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: "absolute",
                          top: `${position.y * 100}%`,
                          left: `${position.x * 100}%`,
                          width: `${position.width * 100}%`,
                          height: `${position.height * 100}%`,
                          border: "1px solid white",
                          bgcolor: "primary.light",
                          opacity: 0.7,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
                <Typography variant="caption">{template.name}</Typography>
                <Radio value={template.id} checked={selectedTemplateId === template.id} sx={{ display: "none" }} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </Box>
  )
}
