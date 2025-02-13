import {  Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function TodoItem({
    todo,
    onToggle,
    onDelete,
  }: {
    todo: { id: string; label: string; completed: boolean; date: Date }
    onToggle: () => void
    onDelete: () => void
  }) {
    return (
      <div className="flex items-center space-x-2 bg-background p-3 rounded-lg shadow-sm">
        <Checkbox id={todo.id} checked={todo.completed} onCheckedChange={onToggle} />
        <label
          htmlFor={todo.id}
          className={`text-sm flex-grow ${todo.completed ? "line-through text-muted-foreground" : ""}`}
        >
          {todo.label} - {todo.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </label>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    )
  }