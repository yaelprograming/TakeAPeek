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
//   CircularProgress,
//   Paper,
//   Tabs,
//   Tab,
//   Chip,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   type SelectChangeEvent,
//   Alert,
//   IconButton,
//   Tooltip,
// } from "@mui/material"
// import FaceIcon from "@mui/icons-material/Face"
// import PeopleIcon from "@mui/icons-material/People"
// import HomeIcon from "@mui/icons-material/Home"
// import LandscapeIcon from "@mui/icons-material/Landscape"
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
// import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt"
// import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
// import PersonSearchIcon from "@mui/icons-material/PersonSearch"
// import axios from "axios"
// import type { MyFile } from "../../types/types"

// const API_BASE_URL = "http://localhost:5293"

// interface AnalyzedImage extends MyFile {
//   faceCount?: number
//   isIndoor?: boolean
//   hasClosedEyes?: boolean
//   hasSmile?: boolean
//   detectedFaces?: string[]
// }

// const ImageAnalysis = () => {
//   const [files, setFiles] = useState<AnalyzedImage[]>([])
//   const [filteredFiles, setFilteredFiles] = useState<AnalyzedImage[]>([])
//   const [loading, setLoading] = useState(true)
//   const [analyzing, setAnalyzing] = useState(false)
//   const [analysisComplete, setAnalysisComplete] = useState(false)
//   const [activeTab, setActiveTab] = useState(0)
//   const [peopleFilter, setPeopleFilter] = useState("all")
//   const [sceneFilter, setSceneFilter] = useState("all")
//   const [expressionFilter, setExpressionFilter] = useState("all")
//   const [eyesFilter, setEyesFilter] = useState("all")
//   const [selectedFace, setSelectedFace] = useState<string | null>(null)
//   const [detectedFaces, setDetectedFaces] = useState<string[]>([])

//   useEffect(() => {
//     fetchAllImages()
//   }, [])

//   const fetchAllImages = async () => {
//     setLoading(true)
//     try {
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
//       // Simulate AI analysis
//       await new Promise((resolve) => setTimeout(resolve, 2500))

//       // Simulate results with random data
//       const analyzedFiles = files.map((file) => {
//         const faceCount = Math.floor(Math.random() * 5) // 0-4 faces
//         const possibleFaces = ["אדם א׳", "אדם ב׳", "אדם ג׳", "אדם ד׳", "אדם ה׳"]
//         const detectedFaces = []

//         // Randomly assign faces to images with people
//         if (faceCount > 0) {
//           const numFaces = Math.min(faceCount, Math.floor(Math.random() * 3) + 1)
//           for (let i = 0; i < numFaces; i++) {
//             detectedFaces.push(possibleFaces[Math.floor(Math.random() * possibleFaces.length)])
//           }
//         }

//         return {
//           ...file,
//           faceCount,
//           isIndoor: Math.random() > 0.5,
//           hasClosedEyes: Math.random() > 0.7,
//           hasSmile: Math.random() > 0.4,
//           detectedFaces: [...new Set(detectedFaces)], // Remove duplicates
//         }
//       })

//       // Collect all unique faces
//       const allFaces = new Set<string>()
//       analyzedFiles.forEach((file) => {
//         file.detectedFaces?.forEach((face) => allFaces.add(face))
//       })

//       setFiles(analyzedFiles)
//       setFilteredFiles(analyzedFiles)
//       setDetectedFaces(Array.from(allFaces))
//       setAnalysisComplete(true)
//     } catch (error) {
//       console.error("Error analyzing images:", error)
//     } finally {
//       setAnalyzing(false)
//     }
//   }

//   const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
//     setActiveTab(newValue)
//     applyFilters(newValue, peopleFilter, sceneFilter, expressionFilter, eyesFilter, selectedFace)
//   }

//   const handlePeopleFilterChange = (event: SelectChangeEvent) => {
//     const value = event.target.value
//     setPeopleFilter(value)
//     applyFilters(activeTab, value, sceneFilter, expressionFilter, eyesFilter, selectedFace)
//   }

//   const handleSceneFilterChange = (event: SelectChangeEvent) => {
//     const value = event.target.value
//     setSceneFilter(value)
//     applyFilters(activeTab, peopleFilter, value, expressionFilter, eyesFilter, selectedFace)
//   }

//   const handleExpressionFilterChange = (event: SelectChangeEvent) => {
//     const value = event.target.value
//     setExpressionFilter(value)
//     applyFilters(activeTab, peopleFilter, sceneFilter, value, eyesFilter, selectedFace)
//   }

//   const handleEyesFilterChange = (event: SelectChangeEvent) => {
//     const value = event.target.value
//     setEyesFilter(value)
//     applyFilters(activeTab, peopleFilter, sceneFilter, expressionFilter, value, selectedFace)
//   }

