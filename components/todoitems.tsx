import {  Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function TodoItem({
    todo,
    onToggle,
    onDelete,
  }: {
    todo: { id: string; label: string; description?: string; completed: boolean; date: Date }
    onToggle: () => void
    onDelete: () => void
  }) {
    return (
      <div className="flex flex-col space-y-2 bg-background dark:bg-gray-800 p-3 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <Checkbox id={todo.id} checked={todo.completed} onCheckedChange={onToggle} />
        <label
          htmlFor={todo.id}
          className={`text-sm flex-grow ${todo.completed ? "line-through text-muted-foreground" : ""}`}
        >
          {todo.label}
        </label>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {todo.description && <p className="text-xs text-muted-foreground pl-6">{todo.description}</p>}
    </div>
    )
  }