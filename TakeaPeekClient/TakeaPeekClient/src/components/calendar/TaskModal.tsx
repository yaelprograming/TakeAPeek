"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  IconButton,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import {
  Close as CloseIcon,
  Event as EventIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"
import { Task } from "../../types/types"
import dayjs, { Dayjs } from 'dayjs';

interface TaskModalProps {
  open: boolean
  onClose: () => void
  onSave: (task: Partial<Task>) => void
  onDelete: (taskId: string) => void
  selectedDate: Dayjs  | null
  task: Task | null
}

const TaskModal = ({ open, onClose, onSave, onDelete, selectedDate, task }: TaskModalProps) => {
  console.log("TaskModal rendered with task:", task)
  const [formData, setFormData] = useState<{
    title: string
    description: string
    location: string
    date: Dayjs  | null
    startTime: Dayjs  | null
    endTime: Dayjs  | null
    email: string
  }>({
    title: "",
    description: "",
    location: "",
    date: null,
    startTime: null,
    endTime: null,
    email: "",
  })

  
  useEffect(() => {
    if (task) {
      const startDate = dayjs(task.startTime)
      const endDate = dayjs(task.endTime)
  
      setFormData({
        title: task.title,
        description: task.description || "",
        location: task.location || "",
        date: startDate,
        startTime: startDate,
        endTime: endDate,
        email: task.email || "",
      })
    } else if (selectedDate) {
      const formattedDate = dayjs(selectedDate)
      const currentHour = dayjs().hour()
      const startTime = formattedDate.hour(currentHour).minute(0)
      const endTime = formattedDate.hour(currentHour + 1).minute(0)
  
      setFormData({
        title: "",
        description: "",
        location: "",
        date: formattedDate,
        startTime,
        endTime,
        email: "",
      })
    } else {
      setFormData({
        title: "",
        description: "",
        location: "",
        date: null,
        startTime: null,
        endTime: null,
        email: "",
      })
    }
  }, [selectedDate, task, open])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


  const handleDateChange = (date: Dayjs | null) => {
    if (!date) return;
  
    const newStartTime = date
      ? date.hour(formData.startTime?.hour() || 0).minute(formData.startTime?.minute() || 0)
      : null;
  
    const newEndTime = date
      ? date.hour(formData.endTime?.hour() || 1).minute(formData.endTime?.minute() || 0)
      : null;
  
    setFormData((prev) => ({
      ...prev,
      date,
      startTime: newStartTime,
      endTime: newEndTime,
    }))
  }

  const handleStartTimeChange = (time: Dayjs | null) => {
    if (!time) return;
    setFormData((prev) => ({ ...prev, startTime: time }))
  }
  
  const handleEndTimeChange = (time: Dayjs | null) => {
    if (!time) return;
    setFormData((prev) => ({ ...prev, endTime: time }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.date || !formData.startTime || !formData.endTime) {
      alert("יש למלא את כל שדות התאריך והשעה")
      return
    }

    const taskData: Partial<Task> = {
      id: task?.id,
      title: formData.title,
      description: formData.description,
      location: formData.location,
      startTime: formData.startTime?.toISOString(),
      endTime: formData.endTime?.toISOString(),
      email: formData.email,
    }

    onSave(taskData)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth dir="rtl">
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="primary.dark" fontWeight="bold">
            {task ? "עריכת משימה" : "הוספת משימה חדשה"}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                name="title"
                label="שם האירוע"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                label="תיאור"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="location"
                label="מיקום"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="תאריך"
                value={formData.date}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                    required: true,
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EventIcon color="primary" />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="מייל לתזכורות"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TimePicker
                label="שעת התחלה"
                value={formData.startTime}
                onChange={handleStartTimeChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                    required: true,
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <TimeIcon color="primary" />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TimePicker
                label="שעת סיום"
                value={formData.endTime}
                onChange={handleEndTimeChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                    required: true,
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <TimeIcon color="primary" />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
          {task && (
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => onDelete(task.id)}>
              מחק משימה
            </Button>
          )}
          <Box>
            <Button onClick={onClose} color="inherit" sx={{ mr: 1 }}>
              ביטול
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {task ? "עדכן משימה" : "הוסף משימה"}
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  )
}



export default TaskModal
