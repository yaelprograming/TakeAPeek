// // "use client"

// // import { Box, Card, CardContent, Typography, Grid, CardActionArea, CardMedia, Container } from "@mui/material"
// // import BlurOffIcon from "@mui/icons-material/BlurOff"
// // import FaceIcon from "@mui/icons-material/Face"
// // import PeopleIcon from "@mui/icons-material/People"
// // import HomeIcon from "@mui/icons-material/Home"
// // import TagIcon from "@mui/icons-material/Tag"
// // import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt"
// // import { useNavigate } from "react-router-dom"

// // const AIFeaturesDashboard = () => {
// //   const navigate = useNavigate()

// //   const features = [
// //     {
// //       title: "סינון תמונות מטושטשות",
// //       description: "הסתר תמונות לא חדות מהתצוגה ומההורדות",
// //       icon: <BlurOffIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
// //       path: "/ai-features/smart-filtering",
// //       image: "/placeholder.svg?height=200&width=300",
// //     },
// //     {
// //       title: "זיהוי פנים",
// //       description: "מצא תמונות של אנשים ספציפיים בגלריה שלך",
// //       icon: <FaceIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
// //       path: "/ai-features/image-analysis",
// //       image: "/placeholder.svg?height=200&width=300",
// //     },
// //     {
// //       title: "סינון לפי מספר אנשים",
// //       description: "הצג תמונות עם אדם אחד, זוגות או קבוצות",
// //       icon: <PeopleIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
// //       path: "/ai-features/image-analysis",
// //       image: "/placeholder.svg?height=200&width=300",
// //     },
// //     {
// //       title: "סינון לפי סצנה",
// //       description: "הבחן בין צילומי פנים וחוץ",
// //       icon: <HomeIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
// //       path: "/ai-features/image-analysis",
// //       image: "/placeholder.svg?height=200&width=300",
// //     },
// //     {
// //       title: "זיהוי הבעות פנים",
// //       description: "מצא תמונות עם חיוכים או הבעות פנים ספציפיות",
// //       icon: <SentimentSatisfiedAltIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
// //       path: "/ai-features/image-analysis",
// //       image: "/placeholder.svg?height=200&width=300",
// //     },
// //     {
// //       title: "תיוג אוטומטי לפי תוכן",
// //       description: 'תיוג אוטומטי של תמונות לפי תוכן כמו "ים", "יער", "חתונה"',
// //       icon: <TagIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
// //       path: "/ai-features/free-search",
// //       image: "/placeholder.svg?height=200&width=300",
// //     },
// //   ]

// //   return (
// //     <Container maxWidth="lg" sx={{ py: 6 }}>
// //       <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6, fontWeight: "bold" }}>
// //         יכולות AI לניהול תמונות
// //       </Typography>

// //       <Grid container spacing={4}>
// //         {features.map((feature, index) => (
// //           <Grid item xs={12} sm={6} md={4} key={index}>
// //             <Card
// //               sx={{
// //                 height: "100%",
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 transition: "transform 0.3s, box-shadow 0.3s",
// //                 "&:hover": {
// //                   transform: "translateY(-8px)",
// //                   boxShadow: "0 12px 20px rgba(0,0,0,0.2)",
// //                 },
// //                 borderRadius: 2,
// //               }}
// //             >
// //               <CardActionArea
// //                 sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
// //                 onClick={() => navigate(feature.path)}
// //               >
// //                 <CardMedia component="img" height="140" image={feature.image} alt={feature.title} />
// //                 <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>{feature.icon}</Box>
// //                 <CardContent sx={{ flexGrow: 1 }}>
// //                   <Typography gutterBottom variant="h5" component="div" align="center">
// //                     {feature.title}
// //                   </Typography>
// //                   <Typography variant="body2" color="text.secondary" align="center">
// //                     {feature.description}
// //                   </Typography>
// //                 </CardContent>
// //               </CardActionArea>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>
// //     </Container>
// //   )
// // }

// // export default AIFeaturesDashboard

// "use client"

// import { Box, Card, CardContent, Typography, Grid, CardActionArea, CardMedia, Container } from "@mui/material"
// import BlurOffIcon from "@mui/icons-material/BlurOff"
// import FaceIcon from "@mui/icons-material/Face"
// import PeopleIcon from "@mui/icons-material/People"
// import HomeIcon from "@mui/icons-material/Home"
// import TagIcon from "@mui/icons-material/Tag"
// import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt"
// import { useNavigate } from "react-router-dom"

