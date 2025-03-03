"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    action: "completed",
    task: "Frontend Development",
    project: "E-commerce Website",
    company: "Tech Solutions Inc.",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    action: "started",
    task: "Database Design",
    project: "CRM System",
    company: "Digital Innovations",
    time: "4 hours ago",
  },
  {
    id: 3,
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    action: "updated",
    task: "Research Paper",
    project: "Computer Science",
    company: "University of Technology",
    time: "Yesterday",
  },
  {
    id: 4,
    user: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    action: "completed",
    task: "Final Exam",
    project: "Mathematics",
    company: "University of Technology",
    time: "2 days ago",
  },
  {
    id: 5,
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    action: "started",
    task: "API Integration",
    project: "Mobile App",
    company: "Tech Solutions Inc.",
    time: "3 days ago",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user.name} <span className="text-muted-foreground">{activity.action}</span>{" "}
              <span className="font-semibold">{activity.task}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.project} • {activity.company}
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

