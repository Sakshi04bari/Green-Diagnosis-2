"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Loader2, CheckCircle, AlertCircle, Camera } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface DetectionResult {
  disease: string
  confidence: string
  causes: string
  prevention: string
}

// Mock disease data for demo mode
const MOCK_PREDICTIONS = [
  {
    disease: "Healthy",
    confidence: "94%",
    causes: "Plant appears healthy with no visible disease symptoms",
    prevention: "Continue good plant care practices, regular monitoring, proper watering, adequate nutrition, preventive treatments",
  },
  {
    disease: "Sigatoka",
    confidence: "87%",
    causes: "High humidity, poor plant hygiene, dense planting, inadequate drainage, fungal spores spread by wind and rain",
    prevention: "Improve drainage systems, increase plant spacing, apply fungicide treatments, remove infected leaves immediately, maintain proper plant nutrition",
  },
  {
    disease: "Xanthomonas",
    confidence: "91%",
    causes: "Bacterial infection, warm humid weather, plant wounds, contaminated tools, infected seeds or planting materials",
    prevention: "Use disease-free seeds, sanitize tools between plants, apply copper-based bactericides, improve plant nutrition, avoid working with wet plants",
  },
]

export default function DetectionPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"unknown" | "connected" | "disconnected">("unknown")
  const [isDemoMode, setIsDemoMode] = useState(false)
  const allowedImageTypes = ["image/jpeg", "image/png", "image/bmp", "image/gif"]

  const isValidImageFile = (file: File) => allowedImageTypes.includes(file.type)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!isValidImageFile(file)) {
        setError("Upload a banana leaf image in JPG, PNG, BMP, or GIF format.")
        setSelectedFile(null)
        setPreviewUrl(null)
        return
      }

      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setResult(null)
      setError(null)
    }
  }

  const handlePredict = async () => {
    if (!selectedFile) {
      setError("Upload a banana leaf image before detecting disease.")
      return
    }

    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("image", selectedFile)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000)

      try {
        const response = await fetch(
          "https://green-diagnosis.onrender.com/predict",
          {
            method: "POST",
            body: formData,
            mode: "cors",
            signal: controller.signal,
          }
        )

        clearTimeout(timeoutId)

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(errorText || "Prediction failed")
        }

        setConnectionStatus("connected")
        setIsDemoMode(false)

        const data: DetectionResult = await response.json()
        setResult(data)

        // Save to history
        const historyItem = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          filename: selectedFile.name,
          result: data,
        }

        const existingHistory = JSON.parse(localStorage.getItem("detectionHistory") || "[]")
        existingHistory.unshift(historyItem)
        localStorage.setItem("detectionHistory", JSON.stringify(existingHistory.slice(0, 50)))
      } catch (fetchErr) {
        clearTimeout(timeoutId)
        
        // Check if error is due to abort/timeout
        if (fetchErr instanceof Error && fetchErr.name === "AbortError") {
          throw new Error("Connection timeout. The backend server is not responding.")
        }
        
        throw fetchErr
      }
    } catch (err) {
      console.error("Prediction error:", err)
      setConnectionStatus("disconnected")
      
      // Use demo mode as fallback
      const randomPrediction = MOCK_PREDICTIONS[Math.floor(Math.random() * MOCK_PREDICTIONS.length)]
      setResult(randomPrediction)
      setIsDemoMode(true)
      setError(
        "Backend server is offline. Showing demo prediction. Deploy the backend service to enable real predictions.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setResult(null)
    setError(null)
  }

  const testConnection = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

      try {
        const response = await fetch("https://green-diagnosis.onrender.com/health", {
          method: "GET",
          mode: "cors",
          signal: controller.signal,
        })

        clearTimeout(timeoutId)
        setConnectionStatus(response.ok ? "connected" : "disconnected")
      } catch (fetchErr) {
        clearTimeout(timeoutId)
        throw fetchErr
      }
    } catch (err) {
      console.log("Connection test failed:", err)
      setConnectionStatus("disconnected")
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-green-800">Disease Detection</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload an image of your plant leaf to detect diseases using our advanced AI model. We can identify Sigatoka,
          Xanthomonas, and determine if your plant is healthy.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Upload Plant Image
            </CardTitle>
            <CardDescription>Select a clear image of the plant leaf you want to analyze</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-upload">Choose Image File</Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/jpeg,image/png,image/bmp,image/gif"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
              <p className="text-sm text-gray-500">
                Upload a banana leaf image. Use a clear photo of a single leaf in JPG, PNG, BMP, or GIF format.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={testConnection}
                variant="outline"
                size="sm"
                className={cn(
                  connectionStatus === "connected" && "border-green-500 text-green-600",
                  connectionStatus === "disconnected" && "border-red-500 text-red-600",
                )}
              >
                {connectionStatus === "connected" && "✓ Connected"}
                {connectionStatus === "disconnected" && "✗ Disconnected"}
                {connectionStatus === "unknown" && "Test Connection"}
              </Button>
              {connectionStatus === "disconnected" && (
                <Button
                  onClick={testConnection}
                  variant="outline"
                  size="sm"
                  className="border-orange-500 text-orange-600 bg-transparent"
                >
                  Retry Connection
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handlePredict}
                disabled={!selectedFile || isLoading}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Detect Disease
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Detection Results
            </CardTitle>
            <CardDescription>AI analysis results and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className="text-center p-4 bg-green-50 rounded-lg relative">
                  {isDemoMode && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      Demo Mode
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Disease Detected</h3>
                  <p className="text-2xl font-bold text-green-600">{result.disease}</p>
                  <p className="text-sm text-gray-600 mt-1">Confidence: {result.confidence}</p>
                </div>

                {result.causes && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Possible Causes:</h4>
                    <p className="text-gray-600 bg-orange-50 p-3 rounded-lg">{result.causes}</p>
                  </div>
                )}

                {result.prevention && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Prevention & Treatment:</h4>
                    <p className="text-gray-600 bg-blue-50 p-3 rounded-lg">{result.prevention}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Upload an image to see detection results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Get Best Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold">
                1
              </div>
              <h4 className="font-semibold mb-1">Clear Image</h4>
              <p className="text-gray-600">Use a high-quality, well-lit image of the leaf</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold">
                2
              </div>
              <h4 className="font-semibold mb-1">Focus on Symptoms</h4>
              <p className="text-gray-600">Ensure disease symptoms are clearly visible</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold">
                3
              </div>
              <h4 className="font-semibold mb-1">Single Leaf</h4>
              <p className="text-gray-600">Focus on one leaf for better accuracy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backend Setup Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">Backend Configuration</CardTitle>
          <CardDescription className="text-blue-800">Deploy the Flask backend for real predictions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-blue-900">
          <p>
            The app currently runs in <strong>Demo Mode</strong> when the backend server is offline. To enable real AI disease predictions:
          </p>
          <ol className="space-y-2 ml-4 list-decimal">
            <li>Deploy the Flask backend to Render, Railway, Heroku, or another service</li>
            <li>Update the API endpoint URL in the detection page code</li>
            <li>Ensure the backend has the trained TensorFlow model downloaded</li>
            <li>Configure CORS to accept requests from your frontend domain</li>
          </ol>
          <p className="text-xs mt-4 p-2 bg-white rounded border border-blue-200">
            <strong>Current Backend:</strong> https://green-diagnosis.onrender.com (Offline)
          </p>
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
            View Backend Code
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
