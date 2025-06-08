"use client"

import { useState, useEffect } from "react"
import { Box, AppBar, Toolbar, Typography, Button, IconButton, useTheme, useMediaQuery, Paper } from "@mui/material"
import { Menu as MenuIcon, Download as DownloadIcon, Upload as UploadIcon } from "@mui/icons-material"
import JSZip from "jszip"
import { FilterSidebar } from "./FilterSidebar"
// import { ImageGrid } from "./ImageGrid"
import { Breadcrumb } from "./Breadcrumb"
import { SearchBar } from "./SearchBar"
import { UploadDialog } from "./UploadDialog"
import { useCurrentUser } from "../../hooks/useAuth"
import { useSnackbar } from "notistack"
import axiosInstance from "../../hooks/axsiosInstance"
import { ImageGrid } from "./ImageGrid"

export interface ImageFile {
  id: string
  name: string
  s3Key: string
  isBlurry?: boolean
  peopleCount?: number
  eyesClosed?: boolean
  category?: string
  isOutdoor?: boolean
  analysisCompletedIs: boolean
  isDeleted: boolean
  ownerId: number
}

export interface Folder {
  id: string
  name: string
  parentFolderId?: string
  isDeleted: boolean
  ownerId: number
}

export interface FilterOptions {
  hideBlurry: boolean
  hideClosedEyes: boolean
  peopleCount: number | null
  isOutdoor: boolean | null
  category: string | null
}

// const API_BASE_URL = "http://localhost:5293" // Update to your API URL

