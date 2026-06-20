import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Shield, Search, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-20 px-4 rounded-lg bg-gradient-to-b from-green-100 to-emerald-50">
        <div className="flex items-center justify-center mb-4">
          <Leaf className="h-16 w-16 text-green-600" />
        </div>
        <h1 className="text-6xl md:text-7xl font-bold text-green-700">
          GREEN <span className="text-green-500">Diagnosis</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Advanced AI-powered plant disease detection system to help farmers and gardeners identify and treat plant
          diseases quickly and accurately.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8">
            <Link href="/detection">
              <Search className="mr-2 h-5 w-5" />
              Start Detection
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-green-500 text-green-600 hover:bg-green-50 rounded-full px-8">
            <Link href="/prevention">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="text-center hover:shadow-xl transition-shadow border-0 bg-white">
          <CardHeader className="pb-6">
            <div className="bg-green-500 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-green-800 text-xl">Disease Detection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription className="text-gray-600">
              Upload plant images for instant AI-powered disease identification with high accuracy.
            </CardDescription>
            <Button asChild className="w-full bg-transparent border-green-500 text-green-600 hover:bg-green-50 rounded-full" variant="outline">
              <Link href="/detection">Detect Now</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-xl transition-shadow border-0 bg-white">
          <CardHeader className="pb-6">
            <div className="bg-blue-500 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-green-800 text-xl">Prevention Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription className="text-gray-600">
              Learn effective prevention strategies to keep your plants healthy and disease-free.
            </CardDescription>
            <Button asChild className="w-full bg-transparent border-green-500 text-green-600 hover:bg-green-50 rounded-full" variant="outline">
              <Link href="/prevention">Learn More</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-xl transition-shadow border-0 bg-white">
          <CardHeader className="pb-6">
            <div className="bg-orange-500 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-green-800 text-xl">Disease Causes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription className="text-gray-600">
              Understand the root causes of common plant diseases and environmental factors.
            </CardDescription>
            <Button asChild className="w-full bg-transparent border-green-500 text-green-600 hover:bg-green-50 rounded-full" variant="outline">
              <Link href="/causes">Explore Causes</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-xl transition-shadow border-0 bg-white">
          <CardHeader className="pb-6">
            <div className="bg-purple-500 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-green-800 text-xl">Detection History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription className="text-gray-600">
              View your previous disease detection results and track plant health over time.
            </CardDescription>
            <Button asChild className="w-full bg-transparent border-green-500 text-green-600 hover:bg-green-50 rounded-full" variant="outline">
              <Link href="/history">View History</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* About Section */}
      <section className="bg-white rounded-2xl p-12 shadow-md">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-green-800 mb-6">Advanced Plant Health Monitoring</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Our AI-powered system can detect common plant diseases including Sigatoka and Xanthomonas with high
              accuracy. Get instant results and actionable recommendations to protect your plants.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                <span>High accuracy disease detection</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                <span>Instant results and recommendations</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                <span>Comprehensive prevention guides</span>
              </li>
            </ul>
          </div>
          <div className="relative h-80 bg-gradient-to-br from-green-100 to-emerald-50 rounded-2xl flex items-center justify-center border border-green-100">
            <Leaf className="h-40 w-40 text-green-500 opacity-40" />
          </div>
        </div>
      </section>
    </div>
  )
}