// const AIFeaturesDashboard = () => {
//   const navigate = useNavigate()

//   const features = [
//     {
//       title: "סינון תמונות מטושטשות",
//       description: "הסתר תמונות לא חדות מהתצוגה ומההורדות",
//       icon: <BlurOffIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
//       path: "/ai-features/smart-filtering",
//       image: "/placeholder.svg?height=200&width=300",
//     },
//     {
//       title: "זיהוי פנים",
//       description: "מצא תמונות של אנשים ספציפיים בגלריה שלך",
//       icon: <FaceIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
//       path: "/ai-features/image-analysis",
//       image: "/placeholder.svg?height=200&width=300",
//     },
//     {
//       title: "סינון לפי מספר אנשים",
//       description: "הצג תמונות עם אדם אחד, זוגות או קבוצות",
//       icon: <PeopleIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
//       path: "/ai-features/image-analysis",
//       image: "/placeholder.svg?height=200&width=300",
//     },
//     {
//       title: "סינון לפי סצנה",
//       description: "הבחן בין צילומי פנים וחוץ",
//       icon: <HomeIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
//       path: "/ai-features/image-analysis",
//       image: "/placeholder.svg?height=200&width=300",
//     },
//     {
//       title: "זיהוי הבעות פנים",
//       description: "מצא תמונות עם חיוכים או הבעות פנים ספציפיות",
//       icon: <SentimentSatisfiedAltIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
//       path: "/ai-features/image-analysis",
//       image: "/placeholder.svg?height=200&width=300",
//     },
//     {
//       title: "תיוג אוטומטי לפי תוכן",
//       description: 'תיוג אוטומטי של תמונות לפי תוכן כמו "ים", "יער", "חתונה"',
//       icon: <TagIcon sx={{ fontSize: 60, color: "#6200ea" }} />,
//       path: "/ai-features/free-search",
//       image: "/placeholder.svg?height=200&width=300",
//     },
//   ]

//   return (
//     <Container maxWidth="lg" sx={{ py: 6 }}>
//       <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6, fontWeight: "bold" }}>
//         יכולות AI לניהול תמונות
//       </Typography>

//       <Grid container spacing={4}>
//         {features.map((feature, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card
//               sx={{
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 transition: "transform 0.3s, box-shadow 0.3s",
//                 "&:hover": {
//                   transform: "translateY(-8px)",
//                   boxShadow: "0 12px 20px rgba(0,0,0,0.2)",
//                 },
//                 borderRadius: 2,
//               }}
//             >
//               <CardActionArea
//                 sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
//                 onClick={() => navigate(feature.path)}
//               >
//                 <CardMedia component="img" height="140" image={feature.image} alt={feature.title} />
//                 <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>{feature.icon}</Box>
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography gutterBottom variant="h5" component="div" align="center">
//                     {feature.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" align="center">
//                     {feature.description}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   )
// }

// export default AIFeaturesDashboard


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Chip,
  InputAdornment,
  IconButton,
  Alert,
  Autocomplete,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import TagIcon from "@mui/icons-material/Tag"
import { MyFile } from "../../types/types"
import { analyzeAllImages, getFolderContents } from "../../lib/api-client"

interface TaggedImage extends MyFile {
  tags?: string[]
}

