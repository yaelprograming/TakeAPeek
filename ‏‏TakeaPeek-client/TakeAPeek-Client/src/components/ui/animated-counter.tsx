"use client"

import { useState, useEffect, useRef } from "react"
import { Typography, Box } from "@mui/material"
import { styled } from "@mui/material/styles"

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  color?: string
  size?: "small" | "medium" | "large"
}

const CounterTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  transition: "all 0.3s ease",
}))

export const AnimatedCounter = ({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  color = "#0c678d",
  size = "medium",
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrameId: number

    const startAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      const progressRatio = Math.min(progress / duration, 1)
      // אפקט האטה בסוף האנימציה
      const easedProgress = progressRatio === 1 ? 1 : 1 - Math.pow(2, -10 * progressRatio)

      setCount(Math.floor(easedProgress * end))

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(startAnimation)
      }
    }

    animationFrameId = requestAnimationFrame(startAnimation)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [end, duration, isVisible])

  const getFontSize = () => {
    switch (size) {
      case "small":
        return { xs: "1.5rem", md: "2rem" }
      case "large":
        return { xs: "2.5rem", md: "3.5rem" }
      default:
        return { xs: "2rem", md: "3rem" }
    }
  }

  return (
    <Box ref={countRef} sx={{ textAlign: "center" }}>
      <CounterTypography
        variant="h3"
        sx={{
          color: color,
          fontSize: getFontSize(),
          display: "inline-block",
        }}
      >
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </CounterTypography>
    </Box>
  )
}

export default AnimatedCounter
