// "use client"
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
// import { useState, useEffect } from "react"
import { Calendar } from "@/components/calendar"
import { Sidebar } from "@/components/sidebar"
import { CalendarProvider } from "@/lib/CalendarContext"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/signin");
  }

  // const [isClient, setIsClient] = useState(false)

  // useEffect(() => {
  //   setIsClient(true)
  // }, [])

  // if (!isClient) {
  //   return null // or a loading spinner
  // }

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