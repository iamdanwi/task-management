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

const subjects = [
  {
    id: 1,
    name: "Computer Science",
    description: "Introduction to computer science and programming",
    university: "University of Technology",
    units: 8,
    completedUnits: 5,
    grade: "A",
    semester: "Fall 2023",
  },
  {
    id: 2,
    name: "Mathematics",
    description: "Advanced calculus and linear algebra",
    university: "University of Technology",
    units: 6,
    completedUnits: 4,
    grade: "B+",
    semester: "Fall 2023",
  },
  {
    id: 3,
    name: "Business Administration",
    description: "Principles of management and leadership",
    university: "Business School",
    units: 5,
    completedUnits: 3,
    grade: "A-",
    semester: "Fall 2023",
  },
  {
    id: 4,
    name: "Marketing",
    description: "Digital marketing strategies and analytics",
    university: "Business School",
    units: 4,
    completedUnits: 2,
    grade: "B",
    semester: "Fall 2023",
  },
]

export function SubjectList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {subjects.map((subject) => (
        <Card key={subject.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle>{subject.name}</CardTitle>
              <CardDescription>{subject.description}</CardDescription>
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
                  <Link href={`/dashboard/subjects/${subject.id}`}>View Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/subjects/${subject.id}/edit`}>
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
              <span className="text-sm font-medium text-muted-foreground">University:</span>
              <span className="text-sm font-medium">{subject.university}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Grade:</span>
              <Badge>{subject.grade}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Semester:</span>
              <span className="text-sm font-medium">{subject.semester}</span>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">
                  {subject.completedUnits}/{subject.units} Units
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(subject.completedUnits / subject.units) * 100}%` }}
                />
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