export function Gallery() {
  console.log("Rendering Gallery component")
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { userId } = useCurrentUser()
  const { enqueueSnackbar } = useSnackbar()//?

  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [breadcrumb, setBreadcrumb] = useState<{ id: string; name: string }[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [files, setFiles] = useState<ImageFile[]>([])
  const [filteredFiles, setFilteredFiles] = useState<ImageFile[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    hideBlurry: false,
    hideClosedEyes: false,
    peopleCount: null,
    isOutdoor: null,
    category: null,
  })

  // Add state for upload dialog
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  const handleUploadComplete = () => {
    console.log("Upload completed, refetching data")
    // In a real app, you would refetch the data here
    fetchData(currentFolder)
    enqueueSnackbar("התמונות הועלו בהצלחה!", { variant: "success" })
  }

  // useEffect(() => {
  //   fetchData(currentFolder)
  // }, [currentFolder])

  useEffect(() => {
    if (userId) {
      fetchData(currentFolder)
    }
  }, [currentFolder, userId])
  useEffect(() => {
    applyFilters()
  }, [files, filterOptions, searchTerm])

  const fetchData = async (folderId: string | null) => {

    console.log("Fetching data for user:", userId)
    if (!userId) {
      enqueueSnackbar("עליך להתחבר כדי לצפות בגלריה", { variant: "warning" })
      setLoading(false)
      return
    }

    setLoading(true)
    console.log("Fetching data for folder:", folderId)
    try {
      // Use axios to fetch data from your API
      const url = folderId ? `/folders/${folderId}/contents` : `/folders/0/contents`
console.log(url, "URL for fetching data")
      const { data } = await axiosInstance.get(url)
      // const { data } = await axiosInstance.get(url, {
      //   headers: getAuthHeaders(),
      // })

      // setFolders(data.folders?.filter((folder: Folder) => !folder.isDeleted) || [])
      // setFiles(data.files?.filter((file: ImageFile) => !file.isDeleted) || [])
      console.log("Data fetched successfully- all data:", data)
      const userFolders =
        data.folders?.filter((folder: Folder) => !folder.isDeleted && folder.ownerId === userId) || []
console.log("userFolders:", userFolders)  
      const userFiles =
        data.files?.filter((file: ImageFile) => !file.isDeleted && file.ownerId === userId) || []
console.log("userFiles:", userFiles)
      setFolders(userFolders)
      setFiles(userFiles)
      // Fetch breadcrumb
      const breadcrumbUrl = folderId
        ? `/folders/${folderId}/breadcrumb`
        : `/folders/0/breadcrumb`

      const breadcrumbRes = await axiosInstance.get(breadcrumbUrl)
      setBreadcrumb(breadcrumbRes.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    setLoading(false)
  }

  const applyFilters = () => {
    let filtered = [...files]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Apply AI filters
    if (filterOptions.hideBlurry) {
      filtered = filtered.filter((file) => !file.isBlurry)
    }

    if (filterOptions.hideClosedEyes) {
      filtered = filtered.filter((file) => !file.eyesClosed)
    }

    if (filterOptions.peopleCount !== null) {
      filtered = filtered.filter((file) => file.peopleCount === filterOptions.peopleCount)
    }

    if (filterOptions.isOutdoor !== null) {
      filtered = filtered.filter((file) => file.isOutdoor === filterOptions.isOutdoor)
    }

    if (filterOptions.category) {
      filtered = filtered.filter((file) => file.category === filterOptions.category)
    }

    setFilteredFiles(filtered)
  }

  const downloadFilteredImages = async () => {
    try {
      // Get the IDs of all filtered files
      const fileIds = filteredFiles.map((file) => file.id)

      // Create a new zip file
      const zip = new JSZip()

      // For each file ID, fetch the file and add it to the zip
      for (const fileId of fileIds) {
        try {
          // Fetch the file from your API
          const fileResponse = await axiosInstance.get(`/files/${fileId}/download`, {
            responseType: "blob",
          })

          // Get file metadata
          const fileMetaResponse = await axiosInstance.get(`/files/${fileId}`)
          const fileMeta = fileMetaResponse.data

          // Add the file to the zip
          zip.file(fileMeta.fileName || `file-${fileId}.jpg`, fileResponse.data)
        } catch (error) {
          console.error(`Error processing file ${fileId}:`, error)
        }
      }

      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: "blob" })

      // Create a download link for the zip file
      const url = window.URL.createObjectURL(zipBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = "filtered-images.zip"
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading filtered images:", error)
    }
  }

  // Add a function to check if any filters are active
  const areFiltersActive = (options: FilterOptions, searchTerm: string): boolean => {
    return (
      options.hideBlurry ||
      options.hideClosedEyes ||
      options.peopleCount !== null ||
      options.isOutdoor !== null ||
      options.category !== null ||
      searchTerm !== ""
    )
  }

  const showBadges = areFiltersActive(filterOptions, searchTerm)

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <FilterSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        filteredCount={filteredFiles.length}
        totalCount={files.length}
        onDownload={downloadFilteredImages}
      />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Toolbar>
            {isMobile && (
              <IconButton edge="start" color="inherit" onClick={() => setSidebarOpen(true)} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img src="img/logo.png" alt="TakeAPeek Logo" style={{ height: 32, marginRight: 8 }} />
              <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                Gallery
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 2, overflow: "auto", flexGrow: 1 }}>
          <Breadcrumb items={breadcrumb} onNavigate={setCurrentFolder} />

          <Box sx={{ mt: 2 }}>
            <ImageGrid
              folders={folders}
              files={filteredFiles}
              onFolderClick={setCurrentFolder}
              loading={loading}
              onUpload={() => setUploadDialogOpen(true)}
              showBadges={showBadges}
            />

          </Box>
        </Box>

        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2">
            Showing {filteredFiles.length} of {files.length} images
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" startIcon={<UploadIcon />} onClick={() => setUploadDialogOpen(true)}>
              Upload
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={downloadFilteredImages}
              disabled={filteredFiles.length === 0}
            >
              Download Filtered Images
            </Button>
          </Box>
        </Paper>
      </Box>

      <UploadDialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        onUploadComplete={handleUploadComplete}
        currentFolder={currentFolder}
      />
    </Box>
  )
}
