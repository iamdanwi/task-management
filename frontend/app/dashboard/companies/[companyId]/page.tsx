"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, ListTodo, Plus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data - in a real app, this would come from your backend
const companyData = {
  "acme-inc": {
    name: "Acme Inc",
    projects: [
      { id: "project1", name: "Website Redesign", tasks: 5, completed: 4 },
      { id: "project2", name: "Q1 Financial Report", tasks: 3, completed: 2 },
      { id: "project3", name: "Product Launch", tasks: 8, completed: 6 },
    ],
    tasks: [
      {
        id: "task1",
        name: "Update homepage design",
        project: "Website Redesign",
        dueDate: "2 days",
        status: "in-progress",
      },
      { id: "task2", name: "Finalize Q1 numbers", project: "Q1 Financial Report", dueDate: "1 day", status: "urgent" },
      {
        id: "task3",
        name: "Create marketing materials",
        project: "Product Launch",
        dueDate: "5 days",
        status: "normal",
      },
      { id: "task4", name: "Prepare press release", project: "Product Launch", dueDate: "3 days", status: "normal" },
    ],
  },
  globex: {
    name: "Globex Corp",
    projects: [
      { id: "project1", name: "Marketing Campaign", tasks: 4, completed: 2 },
      { id: "project2", name: "Sales Strategy", tasks: 6, completed: 4 },
    ],
    tasks: [
      {
        id: "task1",
        name: "Design social media ads",
        project: "Marketing Campaign",
        dueDate: "3 days",
        status: "normal",
      },
      {
        id: "task2",
        name: "Prepare sales presentation",
        project: "Sales Strategy",
        dueDate: "tomorrow",
        status: "urgent",
      },
      {
        id: "task3",
        name: "Analyze competitor pricing",
        project: "Sales Strategy",
        dueDate: "4 days",
        status: "normal",
      },
    ],
  },
  initech: {
    name: "Initech",
    projects: [{ id: "project1", name: "System Migration", tasks: 4, completed: 3 }],
    tasks: [
      {
        id: "task1",
        name: "Backup current data",
        project: "System Migration",
        dueDate: "completed",
        status: "completed",
      },
      { id: "task2", name: "Test new system", project: "System Migration", dueDate: "2 days", status: "in-progress" },
    ],
  },
}

export default function CompanyPage() {
  const params = useParams()
  const companyId = params.companyId as string
  const company = companyData[companyId as keyof typeof companyData]

  if (!company) {
    return <div>Company not found</div>
  }

  const totalTasks = company.projects.reduce((acc, project) => acc + project.tasks, 0)
  const completedTasks = company.projects.reduce((acc, project) => acc + project.completed, 0)
  const completionRate = Math.round((completedTasks / totalTasks) * 100)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={`/dashboard/companies/${companyId}/projects/new`}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/companies/${companyId}/tasks/new`}>
              <ListTodo className="mr-2 h-4 w-4" />
              New Task
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{company.projects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
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

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {company.projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>
                    {project.tasks} tasks, {project.completed} completed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">
                        {Math.round((project.completed / project.tasks) * 100)}%
                      </span>
                    </div>
                    <Progress value={Math.round((project.completed / project.tasks) * 100)} className="h-2" />
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/dashboard/companies/${companyId}/projects/${project.id}`}>View Project</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Card className="flex flex-col items-center justify-center p-6 border-dashed">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Add New Project</h3>
                <p className="text-sm text-muted-foreground text-center">Create a new project to organize your tasks</p>
                <Button asChild>
                  <Link href={`/dashboard/companies/${companyId}/projects/new`}>Create Project</Link>
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>All tasks for {company.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {company.tasks.map((task) => (
                  <div key={task.id} className="flex items-center">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      {task.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : (
                        <Clock className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{task.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {task.project} • Due {task.dueDate}
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
                  <Link href={`/dashboard/companies/${companyId}/tasks/new`}>
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

