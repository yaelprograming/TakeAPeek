"use client"

import { InputBase, Paper, IconButton } from "@mui/material"
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 300,
        borderRadius: 2,
      }}
      elevation={0}
      variant="outlined"
    >
      <IconButton sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search images..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <IconButton sx={{ p: "10px" }} aria-label="clear" onClick={() => onChange("")}>
          <ClearIcon />
        </IconButton>
      )}
    </Paper>
  )
}
