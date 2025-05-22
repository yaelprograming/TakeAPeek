"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Box, Container } from "@mui/material"

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  bgImage?: string
  height?: string | { xs: string; md: string }
  overlay?: boolean
  overlayColor?: string
  overlayOpacity?: number
}

export const ParallaxSection = ({
  children,
  speed = 0.5,
  bgImage,
  height = { xs: "400px", md: "600px" },
  overlay = false,
  overlayColor = "#000",
  overlayOpacity = 0.5,
}: ParallaxSectionProps) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const element = sectionRef.current
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0

        if (isVisible) {
          const offset = window.pageYOffset
          setScrollPosition(offset)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const backgroundPositionY = sectionRef.current
    ? -((scrollPosition - (sectionRef.current.offsetTop - window.innerHeight)) * speed)
    : 0

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: "relative",
        height: height,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {bgImage && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: `center ${backgroundPositionY}px`,
            zIndex: 0,
          }}
        />
      )}
      {overlay && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
            zIndex: 1,
          }}
        />
      )}
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children}
      </Container>
    </Box>
  )
}

export default ParallaxSection
