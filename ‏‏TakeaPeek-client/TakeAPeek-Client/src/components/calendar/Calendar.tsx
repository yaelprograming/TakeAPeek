"use client"

import { useRef } from "react"
import { Box } from "@mui/material"
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import heLocale from "@fullcalendar/core/locales/he"
import "./calendar.css"
import { Task } from "../../types/types"
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
// import '@fullcalendar/core/main.css';
// import '@fullcalendar/timegrid/main.css';
interface CalendarProps {
  tasks: Task[]
  onDateClick: (date: Date) => void
  onTaskClick: (task: Task) => void
}

const Calendar = ({ tasks, onDateClick, onTaskClick }: CalendarProps) => {
  const calendarRef = useRef<FullCalendar>(null)

  const events = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: task.startTime,
    end: task.endTime,
    extendedProps: {
      description: task.description,
      location: task.location,
      email: task.email,
    },
    backgroundColor: getEventColor(task),
    borderColor: getEventColor(task),
  }))

  function getEventColor(task: Task) {
    // Generate a color based on the event type or other criteria
    const colors = [
      "#8B5CF6", // Purple
      "#EC4899", // Pink
      "#3B82F6", // Blue
      "#10B981", // Green
      "#F59E0B", // Amber
    ]

    // Simple hash function to get consistent colors for the same event types
    const hash = task.title.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + acc
    }, 0)

    return colors[hash % colors.length]
  }

  const handleDateClick = (info: any) => {
    onDateClick(info.date)
  }

  const handleEventClick = (info: any) => {
    const taskId = info.event.id
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      onTaskClick(task)
    }
  }

  return (
    <Box sx={{ height: "auto", minHeight: "70vh" }}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale={heLocale}
        direction="rtl"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        buttonText={{
          today: "היום",
          month: "חודש",
          week: "שבוע",
          day: "יום",
        }}
        dayMaxEvents={3}
        eventDisplay="block"
        eventContent={(eventInfo) => {
          return (
            <Box
              sx={{
                cursor: "pointer",
                overflow: "hidden",
                p: 0.5,
                fontSize: "0.75rem",
                fontWeight: "medium",
                color: "white",
              }}
            >
              <Box sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {eventInfo.event.title}
              </Box>
              {eventInfo.view.type !== "dayGridMonth" && (
                <Box sx={{ mt: 0.5, fontSize: "0.7rem", opacity: 0.8 }}>{eventInfo.event.extendedProps.location}</Box>
              )}
            </Box>
          )
        }}
        eventClassNames="photographer-calendar"
      />
    </Box>
  )
}

export default Calendar
