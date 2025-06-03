"use client"


import type React from "react"

import { useState } from "react"
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Dialog,
  DialogContent,
  IconButton as MuiIconButton,
  Skeleton,
  Chip,
  Tooltip,
} from "@mui/material"
import {
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
  Folder as FolderIcon,
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  People as PeopleIcon,
  Landscape as LandscapeIcon,
  CloudUpload as UploadIcon,
} from "@mui/icons-material"
import type { ImageFile, Folder } from "./Gallery"
import { Button } from "./Button"
import { downloadFile, downloadFolder } from "../../hooks/Download"

interface ImageGridProps {
  folders: Folder[]
  files: ImageFile[]
  onFolderClick: (folderId: string) => void
  loading: boolean
  onUpload?: () => void
  showBadges: boolean
}

export function ImageGrid({ folders, files, onFolderClick, loading, onUpload, showBadges }: ImageGridProps) {
  // const theme = useTheme()
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [activeItemId, setActiveItemId] = useState<string | null>(null)

  const openLightbox = (file: ImageFile) => {
    setSelectedImage(file)
    setLightboxIndex(files.findIndex((f) => f.id === file.id))
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    setLightboxIndex(-1)
  }

  const showNextImage = () => {
    if (lightboxIndex < files.length - 1) {
      setLightboxIndex(lightboxIndex + 1)
      setSelectedImage(files[lightboxIndex + 1])
    }
  }

  const showPrevImage = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1)
      setSelectedImage(files[lightboxIndex - 1])
    }
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.stopPropagation()
    setMenuAnchorEl(event.currentTarget)
    setActiveItemId(id)
    console.log("Menu opened for item ID:", id)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setActiveItemId(null)
  }

  const handleDownload = () => {
    const folder = folders.find((f) => f.id === activeItemId)
    const file = files.find((f) => f.id === activeItemId)
  
    if (folder) {
      downloadFolder(folder.id, folder.name)
    } else if (file) {
      downloadFile(file.id)
    }
  }
  

  if (loading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Card>
              <Skeleton variant="rectangular" height={200} />
              <CardContent>
                <Skeleton width="60%" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }

  if (folders.length === 0 && files.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 300,
          textAlign: "center",
        }}
      >
        <FolderIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          No items found
        </Typography>
        <Typography color="text.secondary">This folder is empty or no items match your filters</Typography>
      </Box>
    )
  }

  return (
    <>
      <Grid container spacing={2}>
        {/* Folders */}
        {folders.map((folder) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={folder.id}>
            <Card
              sx={{
                height: 250,
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
              onClick={() => onFolderClick(folder.id)}
            >
              <Box
                sx={{
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "action.hover",
                }}
              >
                <FolderIcon sx={{ fontSize: 100, color: "primary.main" }} />
              </Box>
              <CardActions sx={{ justifyContent: "space-between", px: 2, py: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis" }}>
                  {folder.name}
                </Typography>
                <IconButton size="small" onClick={(e) => handleMenuOpen(e, folder.id)} aria-label="folder options">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {/* Files */}
        {files.map((file) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={file.id}>
            <Card
              sx={{
                height: 250,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <Box sx={{ position: "relative", height: 200 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://664133766426takeapeek.s3.eu-north-1.amazonaws.com/${file.s3Key}`}
                  alt={file.name}
                  sx={{ cursor: "pointer", objectFit: "cover" }}
                  onClick={() => openLightbox(file)}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                  }}
                />
                {showBadges && (
                  <>
                    <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 0.5 }}>
                      {file.isBlurry && (
                        <Chip
                          label="Blurry"
                          size="small"
                          sx={{ bgcolor: "error.light", color: "error.dark", fontWeight: 500 }}
                        />
                      )}
                      {file.eyesClosed && (
                        <Chip
                          label="Eyes Closed"
                          size="small"
                          sx={{ bgcolor: "warning.light", color: "warning.dark", fontWeight: 500 }}
                        />
                      )}
                    </Box>
                    <Box sx={{ position: "absolute", bottom: 8, left: 8, display: "flex", gap: 0.5 }}>
                      {file.peopleCount !== undefined && file.peopleCount > 0 && (
                        <Chip
                          icon={<PeopleIcon sx={{ fontSize: "1rem !important" }} />}
                          label={file.peopleCount}
                          size="small"
                          sx={{ bgcolor: "info.light", color: "info.dark", fontWeight: 500 }}
                        />
                      )}
                      {file.isOutdoor !== undefined && (
                        <Chip
                          icon={<LandscapeIcon sx={{ fontSize: "1rem !important" }} />}
                          label={file.isOutdoor ? "Outdoor" : "Indoor"}
                          size="small"
                          sx={{ bgcolor: "success.light", color: "success.dark", fontWeight: 500 }}
                        />
                      )}
                    </Box>
                  </>
                )}
              </Box>
              <CardActions sx={{ justifyContent: "space-between", px: 2, py: 1 }}>
               <Tooltip title={file.name}>
                <Typography variant="body1" sx={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis" }}>
                  {file.name}
                </Typography>
 
</Tooltip> 

                <IconButton size="small" onClick={(e) => handleMenuOpen(e, file.id)} aria-label="image options">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {/* Upload Card */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              height: 250,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
              },
            }}
            onClick={onUpload}
          >
            <Box
              sx={{
                bgcolor: "primary.light",
                color: "primary.contrastText",
                borderRadius: "50%",
                p: 2,
                mb: 2,
              }}
            >
              <UploadIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="body1" fontWeight={500}>
              Upload Files
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Item Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
     <MenuItem
  onClick={() => {
    handleMenuClose()
    handleDownload()
  }}
>
  <ListItemIcon>
    <DownloadIcon fontSize="small" />
  </ListItemIcon>
  <ListItemText>Download</ListItemText>
</MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Lightbox */}
      <Dialog
        open={selectedImage !== null}
        onClose={closeLightbox}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "background.default",
            backgroundImage: "none",
            m: { xs: 1, sm: 2 },
            maxHeight: "calc(100% - 32px)",
          },
        }}
      >
        {selectedImage && (
          <DialogContent sx={{ p: 0, position: "relative", overflow: "hidden" }}>
            <MuiIconButton
              onClick={closeLightbox}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </MuiIconButton>

            <MuiIconButton
              onClick={showPrevImage}
              disabled={lightboxIndex <= 0}
              sx={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
                zIndex: 1,
              }}
            >
              <ChevronLeftIcon />
            </MuiIconButton>

            <Box
              component="img"
              src={`https://664133766426takeapeek.s3.eu-north-1.amazonaws.com/${selectedImage.s3Key}`}
              alt={selectedImage.name}
              sx={{
                width: "100%",
                height: "calc(100vh - 100px)",
                objectFit: "contain",
                display: "block",
              }}
            />

            <MuiIconButton
              onClick={showNextImage}
              disabled={lightboxIndex >= files.length - 1}
              sx={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
                zIndex: 1,
              }}
            >
              <ChevronRightIcon />
            </MuiIconButton>

            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Button variant="contained" startIcon={<DownloadIcon />} color="secondary" onClick={() => {console.log("Download clicked"); if (activeItemId) {downloadFolder(activeItemId, "folder.name");}}}>
                Download
              </Button>
              <Button variant="contained" startIcon={<ShareIcon />} color="secondary">
                Share
              </Button>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
