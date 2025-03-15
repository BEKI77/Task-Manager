import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCalendar } from "@/lib/CalendarContext"
import { useState } from "react"
import TodoItem from "./todoitems"
import InPutSection from "./inputSection"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export function Sidebar() {
  const { todos, toggleTodo, deleteTodo} = useCalendar()
  const [filter, setFilter] = useState("all")


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
      <InPutSection/>
    </div>
  )
}


