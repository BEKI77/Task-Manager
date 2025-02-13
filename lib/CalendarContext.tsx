"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"

export interface Todo {
  id: string
  label: string
  description?: string
  completed: boolean
  date: Date
}

interface CalendarContextType {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  todos: Todo[]
  addTodo: (label: string, date: Date, description?: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
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
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todos")
    return storedTodos ? JSON.parse(storedTodos, (key, value) => {
      if (key === "date") return new Date(value)
      return value
    }) : []
  })
  

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])



  const addTodo = useCallback((label: string, date: Date, description?:string) => {
    setTodos((prev) => [...prev, { id: Date.now().toString(), label, description ,completed: false, date }])
  }, [])

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
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
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

