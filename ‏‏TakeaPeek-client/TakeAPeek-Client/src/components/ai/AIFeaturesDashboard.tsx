"use client"

import { Box, Card, CardContent, Typography, Grid, CardActionArea, CardMedia, Container } from "@mui/material"
import BlurOffIcon from "@mui/icons-material/BlurOff"
import FaceIcon from "@mui/icons-material/Face"
import PeopleIcon from "@mui/icons-material/People"
import HomeIcon from "@mui/icons-material/Home"
import TagIcon from "@mui/icons-material/Tag"
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt"
import { useNavigate } from "react-router-dom"

const AIFeaturesDashboard = () => {
  const navigate = useNavigate()

  const features = [
    {
      title: "סינון תמונות מטושטשות",
      description: "הסתר תמונות לא חדות מהתצוגה ומההורדות",
      icon: <BlurOffIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
      path: "/ai-features/smart-filtering",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "זיהוי פנים",
      description: "מצא תמונות של אנשים ספציפיים בגלריה שלך",
      icon: <FaceIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
      path: "/ai-features/image-analysis",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "סינון לפי מספר אנשים",
      description: "הצג תמונות עם אדם אחד, זוגות או קבוצות",
      icon: <PeopleIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
      path: "/ai-features/image-analysis",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "סינון לפי סצנה",
      description: "הבחן בין צילומי פנים וחוץ",
      icon: <HomeIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
      path: "/ai-features/image-analysis",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "זיהוי הבעות פנים",
      description: "מצא תמונות עם חיוכים או הבעות פנים ספציפיות",
      icon: <SentimentSatisfiedAltIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
      path: "/ai-features/image-analysis",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "תיוג אוטומטי לפי תוכן",
      description: 'תיוג אוטומטי של תמונות לפי תוכן כמו "ים", "יער", "חתונה"',
      icon: <TagIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
      path: "/ai-features/free-search",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6, fontWeight: "bold" }}>
        יכולות AI לניהול תמונות
      </Typography>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 20px rgba(0,0,0,0.2)",
                },
                borderRadius: 2,
              }}
            >
              <CardActionArea
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                onClick={() => navigate(feature.path)}
              >
                <CardMedia component="img" height="140" image={feature.image} alt={feature.title} />
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>{feature.icon}</Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div" align="center">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {feature.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default AIFeaturesDashboard
