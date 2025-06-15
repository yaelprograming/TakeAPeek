
"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
  Typography,
  TypographyProps
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { Camera, Upload, FolderOpen, ImageIcon, Search, Grid3x3, Sparkles } from "lucide-react"
import { Link , useNavigate } from "react-router-dom"
import React from "react"
import { useAuth } from "../../components/AuthContext"
import { AnimatePresence, motion } from "framer-motion"

// סגנון מותאם אישית לכותרות
// const GradientTypography = styled(Typography)(({ theme }) => ({
//   background: "linear-gradient(90deg, #0c678d 0%, #0d818f 50%, #0aa997 100%)",
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   backgroundClip: "text",
//   textFillColor: "transparent",
//   fontWeight: "bold",
// }))

export const GradientTypography = React.forwardRef<HTMLSpanElement, TypographyProps>(
    function GradientTypography(props, ref) {
      return (
        
        <Typography
          {...props}
          ref={ref}
          sx={{
            background: "linear-gradient(90deg, #0c678d, #0d818f)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            ...props.sx,
          }}
        />
      )
    }
  )

// סגנון מותאם אישית לכפתורים
const GradientButton = React.forwardRef(function GradientButton(
  props: React.ComponentProps<typeof Button> & { sx?: object },
) {
    return (
      
      <Button
        {...props} // Spread all props to the Button component
        sx={{
          background: "linear-gradient(90deg, #0c678d, #0d818f)",
          color: "white",
          "&:hover": {
            background: "linear-gradient(90deg, #0a5a6b, #0b6f7c)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease",
          ...props.sx,
        }}
      />
    );
  });

// סגנון מותאם אישית לכרטיסים
const FeatureCard = styled(Card)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)",
  },
}))

// אנימציה לתמונות
const AnimatedImage = styled("img")(() => ({
  width: "100%",
  height: "auto",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  transition: "transform 0.5s ease",
  "&:hover": {
    transform: "scale(1.03)",
  },
}))

