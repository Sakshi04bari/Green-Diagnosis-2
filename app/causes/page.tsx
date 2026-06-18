import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Thermometer, Droplets, Bug, AlertTriangle } from "lucide-react"

export default function CausesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-green-800">Disease Causes & Risk Factors</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Understanding the root causes of plant diseases helps in developing effective prevention and treatment
          strategies. Learn about environmental, biological, and management factors.
        </p>
      </div>

      {/* Environmental Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-blue-600" />
            Environmental Factors
          </CardTitle>
          <CardDescription>Weather and climate conditions that promote disease development</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">High Humidity</h3>
              <p className="text-sm text-gray-600 mb-3">
                Humidity above 80% creates ideal conditions for fungal spore germination and spread.
              </p>
              <Badge variant="secondary">Primary Risk Factor</Badge>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Thermometer className="h-12 w-12 text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Temperature Extremes</h3>
              <p className="text-sm text-gray-600 mb-3">
                Both very high (&gt;35°C) and low (&lt;15°C) temperatures stress plants and reduce immunity.
              </p>
              <Badge variant="secondary">Stress Factor</Badge>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Cloud className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Poor Air Circulation</h3>
              <p className="text-sm text-gray-600 mb-3">
                Stagnant air increases humidity around plants and prevents quick drying of leaf surfaces.
              </p>
              <Badge variant="secondary">Contributing Factor</Badge>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Droplets className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Excessive Rainfall</h3>
              <p className="text-sm text-gray-600 mb-3">
                Prolonged wet conditions and water splashing spread pathogens between plants.
              </p>
              <Badge variant="secondary">Transmission Vector</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disease-Specific Causes */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600">Sigatoka Disease Causes</CardTitle>
            <CardDescription>Mycosphaerella fijiensis - Black Sigatoka fungal infection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Primary Causes
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h5 className="font-medium">High Humidity (&gt;80%)</h5>
                    <p className="text-sm text-gray-600">Creates optimal conditions for spore germination</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h5 className="font-medium">Poor Drainage</h5>
                    <p className="text-sm text-gray-600">Standing water increases soil moisture and humidity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h5 className="font-medium">Dense Planting</h5>
                    <p className="text-sm text-gray-600">Reduces air circulation and increases humidity</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Contributing Factors</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Weather
                  </Badge>
                  <span>Frequent rainfall and overcast conditions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Management
                  </Badge>
                  <span>Inadequate leaf removal and sanitation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Nutrition
                  </Badge>
                  <span>Potassium deficiency weakens plant resistance</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Disease Cycle</h4>
              <p className="text-sm text-gray-600">
                Spores are released during humid conditions, infect young leaves through stomata, and develop into
                lesions that produce more spores, continuing the cycle.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Xanthomonas Disease Causes</CardTitle>
            <CardDescription>Bacterial wilt and leaf spot caused by Xanthomonas species</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Primary Causes
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <h5 className="font-medium">Warm, Humid Weather</h5>
                    <p className="text-sm text-gray-600">
                      Temperatures 25-30°C with high humidity favor bacterial growth
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <h5 className="font-medium">Plant Wounds</h5>
                    <p className="text-sm text-gray-600">
                      Entry points from pruning, insect damage, or mechanical injury
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <h5 className="font-medium">Water Splash</h5>
                    <p className="text-sm text-gray-600">Rain or irrigation spreads bacteria between plants</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Contributing Factors</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Nutrition
                  </Badge>
                  <span>Nitrogen excess makes plants more susceptible</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Tools
                  </Badge>
                  <span>Contaminated pruning tools spread bacteria</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Seeds
                  </Badge>
                  <span>Infected seeds or planting materials</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Infection Process</h4>
              <p className="text-sm text-gray-600">
                Bacteria enter through natural openings or wounds, multiply in vascular tissues, and block water
                transport, causing wilting and eventual plant death.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Matrix</CardTitle>
          <CardDescription>Evaluate your risk level based on current conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Risk Factor</th>
                  <th className="text-center p-3 font-semibold text-green-600">Low Risk</th>
                  <th className="text-center p-3 font-semibold text-yellow-600">Medium Risk</th>
                  <th className="text-center p-3 font-semibold text-red-600">High Risk</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">Humidity Level</td>
                  <td className="p-3 text-center text-sm bg-green-50">{"<60%"}</td>
                  <td className="p-3 text-center text-sm bg-yellow-50">60-80%</td>
                  <td className="p-3 text-center text-sm bg-red-50">{">80%"}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Temperature</td>
                  <td className="p-3 text-center text-sm bg-green-50">20-25°C</td>
                  <td className="p-3 text-center text-sm bg-yellow-50">15-20°C or 25-30°C</td>
                  <td className="p-3 text-center text-sm bg-red-50">{"<15°C or >30°C"}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Rainfall</td>
                  <td className="p-3 text-center text-sm bg-green-50">Moderate, well-drained</td>
                  <td className="p-3 text-center text-sm bg-yellow-50">Heavy but drains well</td>
                  <td className="p-3 text-center text-sm bg-red-50">Excessive, poor drainage</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Plant Density</td>
                  <td className="p-3 text-center text-sm bg-green-50">Optimal spacing</td>
                  <td className="p-3 text-center text-sm bg-yellow-50">Slightly crowded</td>
                  <td className="p-3 text-center text-sm bg-red-50">Very dense planting</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Previous Disease</td>
                  <td className="p-3 text-center text-sm bg-green-50">No history</td>
                  <td className="p-3 text-center text-sm bg-yellow-50">Occasional outbreaks</td>
                  <td className="p-3 text-center text-sm bg-red-50">Frequent problems</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Management Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-6 w-6 text-purple-600" />
            Management-Related Causes
          </CardTitle>
          <CardDescription>Human factors that increase disease risk</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-purple-800">Poor Sanitation</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Not removing infected plant debris</li>
                <li>• Using contaminated tools</li>
                <li>• Working with wet plants</li>
                <li>• Inadequate equipment cleaning</li>
              </ul>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-indigo-800">Improper Nutrition</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Excessive nitrogen fertilization</li>
                <li>• Potassium deficiency</li>
                <li>• Imbalanced nutrient ratios</li>
                <li>• Poor soil pH management</li>
              </ul>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-pink-800">Water Management</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Overhead irrigation systems</li>
                <li>• Watering during evening hours</li>
                <li>• Poor drainage systems</li>
                <li>• Inconsistent watering schedules</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