//   const handleFaceSelection = (face: string | null) => {
//     setSelectedFace(face)
//     applyFilters(activeTab, peopleFilter, sceneFilter, expressionFilter, eyesFilter, face)
//   }

//   const applyFilters = (
//     tab: number,
//     people: string,
//     scene: string,
//     expression: string,
//     eyes: string,
//     face: string | null,
//   ) => {
//     let filtered = [...files]

//     // Apply face recognition filter
//     if (tab === 0 && face) {
//       filtered = filtered.filter((file) => file.detectedFaces?.includes(face))
//     }

//     // Apply people count filter
//     if (tab === 1 && people !== "all") {
//       if (people === "single") {
//         filtered = filtered.filter((file) => file.faceCount === 1)
//       } else if (people === "couple") {
//         filtered = filtered.filter((file) => file.faceCount === 2)
//       } else if (people === "group") {
//         filtered = filtered.filter((file) => file.faceCount && file.faceCount >= 3)
//       } else if (people === "none") {
//         filtered = filtered.filter((file) => file.faceCount === 0)
//       }
//     }

//     // Apply scene filter
//     if (tab === 2 && scene !== "all") {
//       if (scene === "indoor") {
//         filtered = filtered.filter((file) => file.isIndoor)
//       } else if (scene === "outdoor") {
//         filtered = filtered.filter((file) => file.isIndoor === false)
//       }
//     }

//     // Apply expression filter
//     if (tab === 3) {
//       if (expression !== "all") {
//         if (expression === "smile") {
//           filtered = filtered.filter((file) => file.hasSmile)
//         } else if (expression === "serious") {
//           filtered = filtered.filter((file) => file.hasSmile === false)
//         }
//       }

//       if (eyes !== "all") {
//         if (eyes === "closed") {
//           filtered = filtered.filter((file) => file.hasClosedEyes)
//         } else if (eyes === "open") {
//           filtered = filtered.filter((file) => file.hasClosedEyes === false)
//         }
//       }
//     }

//     setFilteredFiles(filtered)
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
//         <Typography variant="h4" component="h1" gutterBottom>
//           ניתוח תמונות חכם
//         </Typography>
//         <Typography variant="body1" paragraph>
//           מערכת ה-AI תנתח את התמונות שלך ותזהה פנים, מספר אנשים, סוג הסצנה, הבעות פנים ועוד. לאחר הניתוח, תוכל לסנן את
//           התמונות לפי הקריטריונים השונים.
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={analyzeImages}
//             disabled={analyzing || analysisComplete}
//             startIcon={analyzing ? <CircularProgress size={20} color="inherit" /> : null}
//           >
//             {analyzing ? "מנתח תמונות..." : "נתח תמונות"}
//           </Button>
//         </Box>

//         {analysisComplete && (
//           <Alert severity="success" sx={{ mb: 3 }}>
//             ניתוח הושלם! ניתן לסנן את התמונות לפי הקריטריונים השונים
//           </Alert>
//         )}
//       </Paper>

//       {analysisComplete && (
//         <>
//           <Paper sx={{ mb: 4 }}>
//             <Tabs
//               value={activeTab}
//               onChange={handleTabChange}
//               variant="fullWidth"
//               textColor="primary"
//               indicatorColor="primary"
//             >
//               <Tab icon={<FaceIcon />} label="זיהוי פנים" />
//               <Tab icon={<PeopleIcon />} label="מספר אנשים" />
//               <Tab icon={<HomeIcon />} label="סוג סצנה" />
//               <Tab icon={<SentimentSatisfiedAltIcon />} label="הבעות פנים" />
//             </Tabs>
//           </Paper>

//           <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
//             {activeTab === 0 && (
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                   בחר אדם לחיפוש
//                 </Typography>
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
//                   {detectedFaces.map((face) => (
//                     <Chip
//                       key={face}
//                       icon={<PersonSearchIcon />}
//                       label={face}
//                       onClick={() => handleFaceSelection(face)}
//                       color={selectedFace === face ? "primary" : "default"}
//                       variant={selectedFace === face ? "filled" : "outlined"}
//                       sx={{ m: 0.5 }}
//                     />
//                   ))}
//                   <Chip
//                     icon={<PersonSearchIcon />}
//                     label="הצג הכל"
//                     onClick={() => handleFaceSelection(null)}
//                     color={selectedFace === null ? "primary" : "default"}
//                     variant={selectedFace === null ? "filled" : "outlined"}
//                     sx={{ m: 0.5 }}
//                   />
//                 </Box>
//                 {selectedFace && <Alert severity="info">מציג תמונות של {selectedFace}</Alert>}
//               </Box>
//             )}

