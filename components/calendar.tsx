"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"
import { useCalendar } from "@/lib/CalendarContext"
import { ModeToggle } from "./theme-toggle"
import TodoDis from "./todo"
import InPutSection from "./inputSection"

export function Calendar() {
  const { currentDate, setCurrentDate, todos,  } = useCalendar()
 
  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    return date
  })

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  return (
    <div className="p-6 ">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
          </h2>
          <div className="flex items-center gap-1 text-sm">
            <span>W{Math.ceil((currentDate.getDate() + 6 - currentDate.getDay()) / 7)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handlePrevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <ModeToggle/>
        </div>
      </header>

      <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4">
        <div className="w-16" />
        {days.map((day, i) => (
          <div key={i} className={"text-center relative p-3"+ (day.getDay() === currentDate.getDay() ? " bg-gray-200 dark:bg-neutral-800 rounded-full " : "")}>
            <div className="text-sm font-medium  ">{dayNames[day.getDay()]}</div>
            <div className="text-2xl font-semibold " >{day.getDate()}</div>
          </div>
        ))}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="text-sm text-muted-foreground text-right pr-4">
              {hour === 0 ? "12 AM" : hour === 12 ? "12 PM" : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
            </div>
            {days.map((day, dayIndex) => (
              <div key={`${day}-${hour}`} className={"border-t relative h-16"}>
                {todos
                  .filter(
                    (todo) =>
                      todo.date.getDate() === day.getDate() &&
                      todo.date.getMonth() === day.getMonth() &&
                      todo.date.getFullYear() === day.getFullYear() &&
                      todo.date.getHours() === hour,
                  )
                  .map((todo) => (
                    <TodoDis 
                      id={todo.id}
                      label={todo.label}
                      completed={todo.completed}
                      date={todo.date}
                      description={todo.description}
                    />
                  ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="md:hidden">
        <InPutSection/>
      </div>
    </div>
  )
}