const FreeSearch = () => {
  const [files, setFiles] = useState<TaggedImage[]>([])
  const [filteredFiles, setFilteredFiles] = useState<TaggedImage[]>([])
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    fetchAllImages()
  }, [])

  const fetchAllImages = async () => {
    setLoading(true)
    try {
      // קריאה לנקודת הקצה של תיקיית השורש
      const data = await getFolderContents("0")

      // סינון רק קבצי תמונה שלא נמחקו
      const imageFiles = data.files?.filter((file: MyFile) => !file.isDeleted) || []

      setFiles(imageFiles)
      setFilteredFiles(imageFiles)
    } catch (error) {
      console.error("Error fetching images:", error)
    } finally {
      setLoading(false)
    }
  }

  const analyzeImages = async () => {
    setAnalyzing(true)
    try {
      // קריאה לנקודת הקצה של ניתוח תמונות
      const analysisResults = await analyzeAllImages()

      // עדכון התמונות עם תוצאות הניתוח
      const analyzedFiles = files.map((file) => {
        const fileAnalysis = analysisResults.find((item: any) => item.fileId === file.id)

        // חילוץ תגיות מקטגוריה
        let tags: string[] = []
        if (fileAnalysis?.analysis?.category) {
          // פיצול הקטגוריה לתגיות נפרדות
          tags = fileAnalysis.analysis.category
            .split(/[,/\s]+/) // פיצול לפי פסיקים, קווים נטויים ורווחים
            .filter(Boolean) // הסרת ערכים ריקים
        }

        return {
          ...file,
          tags,
          analysis: fileAnalysis?.analysis,
        }
      })

      // איסוף כל התגיות הייחודיות
      const allTags = new Set<string>()
      analyzedFiles.forEach((file) => {
        file.tags?.forEach((tag) => allTags.add(tag))
      })

      setFiles(analyzedFiles)
      setFilteredFiles(analyzedFiles)
      setAvailableTags(Array.from(allTags).sort())
      setAnalysisComplete(true)
    } catch (error) {
      console.error("Error analyzing images:", error)
      alert("אירעה שגיאה בניתוח התמונות")
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSearch = () => {
    if (!searchTerm && selectedTags.length === 0) {
      setFilteredFiles(files)
      return
    }

    const filtered = files.filter((file) => {
      // Check if file matches search term
      const matchesSearch =
        searchTerm === "" ||
        file.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      // Check if file has all selected tags
      const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => file.tags?.includes(tag))

      return matchesSearch && matchesTags
    })

    setFilteredFiles(filtered)
  }

  const handleTagSelect = (_event: React.SyntheticEvent, newValue: string[]) => {
    setSelectedTags(newValue)
  }

  useEffect(() => {
    if (analysisComplete) {
      handleSearch()
    }
  }, [selectedTags]) // Run search when tags change

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress size={60} />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
          <TagIcon sx={{ mr: 1, fontSize: 40, color: "#6200ea" }} />
          חיפוש חכם לפי תוכן
        </Typography>
        <Typography variant="body1" paragraph>
          מערכת ה-AI תנתח את התמונות שלך ותזהה אוטומטית את תוכן התמונה. לאחר הניתוח, תוכל לחפש תמונות לפי תיאור או לסנן
          לפי תגיות שזוהו.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={analyzeImages}
            disabled={analyzing || analysisComplete}
            startIcon={analyzing ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {analyzing ? "מנתח תמונות..." : "נתח תמונות"}
          </Button>
        </Box>

        {analysisComplete && (
          <Alert severity="success" sx={{ mb: 3 }}>
            ניתוח הושלם! ניתן לחפש תמונות לפי תוכן או לסנן לפי תגיות
          </Alert>
        )}
      </Paper>

      {analysisComplete && (
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="חיפוש חופשי"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearch}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                multiple
                options={availableTags}
                value={selectedTags}
                onChange={handleTagSelect}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="סנן לפי תגיות" placeholder="בחר תגיות" />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                      icon={<TagIcon />}
                    />
                  ))
                }
              />
            </Grid>
          </Grid>
        </Paper>
      )}

      <Grid container spacing={3}>
        {filteredFiles.map((file) => {
          const imageUrl = `https://664133766426takeapeek.s3.eu-north-1.amazonaws.com/${file.s3Key}`
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={file.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={imageUrl || "/placeholder.svg?height=200&width=300"}
                  alt={file.name}
                  sx={{ objectFit: "cover" }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" noWrap>
                    {file.name}
                  </Typography>

                  {file.tags && file.tags.length > 0 && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                      {file.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          icon={<TagIcon sx={{ fontSize: "0.8rem" }} />}
                          sx={{ fontSize: "0.7rem" }}
                          onClick={() => {
                            if (!selectedTags.includes(tag)) {
                              setSelectedTags([...selectedTags, tag])
                            }
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {filteredFiles.length === 0 && !loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
          <Typography variant="h6" color="text.secondary">
            לא נמצאו תמונות להצגה
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default FreeSearch
