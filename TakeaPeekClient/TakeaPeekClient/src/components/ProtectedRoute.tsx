"use client"

import type React from "react"
import { Box, Typography, Button, Container } from "@mui/material"
import { motion } from "framer-motion"
import { Lock, Camera } from "@mui/icons-material"
import { useAuth } from "./AuthContext"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #f5f7fa 0%, #e4f1f9 100%)",
              borderRadius: 4,
              p: 6,
              border: "1px solid rgba(13, 129, 143, 0.1)",
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #0c678d, #0d818f)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                }}
              >
                <Lock sx={{ fontSize: 40, color: "white" }} />
              </Box>
            </motion.div>

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: "#0c678d" }}>
              נדרשת התחברות
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: "400px", mx: "auto" }}>
              כדי לגשת לתוכן זה, עליכם להתחבר תחילה לחשבון שלכם או ליצור חשבון חדש
            </Typography>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(45deg, #0c678d, #0d818f)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #0a5a6b, #0b6f7c)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
                startIcon={<Camera />}
              >
                התחבר עכשיו
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "#0d818f",
                  color: "#0d818f",
                  "&:hover": {
                    borderColor: "#0c678d",
                    backgroundColor: "rgba(13, 129, 143, 0.08)",
                  },
                }}
              >
                צור חשבון חדש
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
