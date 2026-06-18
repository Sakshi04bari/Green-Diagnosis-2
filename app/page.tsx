import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Shield, Search, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Leaf className="h-12 w-12 text-green-600" />
          <h1 className="text-5xl font-bold text-green-800">
            GREEN <span className="text-green-600">Diagnosis</span>
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Advanced AI-powered plant disease detection system to help farmers and gardeners identify and treat plant
          diseases quickly and accurately.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href="/detection">
              <Search className="mr-2 h-5 w-5" />
              Start Detection
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/prevention">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <Search className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-green-800">Disease Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Upload plant images for instant AI-powered disease identification with high accuracy.
            </CardDescription>
            <Button asChild className="mt-4 w-full bg-transparent" variant="outline">
              <Link href="/detection">Detect Now</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle className="text-green-800">Prevention Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Learn effective prevention strategies to keep your plants healthy and disease-free.
            </CardDescription>
            <Button asChild className="mt-4 w-full bg-transparent" variant="outline">
              <Link href="/prevention">Learn More</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <Leaf className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <CardTitle className="text-green-800">Disease Causes</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Understand the root causes of common plant diseases and environmental factors.
            </CardDescription>
            <Button asChild className="mt-4 w-full bg-transparent" variant="outline">
              <Link href="/causes">Explore Causes</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <CardTitle className="text-green-800">Detection History</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              View your previous disease detection results and track plant health over time.
            </CardDescription>
            <Button asChild className="mt-4 w-full bg-transparent" variant="outline">
              <Link href="/history">View History</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* About Section */}
      <section className="bg-white rounded-lg p-8 shadow-lg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-4">Advanced Plant Health Monitoring</h2>
            <p className="text-gray-600 mb-6">
              Our AI-powered system can detect common plant diseases including Sigatoka and Xanthomonas with high
              accuracy. Get instant results and actionable recommendations to protect your plants.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                High accuracy disease detection
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Instant results and recommendations
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Comprehensive prevention guides
              </li>
            </ul>
          </div>
          <div className="relative h-64 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center">
            <Leaf className="h-32 w-32 text-green-600 opacity-50" />
          </div>
        </div>
      </section>
    </div>
  )
}
