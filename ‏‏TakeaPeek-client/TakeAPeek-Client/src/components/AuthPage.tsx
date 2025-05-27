"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Tab,
  Tabs,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Alert,
  Chip,
  useTheme,
  alpha,
} from "@mui/material"
import {
  Camera,
  Visibility,
  VisibilityOff,
  Email,
  Person,
  Lock,
  AutoAwesome,
  Image as ImageIcon,
  Palette,
  FlashOn,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { useSnackbar } from "notistack"

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
  roleName: string
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const AuthPage: React.FC = () => {
  const apiUrl="http://localhost:5293/auth"

  const [tabValue, setTabValue] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState<LoginData>({ email: "", password: "" })
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    roleName: "Editor",
  })

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("token", data.token)
        enqueueSnackbar("ברוכים הבאים! התחברתם בהצלחה 📸", { variant: "success" })
        navigate("/")
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
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("token", data.token)
        enqueueSnackbar("ברוכים הבאים למשפחה! נרשמתם בהצלחה 🎉", { variant: "success" })
        navigate("/")
      } else {
        enqueueSnackbar("שגיאה בהרשמה. אנא בדקו את הפרטים ונסו שוב", { variant: "error" })
      }
    } catch (error) {
      enqueueSnackbar("שגיאה בחיבור. אנא נסו שוב מאוחר יותר", { variant: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: <ImageIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: "ניהול חכם",
      description: "ארגון אוטומטי של תמונות עם תגיות ומטאדאטה",
      color: theme.palette.primary.main,
    },
    {
      icon: <Palette sx={{ fontSize: 48, color: theme.palette.secondary.main }} />,
      title: "עריכה מתקדמת",
      description: "כלי עריכה מקצועיים ופילטרים איכותיים",
      color: theme.palette.secondary.main,
    },
    {
      icon: <FlashOn sx={{ fontSize: 48, color: "#10B981" }} />,
      title: "ביצועים מהירים",
      description: "טעינה מהירה ועיבוד תמונות בזמן אמת",
      color: "#10B981",
    },
  ]

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${alpha("#14B8A6", 0.1)} 0%, ${alpha("#06B6D4", 0.1)} 50%, ${alpha("#10B981", 0.1)} 100%)`,
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `linear-gradient(45deg, ${alpha("#14B8A6", 0.3)}, ${alpha("#06B6D4", 0.3)})`,
          filter: "blur(60px)",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -200,
          left: -200,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `linear-gradient(45deg, ${alpha("#06B6D4", 0.3)}, ${alpha("#10B981", 0.3)})`,
          filter: "blur(60px)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <Grid container sx={{ height: "100vh" }}>
        {/* Left Side - Branding */}
        <Grid item xs={12} lg={6}>
          <Container
            maxWidth="md"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 4,
            }}
          >
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {/* Logo */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <motion.img
                  src="/logo.png"
                  alt="TakeAPeek Logo"
                  style={{
                    width: 160,
                    height: 160,
                    marginBottom: 24,
                    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "3rem", md: "4rem", lg: "5rem" },
                    fontWeight: "bold",
                    background: `linear-gradient(45deg, #14B8A6, #06B6D4, #10B981)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                  }}
                >
                  TakeAPeek
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 300,
                    mb: 3,
                  }}
                >
                  from click to pick
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 6 }}>
                  <Camera sx={{ color: "#14B8A6", fontSize: 32 }} />
                  <Typography variant="h6" sx={{ color: "#14B8A6", fontWeight: 500 }}>
                    אפליקציית ניהול תמונות מתקדמת לצלמים
                  </Typography>
                  <AutoAwesome sx={{ color: "#14B8A6", fontSize: 32 }} />
                </Box>
              </Box>

              {/* Features */}
              <Grid container spacing={3} sx={{ mb: 6 }}>
                {features.map((feature, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card
                        sx={{
                          p: 3,
                          textAlign: "center",
                          background: alpha("#ffffff", 0.8),
                          backdropFilter: "blur(10px)",
                          border: `1px solid ${alpha(feature.color, 0.2)}`,
                          borderRadius: 3,
                          height: "100%",
                        }}
                      >
                        <CardContent>
                          <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {feature.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              {/* Quote */}
              <Typography
                variant="h6"
                sx={{
                  fontStyle: "italic",
                  textAlign: "center",
                  color: "text.secondary",
                  fontWeight: 300,
                }}
              >
                "הפכו כל תמונה לסיפור, וכל רגע לזיכרון נצחי"
              </Typography>
            </motion.div>
          </Container>
        </Grid>

        {/* Right Side - Auth Forms */}
        <Grid item xs={12} lg={6}>
          <Container
            maxWidth="sm"
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ width: "100%" }}
            >
              <Paper
                elevation={24}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: alpha("#ffffff", 0.95),
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${alpha("#14B8A6", 0.1)}`,
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{
                    mb: 3,
                    "& .MuiTab-root": {
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      py: 2,
                    },
                    "& .MuiTabs-indicator": {
                      background: "linear-gradient(45deg, #14B8A6, #06B6D4)",
                      height: 3,
                      borderRadius: 2,
                    },
                  }}
                >
                  <Tab label="התחברות" />
                  <Tab label="הרשמה" />
                </Tabs>

                {/* Login Tab */}
                <TabPanel value={tabValue} index={0}>
                  <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      ברוכים השבים!
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      התחברו לחשבון שלכם ותתחילו לנהל את התמונות
                    </Typography>
                  </Box>

                  <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
                    <TextField
                      fullWidth
                      label="אימייל"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: "#14B8A6" }} />
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
                            <Lock sx={{ color: "#14B8A6" }} />
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
                        background: "linear-gradient(45deg, #14B8A6, #06B6D4)",
                        "&:hover": {
                          background: "linear-gradient(45deg, #0F766E, #0891B2)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {isLoading ? "מתחבר..." : "התחברות"}
                    </Button>
                  </Box>
                </TabPanel>

                {/* Register Tab */}
                <TabPanel value={tabValue} index={1}>
                  <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      הצטרפו אלינו!
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      צרו חשבון חדש והתחילו לנהל את התמונות שלכם
                    </Typography>
                  </Box>

                  <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
                    <TextField
                      fullWidth
                      label="שם מלא"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: "#14B8A6" }} />
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
                            <Email sx={{ color: "#14B8A6" }} />
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
                            <Lock sx={{ color: "#14B8A6" }} />
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
                        background: alpha("#14B8A6", 0.1),
                        border: `1px solid ${alpha("#14B8A6", 0.2)}`,
                      }}
                      icon={<Camera sx={{ color: "#14B8A6" }} />}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          תפקיד: עורך תמונות
                        </Typography>
                        <Chip
                          label="Editor"
                          size="small"
                          sx={{
                            background: "linear-gradient(45deg, #14B8A6, #06B6D4)",
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
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
                        background: "linear-gradient(45deg, #14B8A6, #06B6D4)",
                        "&:hover": {
                          background: "linear-gradient(45deg, #0F766E, #0891B2)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {isLoading ? "נרשם..." : "הרשמה"}
                    </Button>
                  </Box>
                </TabPanel>
              </Paper>

              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  mt: 4,
                  color: "text.secondary",
                }}
              >
                © 2024 TakeAPeek - אפליקציית ניהול תמונות מתקדמת לצלמים
              </Typography>
            </motion.div>
          </Container>
        </Grid>
      </Grid>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}
      </style>
    </Box>
  )
}

export default AuthPage
