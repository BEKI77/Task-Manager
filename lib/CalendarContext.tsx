"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"

export interface Todo {
  id: string
  label: string
  completed: boolean
  date: Date
}

export interface Event {
  id: string
  title: string
  start: Date
  end: Date
  color: "purple" | "green"
}

interface CalendarContextType {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  todos: Todo[]
  addTodo: (label: string, date: Date) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  events: Event[]
  addEvent: (event: Omit<Event, "id">) => void
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined)

export const useCalendar = () => {
  const context = useContext(CalendarContext)
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider")
  }
  return context
}

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [todos, setTodos] = useState<Todo[]>([])
  const [events, setEvents] = useState<Event[]>([])

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    const storedEvents = localStorage.getItem("events")

    if (storedTodos) {
      setTodos(
        JSON.parse(storedTodos, (key, value) => {
          if (key === "date") return new Date(value)
          return value
        }),
      )
    }

    if (storedEvents) {
      setEvents(
        JSON.parse(storedEvents, (key, value) => {
          if (key === "start" || key === "end") return new Date(value)
          return value
        }),
      )
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events))
  }, [events])

  const addTodo = useCallback((label: string, date: Date) => {
    setTodos((prev) => [...prev, { id: Date.now().toString(), label, completed: false, date }])
  }, [])

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }, [])

  const addEvent = useCallback((event: Omit<Event, "id">) => {
    setEvents((prev) => [...prev, { ...event, id: Date.now().toString() }])
  }, [])

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        events,
        addEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

