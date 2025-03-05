"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Briefcase, ChevronDown, LayoutDashboard, ListTodo, Settings } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function DashboardNav() {
  const pathname = usePathname()
  const [openCompanies, setOpenCompanies] = useState(true)
  const [openUniversities, setOpenUniversities] = useState(true)

  return (
    <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 w-64 border-r min-h-screen">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === "/dashboard" ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>

        <Collapsible open={openCompanies} onOpenChange={setOpenCompanies} className="w-full">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5" />
                <span>Companies</span>
              </div>
              <ChevronDown className={cn("h-4 w-4 transition-all", openCompanies ? "rotate-180" : "")} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-8 pt-1">
            <div className="grid gap-1">
              <Link
                href="/dashboard/companies"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === "/dashboard/companies" ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <span>All Companies</span>
              </Link>
              <Link
                href="/dashboard/companies/acme-inc"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === "/dashboard/companies/acme-inc" ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <span>Acme Inc</span>
              </Link>
              <Link
                href="/dashboard/companies/globex"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === "/dashboard/companies/globex" ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <span>Globex Corp</span>
              </Link>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openUniversities} onOpenChange={setOpenUniversities} className="w-full">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5" />
                <span>Universities</span>
              </div>
              <ChevronDown className={cn("h-4 w-4 transition-all", openUniversities ? "rotate-180" : "")} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-8 pt-1">
            <div className="grid gap-1">
              <Link
                href="/dashboard/universities"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === "/dashboard/universities" ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <span>All Universities</span>
              </Link>
              <Link
                href="/dashboard/universities/mit"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === "/dashboard/universities/mit" ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <span>MIT</span>
              </Link>
              <Link
                href="/dashboard/universities/stanford"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === "/dashboard/universities/stanford" ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <span>Stanford</span>
              </Link>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Link
          href="/dashboard/tasks"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === "/dashboard/tasks" ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          <ListTodo className="h-5 w-5" />
          <span>All Tasks</span>
        </Link>

        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === "/dashboard/settings" ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  )
}

