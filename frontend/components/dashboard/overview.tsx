"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const companyData = [
  {
    name: "Jan",
    total: 45,
  },
  {
    name: "Feb",
    total: 52,
  },
  {
    name: "Mar",
    total: 61,
  },
  {
    name: "Apr",
    total: 58,
  },
  {
    name: "May",
    total: 71,
  },
  {
    name: "Jun",
    total: 75,
  },
]

const universityData = [
  {
    name: "Jan",
    total: 32,
  },
  {
    name: "Feb",
    total: 40,
  },
  {
    name: "Mar",
    total: 45,
  },
  {
    name: "Apr",
    total: 52,
  },
  {
    name: "May",
    total: 58,
  },
  {
    name: "Jun",
    total: 62,
  },
]

const overallData = [
  {
    name: "Jan",
    companies: 45,
    universities: 32,
  },
  {
    name: "Feb",
    companies: 52,
    universities: 40,
  },
  {
    name: "Mar",
    companies: 61,
    universities: 45,
  },
  {
    name: "Apr",
    companies: 58,
    universities: 52,
  },
  {
    name: "May",
    companies: 71,
    universities: 58,
  },
  {
    name: "Jun",
    companies: 75,
    universities: 62,
  },
]

interface OverviewProps {
  type?: "overall" | "companies" | "universities"
}

export function Overview({ type = "overall" }: OverviewProps) {
  if (type === "companies") {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={companyData}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip />
          <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (type === "universities") {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={universityData}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip />
          <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={overallData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip />
        <Line type="monotone" dataKey="companies" stroke="#2563eb" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="universities" stroke="#16a34a" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

