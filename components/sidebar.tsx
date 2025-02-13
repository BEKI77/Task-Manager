"use client"

import { Plus, MoreHorizontal} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCalendar } from "@/lib/CalendarContext"
import { useState } from "react"
import TodoItem from "./todoitems"
import { Textarea } from "./ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export function Sidebar() {
  const { todos, addTodo, toggleTodo, deleteTodo, currentDate } = useCalendar()
  const [newTodo, setNewTodo] = useState("")
  const [newTodoTime, setNewTodoTime] = useState("12:00")
  const [newTodoDescription, setNewTodoDescription] = useState("")
  const [filter, setFilter] = useState("all")

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const [hours, minutes] = newTodoTime.split(":").map(Number)
      const todoDate = new Date(currentDate)
      todoDate.setHours(hours, minutes, 0, 0)
      addTodo(newTodo.trim(), todoDate, newTodoDescription)
      setNewTodo("")
      setNewTodoTime("12:00")
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "finished") return todo.completed
    if (filter === "unfinished") return !todo.completed
    return true
  })

  return (
    <div className="w-auto bg-card flex flex-col h-full dark:bg-stone-950">
      <div className="p-4 flex items-center justify-between border-b">
        <h1 className="text-2xl font-bold">Todos</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setFilter("all")}>All Tasks</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilter("finished")}>Finished</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilter("unfinished")}>Unfinished</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </div>
      </div>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleAddTodo()
          }}
          className="space-y-2"
        >
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo"
            className="flex-grow"
          />
           <Textarea
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
            placeholder="Description (optional)"
          />
          <div className="flex space-x-2">
            <Input
              type="time"
              value={newTodoTime}
              onChange={(e) => setNewTodoTime(e.target.value)}
              className="overflow-hidden"
            />
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}


