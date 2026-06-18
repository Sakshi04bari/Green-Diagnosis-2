"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Trash2, Download, Search, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"

interface HistoryItem {
  id: number
  timestamp: string
  filename: string
  result: {
    disease: string
    confidence: string
    causes: string
    prevention: string
  }
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem("detectionHistory")
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory)
      setHistory(parsedHistory)
      setFilteredHistory(parsedHistory)
    }
  }, [])

  useEffect(() => {
    // Filter history based on search term
    const filtered = history.filter(
      (item) =>
        item.result.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.filename.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredHistory(filtered)
  }, [searchTerm, history])

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear all detection history?")) {
      localStorage.removeItem("detectionHistory")
      setHistory([])
      setFilteredHistory([])
    }
  }

  const deleteItem = (id: number) => {
    const updatedHistory = history.filter((item) => item.id !== id)
    setHistory(updatedHistory)
    localStorage.setItem("detectionHistory", JSON.stringify(updatedHistory))
  }

  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `plant-disease-history-${new Date().toISOString().split("T")[0]}.json`
    link.click()
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getDiseaseColor = (disease: string) => {
    switch (disease.toLowerCase()) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "sigatoka":
        return "bg-orange-100 text-orange-800"
      case "xanthomonas":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-green-800">Detection History</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          View and manage your previous plant disease detection results. Track patterns and monitor plant health over
          time.
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              History Management
            </span>
            <Badge variant="secondary">{history.length} total detections</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by disease or filename..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={exportHistory} disabled={history.length === 0}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="destructive" onClick={clearHistory} disabled={history.length === 0}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {history.length === 0 ? "No Detection History" : "No Results Found"}
            </h3>
            <p className="text-gray-500 mb-4">
              {history.length === 0
                ? "Start detecting plant diseases to see your history here."
                : "Try adjusting your search terms."}
            </p>
            {history.length === 0 && (
              <Button asChild>
                <a href="/detection">Start Detection</a>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <CardTitle className="text-lg">{item.filename}</CardTitle>
                      <CardDescription>{formatDate(item.timestamp)}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getDiseaseColor(item.result.disease)}>{item.result.disease}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-1">Confidence</h4>
                    <p className="text-sm text-blue-600">{item.result.confidence}</p>
                  </div>
                  {item.result.causes && (
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-1">Causes</h4>
                      <p className="text-sm text-orange-600">{item.result.causes}</p>
                    </div>
                  )}
                  {item.result.prevention && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-1">Prevention</h4>
                      <p className="text-sm text-green-600">{item.result.prevention}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Statistics */}
      {history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detection Statistics</CardTitle>
            <CardDescription>Summary of your detection history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {history.filter((item) => item.result.disease.toLowerCase() === "healthy").length}
                </div>
                <div className="text-sm text-green-800">Healthy Plants</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {history.filter((item) => item.result.disease.toLowerCase() === "sigatoka").length}
                </div>
                <div className="text-sm text-orange-800">Sigatoka Cases</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {history.filter((item) => item.result.disease.toLowerCase() === "xanthomonas").length}
                </div>
                <div className="text-sm text-red-800">Xanthomonas Cases</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(
                    history.reduce((acc, item) => acc + Number.parseFloat(item.result.confidence.replace("%", "")), 0) /
                      history.length,
                  )}
                  %
                </div>
                <div className="text-sm text-blue-800">Avg. Confidence</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
