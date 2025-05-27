"use client"

import { Breadcrumbs, Link } from "@mui/material"
import { Home as HomeIcon, NavigateNext as NavigateNextIcon } from "@mui/icons-material"

interface BreadcrumbProps {
  items: { id: string; name: string }[]
  onNavigate: (id: string | null) => void
}

export function Breadcrumb({ items, onNavigate }: BreadcrumbProps) {
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      <Link
        underline="hover"
        color={items.length === 0 ? "text.primary" : "inherit"}
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => onNavigate(null)}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
        Gallery
      </Link>

      {items.map((item, index) => (
        <Link
          key={item.id}
          underline="hover"
          color={index === items.length - 1 ? "text.primary" : "inherit"}
          sx={{ cursor: "pointer" }}
          onClick={() => onNavigate(item.id)}
        >
          {item.name}
        </Link>
      ))}
    </Breadcrumbs>
  )
}
