import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UniversityList } from "@/components/universities/university-list"

export default function UniversitiesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Universities</h1>
          <p className="text-muted-foreground">Manage your universities and their subjects</p>
        </div>
        <Link href="/dashboard/universities/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add University
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="Search universities..." className="max-w-sm" />
      </div>
      <UniversityList />
    </div>
  )
}

