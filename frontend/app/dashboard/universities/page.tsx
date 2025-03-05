"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data for universities
const universitiesData = [
  {
    id: "mit",
    name: "MIT",
    subjects: 3,
    units: 15,
    completed: 9,
    description: "Massachusetts Institute of Technology",
  },
  {
    id: "stanford",
    name: "Stanford",
    subjects: 2,
    units: 9,
    completed: 4,
    description: "Stanford University",
  },
]

export default function UniversitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUniversities = universitiesData.filter((university) =>
    university.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Universities</h1>
        <Button asChild>
          <Link href="/dashboard/universities/new">
            <Plus className="mr-2 h-4 w-4" />
            Add University
          </Link>
        </Button>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input
          type="search"
          placeholder="Search universities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUniversities.map((university) => (
          <Card key={university.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="grid gap-1">
                <CardTitle>{university.name}</CardTitle>
                <CardDescription>{university.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="grid gap-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Subjects: {university.subjects}</div>
                  <div>Units: {university.units}</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>Completion Rate:</div>
                  <div>{Math.round((university.completed / university.units) * 100)}%</div>
                </div>
                <Progress value={Math.round((university.completed / university.units) * 100)} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/dashboard/universities/${university.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}

        <Card className="flex flex-col items-center justify-center p-6 border-dashed">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Add New University</h3>
            <p className="text-sm text-muted-foreground text-center">
              Create a new university to organize your subjects and academic tasks
            </p>
            <Button asChild>
              <Link href="/dashboard/universities/new">Create University</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

