"use client"

import type React from "react"
import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Person,
  Logout,
  PhotoLibrary,
  CalendarMonth,
  Palette,
  Login,
  PersonAdd,
} from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"
import { useAuth } from "./AuthContext"
import AuthModal from "./AuthModal"


const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const isMobile = useMediaQuery("(max-width:960px)")
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleMenuClose()
    enqueueSnackbar("התנתקתם בהצלחה", { variant: "info" })
    navigate("/")
  }

  const handleProtectedNavigation = (path: string, name: string) => {
    if (!isAuthenticated) {
      enqueueSnackbar(`כדי לגשת ל${name}, עליכם להתחבר תחילה`, {
        variant: "warning",
        action: (
          <Button
            color="inherit"
            size="small"
            onClick={() => {
              setAuthMode("login")
              setAuthModalOpen(true)
            }}
          >
            התחבר
          </Button>
        ),
      })
      return
    }
    navigate(path)
  }

  const navigationItems = [
    { name: "גלריה", path: "/gallery", icon: <PhotoLibrary />, protected: true },
    { name: "יומן", path: "/calendar", icon: <CalendarMonth />, protected: true },
    { name: "יצירת קולאז'", path: "/design", icon: <Palette />, protected: true },
  ]

  const mobileDrawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", px: 2, mb: 2 }}>
        <img src="/img/TakeAPeekLogo.png" alt="TakeAPeek" style={{ height: "40px", marginLeft: "8px" }} />
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0d818f" }}>
          TakeAPeek
        </Typography>
      </Box>
      <Divider />
      <List>
        {navigationItems.map((item) => (
          <ListItem
            key={item.name}
            onClick={() => {
              if (item.protected) {
                handleProtectedNavigation(item.path, item.name)
              } else {
                navigate(item.path)
              }
              setMobileOpen(false)
            }}
            sx={{ cursor: "pointer" }}
          >
            <ListItemIcon sx={{ color: "#0d818f" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {isAuthenticated ? (
        <List>
          <ListItem>
            <ListItemIcon>
              <Person sx={{ color: "#0d818f" }} />
            </ListItemIcon>
            <ListItemText primary={user?.name} secondary={user?.role} />
          </ListItem>
          <ListItem onClick={handleLogout} sx={{ cursor: "pointer" }}>
            <ListItemIcon>
              <Logout sx={{ color: "#f44336" }} />
            </ListItemIcon>
            <ListItemText primary="יציאה" />
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem
            onClick={() => {
              setAuthMode("login")
              setAuthModalOpen(true)
              setMobileOpen(false)
            }}
            sx={{ cursor: "pointer" }}
          >
            <ListItemIcon>
              <Login sx={{ color: "#0d818f" }} />
            </ListItemIcon>
            <ListItemText primary="התחברות" />
          </ListItem>
          <ListItem
            onClick={() => {
              setAuthMode("register")
              setAuthModalOpen(true)
              setMobileOpen(false)
            }}
            sx={{ cursor: "pointer" }}
          >
            <ListItemIcon>
              <PersonAdd sx={{ color: "#0d818f" }} />
            </ListItemIcon>
            <ListItemText primary="הרשמה" />
          </ListItem>
        </List>
      )}
    </Box>
  )

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(13, 129, 143, 0.1)",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }} component={Link} to="/">
              <img src="/img/TakeAPeekLogo.png" alt="TakeAPeek" style={{ height: "40px" }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(45deg, #0c678d, #0d818f)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textDecoration: "none",
                }}
              >
                TakeAPeek
              </Typography>
            </Box>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <AnimatePresence>
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Button
                      onClick={() => {
                        if (item.protected) {
                          handleProtectedNavigation(item.path, item.name)
                        } else {
                          navigate(item.path)
                        }
                      }}
                      sx={{
                        color: "#0d818f",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor: "rgba(13, 129, 143, 0.08)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                      startIcon={item.icon}
                    >
                      {item.name}
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>
          )}

          {/* User Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isAuthenticated ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {!isMobile && (
                    <>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {user?.name}
                      </Typography>
                      <Chip
                        label={user?.role}
                        size="small"
                        sx={{
                          background: "linear-gradient(45deg, #0c678d, #0d818f)",
                          color: "white",
                          fontWeight: 600,
                        }}
                      />
                    </>
                  )}
                  <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0.5 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#0d818f",
                        width: 36,
                        height: 36,
                        fontSize: "1rem",
                      }}
                    >
                      {user?.name?.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Box>
              </motion.div>
            ) : (
              !isMobile && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setAuthMode("login")
                        setAuthModalOpen(true)
                      }}
                      sx={{
                        borderColor: "#0d818f",
                        color: "#0d818f",
                        "&:hover": {
                          borderColor: "#0c678d",
                          backgroundColor: "rgba(13, 129, 143, 0.08)",
                        },
                      }}
                    >
                      התחברות
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setAuthMode("register")
                        setAuthModalOpen(true)
                      }}
                      sx={{
                        background: "linear-gradient(45deg, #0c678d, #0d818f)",
                        "&:hover": {
                          background: "linear-gradient(45deg, #0a5a6b, #0b6f7c)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      הרשמה
                    </Button>
                  </Box>
                </motion.div>
              )
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Person sx={{ mr: 1 }} />
          פרופיל
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ mr: 1 }} />
          יציאה
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        {mobileDrawer}
      </Drawer>

      {/* Auth Modal */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  )
}

export default Header
