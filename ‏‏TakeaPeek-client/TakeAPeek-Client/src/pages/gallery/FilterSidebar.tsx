"use client"
import {
  Drawer,
  Box,
  Typography,
  Button,
  Divider,
  FormControlLabel,
  Switch,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  TextField,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Image as ImageIcon,
  RemoveRedEye as EyeIcon,
  GridView as GridIcon,
} from "@mui/icons-material"
import { Link } from "react-router-dom"
import type { FilterOptions } from "./Gallery"

interface FilterSidebarProps {
  open: boolean
  onClose: () => void
  filterOptions: FilterOptions
  setFilterOptions: (options: FilterOptions) => void
  filteredCount: number
  totalCount: number
  onDownload: () => void
}

const drawerWidth = 280

export function FilterSidebar({
  open,
  onClose,
  filterOptions,
  setFilterOptions,
  filteredCount,
  totalCount,
  onDownload,
}: FilterSidebarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilterOptions({
      ...filterOptions,
      [key]: value,
    })
  }

  const resetFilters = () => {
    setFilterOptions({
      hideBlurry: false,
      hideClosedEyes: false,
      peopleCount: null,
      isOutdoor: null,
      category: null,
    })
  }

  const categories = ["Portrait", "Landscape", "Event", "Food", "Architecture"]

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
            <FilterIcon sx={{ mr: 1, color: "primary.main" }} />
            Filters
          </Typography>
          <Button variant="text" size="small" onClick={resetFilters}>
            Reset
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Showing {filteredCount} of {totalCount} images
        </Typography>
      </Box>

      <Box sx={{ p: 2, overflow: "auto", flexGrow: 1 }}>
        {/* Image Quality Section */}
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Image Quality
        </Typography>
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={filterOptions.hideBlurry}
                onChange={(e) => updateFilter("hideBlurry", e.target.checked)}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ImageIcon fontSize="small" sx={{ mr: 1, color: "primary.main" }} />
                <Typography>Hide Blurry Images</Typography>
              </Box>
            }
          />

          <FormControlLabel
            control={
              <Switch
                checked={filterOptions.hideClosedEyes}
                onChange={(e) => updateFilter("hideClosedEyes", e.target.checked)}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EyeIcon fontSize="small" sx={{ mr: 1, color: "primary.main" }} />
                <Typography>Hide Closed Eyes</Typography>
              </Box>
            }
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* People Section */}
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          People
        </Typography>
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">Number of People</FormLabel>
          <RadioGroup
            value={
              filterOptions.peopleCount === null
                ? ""
                : filterOptions.peopleCount === 0 || filterOptions.peopleCount === 1 || filterOptions.peopleCount === 2
                  ? filterOptions.peopleCount.toString()
                  : "custom"
            }
            onChange={(e) => {
              const value = e.target.value
              if (value === "") {
                updateFilter("peopleCount", null)
              } else if (value === "custom") {
                // Don't update yet, wait for the input
                if (
                  filterOptions.peopleCount === null ||
                  filterOptions.peopleCount === 0 ||
                  filterOptions.peopleCount === 1 ||
                  filterOptions.peopleCount === 2
                ) {
                  updateFilter("peopleCount", 3) // Default to 3 when selecting "Other"
                }
              } else {
                updateFilter("peopleCount", Number.parseInt(value, 10))
              }
            }}
          >
            <FormControlLabel value="" control={<Radio />} label="Any" />
            <FormControlLabel value="0" control={<Radio />} label="No people" />
            <FormControlLabel value="1" control={<Radio />} label="1 person" />
            <FormControlLabel value="2" control={<Radio />} label="2 people" />
            <FormControlLabel value="custom" control={<Radio />} label="Other" />

            {filterOptions.peopleCount !== null &&
              filterOptions.peopleCount !== 0 &&
              filterOptions.peopleCount !== 1 &&
              filterOptions.peopleCount !== 2 && (
                <Box sx={{ display: "flex", alignItems: "center", ml: 4, mt: 1 }}>
                  <TextField
                    type="number"
                    size="small"
                    value={filterOptions.peopleCount}
                    onChange={(e) => {
                      const value = e.target.value === "" ? null : Number.parseInt(e.target.value, 10)
                      updateFilter("peopleCount", value)
                    }}
                    InputProps={{ inputProps: { min: 3 } }}
                    sx={{ width: 80 }}
                  />
                  <Typography sx={{ ml: 1 }}>people</Typography>
                </Box>
              )}
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* Location Section */}
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Location
        </Typography>
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">Environment</FormLabel>
          <RadioGroup
            value={filterOptions.isOutdoor === null ? "" : filterOptions.isOutdoor ? "outdoor" : "indoor"}
            onChange={(e) => {
              const value = e.target.value
              if (value === "") {
                updateFilter("isOutdoor", null)
              } else {
                updateFilter("isOutdoor", value === "outdoor")
              }
            }}
          >
            <FormControlLabel value="" control={<Radio />} label="Any" />
            <FormControlLabel value="indoor" control={<Radio />} label="Indoor" />
            <FormControlLabel value="outdoor" control={<Radio />} label="Outdoor" />
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* Categories Section */}
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Categories
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              color={filterOptions.category === category ? "primary" : "default"}
              variant={filterOptions.category === category ? "filled" : "outlined"}
              onClick={() => updateFilter("category", filterOptions.category === category ? null : category)}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Design Tools Section */}
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Design Tools
        </Typography>
        <Button
          variant="outlined"
          component={Link as React.ElementType}
          to="/design"
          startIcon={<GridIcon />}
          fullWidth
          sx={{ justifyContent: "flex-start", mb: 3 }}
        >
          Create Collage
        </Button>
      </Box>

      <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<DownloadIcon />}
          onClick={onDownload}
          disabled={filteredCount === 0}
        >
          Download ({filteredCount})
        </Button>
      </Box>
    </Drawer>
  )
}
