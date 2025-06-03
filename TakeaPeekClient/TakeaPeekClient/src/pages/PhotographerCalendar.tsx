"use client"

import { useState, useEffect } from "react"
import { Box, Typography, Paper, CircularProgress, Alert, Snackbar } from "@mui/material"
import Calendar from "../components/calendar/Calendar"
import TaskModal from "../components/calendar/TaskModal"
import { taskService } from "../components/calendar/taskService"
import { Task } from "../types/types"

const PhotographerCalendar = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: "success" | "error" | "info" | "warning"
  }>({
    open: false,
    message: "",
    severity: "info",
  })

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskService.getTasks()
        setTasks(data)
      } catch (error) {
        setSnackbar({
          open: true,
          message: "שגיאה בטעינת משימות. נסה שוב מאוחר יותר.",
          severity: "error",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setSelectedTask(null)
    setIsModalOpen(true)
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setSelectedDate(new Date(task.startTime))
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTask(null)
  }

  const handleSaveTask = async (taskData: Partial<Task>) => {
    setIsLoading(true)
    try {
      let savedTask: Task

      if (selectedTask) {
        savedTask = await taskService.updateTask({
          ...taskData,
          id: selectedTask.id,
        } as Task)

        setTasks(tasks.map((task) => (task.id === savedTask.id ? savedTask : task)))

        setSnackbar({
          open: true,
          message: `המשימה "${savedTask.title}" עודכנה בהצלחה`,
          severity: "success",
        })
      } else {
        savedTask = await taskService.createTask(taskData as Task)
        setTasks([...tasks, savedTask])

        setSnackbar({
          open: true,
          message: `המשימה "${savedTask.title}" נוספה בהצלחה ליומן שלך`,
          severity: "success",
        })
      }

      setIsModalOpen(false)
    } catch (error) {
      setSnackbar({
        open: true,
        message: "שגיאה בשמירת המשימה. נסה שוב מאוחר יותר.",
        severity: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק משימה זו?")) return

    setIsLoading(true)
    try {
      await taskService.deleteTask(taskId)
      setTasks(tasks.filter((task) => task.id !== taskId))
      setIsModalOpen(false)

      setSnackbar({
        open: true,
        message: "המשימה נמחקה בהצלחה מהיומן שלך",
        severity: "success",
      })
    } catch (error) {
      setSnackbar({
        open: true,
        message: "שגיאה במחיקת המשימה. נסה שוב מאוחר יותר.",
        severity: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  if (isLoading && tasks.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
        <CircularProgress color="primary" size={60} />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" component="h1" fontWeight="bold" color="primary.dark">
          יומן הצלם
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "primary.light",
          bgcolor: "background.paper",
        }}
      >
        <Calendar tasks={tasks} onDateClick={handleDateClick} onTaskClick={handleTaskClick} />
      </Paper>

      <TaskModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        selectedDate={selectedDate}
        task={selectedTask}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default PhotographerCalendar
