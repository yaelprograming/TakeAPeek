"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  Tab,
  Tabs,
  Alert,
  IconButton,
  InputAdornment,
  Chip,
  useMediaQuery,
} from "@mui/material"
import { Close, Visibility, VisibilityOff, Email, Person, Lock, Camera } from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import { useSnackbar } from "notistack"
import { useAuth } from "./AuthContext"

interface AuthModalProps {
  open: boolean
  onClose: () => void
  mode: "login" | "register"
  onModeChange: (mode: "login" | "register") => void
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, mode, onModeChange }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" })
  const { login, register } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const isMobile = useMediaQuery("(max-width:600px)")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(loginData.email, loginData.password)
      if (success) {
        enqueueSnackbar("ברוכים הבאים! התחברתם בהצלחה 📸", { variant: "success" })
        onClose()
        setLoginData({ email: "", password: "" })
      } else {
        enqueueSnackbar("אימייל או סיסמה שגויים", { variant: "error" })
      }
    } catch (error) {
      enqueueSnackbar("שגיאה בחיבור. אנא נסו שוב מאוחר יותר", { variant: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await register(registerData.name, registerData.email, registerData.password)
      if (success) {
        enqueueSnackbar("ברוכים הבאים למשפחה! נרשמתם בהצלחה 🎉", { variant: "success" })
        onClose()
        setRegisterData({ name: "", email: "", password: "" })
      } else {
        enqueueSnackbar("שגיאה בהרשמה. אנא בדקו את הפרטים ונסו שוב", { variant: "error" })
      }
    } catch (error) {
      enqueueSnackbar("שגיאה בחיבור. אנא נסו שוב מאוחר יותר", { variant: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setLoginData({ email: "", password: "" })
    setRegisterData({ name: "", email: "", password: "" })
    setShowPassword(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 4,
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(13, 129, 143, 0.1)",
          overflow: "hidden",
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: "relative", overflow: "hidden" }}>
        {/* Background Animation */}
        <Box
          sx={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "linear-gradient(45deg, rgba(13, 129, 143, 0.1), rgba(10, 169, 151, 0.1))",
            filter: "blur(40px)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "linear-gradient(45deg, rgba(10, 169, 151, 0.1), rgba(12, 103, 141, 0.1))",
            filter: "blur(40px)",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1, p: 4 }}>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <motion.img
                src="/img/TakeAPeekLogo.png"
                alt="TakeAPeek"
                style={{ height: "50px" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(45deg, #0c678d, #0d818f)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TakeAPeek
              </Typography>
            </Box>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>

          {/* Tabs */}
          <Tabs
            value={mode === "login" ? 0 : 1}
            onChange={(_, newValue) => onModeChange(newValue === 0 ? "login" : "register")}
            variant="fullWidth"
            sx={{
              mb: 4,
              "& .MuiTab-root": {
                fontSize: "1.1rem",
                fontWeight: 600,
                py: 2,
              },
              "& .MuiTabs-indicator": {
                background: "linear-gradient(45deg, #0c678d, #0d818f)",
                height: 3,
                borderRadius: 2,
              },
            }}
          >
            <Tab label="התחברות" />
            <Tab label="הרשמה" />
          </Tabs>

          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    ברוכים השבים!
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    התחברו לחשבון שלכם ותתחילו לנהל את התמונות
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleLogin}>
                  <TextField
                    fullWidth
                    label="אימייל"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: "#0d818f" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                    required
                  />
                  <TextField
                    fullWidth
                    label="סיסמה"
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "#0d818f" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 4 }}
                    required
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    sx={{
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      background: "linear-gradient(45deg, #0c678d, #0d818f)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #0a5a6b, #0b6f7c)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {isLoading ? "מתחבר..." : "התחברות"}
                  </Button>
                </Box>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    הצטרפו אלינו!
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    צרו חשבון חדש והתחילו לנהל את התמונות שלכם
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleRegister}>
                  <TextField
                    fullWidth
                    label="שם מלא"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: "#0d818f" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                    required
                  />
                  <TextField
                    fullWidth
                    label="אימייל"
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: "#0d818f" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                    required
                  />
                  <TextField
                    fullWidth
                    label="סיסמה"
                    type={showPassword ? "text" : "password"}
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "#0d818f" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                    required
                  />

                  <Alert
                    severity="info"
                    sx={{
                      mb: 3,
                      background: "rgba(13, 129, 143, 0.1)",
                      border: "1px solid rgba(13, 129, 143, 0.2)",
                    }}
                    icon={<Camera sx={{ color: "#0d818f" }} />}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        תפקיד: עורך תמונות
                      </Typography>
                      <Chip
                        label="Editor"
                        size="small"
                        sx={{
                          background: "linear-gradient(45deg, #0c678d, #0d818f)",
                          color: "white",
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                    <Typography variant="caption">
                      כל המשתמשים נרשמים כעורכי תמונות עם הרשאות מלאות לניהול וארגון
                    </Typography>
                  </Alert>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    sx={{
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      background: "linear-gradient(45deg, #0c678d, #0d818f)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #0a5a6b, #0b6f7c)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {isLoading ? "נרשם..." : "הרשמה"}
                  </Button>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(5deg); }
            }
          `}
        </style>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
