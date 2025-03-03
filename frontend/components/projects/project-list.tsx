"use client"

import Link from "next/link"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    id: 1,
    name: "E-commerce Website",
    description: "Online shopping platform for retail products",
    company: "Tech Solutions Inc.",
    tasks: 8,
    completedTasks: 5,
    status: "In Progress",
    dueDate: "2023-12-15",
  },
  {
    id: 2,
    name: "CRM System",
    description: "Customer relationship management system",
    company: "Digital Innovations",
    tasks: 12,
    completedTasks: 4,
    status: "In Progress",
    dueDate: "2023-11-30",
  },
  {
    id: 3,
    name: "Mobile App",
    description: "Cross-platform mobile application",
    company: "Tech Solutions Inc.",
    tasks: 10,
    completedTasks: 8,
    status: "In Progress",
    dueDate: "2023-12-20",
  },
  {
    id: 4,
    name: "Marketing Campaign",
    description: "Digital marketing campaign for new product launch",
    company: "Creative Studios",
    tasks: 6,
    completedTasks: 6,
    status: "Completed",
    dueDate: "2023-11-15",
  },
  {
    id: 5,
    name: "Database Migration",
    description: "Migrate legacy database to new system",
    company: "Global Systems",
    tasks: 5,
    completedTasks: 2,
    status: "In Progress",
    dueDate: "2023-12-10",
  },
]

export function ProjectList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
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
                  <Link href={`/dashboard/projects/${project.id}`}>View Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/projects/${project.id}/edit`}>
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
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Company:</span>
              <span className="text-sm font-medium">{project.company}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Status:</span>
              <Badge variant={project.status === "Completed" ? "default" : "secondary"}>{project.status}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Due Date:</span>
              <span className="text-sm font-medium">{project.dueDate}</span>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">
                  {project.completedTasks}/{project.tasks} Tasks
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(project.completedTasks / project.tasks) * 100}%` }}
                />
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