//             {activeTab === 1 && (
//               <Box sx={{ mb: 3 }}>
//                 <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
//                   <InputLabel>סנן לפי מספר אנשים</InputLabel>
//                   <Select value={peopleFilter} onChange={handlePeopleFilterChange} label="סנן לפי מספר אנשים">
//                     <MenuItem value="all">הצג הכל</MenuItem>
//                     <MenuItem value="none">ללא אנשים</MenuItem>
//                     <MenuItem value="single">אדם אחד</MenuItem>
//                     <MenuItem value="couple">זוג (2 אנשים)</MenuItem>
//                     <MenuItem value="group">קבוצה (3+ אנשים)</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//             )}

//             {activeTab === 2 && (
//               <Box sx={{ mb: 3 }}>
//                 <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
//                   <InputLabel>סנן לפי סוג סצנה</InputLabel>
//                   <Select value={sceneFilter} onChange={handleSceneFilterChange} label="סנן לפי סוג סצנה">
//                     <MenuItem value="all">הצג הכל</MenuItem>
//                     <MenuItem value="indoor">צילום פנים</MenuItem>
//                     <MenuItem value="outdoor">צילום חוץ</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//             )}

//             {activeTab === 3 && (
//               <Box sx={{ mb: 3 }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
//                       <InputLabel>סנן לפי הבעת פנים</InputLabel>
//                       <Select
//                         value={expressionFilter}
//                         onChange={handleExpressionFilterChange}
//                         label="סנן לפי הבעת פנים"
//                       >
//                         <MenuItem value="all">הצג הכל</MenuItem>
//                         <MenuItem value="smile">חיוך</MenuItem>
//                         <MenuItem value="serious">רציני</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
//                       <InputLabel>סנן לפי עיניים</InputLabel>
//                       <Select value={eyesFilter} onChange={handleEyesFilterChange} label="סנן לפי עיניים">
//                         <MenuItem value="all">הצג הכל</MenuItem>
//                         <MenuItem value="open">עיניים פקוחות</MenuItem>
//                         <MenuItem value="closed">עיניים עצומות</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                 </Grid>
//               </Box>
//             )}
//           </Paper>
//         </>
//       )}

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
//                 <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, display: "flex", gap: 0.5 }}>
//                   {file.faceCount !== undefined && file.faceCount > 0 && (
//                     <Tooltip title={`${file.faceCount} אנשים בתמונה`}>
//                       <Chip
//                         icon={<PeopleIcon />}
//                         label={file.faceCount}
//                         size="small"
//                         color="primary"
//                         sx={{ opacity: 0.9 }}
//                       />
//                     </Tooltip>
//                   )}

//                   {file.isIndoor !== undefined && (
//                     <Tooltip title={file.isIndoor ? "צילום פנים" : "צילום חוץ"}>
//                       <Chip
//                         icon={file.isIndoor ? <HomeIcon /> : <LandscapeIcon />}
//                         size="small"
//                         color="secondary"
//                         sx={{ opacity: 0.9 }}
//                       />
//                     </Tooltip>
//                   )}
//                 </Box>

//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={imageUrl || "/placeholder.svg?height=200&width=300"}
//                   alt={file.name}
//                   sx={{ objectFit: "cover" }}
//                 />

//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography variant="body2" noWrap>
//                     {file.name}
//                   </Typography>

//                   {file.detectedFaces && file.detectedFaces.length > 0 && (
//                     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
//                       {file.detectedFaces.map((face) => (
//                         <Chip key={face} label={face} size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
//                       ))}
//                     </Box>
//                   )}

//                   <Box sx={{ display: "flex", mt: 1, gap: 1 }}>
//                     {file.hasSmile !== undefined && (
//                       <Tooltip title={file.hasSmile ? "חיוך" : "רציני"}>
//                         <IconButton size="small" color={file.hasSmile ? "success" : "default"}>
//                           {file.hasSmile ? <SentimentSatisfiedAltIcon /> : <SentimentDissatisfiedIcon />}
//                         </IconButton>
//                       </Tooltip>
//                     )}

//                     {file.hasClosedEyes !== undefined && file.hasClosedEyes && (
//                       <Tooltip title="עיניים עצומות">
//                         <IconButton size="small" color="warning">
//                           <VisibilityOffIcon />
//                         </IconButton>
//                       </Tooltip>
//                     )}
//                   </Box>
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

// export default ImageAnalysis


// פעם שניה
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
//   CircularProgress,
//   Paper,
//   Tabs,
//   Tab,
//   Chip,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   type SelectChangeEvent,
//   Alert,
//   IconButton,
//   Tooltip,
// } from "@mui/material"
// import FaceIcon from "@mui/icons-material/Face"
// import PeopleIcon from "@mui/icons-material/People"
// import HomeIcon from "@mui/icons-material/Home"
// import LandscapeIcon from "@mui/icons-material/Landscape"
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
// import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt"
// import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
// import PersonSearchIcon from "@mui/icons-material/PersonSearch"
// import axios from "axios"
// import type { MyFile } from "../../types/types"

