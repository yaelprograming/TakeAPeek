"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Chip,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import { Camera, Upload, GridView, Settings, Logout, Person, MoreVert } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useSnackbar } from "notistack"

interface User {
  name: string
  role: string
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
      return
    }

    // Here you would typically decode the JWT token to get user info
    setUser({ name: "צלם מקצועי", role: "Editor" })
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    enqueueSnackbar("התנתקתם בהצלחה", { variant: "info" })
    navigate("/")
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  if (!user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h6">טוען...</Typography>
      </Box>
    )
  }

  const dashboardCards = [
    {
      title: "העלאת תמונות",
      description: "העלו תמונות חדשות לגלריה",
      detail: "גררו ושחררו תמונות או לחצו לבחירה",
      icon: <Upload sx={{ fontSize: 48 }} />,
      gradient: "linear-gradient(135deg, #14B8A6, #06B6D4)",
      action: "העלאה",
    },
    {
      title: "גלריית תמונות",
      description: "צפו ונהלו את כל התמונות",
      detail: "ארגנו, ערכו ומחקו תמונות",
      icon: <GridView sx={{ fontSize: 48 }} />,
      gradient: "linear-gradient(135deg, #06B6D4, #10B981)",
      action: "צפייה",
    },
    {
      title: "הגדרות",
      description: "התאימו את האפליקציה לצרכים שלכם",
      detail: "נהלו פרופיל והעדפות",
      icon: <Settings sx={{ fontSize: 48 }} />,
      gradient: "linear-gradient(135deg, #10B981, #14B8A6)",
      action: "הגדרות",
    },
  ]

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(20, 184, 166, 0.1)",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img src="/logo.png" alt="TakeAPeek Logo" style={{ width: 40, height: 40 }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #14B8A6, #06B6D4)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              TakeAPeek
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Person sx={{ color: "#14B8A6", fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {user.name}
              </Typography>
              <Chip
                label={user.role}
                size="small"
                sx={{
                  background: "linear-gradient(45deg, #14B8A6, #06B6D4)",
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </Box>
            <IconButton onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} />
                יציאה
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: "linear-gradient(45deg, #1f2937, #374151)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ברוכים הבאים לדשבורד ניהול התמונות! 📸
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              נהלו את התמונות שלכם בקלות ובמהירות
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ mb: 8 }}>
            {dashboardCards.map((card, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      background: card.gradient,
                      color: "white",
                      borderRadius: 3,
                      overflow: "hidden",
                      position: "relative",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ mb: 3 }}>{card.icon}</Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                        {card.title}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                        {card.description}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {card.detail}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 4, pt: 0 }}>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "rgba(255, 255, 255, 0.2)",
                          color: "white",
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.3)",
                          },
                          fontWeight: 600,
                        }}
                      >
                        {card.action}
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
            <Paper
              sx={{
                p: 6,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(20, 184, 166, 0.1)",
                borderRadius: 4,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 2 }}>
                <Camera sx={{ fontSize: 32, color: "#14B8A6" }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: "#374151" }}>
                  מוכנים להתחיל לנהל את התמונות שלכם?
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                בחרו באחת מהאפשרויות למעלה כדי להתחיל
              </Typography>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  )
}

export default Dashboard
