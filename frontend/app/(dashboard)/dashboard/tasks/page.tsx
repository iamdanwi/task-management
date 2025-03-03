import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TaskList } from "@/components/tasks/task-list"

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage your tasks across all projects and subjects</p>
        </div>
        <Link href="/dashboard/tasks/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="Search tasks..." className="max-w-sm" />
      </div>
      <TaskList />
    </div>
  )
}

