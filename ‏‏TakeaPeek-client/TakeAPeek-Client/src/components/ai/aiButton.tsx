"use client"

import type React from "react"

import { useState } from "react"
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import BlurOffIcon from "@mui/icons-material/BlurOff"
import FaceIcon from "@mui/icons-material/Face"
import PeopleIcon from "@mui/icons-material/People"
import HomeIcon from "@mui/icons-material/Home"
import LandscapeIcon from "@mui/icons-material/Landscape"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import TagIcon from "@mui/icons-material/Tag"
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt"
import { useNavigate } from "react-router-dom"

const AiButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (path: string) => {
    navigate(path)
    handleClose()
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#6200ea",
          "&:hover": {
            backgroundColor: "#3700b3",
          },
          borderRadius: "50%",
          width: 64,
          height: 64,
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
      >
        AI
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick("/ai-features/smart-filtering")}>
          <ListItemIcon>
            <BlurOffIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="סינון תמונות מטושטשות" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/ai-features/image-analysis")}>
          <ListItemIcon>
            <FaceIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="זיהוי פנים" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/ai-features/image-analysis")}>
          <ListItemIcon>
            <PeopleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="סינון לפי מספר אנשים" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/ai-features/image-analysis")}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
            <LandscapeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="סינון לפי סצנה (פנים/חוץ)" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/ai-features/image-analysis")}>
          <ListItemIcon>
            <VisibilityOffIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="זיהוי עיניים עצומות" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/ai-features/image-analysis")}>
          <ListItemIcon>
            <SentimentSatisfiedAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="זיהוי חיוכים/הבעות פנים" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/ai-features/free-search")}>
          <ListItemIcon>
            <TagIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="תיוג אוטומטי לפי תוכן" />
        </MenuItem>
      </Menu>
    </>
  )
}

export default AiButton
