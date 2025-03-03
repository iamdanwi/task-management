"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  BookOpen,
  Building,
  CheckSquare,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  Settings,
} from "lucide-react"

import { cn } from "@/lib/utils"

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="grid gap-2 text-sm font-medium">
      <Link
        href="/dashboard"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          pathname === "/dashboard" && "bg-muted text-primary",
        )}
      >
        <LayoutDashboard className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/dashboard/companies"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          pathname === "/dashboard/companies" && "bg-muted text-primary",
        )}
      >
        <Building className="h-4 w-4" />
        Companies
      </Link>
      <Link
        href="/dashboard/universities"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          pathname === "/dashboard/universities" && "bg-muted text-primary",
        )}
      >
        <GraduationCap className="h-4 w-4" />
        Universities
      </Link>
      <Link
        href="/dashboard/projects"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          pathname === "/dashboard/projects" && "bg-muted text-primary",
        )}
      >
        <FolderKanban className="h-4 w-4" />
        Projects
      </Link>
      <Link
        href="/dashboard/subjects"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          pathname === "/dashboard/subjects" && "bg-muted text-primary",
        )}
      >
        <BookOpen className="h-4 w-4" />
        Subjects
      </Link>
      <Link
        href="/dashboard/tasks"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          pathname === "/dashboard/tasks" && "bg-muted text-primary",
        )}
      >
        <CheckSquare className="h-4 w-4" />
        Tasks
      </Link>
      <Link
        href="/dashboard/analytics"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          pathname === "/dashboard/analytics" && "bg-muted text-primary",
        )}
      >
        <BarChart3 className="h-4 w-4" />
        Analytics
      </Link>
      <Link
        href="/dashboard/settings"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          pathname === "/dashboard/settings" && "bg-muted text-primary",
        )}
      >
        <Settings className="h-4 w-4" />
        Settings
      </Link>
    </div>
  )
}

