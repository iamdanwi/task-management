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

const universities = [
  {
    id: 1,
    name: "University of Technology",
    description: "A leading institution for technology and engineering",
    subjects: 8,
    units: 32,
    completionRate: 65,
  },
  {
    id: 2,
    name: "Business School",
    description: "Specializing in business administration and management",
    subjects: 6,
    units: 24,
    completionRate: 80,
  },
]

export function UniversityList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {universities.map((university) => (
        <Card key={university.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle>{university.name}</CardTitle>
              <CardDescription>{university.description}</CardDescription>
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
                  <Link href={`/dashboard/universities/${university.id}`}>View Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/universities/${university.id}/edit`}>
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
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Subjects</span>
                <span className="text-xl font-bold">{university.subjects}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Units</span>
                <span className="text-xl font-bold">{university.units}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="text-sm font-medium">{university.completionRate}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${university.completionRate}%` }} />
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

