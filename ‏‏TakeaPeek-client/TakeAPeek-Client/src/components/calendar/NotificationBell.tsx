"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  IconButton,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material"
import { NotificationsOutlined as BellIcon } from "@mui/icons-material"
import { format, isToday, isTomorrow, addDays, isAfter, isBefore, startOfDay } from "date-fns"
import { he } from "date-fns/locale"
import { Task } from "../../types/types"
import { taskService } from "./taskService"

const NotificationBell = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true)
      try {
        const tasks = await taskService.getTasks()

        // Filter and sort upcoming tasks
        const now = new Date()
        const nextMonth = addDays(now, 30)

        const filtered = tasks
          .filter((task:Task) => {
            const taskDate = new Date(task.startTime)
            return isAfter(taskDate, now) && isBefore(taskDate, nextMonth)
          })
          .sort((a:any, b:any) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())

        setUpcomingTasks(filtered)

        // Count unread notifications (tasks added in the last 24 hours)
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        const newCount = tasks.filter((task:Task) => {
          const createdAt = new Date(task.createdAt || task.startTime)
          return isAfter(createdAt, oneDayAgo)
        }).length

        setUnreadCount(newCount)
      } catch (error) {
        console.error("Error fetching tasks for notifications:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()

    // Refresh notifications every 5 minutes
    const intervalId = setInterval(fetchTasks, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleTaskClick = (task: Task) => {
    // Navigate to calendar with this task selected
    window.location.href = `/calendar?taskId=${task.id}`
    handleClose()
  }

  const formatTaskDate = (dateString: string) => {
    const date = new Date(dateString)

    if (isToday(date)) {
      return `היום, ${format(date, "HH:mm")}`
    } else if (isTomorrow(date)) {
      return `מחר, ${format(date, "HH:mm")}`
    } else {
      return format(date, "EEEE, d בMMMM, HH:mm", { locale: he })
    }
  }

  const getRelativeTimeColor = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const tomorrow = addDays(startOfDay(now), 1)
    const nextWeek = addDays(now, 7)

    if (isToday(date)) {
      return "error.main"
    } else if (isTomorrow(date)) {
      return "warning.main"
    } else if (isBefore(date, nextWeek)) {
      return "info.main"
    }
    return "text.secondary"
  }

  const open = Boolean(anchorEl)
  const id = open ? "notifications-popover" : undefined

  return (
    <>
      <IconButton color="inherit" aria-label="notifications" onClick={handleClick} sx={{ mr: 1 }}>
        <Badge badgeContent={unreadCount} color="error">
          <BellIcon />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 400,
            overflow: "hidden",
            borderRadius: 2,
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" align="center" color="primary.dark" fontWeight="bold">
            המשימות הקרובות שלך
          </Typography>
        </Box>

        {isLoading ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography>טוען משימות...</Typography>
          </Box>
        ) : upcomingTasks.length > 0 ? (
          <List sx={{ maxHeight: 300, overflow: "auto", p: 0 }}>
            {upcomingTasks.map((task) => (
              <Box key={task.id}>
                <ListItem
                  component="div"
                  onClick={() => handleTaskClick(task)}
                  sx={{
                    px: 2,
                    py: 1.5,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "primary.light",
                      color: "white",
                      "& .MuiTypography-root": { color: "white" },
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1" fontWeight="medium">
                          {task.title}
                        </Typography>
                        <Typography variant="caption" color={getRelativeTimeColor(task.startTime)} fontWeight="medium">
                          {formatTaskDate(task.startTime)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      task.location && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          <strong>מיקום:</strong> {task.location}
                        </Typography>
                      )
                    }
                  />
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography color="text.secondary">אין לך משימות קרובות</Typography>
          </Box>
        )}

        <Box sx={{ p: 1, borderTop: 1, borderColor: "divider", textAlign: "center" }}>
          <Button onClick={handleClose} color="primary" fullWidth>
            סגור
          </Button>
        </Box>
      </Popover>
    </>
  )
}

export default NotificationBell
