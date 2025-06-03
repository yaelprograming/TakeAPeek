"use client"

import { useState, useEffect } from "react"
import { Box, Typography, IconButton, Fade } from "@mui/material"
import { styled } from "@mui/material/styles"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
  title?: string
  description?: string
}

interface InteractiveGalleryProps {
  images: GalleryImage[]
  height?: string | { xs: string; md: string }
  autoplay?: boolean
  autoplaySpeed?: number
  showControls?: boolean
  showCaption?: boolean
  enableZoom?: boolean
}

const GalleryContainer = styled(Box)(() => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
}))

const GalleryImage = styled("img")(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.5s ease",
}))

const GalleryControls = styled(Box)(() => ({
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  zIndex: 10,
}))

const GalleryDot = styled(Box)<{ active: boolean }>(({ active }) => ({
  width: active ? "12px" : "8px",
  height: active ? "12px" : "8px",
  borderRadius: "50%",
  backgroundColor: active ? "#0aa997" : "rgba(255, 255, 255, 0.7)",
  cursor: "pointer",
  transition: "all 0.3s ease",
}))

const GalleryCaption = styled(Box)(() => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "20px",
  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
  color: "white",
  textAlign: "right",
}))

const ZoomOverlay = styled(Box)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  cursor: "zoom-out",
}))

export const InteractiveGallery = ({
  images,
  height = { xs: "300px", md: "500px" },
  autoplay = true,
  autoplaySpeed = 5000,
  showControls = true,
  showCaption = true,
  enableZoom = true,
}: InteractiveGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [fadeIn, setFadeIn] = useState(true)

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        nextImage()
      }, autoplaySpeed)
      return () => clearInterval(interval)
    }
  }, [currentIndex, autoplay, autoplaySpeed])

  const nextImage = () => {
    setFadeIn(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      setFadeIn(true)
    }, 300)
  }

  const prevImage = () => {
    setFadeIn(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      setFadeIn(true)
    }, 300)
  }

  const handleDotClick = (index: number) => {
    setFadeIn(false)
    setTimeout(() => {
      setCurrentIndex(index)
      setFadeIn(true)
    }, 300)
  }

  const toggleZoom = () => {
    if (enableZoom) {
      setIsZoomed(!isZoomed)
    }
  }

  const currentImage = images[currentIndex]

  return (
    <GalleryContainer sx={{ height: height }}>
      <Fade in={fadeIn} timeout={500}>
        <GalleryImage src={currentImage.src} alt={currentImage.alt} />
      </Fade>

      {showControls && (
        <>
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.5)" },
            }}
            onClick={prevImage}
          >
            <ChevronRight color="#fff" />
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.5)" },
            }}
            onClick={nextImage}
          >
            <ChevronLeft color="#fff" />
          </IconButton>
        </>
      )}

      {enableZoom && (
        <IconButton
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.5)" },
          }}
          onClick={toggleZoom}
        >
          <ZoomIn color="#fff" />
        </IconButton>
      )}

      {showControls && (
        <GalleryControls>
          {images.map((_, index) => (
            <GalleryDot key={index} active={index === currentIndex} onClick={() => handleDotClick(index)} />
          ))}
        </GalleryControls>
      )}

      {showCaption && currentImage.title && (
        <GalleryCaption>
          <Typography variant="h6">{currentImage.title}</Typography>
          {currentImage.description && <Typography variant="body2">{currentImage.description}</Typography>}
        </GalleryCaption>
      )}

      {isZoomed && (
        <ZoomOverlay onClick={toggleZoom}>
          <img
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.alt}
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        </ZoomOverlay>
      )}
    </GalleryContainer>
  )
}

export default InteractiveGallery