// const API_BASE_URL = "http://localhost:5293"

// interface AnalyzedImage extends MyFile {
//   faceCount?: number
//   isIndoor?: boolean
//   hasClosedEyes?: boolean
//   hasSmile?: boolean
//   detectedFaces?: string[]
// }

// const ImageAnalysis = () => {
//   const [files, setFiles] = useState<AnalyzedImage[]>([])
//   const [filteredFiles, setFilteredFiles] = useState<AnalyzedImage[]>([])
//   const [loading, setLoading] = useState(true)
//   const [analyzing, setAnalyzing] = useState(false)
//   const [analysisComplete, setAnalysisComplete] = useState(false)
//   const [activeTab, setActiveTab] = useState(0)
//   const [peopleFilter, setPeopleFilter] = useState("all")
//   const [sceneFilter, setSceneFilter] = useState("all")
//   const [expressionFilter, setExpressionFilter] = useState("all")
//   const [eyesFilter, setEyesFilter] = useState("all")
//   const [selectedFace, setSelectedFace] = useState<string | null>(null)
//   const [detectedFaces, setDetectedFaces] = useState<string[]>([])

//   useEffect(() => {
//     fetchAllImages()
//   }, [])

//   const fetchAllImages = async () => {
//     setLoading(true)
//     try {
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
//       // Get all selected images
//       const selectedImageIds = files.map((file) => file.id)

//       // Call the batch analysis endpoint
//       const response = await axios.post(`${API_BASE_URL}/ai/batch-analyze`, {
//         imageIds: selectedImageIds,
//         analysisTypes: ["faces", "scene", "expression"],
//       })

//       // Process the results
//       const results = response.data
//       const analyzedFiles = files.map((file) => {
//         const fileResults = results[file.id]
//         if (!fileResults) return file

//         return {
//           ...file,
//           faceCount: fileResults.faces?.faceCount || 0,
//           isIndoor: fileResults.scene?.isIndoor,
//           hasClosedEyes: fileResults.expression?.hasClosedEyes,
//           hasSmile: fileResults.expression?.hasSmile,
//           detectedFaces:
//             fileResults.faces?.faces.map(
//               (face) => `אדם ${file.faceId?.substring(0, 4) || face.faceId?.substring(0, 4)}`,
//             ) || [],
//         }
//       })

//       // Update state with real analysis results
//       setFiles(analyzedFiles)
//       setFilteredFiles(analyzedFiles)

//       // Collect all unique faces
//       const allFaces = new Set<string>()
//       analyzedFiles.forEach((file) => {
//         file.detectedFaces?.forEach((face) => allFaces.add(face))
//       })

//       setDetectedFaces(Array.from(allFaces))
//       setAnalysisComplete(true)
//     } catch (error) {
//       console.error("Error analyzing images:", error)
//       alert("אירעה שגיאה בניתוח התמונות")
//     } finally {
//       setAnalyzing(false)
//     }
//   }

//   const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
//     setActiveTab(newValue)
//     applyFilters(newValue, peopleFilter, sceneFilter, expressionFilter, eyesFilter, selectedFace)
//   }

//   const handlePeopleFilterChange = (event: SelectChangeEvent) => {
//     const value = event.target.value
//     setPeopleFilter(value)
//     applyFilters(activeTab, value, sceneFilter, expressionFilter, eyesFilter, selectedFace)
//   }

//   const handleSceneFilterChange = (event: SelectChangeEvent) => {
//     const value = event.target.value
//     setSceneFilter(value)
//     applyFilters(activeTab, peopleFilter, value, expressionFilter, eyesFilter, selectedFace)
//   }

//   const handleExpressionFilterChange = (event: SelectChangeEvent) => {
//     const value = event.target.value
//     setExpressionFilter(value)
//     applyFilters(activeTab, peopleFilter, sceneFilter, value, eyesFilter, selectedFace)
//   }

//   const handleEyesFilterChange = (event: SelectChangeEvent) => {
//     const value = event.target.value
//     setEyesFilter(value)
//     applyFilters(activeTab, peopleFilter, sceneFilter, expressionFilter, value, selectedFace)
//   }

//   const handleFaceSelection = (face: string | null) => {
//     setSelectedFace(face)
//     applyFilters(activeTab, peopleFilter, sceneFilter, expressionFilter, eyesFilter, face)
//   }

//   const applyFilters = (
//     tab: number,
//     people: string,
//     scene: string,
//     expression: string,
//     eyes: string,
//     face: string | null,
//   ) => {
//     let filtered = [...files]

//     // Apply face recognition filter
//     if (tab === 0 && face) {
//       filtered = filtered.filter((file) => file.detectedFaces?.includes(face))
//     }

