"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/calendar"
import { Sidebar } from "@/components/sidebar"
import { CalendarProvider } from "@/lib/CalendarContext"

export default function Page() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // or a loading spinner
  }

  return (
    <CalendarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Calendar/>
        </main>
      </div>
    </CalendarProvider>
  )
}

