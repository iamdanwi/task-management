"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

const initialTasks = [
  {
    id: 1,
    title: "Frontend Development",
    description: "Implement user interface components",
    project: "E-commerce Website",
    company: "Tech Solutions Inc.",
    dueDate: "2023-12-10",
    priority: "High",
    status: "In Progress",
    completed: false,
  },
  {
    id: 2,
    title: "Database Design",
    description: "Design database schema for CRM",
    project: "CRM System",
    company: "Digital Innovations",
    dueDate: "2023-11-25",
    priority: "Medium",
    status: "In Progress",
    completed: false,
  },
  {
    id: 3,
    title: "Research Paper",
    description: "Complete research paper on AI algorithms",
    project: "Computer Science",
    company: "University of Technology",
    dueDate: "2023-12-15",
    priority: "High",
    status: "In Progress",
    completed: false,
  },
  {
    id: 4,
    title: "API Integration",
    description: "Integrate payment gateway API",
    project: "E-commerce Website",
    company: "Tech Solutions Inc.",
    dueDate: "2023-12-05",
    priority: "High",
    status: "In Progress",
    completed: false,
  },
  {
    id: 5,
    title: "Final Exam",
    description: "Prepare for final mathematics exam",
    project: "Mathematics",
    company: "University of Technology",
    dueDate: "2023-12-20",
    priority: "High",
    status: "Not Started",
    completed: false,
  },
]

export function TaskList() {
  const [tasks, setTasks] = useState(initialTasks)

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed, status: !task.completed ? "Completed" : "In Progress" }
          : task,
      ),
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <Card key={task.id} className={task.completed ? "opacity-60" : ""}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-start gap-2">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
                className="mt-1"
              />
              <div className="space-y-1">
                <CardTitle className={task.completed ? "line-through" : ""}>{task.title}</CardTitle>
                <CardDescription>{task.description}</CardDescription>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/tasks/${task.id}`}>View Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/tasks/${task.id}/edit`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Project:</span>
              <span className="text-sm font-medium">{task.project}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Company:</span>
              <span className="text-sm font-medium">{task.company}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Due Date:</span>
              <span className="text-sm font-medium">{task.dueDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Priority:</span>
              <Badge
                variant={
                  task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"
                }
              >
                {task.priority}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Status:</span>
              <Badge
                variant={
                  task.status === "Completed" ? "default" : task.status === "In Progress" ? "secondary" : "outline"
                }
              >
                {task.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