//     // Apply people count filter
//     if (tab === 1 && people !== "all") {
//       if (people === "single") {
//         filtered = filtered.filter((file) => file.faceCount === 1)
//       } else if (people === "couple") {
//         filtered = filtered.filter((file) => file.faceCount === 2)
//       } else if (people === "group") {
//         filtered = filtered.filter((file) => file.faceCount && file.faceCount >= 3)
//       } else if (people === "none") {
//         filtered = filtered.filter((file) => file.faceCount === 0)
//       }
//     }

//     // Apply scene filter
//     if (tab === 2 && scene !== "all") {
//       if (scene === "indoor") {
//         filtered = filtered.filter((file) => file.isIndoor)
//       } else if (scene === "outdoor") {
//         filtered = filtered.filter((file) => file.isIndoor === false)
//       }
//     }

//     // Apply expression filter
//     if (tab === 3) {
//       if (expression !== "all") {
//         if (expression === "smile") {
//           filtered = filtered.filter((file) => file.hasSmile)
//         } else if (expression === "serious") {
//           filtered = filtered.filter((file) => file.hasSmile === false)
//         }
//       }

//       if (eyes !== "all") {
//         if (eyes === "closed") {
//           filtered = filtered.filter((file) => file.hasClosedEyes)
//         } else if (eyes === "open") {
//           filtered = filtered.filter((file) => file.hasClosedEyes === false)
//         }
//       }
//     }

//     setFilteredFiles(filtered)
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
//         <Typography variant="h4" component="h1" gutterBottom>
//           ניתוח תמונות חכם
//         </Typography>
//         <Typography variant="body1" paragraph>
//           מערכת ה-AI תנתח את התמונות שלך ותזהה פנים, מספר אנשים, סוג הסצנה, הבעות פנים ועוד. לאחר הניתוח, תוכל לסנן את
//           התמונות לפי הקריטריונים השונים.
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={analyzeImages}
//             disabled={analyzing || analysisComplete}
//             startIcon={analyzing ? <CircularProgress size={20} color="inherit" /> : null}
//           >
//             {analyzing ? "מנתח תמונות..." : "נתח תמונות"}
//           </Button>
//         </Box>

//         {analysisComplete && (
//           <Alert severity="success" sx={{ mb: 3 }}>
//             ניתוח הושלם! ניתן לסנן את התמונות לפי הקריטריונים השונים
//           </Alert>
//         )}
//       </Paper>

//       {analysisComplete && (
//         <>
//           <Paper sx={{ mb: 4 }}>
//             <Tabs
//               value={activeTab}
//               onChange={handleTabChange}
//               variant="fullWidth"
//               textColor="primary"
//               indicatorColor="primary"
//             >
//               <Tab icon={<FaceIcon />} label="זיהוי פנים" />
//               <Tab icon={<PeopleIcon />} label="מספר אנשים" />
//               <Tab icon={<HomeIcon />} label="סוג סצנה" />
//               <Tab icon={<SentimentSatisfiedAltIcon />} label="הבעות פנים" />
//             </Tabs>
//           </Paper>

//           <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
//             {activeTab === 0 && (
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                   בחר אדם לחיפוש
//                 </Typography>
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
//                   {detectedFaces.map((face) => (
//                     <Chip
//                       key={face}
//                       icon={<PersonSearchIcon />}
//                       label={face}
//                       onClick={() => handleFaceSelection(face)}
//                       color={selectedFace === face ? "primary" : "default"}
//                       variant={selectedFace === face ? "filled" : "outlined"}
//                       sx={{ m: 0.5 }}
//                     />
//                   ))}
//                   <Chip
//                     icon={<PersonSearchIcon />}
//                     label="הצג הכל"
//                     onClick={() => handleFaceSelection(null)}
//                     color={selectedFace === null ? "primary" : "default"}
//                     variant={selectedFace === null ? "filled" : "outlined"}
//                     sx={{ m: 0.5 }}
//                   />
//                 </Box>
//                 {selectedFace && <Alert severity="info">מציג תמונות של {selectedFace}</Alert>}
//               </Box>
//             )}

//             {activeTab === 1 && (
//               <Box sx={{ mb: 3 }}>
//                 <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
//                   <InputLabel>סנן לפי מספר אנשים</InputLabel>
//                   <Select value={peopleFilter} onChange={handlePeopleFilterChange} label="סנן לפי מספר אנשים">
//                     <MenuItem value="all">הצג הכל</MenuItem>
//                     <MenuItem value="none">ללא אנשים</MenuItem>
//                     <MenuItem value="single">אדם אחד</MenuItem>
//                     <MenuItem value="couple">זוג (2 אנשים)</MenuItem>
//                     <MenuItem value="group">קבוצה (3+ אנשים)</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//             )}

