import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Droplets, Sun, Scissors, Leaf, AlertTriangle } from "lucide-react"

export default function PreventionPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-green-800">Disease Prevention Guide</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn effective strategies to prevent plant diseases and maintain healthy crops. Prevention is always better
          than cure when it comes to plant health.
        </p>
      </div>

      {/* General Prevention Principles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-green-600" />
            General Prevention Principles
          </CardTitle>
          <CardDescription>Universal practices that help prevent most plant diseases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Droplets className="h-8 w-8 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Proper Watering</h3>
                <p className="text-sm text-gray-600">
                  Water at the base of plants, avoid wetting leaves, and ensure good drainage to prevent fungal growth.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sun className="h-8 w-8 text-yellow-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Adequate Sunlight</h3>
                <p className="text-sm text-gray-600">
                  Ensure plants receive proper sunlight and air circulation to reduce humidity and disease risk.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Scissors className="h-8 w-8 text-red-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Regular Pruning</h3>
                <p className="text-sm text-gray-600">
                  Remove dead, diseased, or damaged plant parts immediately to prevent disease spread.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disease-Specific Prevention */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600">Sigatoka Prevention</CardTitle>
            <CardDescription>Black Sigatoka is a serious fungal disease affecting banana plants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Key Prevention Strategies
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
                  <span>Improve drainage systems to reduce standing water</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
                  <span>Increase plant spacing for better air circulation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
                  <span>Remove infected leaves immediately and destroy them</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
                  <span>Apply preventive fungicide treatments during wet seasons</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
                  <span>Maintain proper plant nutrition with balanced fertilizers</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Environmental Management</h4>
              <p className="text-sm text-gray-600">
                Control humidity levels around plants by ensuring proper spacing and ventilation. Avoid overhead
                irrigation and water early in the day to allow leaves to dry quickly.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Xanthomonas Prevention</CardTitle>
            <CardDescription>Bacterial wilt caused by Xanthomonas affects various crops</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Key Prevention Strategies
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                  <span>Use disease-free seeds and planting materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                  <span>Implement crop rotation with non-host plants</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                  <span>Sanitize tools and equipment between plants</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                  <span>Avoid working with plants when they are wet</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                  <span>Apply copper-based bactericides preventively</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Nutrient Management</h4>
              <p className="text-sm text-gray-600">
                Maintain balanced nutrition with emphasis on potassium and avoid excessive nitrogen. Healthy,
                well-nourished plants are more resistant to bacterial infections.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seasonal Prevention Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Seasonal Prevention Calendar</CardTitle>
          <CardDescription>Month-by-month prevention activities for optimal plant health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Spring (Mar-May)</h4>
              <ul className="text-sm space-y-1">
                <li>• Start preventive spraying</li>
                <li>• Improve drainage systems</li>
                <li>• Begin regular inspections</li>
                <li>• Apply balanced fertilizers</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Summer (Jun-Aug)</h4>
              <ul className="text-sm space-y-1">
                <li>• Increase monitoring frequency</li>
                <li>• Ensure adequate irrigation</li>
                <li>• Maintain plant spacing</li>
                <li>• Remove infected materials</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Autumn (Sep-Nov)</h4>
              <ul className="text-sm space-y-1">
                <li>• Prepare for wet season</li>
                <li>• Clean up plant debris</li>
                <li>• Apply protective treatments</li>
                <li>• Check drainage systems</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Winter (Dec-Feb)</h4>
              <ul className="text-sm space-y-1">
                <li>• Plan next season's strategy</li>
                <li>• Maintain equipment</li>
                <li>• Monitor stored materials</li>
                <li>• Prepare prevention supplies</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Response */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-red-600" />
            Emergency Response Plan
          </CardTitle>
          <CardDescription>What to do when you first notice disease symptoms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Immediate Isolation</h4>
              <p className="text-sm text-gray-600">
                Remove and destroy infected plant parts immediately to prevent spread
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Identify & Document</h4>
              <p className="text-sm text-gray-600">
                Use our detection system to identify the disease and document the outbreak
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Apply Treatment</h4>
              <p className="text-sm text-gray-600">
                Follow specific treatment protocols based on the identified disease
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
