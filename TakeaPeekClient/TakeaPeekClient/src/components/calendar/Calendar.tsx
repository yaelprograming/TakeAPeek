"use client"

import { useRef } from "react"
import { Box } from "@mui/material"
import dayGridPlugin from "@fullcalendar/daygrid/index.js"
import interactionPlugin from "@fullcalendar/interaction"
import heLocale from "@fullcalendar/core/locales/he.js"
import "./calendar.css"
import { Task } from "../../types/types"
import FullCalendar from '@fullcalendar/react';
 import timeGridPlugin from '@fullcalendar/timegrid/index.js';
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
    const now = new Date()
    const start = new Date(task.startTime)
    const diffInMs = start.getTime() - now.getTime()
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
  
    if (diffInDays < 0) return "rgb(193, 240, 240)" // אפור מטושטש – משימה שעברה
    if (diffInDays <= 1) return "#EF4444" // אדום – ממש קרוב
    if (diffInDays <= 7) return "#F97316" // כתום – בקרוב
    return "#10B981" // ירוק – זמן רחוק
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
   const SafeFullCalendar = FullCalendar as unknown as React.FC<any>;

  return (
    <Box sx={{ height: "auto", minHeight: "70vh" }}>
      <SafeFullCalendar
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
        eventContent={(eventInfo: { event: { title: string; extendedProps: { location: string }; }; view: { type: string; }; }) => {
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