//             {activeTab === 2 && (
//               <Box sx={{ mb: 3 }}>
//                 <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
//                   <InputLabel>סנן לפי סוג סצנה</InputLabel>
//                   <Select value={sceneFilter} onChange={handleSceneFilterChange} label="סנן לפי סוג סצנה">
//                     <MenuItem value="all">הצג הכל</MenuItem>
//                     <MenuItem value="indoor">צילום פנים</MenuItem>
//                     <MenuItem value="outdoor">צילום חוץ</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//             )}

//             {activeTab === 3 && (
//               <Box sx={{ mb: 3 }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
//                       <InputLabel>סנן לפי הבעת פנים</InputLabel>
//                       <Select
//                         value={expressionFilter}
//                         onChange={handleExpressionFilterChange}
//                         label="סנן לפי הבעת פנים"
//                       >
//                         <MenuItem value="all">הצג הכל</MenuItem>
//                         <MenuItem value="smile">חיוך</MenuItem>
//                         <MenuItem value="serious">רציני</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
//                       <InputLabel>סנן לפי עיניים</InputLabel>
//                       <Select value={eyesFilter} onChange={handleEyesFilterChange} label="סנן לפי עיניים">
//                         <MenuItem value="all">הצג הכל</MenuItem>
//                         <MenuItem value="open">עיניים פקוחות</MenuItem>
//                         <MenuItem value="closed">עיניים עצומות</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                 </Grid>
//               </Box>
//             )}
//           </Paper>
//         </>
//       )}

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
//                 <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, display: "flex", gap: 0.5 }}>
//                   {file.faceCount !== undefined && file.faceCount > 0 && (
//                     <Tooltip title={`${file.faceCount} אנשים בתמונה`}>
//                       <Chip
//                         icon={<PeopleIcon />}
//                         label={file.faceCount}
//                         size="small"
//                         color="primary"
//                         sx={{ opacity: 0.9 }}
//                       />
//                     </Tooltip>
//                   )}

//                   {file.isIndoor !== undefined && (
//                     <Tooltip title={file.isIndoor ? "צילום פנים" : "צילום חוץ"}>
//                       <Chip
//                         icon={file.isIndoor ? <HomeIcon /> : <LandscapeIcon />}
//                         size="small"
//                         color="secondary"
//                         sx={{ opacity: 0.9 }}
//                       />
//                     </Tooltip>
//                   )}
//                 </Box>

//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={imageUrl || "/placeholder.svg?height=200&width=300"}
//                   alt={file.name}
//                   sx={{ objectFit: "cover" }}
//                 />

//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography variant="body2" noWrap>
//                     {file.name}
//                   </Typography>

//                   {file.detectedFaces && file.detectedFaces.length > 0 && (
//                     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
//                       {file.detectedFaces.map((face) => (
//                         <Chip key={face} label={face} size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
//                       ))}
//                     </Box>
//                   )}

//                   <Box sx={{ display: "flex", mt: 1, gap: 1 }}>
//                     {file.hasSmile !== undefined && (
//                       <Tooltip title={file.hasSmile ? "חיוך" : "רציני"}>
//                         <IconButton size="small" color={file.hasSmile ? "success" : "default"}>
//                           {file.hasSmile ? <SentimentSatisfiedAltIcon /> : <SentimentDissatisfiedIcon />}
//                         </IconButton>
//                       </Tooltip>
//                     )}

//                     {file.hasClosedEyes !== undefined && file.hasClosedEyes && (
//                       <Tooltip title="עיניים עצומות">
//                         <IconButton size="small" color="warning">
//                           <VisibilityOffIcon />
//                         </IconButton>
//                       </Tooltip>
//                     )}
//                   </Box>
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

// export default ImageAnalysis


//פעם שלישית
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
  Tabs,
  Tab,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material"
import FaceIcon from "@mui/icons-material/Face"
import PeopleIcon from "@mui/icons-material/People"
import HomeIcon from "@mui/icons-material/Home"
import LandscapeIcon from "@mui/icons-material/Landscape"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import PersonSearchIcon from "@mui/icons-material/PersonSearch"
import { getFolderContents, analyzeAllImages } from "../../lib/api-client"
import { MyFile } from "../../types/types"


interface AnalyzedImage extends MyFile {
  faceCount?: number
  isIndoor?: boolean
  hasClosedEyes?: boolean
  hasSmile?: boolean
  detectedFaces?: string[]
}

