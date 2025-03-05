"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for individuals getting started",
    features: [
      "Up to 10 tasks",
      "Basic task management",
      "1 project",
      "Email support"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const
  },
  {
    name: "Pro",
    price: "$15",
    description: "Ideal for professionals and small teams",
    features: [
      "Unlimited tasks",
      "Advanced task management",
      "Up to 10 projects",
      "Team collaboration",
      "Priority support",
      "Custom categories"
    ],
    buttonText: "Start Pro Plan",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Enterprise",
    price: "$49",
    description: "For large organizations with advanced needs",
    features: [
      "Unlimited everything",
      "Advanced analytics",
      "24/7 priority support",
      "Custom integrations",
      "API access",
      "SSO authentication"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const
  }
]

export default function PricingPage() {
  return (
    <div className="container py-16 mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">
          Choose the perfect plan for your task management needs
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier) => (
          <Card key={tier.name} className={`flex flex-col ${tier.popular ? 'border-primary shadow-lg' : ''}}`}>
            <CardHeader>
              {tier.popular && (
                <div className="px-3 py-1 text-sm text-primary-foreground bg-primary rounded-full w-fit mb-4">
                  Most Popular
                </div>
              )}
              <CardTitle>{tier.name}</CardTitle>
              <div className="flex items-baseline mt-2">
                <span className="text-3xl font-bold tracking-tight">{tier.price}</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              <CardDescription className="mt-4">{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant={tier.buttonVariant} className="w-full">
                {tier.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}