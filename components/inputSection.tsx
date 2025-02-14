import { Plus} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Textarea } from "./ui/textarea"
import { useCalendar } from "@/lib/CalendarContext"

export default function InPutSection() {
    const {addTodo, currentDate } = useCalendar()
    const [newTodo, setNewTodo] = useState("")
    const [newTodoTime, setNewTodoTime] = useState("12:00")
    const [newTodoDescription, setNewTodoDescription] = useState("")
   
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
    return(
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
    )
}