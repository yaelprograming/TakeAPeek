// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Button,
//   Switch,
//   FormControlLabel,
//   CircularProgress,
//   Chip,
//   Divider,
//   Paper,
//   Alert,
// } from "@mui/material"
// import BlurOffIcon from "@mui/icons-material/BlurOff"
// import axios from "axios"
// import type { MyFile } from "../../types/types"

// const API_BASE_URL = "http://localhost:5293"

// const SmartFiltering = () => {
//   const [files, setFiles] = useState<MyFile[]>([])
//   const [filteredFiles, setFilteredFiles] = useState<MyFile[]>([])
//   const [loading, setLoading] = useState(true)
//   const [analyzing, setAnalyzing] = useState(false)
//   const [hideBlurry, setHideBlurry] = useState(false)
//   const [analysisComplete, setAnalysisComplete] = useState(false)
//   const [blurryCount, setBlurryCount] = useState(0)

//   useEffect(() => {
//     fetchAllImages()
//   }, [])

//   const fetchAllImages = async () => {
//     setLoading(true)
//     try {
//       // Fetch all images from all folders
//       const { data } = await axios.get(`${API_BASE_URL}/files`)
//       const imageFiles = data.filter(
//         (file: MyFile) => file.fileType?.toLowerCase().includes("image") && !file.isDeleted,
//       )
//       setFiles(imageFiles)
//       setFilteredFiles(imageFiles)
//     } catch (error) {
//       console.error("Error fetching images:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const analyzeImages = async () => {
//     setAnalyzing(true)
//     try {
//       // Simulate AI analysis for blur detection
//       // In a real implementation, this would call your backend AI service
//       await new Promise((resolve) => setTimeout(resolve, 2000))

//       // Simulate results - mark random images as blurry
//       const analyzedFiles = files.map((file) => ({
//         ...file,
//         isBlurry: Math.random() > 0.7, // 30% chance of being blurry
//       }))

//       setFiles(analyzedFiles)
//       setFilteredFiles(analyzedFiles)
//       setBlurryCount(analyzedFiles.filter((file) => file.isBlurry).length)
//       setAnalysisComplete(true)
//     } catch (error) {
//       console.error("Error analyzing images:", error)
//     } finally {
//       setAnalyzing(false)
//     }
//   }

//   const toggleBlurryImages = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setHideBlurry(event.target.checked)
//     if (event.target.checked) {
//       setFilteredFiles(files.filter((file) => !file.isBlurry))
//     } else {
//       setFilteredFiles(files)
//     }
//   }

//   const downloadNonBlurryImages = async () => {
//     // In a real implementation, this would trigger a download of all non-blurry images
//     alert("הורדת תמונות חדות בלבד תתחיל בקרוב...")
//   }

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
//         <CircularProgress size={60} />
//       </Box>
//     )
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
//         <Typography variant="h4" component="h1" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
//           <BlurOffIcon sx={{ mr: 1, fontSize: 40, color: "#6200ea" }} />
//           סינון תמונות מטושטשות
//         </Typography>
//         <Typography variant="body1" paragraph>
//           מערכת ה-AI תנתח את התמונות שלך ותזהה אילו מהן מטושטשות או לא חדות. לאחר הניתוח, תוכל להסתיר זמנית את התמונות
//           המטושטשות מהתצוגה ולהוריד רק את התמונות החדות.
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={analyzeImages}
//             disabled={analyzing}
//             startIcon={analyzing ? <CircularProgress size={20} color="inherit" /> : null}
//           >
//             {analyzing ? "מנתח תמונות..." : "נתח תמונות"}
//           </Button>

//           {analysisComplete && (
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <FormControlLabel
//                 control={<Switch checked={hideBlurry} onChange={toggleBlurryImages} />}
//                 label="הסתר תמונות מטושטשות"
//               />
//               <Button variant="outlined" color="primary" onClick={downloadNonBlurryImages} sx={{ ml: 2 }}>
//                 הורד תמונות חדות בלבד
//               </Button>
//             </Box>
//           )}
//         </Box>

//         {analysisComplete && (
//           <Alert severity="info" sx={{ mb: 3 }}>
//             נמצאו {blurryCount} תמונות מטושטשות מתוך {files.length} תמונות
//           </Alert>
//         )}
//       </Paper>

//       <Divider sx={{ mb: 4 }} />

//       <Grid container spacing={3}>
//         {filteredFiles.map((file) => {
//           const imageUrl = `https://664133766426takeapeek.s3.eu-north-1.amazonaws.com/${file.s3Key}`
//           return (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={file.id}>
//               <Card
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   position: "relative",
//                   borderRadius: 2,
//                   overflow: "hidden",
//                   transition: "transform 0.2s",
//                   "&:hover": {
//                     transform: "scale(1.03)",
//                   },
//                 }}
//               >
//                 {file.isBlurry && (
//                   <Chip
//                     label="מטושטשת"
//                     color="error"
//                     size="small"
//                     sx={{
//                       position: "absolute",
//                       top: 8,
//                       right: 8,
//                       zIndex: 1,
//                       opacity: 0.9,
//                     }}
//                   />
//                 )}
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={imageUrl || "/placeholder.svg?height=200&width=300"}
//                   alt={file.name}
//                   sx={{
//                     objectFit: "cover",
//                     filter: file.isBlurry ? "blur(1px)" : "none",
//                   }}
//                 />
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography variant="body2" noWrap>
//                     {file.name}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           )
//         })}
//       </Grid>

//       {filteredFiles.length === 0 && !loading && (
//         <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
//           <Typography variant="h6" color="text.secondary">
//             לא נמצאו תמונות להצגה
//           </Typography>
//         </Box>
//       )}
//     </Container>
//   )
// }

