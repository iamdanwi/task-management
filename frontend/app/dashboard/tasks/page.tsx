"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, Briefcase, Edit, ListTodo, Plus, Search, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for tasks
const tasksData = [
  {
    id: "task1",
    name: "Complete Q1 Financial Report",
    entity: "Acme Inc",
    entityType: "company",
    project: "Q1 Financial Report",
    dueDate: "2 days",
    priority: "high",
    completed: false,
  },
  {
    id: "task2",
    name: "Submit Machine Learning Assignment",
    entity: "MIT",
    entityType: "university",
    project: "Machine Learning",
    dueDate: "tomorrow",
    priority: "high",
    completed: false,
  },
  {
    id: "task3",
    name: "Prepare Marketing Presentation",
    entity: "Globex Corp",
    entityType: "company",
    project: "Marketing Campaign",
    dueDate: "3 days",
    priority: "medium",
    completed: false,
  },
  {
    id: "task4",
    name: "Study for Database Systems Exam",
    entity: "Stanford",
    entityType: "university",
    project: "Database Systems",
    dueDate: "5 days",
    priority: "medium",
    completed: false,
  },
  {
    id: "task5",
    name: "Update homepage design",
    entity: "Acme Inc",
    entityType: "company",
    project: "Website Redesign",
    dueDate: "completed",
    priority: "medium",
    completed: true,
  },
  {
    id: "task6",
    name: "Read Chapter 1-3",
    entity: "MIT",
    entityType: "university",
    project: "Machine Learning",
    dueDate: "completed",
    priority: "medium",
    completed: true,
  },
]

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [tasks, setTasks] = useState(tasksData)

  const filteredTasks = tasks.filter((task) => {
    // Filter by search query
    const matchesSearch =
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.project.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by completion status
    const matchesFilter =
      filter === "all" || (filter === "completed" && task.completed) || (filter === "pending" && !task.completed)

    return matchesSearch && matchesFilter
  })

  const companyTasks = filteredTasks.filter((task) => task.entityType === "company")
  const universityTasks = filteredTasks.filter((task) => task.entityType === "university")

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">All Tasks</h1>
        <Button asChild>
          <Link href="/dashboard/tasks/new">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="companies">Company Tasks</TabsTrigger>
          <TabsTrigger value="universities">University Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>View and manage all your tasks across companies and universities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <ListTodo className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">No tasks found</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mt-1">
                      {searchQuery
                        ? "Try adjusting your search or filters to find what you're looking for."
                        : "Create your first task to start tracking your progress."}
                    </p>
                    {!searchQuery && (
                      <Button asChild className="mt-4">
                        <Link href="/dashboard/tasks/new">Create Task</Link>
                      </Button>
                    )}
                  </div>
                ) : (
                  filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`task-${task.id}`}
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskCompletion(task.id)}
                        />
                        <div className="grid gap-0.5">
                          <label
                            htmlFor={`task-${task.id}`}
                            className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {task.name}
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {task.entityType === "company" ? (
                                <Briefcase className="h-3 w-3 text-muted-foreground" />
                              ) : (
                                <BookOpen className="h-3 w-3 text-muted-foreground" />
                              )}
                              <span className="text-xs text-muted-foreground">
                                {task.entity} • {task.project}
                              </span>
                            </div>
                            <div
                              className={`flex h-5 items-center rounded-full px-2 text-xs font-medium
                              ${
                                task.priority === "high"
                                  ? "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-500"
                                  : task.priority === "medium"
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-700/20 dark:text-amber-500"
                                    : "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-500"
                              }`}
                            >
                              {task.priority}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {task.completed ? "Completed" : `Due: ${task.dueDate}`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/dashboard/tasks/${task.id}/edit`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the task "{task.name}". This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteTask(task.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Tasks</CardTitle>
              <CardDescription>View and manage tasks related to your companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companyTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">No company tasks found</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mt-1">
                      {searchQuery
                        ? "Try adjusting your search or filters to find what you're looking for."
                        : "Create your first company task to start tracking your progress."}
                    </p>
                    {!searchQuery && (
                      <Button asChild className="mt-4">
                        <Link href="/dashboard/tasks/new">Create Task</Link>
                      </Button>
                    )}
                  </div>
                ) : (
                  companyTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`company-task-${task.id}`}
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskCompletion(task.id)}
                        />
                        <div className="grid gap-0.5">
                          <label
                            htmlFor={`company-task-${task.id}`}
                            className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {task.name}
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {task.entity} • {task.project}
                              </span>
                            </div>
                            <div
                              className={`flex h-5 items-center rounded-full px-2 text-xs font-medium
                              ${
                                task.priority === "high"
                                  ? "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-500"
                                  : task.priority === "medium"
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-700/20 dark:text-amber-500"
                                    : "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-500"
                              }`}
                            >
                              {task.priority}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {task.completed ? "Completed" : `Due: ${task.dueDate}`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/dashboard/tasks/${task.id}/edit`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the task "{task.name}". This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteTask(task.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="universities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>University Tasks</CardTitle>
              <CardDescription>View and manage tasks related to your universities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {universityTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">No university tasks found</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mt-1">
                      {searchQuery
                        ? "Try adjusting your search or filters to find what you're looking for."
                        : "Create your first university task to start tracking your progress."}
                    </p>
                    {!searchQuery && (
                      <Button asChild className="mt-4">
                        <Link href="/dashboard/tasks/new">Create Task</Link>
                      </Button>
                    )}
                  </div>
                ) : (
                  universityTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`university-task-${task.id}`}
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskCompletion(task.id)}
                        />
                        <div className="grid gap-0.5">
                          <label
                            htmlFor={`university-task-${task.id}`}
                            className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {task.name}
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {task.entity} • {task.project}
                              </span>
                            </div>
                            <div
                              className={`flex h-5 items-center rounded-full px-2 text-xs font-medium
                              ${
                                task.priority === "high"
                                  ? "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-500"
                                  : task.priority === "medium"
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-700/20 dark:text-amber-500"
                                    : "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-500"
                              }`}
                            >
                              {task.priority}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {task.completed ? "Completed" : `Due: ${task.dueDate}`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/dashboard/tasks/${task.id}/edit`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the task "{task.name}". This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteTask(task.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

