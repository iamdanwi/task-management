"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, ListTodo, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
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

// Mock data for subjects
const subjectsData = {
  subject1: {
    id: "subject1",
    name: "Machine Learning",
    description: "Introduction to machine learning algorithms and applications",
    university: "mit",
    universityName: "MIT",
    tasks: [
      { id: "task1", name: "Read Chapter 1-3", completed: true, dueDate: "Completed", priority: "high" },
      { id: "task2", name: "Complete Assignment 1", completed: true, dueDate: "Completed", priority: "high" },
      { id: "task3", name: "Watch Lecture Videos", completed: true, dueDate: "Completed", priority: "medium" },
      { id: "task4", name: "Prepare for Midterm", completed: false, dueDate: "5 days", priority: "high" },
      { id: "task5", name: "Group Project Phase 1", completed: false, dueDate: "1 week", priority: "medium" },
    ],
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    progress: 60,
    credits: 4,
  },
  subject2: {
    id: "subject2",
    name: "Database Systems",
    description: "Fundamentals of database design and management",
    university: "mit",
    universityName: "MIT",
    tasks: [
      { id: "task1", name: "ER Diagram Assignment", completed: true, dueDate: "Completed", priority: "high" },
      { id: "task2", name: "SQL Practice Problems", completed: true, dueDate: "Completed", priority: "medium" },
      { id: "task3", name: "Normalization Quiz", completed: false, dueDate: "2 days", priority: "high" },
      { id: "task4", name: "Final Project Planning", completed: false, dueDate: "1 week", priority: "medium" },
    ],
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    progress: 50,
    credits: 3,
  },
}

export default function SubjectPage() {
  const params = useParams()
  const router = useRouter()
  const subjectId = params.subjectId as string
  const universityId = params.universityId as string
  const subject = subjectsData[subjectId as keyof typeof subjectsData]

  const [tasks, setTasks] = useState(subject?.tasks || [])

  if (!subject) {
    return <div>Subject not found</div>
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const completionRate = Math.round((completedTasks / tasks.length) * 100)

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href={`/dashboard/universities/${universityId}`} className="hover:underline">
              {subject.universityName}
            </Link>
            <span>/</span>
            <span>Subjects</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{subject.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href={`/dashboard/universities/${universityId}/subjects/${subjectId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Subject
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/universities/${universityId}/subjects/${subjectId}/tasks/new`}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription>
              {completedTasks} of {tasks.length} tasks completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Start Date:</span>
                <span className="text-sm">{subject.startDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">End Date:</span>
                <span className="text-sm">{subject.endDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Credits:</span>
                <span className="text-sm">{subject.credits}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{subject.description}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Manage tasks for this subject</CardDescription>
          </div>
          <Button asChild size="sm">
            <Link href={`/dashboard/universities/${universityId}/subjects/${subjectId}/tasks/new`}>
              <ListTodo className="mr-2 h-4 w-4" />
              New Task
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <ListTodo className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">No tasks yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm mt-1">
                  Create your first task to start tracking your progress in this subject.
                </p>
                <Button asChild className="mt-4">
                  <Link href={`/dashboard/universities/${universityId}/subjects/${subjectId}/tasks/new`}>
                    Create Task
                  </Link>
                </Button>
              </div>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
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
                      <Link
                        href={`/dashboard/universities/${universityId}/subjects/${subjectId}/tasks/${task.id}/edit`}
                      >
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
    </div>
  )
}

