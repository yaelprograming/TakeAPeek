import { Button as MuiButton, type ButtonProps as MuiButtonProps } from "@mui/material"
import { forwardRef } from "react"

export interface ButtonProps extends MuiButtonProps {
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ asChild, children, ...props }, ref) => {
  // The asChild prop is ignored since we're using MUI
  return (
    <MuiButton ref={ref} {...props}>
      {children}
    </MuiButton>
  )
})

Button.displayName = "Button"
