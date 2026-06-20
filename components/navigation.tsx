"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Leaf, Menu, Home, Search, Shield, AlertTriangle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Detection", href: "/detection", icon: Search },
  { name: "Prevention", href: "/prevention", icon: Shield },
  { name: "Causes", href: "/causes", icon: AlertTriangle },
  { name: "History", href: "/history", icon: Clock },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-lg font-bold">
              GREEN <span className="text-green-600">Diagnosis</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                    pathname === item.href
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:text-green-600",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-2 px-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <span className="font-bold text-green-800">GREEN Diagnosis</span>
                </div>
                <nav className="flex flex-col gap-2">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "bg-green-100 text-green-700"
                            : "text-gray-600 hover:text-green-600 hover:bg-green-50",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
