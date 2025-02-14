"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/calendar"
import { Sidebar } from "@/components/sidebar"
import { CalendarProvider } from "@/lib/CalendarContext"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

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
        <ResizablePanelGroup direction="horizontal"  className="h-screen">
          <ResizablePanel className="h-screen hidden md:block "  defaultSize={30}>
            <div className="h-full overflow-y-auto w">
              <Sidebar />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="h-screen flex-1">
            <div className="h-full overflow-y-auto">
              <Calendar />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </CalendarProvider>
  )
}