const HomePage = () => {
  const [_, setLoaded] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const isMobile = useMediaQuery("(max-width:600px)")
  const isTablet = useMediaQuery("(max-width:960px)")
  const navigate = useNavigate()

  // אפקט טעינה
  useEffect(() => {
    setLoaded(true)
  }, [])

  // מידע על התכונות
  const features = [
    {
      title: "ארגון תמונות",
      description: "העלאה, הורדה ומיון תמונות בקלות. ארגון בתיקיות וניהול ספריית התמונות שלך.",
      icon: <FolderOpen size={40} color="#0c678d" />,
      // image: "/placeholder.svg?height=200&width=300",
       image: "img/logo.png?height=100&width=200",
    },
    {
      title: "זיהוי AI",
      description: "מיון וסינון תמונות באמצעות בינה מלאכותית. זיהוי פנים, אובייקטים וסצנות.",
      icon: <Sparkles size={40} color="#0d818f" />,
      // image: "/placeholder.svg?height=200&width=300",
      image: "img/logo.png?height=200&width=300",
    },
    {
      title: "יצירת קולאז'ים",
      description: "עיצוב קולאז'ים מרהיבים מהתמונות שלך בכמה קליקים פשוטים.",
      icon: <Grid3x3 size={40} color="#0aa997" />,
      image: "/img/logo.png??height=200&width=300",
    },
  ]

  const handleProtectedNavigation = (path: string) => {
    if (isAuthenticated) {
      navigate(path)
    }
  }
  return (
    <Box
      sx={{
        overflow: "hidden",
        direction: "rtl", // כיוון RTL לעברית
        textAlign: "right",
        minHeight: "100vh",
      }}
    >
      <p>אם אתם רוצים לראות הגלריה, בלי להצטרך להעלות תמונות<br></br>תכנסו ממשתמש: y0548566763@... סיסמה:123456</p>

      {/* חלק עליון - גיבור */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4f1f9 100%)",
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
          borderRadius: { xs: "0 0 24px 24px", md: "0 0 48px 48px" },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* הוספה */}
                {/* Background Animation Elements */}
                <motion.div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "linear-gradient(45deg, rgba(13, 129, 143, 0.1), rgba(10, 169, 151, 0.1))",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "linear-gradient(45deg, rgba(10, 169, 151, 0.1), rgba(12, 103, 141, 0.1))",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        {/* הוספה */}
        
        {/* <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={loaded} timeout={1000}>
                <Box>
                  <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-start" }}>
                    <img
                      src="/img/TakeAPeekLogo.png"
                      alt="TakeAPeek Logo"
                      style={{
                        height: isMobile ? "90px" : "110px",
                        marginBottom: "16px",
                      }}
                    />
                  </Box>
                  <GradientTypography variant={isMobile ? "h3" : "h2"} component="h1" sx={{ mb: 2 }}>
                    ארגון תמונות חכם לצלמים מקצועיים
                  </GradientTypography>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: "90%" }}>
                    נהל את אוסף התמונות שלך בקלות עם כלי AI מתקדמים, ארגון חכם וממשק משתמש אינטואיטיבי
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <GradientButton variant="contained" size="large" component={Link} to="/register">
                      התחל עכשיו
                    </GradientButton>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: "#0d818f",
                        color: "#0d818f",
                        "&:hover": {
                          borderColor: "#0aa997",
                          backgroundColor: "rgba(10, 169, 151, 0.04)",
                        },
                      }}
                      component={Link}
                      to="/gallery"
                    >
                      צפה בגלריה
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: "#0d818f",
                        color: "#0d818f",
                        "&:hover": {
                          borderColor: "#0aa997",
                          backgroundColor: "rgba(10, 169, 151, 0.04)",
                        },
                      }}
                      component={Link}
                      to="/design"
                    >
צור קולאז                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: "#0d818f",
                        color: "#0d818f",
                        "&:hover": {
                          borderColor: "#0aa997",
                          backgroundColor: "rgba(10, 169, 151, 0.04)",
                        },
                      }}
                      component={Link}
                      to="/calendar"
                    >
ליומן שלי                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={loaded} timeout={1500}>
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: "300px", md: "400px" },
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      width: "80%",
                      height: "80%",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #0c678d 0%, #0aa997 100%)",
                      transform: "rotate(-5deg)",
                      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h4" color="white" sx={{ p: 2, textAlign: "center" }}>
                      TakeAPeek
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      width: "70%",
                      height: "70%",
                      borderRadius: "16px",
                      background: "white",
                      transform: "rotate(3deg) translateY(-10px)",
                      boxShadow: "0 15px 25px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Camera size={60} color="#0d818f" />
                  </Box>
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <GradientTypography variant="h3" component="h2" sx={{ mb: 2 }}>
            תכונות מתקדמות
          </GradientTypography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: "800px", mx: "auto" }}>
            גלה את הכלים החדשניים שיהפכו את ניהול התמונות שלך לחוויה פשוטה ויעילה
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in={loaded} timeout={1000 + index * 500}>
                <FeatureCard>
                  <CardMedia component="img" height="200" image={feature.image} alt={feature.title} />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      {feature.icon}
                      <Typography variant="h5" component="h3" sx={{ mr: 1, fontWeight: "bold" }}>
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        sx={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4f1f9 100%)",
          py: { xs: 8, md: 12 },
          borderRadius: { xs: "24px", md: "48px" },
          my: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Slide direction="right" in={loaded} timeout={1000}>
                <Box>
                  <GradientTypography variant="h3" component="h2" sx={{ mb: 3 }}>
                    טכנולוגיית AI מתקדמת
                  </GradientTypography>
                  <Typography variant="body1" sx={{ mb: 4 }}>
                    האפליקציה שלנו משתמשת בטכנולוגיית בינה מלאכותית מתקדמת לזיהוי פנים, מיון תמונות לפי נושאים, וארגון
                    חכם של הספרייה שלך. המערכת לומדת את ההעדפות שלך ומשתפרת עם הזמן.
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          borderRadius: "50%",
                          bgcolor: "#0c678d",
                          width: 40,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Search size={24} color="white" />
                      </Box>
                      <Typography variant="h6">זיהוי פנים וסצנות אוטומטי</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          borderRadius: "50%",
                          bgcolor: "#0d818f",
                          width: 40,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ImageIcon size={24} color="white" />
                      </Box>
                      <Typography variant="h6">מיון חכם לפי איכות ותוכן</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          borderRadius: "50%",
                          bgcolor: "#0aa997",
                          width: 40,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Upload size={24} color="white" />
                      </Box>
                      <Typography variant="h6">המלצות חכמות לארגון תמונות</Typography>
                    </Box>
                  </Box>
                </Box>
              </Slide>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={loaded} timeout={1500}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 2,
                    transform: isTablet ? "none" : "rotate(3deg)",
                  }}
                >
                  <AnimatedImage src="/placeholder.svg?height=200&width=200" alt="AI Feature 1" />
                  <AnimatedImage
                    src="/placeholder.svg?height=200&width=200"
                    alt="AI Feature 2"
                    sx={{ transform: "translateY(20px)" }}
                  />
                  <AnimatedImage
                    src="/placeholder.svg?height=200&width=200"
                    alt="AI Feature 3"
                    sx={{ transform: "translateY(-20px)" }}
                  />
                  <AnimatedImage src="/placeholder.svg?height=200&width=200" alt="AI Feature 4" />
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: "center" }}>
        <Fade in={loaded} timeout={1000}>
          <Box>
            <GradientTypography variant="h3" component="h2" sx={{ mb: 3 }}>
              מוכנים להתחיל?
            </GradientTypography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              הצטרפו לאלפי צלמים שכבר משתמשים ב-TakeAPeek לניהול ספריית התמונות שלהם
            </Typography>
            <GradientButton variant="contained" size="large" sx={{ px: 4, py: 1.5 }} component={Link} to="/register">
              צור חשבון חינם
            </GradientButton>
          </Box>
        </Fade>
      </Container>

      <Box
        sx={{
          bgcolor: "#f5f7fa",
          py: 4,
          borderRadius: "24px 24px 0 0",
          mt: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src="/img/TakeAPeekLogo.png" alt="TakeAPeek Logo" style={{ height: "40px", marginLeft: "12px" }} />
                <Typography variant="body2" color="text.secondary">
                  &copy; {new Date().getFullYear()} TakeAPeek. כל הזכויות שמורות.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 3 }}>
                <Link to="/about" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    אודות
                  </Typography>
                </Link>
                <RouterLink to="/privacy" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    פרטיות
                  </Typography>
                </Link>
                <Link to="/terms" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    תנאי שימוש
                  </Typography>
                </Link>
                <Link to="/contact" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    צור קשר
                  </Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default HomePage
 */}

<Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-start" }}>
                  <motion.img
                    src="/img/TakeAPeekLogo.png"
                    alt="TakeAPeek Logo"
                    style={{
                      height: isMobile ? "90px" : "110px",
                      marginBottom: "16px",
                    }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </Box>

                <AnimatePresence>
                  {isAuthenticated ? (
                    <motion.div
                      key="authenticated"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <GradientTypography variant={isMobile ? "h3" : "h2"} component="h1" sx={{ mb: 2 }}>
                        ברוכים השבים, {user?.name}! 🎉
                      </GradientTypography>
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: "90%" }}>
                        המשיכו לנהל את אוסף התמונות שלכם עם הכלים המתקדמים שלנו
                      </Typography>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="guest"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <GradientTypography variant={isMobile ? "h3" : "h2"} component="h1" sx={{ mb: 2 }}>
                        ארגון תמונות חכם לצלמים מקצועיים
                      </GradientTypography>
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: "90%" }}>
                        נהל את אוסף התמונות שלך בקלות עם כלי AI מתקדמים, ארגון חכם וממשק משתמש אינטואיטיבי
                      </Typography>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <GradientButton
                      variant="contained"
                      size="large"
                      onClick={() => handleProtectedNavigation("/gallery")}
                      startIcon={<Camera />}
                    >
                      {isAuthenticated ? "לגלריה שלי" : "צפה בגלריה"}
                    </GradientButton>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: "#0d818f",
                        color: "#0d818f",
                        "&:hover": {
                          borderColor: "#0aa997",
                          backgroundColor: "rgba(10, 169, 151, 0.04)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                      onClick={() => handleProtectedNavigation("/design")}
                      startIcon={<Grid3x3 />}
                    >
                      צור קולאז'
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: "#0d818f",
                        color: "#0d818f",
                        "&:hover": {
                          borderColor: "#0aa997",
                          backgroundColor: "rgba(10, 169, 151, 0.04)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                      onClick={() => handleProtectedNavigation("/calendar")}
                      startIcon={<FolderOpen />}
                    >
                      ליומן שלי
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: "300px", md: "400px" },
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <motion.div
                    style={{
                      position: "absolute",
                      width: "80%",
                      height: "80%",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #0c678d 0%, #0aa997 100%)",
                      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    animate={{
                      rotateY: [0, 10, 0],
                      rotateX: [0, 5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Typography variant="h4" color="white" sx={{ p: 2, textAlign: "center", fontWeight: 700 }}>
                      TakeAPeek
                    </Typography>
                  </motion.div>

                  <motion.div
                    style={{
                      position: "absolute",
                      width: "70%",
                      height: "70%",
                      borderRadius: "16px",
                      background: "white",
                      boxShadow: "0 15px 25px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 2,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      rotateZ: [0, 3, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Camera size={60} color="#0d818f" />
                    </motion.div>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* חלק תכונות */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <GradientTypography variant="h3" component="h2" sx={{ mb: 2 }}>
              תכונות מתקדמות
            </GradientTypography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: "800px", mx: "auto" }}>
              גלה את הכלים החדשניים שיהפכו את ניהול התמונות שלך לחוויה פשוטה ויעילה
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <FeatureCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={feature.image}
                    alt={feature.title}
                    sx={{
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        style={{ marginLeft: "8px" }}
                      >
                        {feature.icon}
                      </motion.div>
                      <Typography variant="h5" component="h3" sx={{ fontWeight: "bold" }}>
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* חלק AI */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4f1f9 100%)",
          py: { xs: 8, md: 12 },
          borderRadius: { xs: "24px", md: "48px" },
          my: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "#0d818f",
              opacity: 0.3,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            initial={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}

        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <GradientTypography variant="h3" component="h2" sx={{ mb: 3 }}>
                  טכנולוגיית AI מתקדמת
                </GradientTypography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  האפליקציה שלנו משתמשת בטכנולוגיית בינה מלאכותית מתקדמת לזיהוי פנים, מיון תמונות לפי נושאים, וארגון חכם
                  של הספרייה שלך. המערכת לומדת את ההעדפות שלך ומשתפרת עם הזמן.
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[
                    { icon: <Search size={24} color="white" />, text: "זיהוי פנים וסצנות אוטומטי", color: "#0c678d" },
                    { icon: <ImageIcon size={24} color="white" />, text: "מיון חכם לפי איכות ותוכן", color: "#0d818f" },
                    { icon: <Upload size={24} color="white" />, text: "המלצות חכמות לארגון תמונות", color: "#0aa997" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 10 }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <motion.div whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.3 }}>
                          <Box
                            sx={{
                              borderRadius: "50%",
                              bgcolor: item.color,
                              width: 40,
                              height: 40,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {item.icon}
                          </Box>
                        </motion.div>
                        <Typography variant="h6">{item.text}</Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 2,
                    transform: isTablet ? "none" : "rotate(3deg)",
                  }}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 5 : -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <AnimatedImage
                        src="/placeholder.svg?height=200&width=200"
                        alt={`AI Feature ${i}`}
                        sx={{
                          transform: i % 2 === 0 ? "translateY(20px)" : "translateY(-20px)",
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* חלק קריאה לפעולה */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <GradientTypography variant="h3" component="h2" sx={{ mb: 3 }}>
            {isAuthenticated ? "המשיכו לחקור!" : "מוכנים להתחיל?"}
          </GradientTypography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            {isAuthenticated
              ? "גלו עוד תכונות מדהימות ונהלו את התמונות שלכם בצורה המתקדמת ביותר"
              : "הצטרפו לאלפי צלמים שכבר משתמשים ב-TakeAPeek לניהול ספריית התמונות שלהם"}
          </Typography>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <GradientButton
              variant="contained"
              size="large"
              sx={{ px: 4, py: 1.5 }}
              onClick={() => handleProtectedNavigation(isAuthenticated ? "/gallery" : "/register")}
              startIcon={<Camera />}
            >
              {isAuthenticated ? "לגלריה שלי" : "צור חשבון חינם"}
            </GradientButton>
          </motion.div>
        </motion.div>
      </Container>

      {/* פוטר */}
      <Box
        sx={{
          bgcolor: "#f5f7fa",
          py: 4,
          borderRadius: "24px 24px 0 0",
          mt: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src="/img/TakeAPeekLogo.png" alt="TakeAPeek Logo" style={{ height: "40px", marginLeft: "12px" }} />
                <Typography variant="body2" color="text.secondary">
                  &copy; {new Date().getFullYear()} TakeAPeek. כל הזכויות שמורות.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 3 }}>
                <Link to="/about" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    אודות
                  </Typography>
                </Link>
                <Link to="/privacy" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    פרטיות
                  </Typography>
                </Link>
                <Link to="/terms" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    תנאי שימוש
                  </Typography>
                </Link>
                <Link to="/contact" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    צור קשר
                  </Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default HomePage
