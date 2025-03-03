import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SubjectList } from "@/components/subjects/subject-list"

export default function SubjectsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Subjects</h1>
          <p className="text-muted-foreground">Manage your university subjects and their units</p>
        </div>
        <Link href="/dashboard/subjects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Subject
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="Search subjects..." className="max-w-sm" />
      </div>
      <SubjectList />
    </div>
  )
}