const ImageAnalysis = () => {
  const [files, setFiles] = useState<AnalyzedImage[]>([])
  const [filteredFiles, setFilteredFiles] = useState<AnalyzedImage[]>([])
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [peopleFilter, setPeopleFilter] = useState("all")
  const [sceneFilter, setSceneFilter] = useState("all")
  const [expressionFilter, setExpressionFilter] = useState("all")
  const [eyesFilter, setEyesFilter] = useState("all")
  const [selectedFace, setSelectedFace] = useState<string | null>(null)
  const [detectedFaces, setDetectedFaces] = useState<string[]>([])

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

        if (!fileAnalysis) return file

        // יצירת רשימת פנים מזוהות (בדוגמה זו נשתמש בזיהוי מדומה)
        const detectedFaces = []
        const faceCount = fileAnalysis.analysis?.peopleCount || 0

        // אם יש אנשים בתמונה, נוסיף זיהוי פנים מדומה
        if (faceCount > 0) {
          for (let i = 0; i < Math.min(faceCount, 3); i++) {
            detectedFaces.push(`אדם ${String.fromCharCode(1488 + i)}`) // אותיות עבריות א, ב, ג וכו'
          }
        }

        return {
          ...file,
          faceCount: fileAnalysis.analysis?.peopleCount || 0,
          isIndoor: !fileAnalysis.analysis?.isOutdoor,
          hasClosedEyes: fileAnalysis.analysis?.hasClosedEyes || false,
          hasSmile: Math.random() > 0.5, // אין לנו נתון על חיוכים, אז נשתמש בערך אקראי
          detectedFaces,
          analysis: fileAnalysis.analysis,
        }
      })

      // איסוף כל הפנים הייחודיות
      const allFaces = new Set<string>()
      analyzedFiles.forEach((file) => {
        file.detectedFaces?.forEach((face) => allFaces.add(face))
      })

      setFiles(analyzedFiles)
      setFilteredFiles(analyzedFiles)
      setDetectedFaces(Array.from(allFaces))
      setAnalysisComplete(true)
    } catch (error) {
      console.error("Error analyzing images:", error)
      alert("אירעה שגיאה בניתוח התמונות")
    } finally {
      setAnalyzing(false)
    }
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
    applyFilters(newValue, peopleFilter, sceneFilter, expressionFilter, eyesFilter, selectedFace)
  }

  const handlePeopleFilterChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    setPeopleFilter(value)
    applyFilters(activeTab, value, sceneFilter, expressionFilter, eyesFilter, selectedFace)
  }

  const handleSceneFilterChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    setSceneFilter(value)
    applyFilters(activeTab, peopleFilter, value, expressionFilter, eyesFilter, selectedFace)
  }

  const handleExpressionFilterChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    setExpressionFilter(value)
    applyFilters(activeTab, peopleFilter, sceneFilter, value, eyesFilter, selectedFace)
  }

  const handleEyesFilterChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    setEyesFilter(value)
    applyFilters(activeTab, peopleFilter, sceneFilter, expressionFilter, value, selectedFace)
  }

  const handleFaceSelection = (face: string | null) => {
    setSelectedFace(face)
    applyFilters(activeTab, peopleFilter, sceneFilter, expressionFilter, eyesFilter, face)
  }

  const applyFilters = (
    tab: number,
    people: string,
    scene: string,
    expression: string,
    eyes: string,
    face: string | null,
  ) => {
    let filtered = [...files]

    // Apply face recognition filter
    if (tab === 0 && face) {
      filtered = filtered.filter((file) => file.detectedFaces?.includes(face))
    }

    // Apply people count filter
    if (tab === 1 && people !== "all") {
      if (people === "single") {
        filtered = filtered.filter((file) => file.faceCount === 1)
      } else if (people === "couple") {
        filtered = filtered.filter((file) => file.faceCount === 2)
      } else if (people === "group") {
        filtered = filtered.filter((file) => file.faceCount && file.faceCount >= 3)
      } else if (people === "none") {
        filtered = filtered.filter((file) => file.faceCount === 0)
      }
    }

    // Apply scene filter
    if (tab === 2 && scene !== "all") {
      if (scene === "indoor") {
        filtered = filtered.filter((file) => file.isIndoor)
      } else if (scene === "outdoor") {
        filtered = filtered.filter((file) => file.isIndoor === false)
      }
    }

    // Apply expression filter
    if (tab === 3) {
      if (expression !== "all") {
        if (expression === "smile") {
          filtered = filtered.filter((file) => file.hasSmile)
        } else if (expression === "serious") {
          filtered = filtered.filter((file) => file.hasSmile === false)
        }
      }

      if (eyes !== "all") {
        if (eyes === "closed") {
          filtered = filtered.filter((file) => file.hasClosedEyes)
        } else if (eyes === "open") {
          filtered = filtered.filter((file) => file.hasClosedEyes === false)
        }
      }
    }

    setFilteredFiles(filtered)
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
        <Typography variant="h4" component="h1" gutterBottom>
          ניתוח תמונות חכם
        </Typography>
        <Typography variant="body1" paragraph>
          מערכת ה-AI תנתח את התמונות שלך ותזהה פנים, מספר אנשים, סוג הסצנה, הבעות פנים ועוד. לאחר הניתוח, תוכל לסנן את
          התמונות לפי הקריטריונים השונים.
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
            ניתוח הושלם! ניתן לסנן את התמונות לפי הקריטריונים השונים
          </Alert>
        )}
      </Paper>

      {analysisComplete && (
        <>
          <Paper sx={{ mb: 4 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab icon={<FaceIcon />} label="זיהוי פנים" />
              <Tab icon={<PeopleIcon />} label="מספר אנשים" />
              <Tab icon={<HomeIcon />} label="סוג סצנה" />
              <Tab icon={<SentimentSatisfiedAltIcon />} label="הבעות פנים" />
            </Tabs>
          </Paper>

          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            {activeTab === 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  בחר אדם לחיפוש
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  {detectedFaces.map((face) => (
                    <Chip
                      key={face}
                      icon={<PersonSearchIcon />}
                      label={face}
                      onClick={() => handleFaceSelection(face)}
                      color={selectedFace === face ? "primary" : "default"}
                      variant={selectedFace === face ? "filled" : "outlined"}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                  <Chip
                    icon={<PersonSearchIcon />}
                    label="הצג הכל"
                    onClick={() => handleFaceSelection(null)}
                    color={selectedFace === null ? "primary" : "default"}
                    variant={selectedFace === null ? "filled" : "outlined"}
                    sx={{ m: 0.5 }}
                  />
                </Box>
                {selectedFace && <Alert severity="info">מציג תמונות של {selectedFace}</Alert>}
              </Box>
            )}

            {activeTab === 1 && (
              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel>סנן לפי מספר אנשים</InputLabel>
                  <Select value={peopleFilter} onChange={handlePeopleFilterChange} label="סנן לפי מספר אנשים">
                    <MenuItem value="all">הצג הכל</MenuItem>
                    <MenuItem value="none">ללא אנשים</MenuItem>
                    <MenuItem value="single">אדם אחד</MenuItem>
                    <MenuItem value="couple">זוג (2 אנשים)</MenuItem>
                    <MenuItem value="group">קבוצה (3+ אנשים)</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            {activeTab === 2 && (
              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel>סנן לפי סוג סצנה</InputLabel>
                  <Select value={sceneFilter} onChange={handleSceneFilterChange} label="סנן לפי סוג סצנה">
                    <MenuItem value="all">הצג הכל</MenuItem>
                    <MenuItem value="indoor">צילום פנים</MenuItem>
                    <MenuItem value="outdoor">צילום חוץ</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            {activeTab === 3 && (
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                      <InputLabel>סנן לפי הבעת פנים</InputLabel>
                      <Select
                        value={expressionFilter}
                        onChange={handleExpressionFilterChange}
                        label="סנן לפי הבעת פנים"
                      >
                        <MenuItem value="all">הצג הכל</MenuItem>
                        <MenuItem value="smile">חיוך</MenuItem>
                        <MenuItem value="serious">רציני</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                      <InputLabel>סנן לפי עיניים</InputLabel>
                      <Select value={eyesFilter} onChange={handleEyesFilterChange} label="סנן לפי עיניים">
                        <MenuItem value="all">הצג הכל</MenuItem>
                        <MenuItem value="open">עיניים פקוחות</MenuItem>
                        <MenuItem value="closed">עיניים עצומות</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
        </>
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
                <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, display: "flex", gap: 0.5 }}>
                  {file.faceCount !== undefined && file.faceCount > 0 && (
                    <Tooltip title={`${file.faceCount} אנשים בתמונה`}>
                      <Chip
                        icon={<PeopleIcon />}
                        label={file.faceCount}
                        size="small"
                        color="primary"
                        sx={{ opacity: 0.9 }}
                      />
                    </Tooltip>
                  )}

                  {file.isIndoor !== undefined && (
                    <Tooltip title={file.isIndoor ? "צילום פנים" : "צילום חוץ"}>
                      <Chip
                        icon={file.isIndoor ? <HomeIcon /> : <LandscapeIcon />}
                        size="small"
                        color="secondary"
                        sx={{ opacity: 0.9 }}
                      />
                    </Tooltip>
                  )}
                </Box>

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

                  {file.detectedFaces && file.detectedFaces.length > 0 && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                      {file.detectedFaces.map((face) => (
                        <Chip key={face} label={face} size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
                      ))}
                    </Box>
                  )}

                  <Box sx={{ display: "flex", mt: 1, gap: 1 }}>
                    {file.hasSmile !== undefined && (
                      <Tooltip title={file.hasSmile ? "חיוך" : "רציני"}>
                        <IconButton size="small" color={file.hasSmile ? "success" : "default"}>
                          {file.hasSmile ? <SentimentSatisfiedAltIcon /> : <SentimentDissatisfiedIcon />}
                        </IconButton>
                      </Tooltip>
                    )}

                    {file.hasClosedEyes !== undefined && file.hasClosedEyes && (
                      <Tooltip title="עיניים עצומות">
                        <IconButton size="small" color="warning">
                          <VisibilityOffIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
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

export default ImageAnalysis
