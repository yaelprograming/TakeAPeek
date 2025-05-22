"use client"

import { useState, useEffect, useRef } from "react"
import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import type { LucideIcon } from "lucide-react"

interface AnimatedIconProps {
  icon: LucideIcon
  size?: number
  color?: string
  hoverColor?: string
  animation?: "pulse" | "bounce" | "spin" | "shake" | "none"
  delay?: number
}

const IconWrapper = styled(Box)<{ animation: string }>(({ theme, animation }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  "@keyframes pulse": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.2)" },
    "100%": { transform: "scale(1)" },
  },
  "@keyframes bounce": {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-10px)" },
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  "@keyframes shake": {
    "0%, 100%": { transform: "translateX(0)" },
    "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
    "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
  },
  animation: animation !== "none" ? `${animation} 2s infinite ease-in-out` : "none",
}))

export const AnimatedIcon = ({
  icon: Icon,
  size = 24,
  color = "#0c678d",
  hoverColor = "#0aa997",
  animation = "none",
  delay = 0,
}: AnimatedIconProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (iconRef.current) {
      observer.observe(iconRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [delay])

  return (
    <IconWrapper
      ref={iconRef}
      animation={isVisible ? animation : "none"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: !isVisible ? "translateY(20px)" : "none",
        transition: "opacity 0.5s ease, transform 0.5s ease, color 0.3s ease",
      }}
    >
      <Icon size={size} color={isHovered ? hoverColor : color} />
    </IconWrapper>
  )
}

export default AnimatedIcon
