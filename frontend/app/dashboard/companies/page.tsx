"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Briefcase, Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data for companies
const companiesData = [
  {
    id: "acme-inc",
    name: "Acme Inc",
    projects: 3,
    tasks: 16,
    completed: 12,
    description: "Technology solutions provider",
  },
  {
    id: "globex",
    name: "Globex Corp",
    projects: 2,
    tasks: 10,
    completed: 6,
    description: "Global exports and trading",
  },
  {
    id: "initech",
    name: "Initech",
    projects: 1,
    tasks: 4,
    completed: 3,
    description: "Software development firm",
  },
]

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCompanies = companiesData.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
        <Button asChild>
          <Link href="/dashboard/companies/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Link>
        </Button>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input
          type="search"
          placeholder="Search companies..."
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
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div className="grid gap-1">
                <CardTitle>{company.name}</CardTitle>
                <CardDescription>{company.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="grid gap-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Projects: {company.projects}</div>
                  <div>Tasks: {company.tasks}</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>Completion Rate:</div>
                  <div>{Math.round((company.completed / company.tasks) * 100)}%</div>
                </div>
                <Progress value={Math.round((company.completed / company.tasks) * 100)} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/dashboard/companies/${company.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}

        <Card className="flex flex-col items-center justify-center p-6 border-dashed">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Add New Company</h3>
            <p className="text-sm text-muted-foreground text-center">
              Create a new company to organize your projects and tasks
            </p>
            <Button asChild>
              <Link href="/dashboard/companies/new">Create Company</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

