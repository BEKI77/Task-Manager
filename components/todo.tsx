import React from "react"
import { useCalendar, type  Todo } from "@/lib/CalendarContext"
import {  Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

export default function TodoDis(todo:Todo) {
    const {toggleTodo, deleteTodo } = useCalendar()

    return(
        <Dialog>
            <DialogTrigger asChild>
                <div
                  key={todo.id}
                  className={`absolute inset-x-2 top-2 bottom-2  ${
                    todo.completed ? "bg-green-100 " : "bg-yellow-200 dark:bg-zinc-900"
                  } rounded-2xl p-2 flex items-center justify-between h-full opacity-[0.9]`}
                >
                  <div className="flex items-center space-x-2 text-black dark:text-white">
                    <Checkbox
                      id={`calendar-${todo.id}`}
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="border border-black bg-slate-100"
                    />
                    <label
                      htmlFor={`calendar-${todo.id}`}
                      className={`text-sm font-medium  ${todo.completed ? "line-through text-black" : ""}`}
                    >
                      {todo.label}
                    </label>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => deleteTodo(todo.id)}>
                    <Trash2 className={`h-4 w-4 ${todo.completed ? "text-black":""}`} />
                  </Button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{todo.label}</DialogTitle>
                    <DialogDescription>
                        {todo.description!=undefined ? todo.description:"No description"}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}