"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, CheckCircle2, Clock, ListTodo, Plus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data - in a real app, this would come from your backend
const universityData = {
  mit: {
    name: "MIT",
    subjects: [
      { id: "subject1", name: "Machine Learning", units: 5, completed: 3 },
      { id: "subject2", name: "Database Systems", units: 4, completed: 2 },
      { id: "subject3", name: "Algorithms", units: 6, completed: 4 },
    ],
    tasks: [
      {
        id: "task1",
        name: "Complete ML assignment",
        subject: "Machine Learning",
        dueDate: "tomorrow",
        status: "urgent",
      },
      { id: "task2", name: "Study for DB exam", subject: "Database Systems", dueDate: "5 days", status: "normal" },
      { id: "task3", name: "Research paper review", subject: "Machine Learning", dueDate: "3 days", status: "normal" },
      { id: "task4", name: "Algorithm problem set", subject: "Algorithms", dueDate: "2 days", status: "in-progress" },
    ],
  },
  stanford: {
    name: "Stanford",
    subjects: [
      { id: "subject1", name: "Computer Vision", units: 4, completed: 2 },
      { id: "subject2", name: "Natural Language Processing", units: 5, completed: 2 },
    ],
    tasks: [
      { id: "task1", name: "CV project milestone", subject: "Computer Vision", dueDate: "4 days", status: "normal" },
      {
        id: "task2",
        name: "NLP homework",
        subject: "Natural Language Processing",
        dueDate: "tomorrow",
        status: "urgent",
      },
      {
        id: "task3",
        name: "Research paper presentation",
        subject: "Natural Language Processing",
        dueDate: "1 week",
        status: "normal",
      },
    ],
  },
}

export default function UniversityPage() {
  const params = useParams()
  const universityId = params.universityId as string
  const university = universityData[universityId as keyof typeof universityData]

  if (!university) {
    return <div>University not found</div>
  }

  const totalUnits = university.subjects.reduce((acc, subject) => acc + subject.units, 0)
  const completedUnits = university.subjects.reduce((acc, subject) => acc + subject.completed, 0)
  const completionRate = Math.round((completedUnits / totalUnits) * 100)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{university.name}</h1>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={`/dashboard/universities/${universityId}/subjects/new`}>
              <Plus className="mr-2 h-4 w-4" />
              New Subject
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/universities/${universityId}/tasks/new`}>
              <ListTodo className="mr-2 h-4 w-4" />
              New Task
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{university.subjects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUnits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedUnits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <Progress value={completionRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subjects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {university.subjects.map((subject) => (
              <Card key={subject.id}>
                <CardHeader>
                  <CardTitle>{subject.name}</CardTitle>
                  <CardDescription>
                    {subject.units} units, {subject.completed} completed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">
                        {Math.round((subject.completed / subject.units) * 100)}%
                      </span>
                    </div>
                    <Progress value={Math.round((subject.completed / subject.units) * 100)} className="h-2" />
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/dashboard/universities/${universityId}/subjects/${subject.id}`}>View Subject</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Card className="flex flex-col items-center justify-center p-6 border-dashed">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Add New Subject</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Create a new subject to organize your academic tasks
                </p>
                <Button asChild>
                  <Link href={`/dashboard/universities/${universityId}/subjects/new`}>Create Subject</Link>
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>All tasks for {university.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {university.tasks.map((task) => (
                  <div key={task.id} className="flex items-center">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      {task.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : (
                        <BookOpen className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{task.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {task.subject} • Due {task.dueDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.status === "urgent" && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-500">
                          <Clock className="h-4 w-4" />
                        </div>
                      )}
                      {task.status === "in-progress" && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-700/20 dark:text-amber-500">
                          <Clock className="h-4 w-4" />
                        </div>
                      )}
                      {task.status === "normal" && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-500">
                          <Clock className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <Button asChild variant="outline" className="w-full">
                  <Link href={`/dashboard/universities/${universityId}/tasks/new`}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Task
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