// export default SmartFiltering


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
  Switch,
  FormControlLabel,
  CircularProgress,
  Chip,
  Divider,
  Paper,
  Alert,
} from "@mui/material"
import BlurOffIcon from "@mui/icons-material/BlurOff"
import { MyFile } from "../../types/types"
import { downloadFile } from "../../hooks/Download"
import { getFolderContents, analyzeAllImages } from "../../lib/api-client"

const SmartFiltering = () => {
  const [files, setFiles] = useState<MyFile[]>([])
  const [filteredFiles, setFilteredFiles] = useState<MyFile[]>([])
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [hideBlurry, setHideBlurry] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [blurryCount, setBlurryCount] = useState(0)

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

        return {
          ...file,
          isBlurry: fileAnalysis?.analysis?.isBlurry || false,
        }
      })

      setFiles(analyzedFiles)
      setFilteredFiles(analyzedFiles)

      const blurryImages = analyzedFiles.filter((file) => file.isBlurry)
      setBlurryCount(blurryImages.length)
      setAnalysisComplete(true)
    } catch (error) {
      console.error("Error analyzing images:", error)
      alert("אירעה שגיאה בניתוח התמונות")
    } finally {
      setAnalyzing(false)
    }
  }

  const toggleBlurryImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHideBlurry(event.target.checked)
    if (event.target.checked) {
      setFilteredFiles(files.filter((file) => !file.isBlurry))
    } else {
      setFilteredFiles(files)
    }
  }

  const downloadNonBlurryImages = async () => {
    // הורדת תמונות לא מטושטשות
    const nonBlurryImages = files.filter((file) => !file.isBlurry)

    if (nonBlurryImages.length === 0) {
      alert("אין תמונות חדות להורדה")
      return
    }

    // אם יש תמונה אחת בלבד, הורד אותה ישירות
    if (nonBlurryImages.length === 1) {
      try {
        const blob = await downloadFile(nonBlurryImages[0].id)

      try {
        if (blob instanceof Blob) {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.setAttribute("download", nonBlurryImages[0].name || "image.jpg")
          document.body.appendChild(link)
          link.click()
          link.remove()
        }
      } catch (error) {
        console.error("Error downloading file:", error)
        alert("אירעה שגיאה בהורדת הקובץ")
      }

        if (blob instanceof Blob) {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.setAttribute("download", nonBlurryImages[0].name || "image.jpg")
          document.body.appendChild(link)
          link.click()
          link.remove()
        }
      } catch (error) {
        console.error("Error downloading file:", error)
        alert("אירעה שגיאה בהורדת הקובץ")
      }
      return
    }

    // אם יש מספר תמונות, צור רשימת קבצים להורדה
    alert(`מתחיל הורדה של ${nonBlurryImages.length} תמונות חדות`)

    // כאן יש להוסיף לוגיקה להורדת מספר תמונות בבת אחת
    // לדוגמה, יצירת קובץ ZIP או הורדה סדרתית
    import("jszip").then(({ default: JSZip }) => {
      const zip = new JSZip()

      // הבטחה לכל הורדת קובץ
      const downloadPromises = nonBlurryImages.map(async (file) => {
        try {
          const blob = await downloadFile(file.id)
          zip.file(file.name || `image_${file.id}.jpg`, blob)
        } catch (error) {
          console.error(`Error downloading file ${file.id}:`, error)
        }
      })

      // המתן לכל ההורדות ואז צור את קובץ ה-ZIP
      Promise.all(downloadPromises).then(() => {
        zip.generateAsync({ type: "blob" }).then((content) => {
          const url = window.URL.createObjectURL(content)
          const link = document.createElement("a")
          link.href = url
          link.setAttribute("download", "sharp_images.zip")
          document.body.appendChild(link)
          link.click()
          link.remove()
        })
      })
    })
  }

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
          <BlurOffIcon sx={{ mr: 1, fontSize: 40, color: "#6200ea" }} />
          סינון תמונות מטושטשות
        </Typography>
        <Typography variant="body1" paragraph>
          מערכת ה-AI תנתח את התמונות שלך ותזהה אילו מהן מטושטשות או לא חדות. לאחר הניתוח, תוכל להסתיר זמנית את התמונות
          המטושטשות מהתצוגה ולהוריד רק את התמונות החדות.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={analyzeImages}
            disabled={analyzing}
            startIcon={analyzing ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {analyzing ? "מנתח תמונות..." : "נתח תמונות"}
          </Button>

          {analysisComplete && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormControlLabel
                control={<Switch checked={hideBlurry} onChange={toggleBlurryImages} />}
                label="הסתר תמונות מטושטשות"
              />
              <Button variant="outlined" color="primary" onClick={downloadNonBlurryImages} sx={{ ml: 2 }}>
                הורד תמונות חדות בלבד
              </Button>
            </Box>
          )}
        </Box>

        {analysisComplete && (
          <Alert severity="info" sx={{ mb: 3 }}>
            נמצאו {blurryCount} תמונות מטושטשות מתוך {files.length} תמונות
          </Alert>
        )}
      </Paper>

      <Divider sx={{ mb: 4 }} />

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
                {file.isBlurry && (
                  <Chip
                    label="מטושטשת"
                    color="error"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      zIndex: 1,
                      opacity: 0.9,
                    }}
                  />
                )}
                <CardMedia
                  component="img"
                  height="200"
                  image={imageUrl || "/placeholder.svg?height=200&width=300"}
                  alt={file.name}
                  sx={{
                    objectFit: "cover",
                    filter: file.isBlurry ? "blur(1px)" : "none",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" noWrap>
                    {file.name}
                  </Typography>
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

export default SmartFiltering
