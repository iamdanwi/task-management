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

const companies = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    description: "Software development company specializing in web applications",
    projects: 5,
    tasks: 24,
    completionRate: 75,
  },
  {
    id: 2,
    name: "Digital Innovations",
    description: "Digital marketing and web design agency",
    projects: 3,
    tasks: 18,
    completionRate: 60,
  },
  {
    id: 3,
    name: "Global Systems",
    description: "Enterprise software solutions provider",
    projects: 2,
    tasks: 12,
    completionRate: 80,
  },
  {
    id: 4,
    name: "Creative Studios",
    description: "Creative design and multimedia production",
    projects: 2,
    tasks: 10,
    completionRate: 90,
  },
]

export function CompanyList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <Card key={company.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle>{company.name}</CardTitle>
              <CardDescription>{company.description}</CardDescription>
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
                  <Link href={`/dashboard/companies/${company.id}`}>View Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/companies/${company.id}/edit`}>
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
                <span className="text-sm font-medium text-muted-foreground">Projects</span>
                <span className="text-xl font-bold">{company.projects}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Tasks</span>
                <span className="text-xl font-bold">{company.tasks}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="text-sm font-medium">{company.completionRate}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${company.completionRate}%` }} />
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

