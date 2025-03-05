"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, CheckCircle, ListTodo, Briefcase, BookOpen, ArrowRight, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b relative">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6" />
            <span className="font-bold">TaskMaster</span>
          </Link>
          <nav className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-full left-0 right-0 flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 space-x-0 md:space-x-6 bg-background md:bg-transparent p-4 md:p-0 border-b md:border-0 w-full md:w-auto`}>
            <Link href="/features" className="text-sm font-medium hover:text-primary">Features</Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary">Pricing</Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">About</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild className="hidden md:inline-flex">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="hidden md:inline-flex">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t p-4 space-y-4">
            <Button variant="ghost" asChild className="w-full justify-center">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="w-full justify-center">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
              alt="Team collaboration"
              className="w-full h-full object-cover opacity-10"
            />
          </div>
          <div className="container flex flex-col items-center text-center space-y-8 relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl animate-fade-up">
              Manage Your Tasks with Precision and Elegance
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl animate-fade-up animation-delay-100">
              The ultimate task management solution for companies and universities. Stay organized, boost productivity, and achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-200">
              <Button size="lg" asChild>
                <Link href="/signup">Start for Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/40 relative overflow-hidden">
          <div className="container relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Powerful Features for Every Need</h2>
              <p className="text-xl text-muted-foreground">Everything you need to manage tasks effectively</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-background hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
                    alt="Company management"
                    className="w-full h-full object-cover opacity-5"
                  />
                </div>
                <CardHeader className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Company Management</CardTitle>
                  <CardDescription>Organize tasks and projects for your company efficiently</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80"
                    alt="University tasks"
                    className="w-full h-full object-cover opacity-5"
                  />
                </div>
                <CardHeader className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>University Tasks</CardTitle>
                  <CardDescription>Keep track of assignments, deadlines, and academic projects</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
                    alt="Task analytics"
                    className="w-full h-full object-cover opacity-5"
                  />
                </div>
                <CardHeader className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <ListTodo className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Task Analytics</CardTitle>
                  <CardDescription>Gain insights into your productivity and progress</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Loved by Professionals</h2>
              <p className="text-xl text-muted-foreground">See what our users have to say</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Project Manager",
                  company: "Tech Corp",
                  text: "TaskMaster has revolutionized how we manage projects. The interface is intuitive and the features are exactly what we needed."
                },
                {
                  name: "Michael Chen",
                  role: "Graduate Student",
                  company: "Stanford University",
                  text: "As a student, keeping track of assignments and deadlines is crucial. TaskMaster makes it effortless and helps me stay organized."
                },
                {
                  name: "Emily Davis",
                  role: "CEO",
                  company: "Startup Inc",
                  text: "The best task management tool I've used. It's helped our team stay focused and productive, with great collaboration features."
                }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-muted/40">
                  <CardHeader>
                    <CardContent className="pt-4 px-0">
                      <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </CardContent>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of satisfied users and transform your task management today</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup" className="flex items-center">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-sm text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy</Link></li>
                <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Social</h3>
              <ul className="space-y-2">
                <li><Link href="https://twitter.com" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2">Twitter</Link></li>
                <li><Link href="https://github.com" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2">GitHub</Link></li>
                <li><Link href="https://linkedin.com" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

