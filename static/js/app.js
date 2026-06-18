// Global variables
let currentPage = "home"
let selectedFile = null
let connectionStatus = "unknown"
let detectionHistory = JSON.parse(localStorage.getItem("detectionHistory") || "[]")

// DOM elements
const navLinks = document.querySelectorAll(".nav-link")
const pages = document.querySelectorAll(".page")
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")

// Detection page elements
const uploadArea = document.getElementById("uploadArea")
const imageInput = document.getElementById("imageInput")
const imagePreview = document.getElementById("imagePreview")
const previewImg = document.getElementById("previewImg")
const removeImageBtn = document.getElementById("removeImage")
const testConnectionBtn = document.getElementById("testConnection")
const connectionStatusEl = document.getElementById("connectionStatus")
const predictBtn = document.getElementById("predictBtn")
const resetBtn = document.getElementById("resetBtn")
const errorMessage = document.getElementById("errorMessage")
const errorText = document.getElementById("errorText")
const loadingState = document.getElementById("loadingState")
const emptyState = document.getElementById("emptyState")
const resultsContent = document.getElementById("resultsContent")

// History page elements
const historySearch = document.getElementById("historySearch")
const exportHistoryBtn = document.getElementById("exportHistory")
const clearHistoryBtn = document.getElementById("clearHistory")
const emptyHistory = document.getElementById("emptyHistory")
const historyList = document.getElementById("historyList")
const historyStats = document.getElementById("historyStats")

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializeDetectionPage()
  initializeHistoryPage()
  updateHistoryDisplay()

  // Test connection on load
  setTimeout(testConnection, 1000)
})

// Navigation functions
function initializeNavigation() {
  // Handle navigation clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const page = link.getAttribute("data-page")
      showPage(page)
    })
  })

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    }
  })
}

function showPage(pageName) {
  // Update current page
  currentPage = pageName

  // Hide all pages
  pages.forEach((page) => {
    page.classList.remove("active")
  })

  // Show selected page
  const targetPage = document.getElementById(pageName)
  if (targetPage) {
    targetPage.classList.add("active")
  }

  // Update navigation
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-page") === pageName) {
      link.classList.add("active")
    }
  })

  // Close mobile menu
  navMenu.classList.remove("active")
  navToggle.classList.remove("active")

  // Page-specific initialization
  if (pageName === "history") {
    updateHistoryDisplay()
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Detection page functions
function initializeDetectionPage() {
  if (!uploadArea || !imageInput) return

  // File input change
  imageInput.addEventListener("change", handleFileSelect)

  // Upload area click
  uploadArea.addEventListener("click", () => {
    if (!imagePreview.style.display || imagePreview.style.display === "none") {
      imageInput.click()
    }
  })

  // Drag and drop
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault()
    uploadArea.classList.add("dragover")
  })

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover")
  })

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault()
    uploadArea.classList.remove("dragover")

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  })

  // Remove image button
  if (removeImageBtn) {
    removeImageBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      resetImageUpload()
    })
  }

  // Button event listeners
  if (testConnectionBtn) {
    testConnectionBtn.addEventListener("click", testConnection)
  }

  if (predictBtn) {
    predictBtn.addEventListener("click", handlePredict)
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetForm)
  }
}

function handleFileSelect(e) {
  const file = e.target.files[0]
  if (file) {
    handleFile(file)
  }
}

function handleFile(file) {
  // Validate file type
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/bmp", "image/gif"]
  if (!allowedTypes.includes(file.type)) {
    showError("Upload a banana leaf image in JPEG, PNG, BMP, or GIF format.")
    return
  }

  // Validate file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    showError("File size must be less than 10MB")
    return
  }

  selectedFile = file

  // Show image preview
  const reader = new FileReader()
  reader.onload = (e) => {
    previewImg.src = e.target.result
    imagePreview.style.display = "block"
    uploadArea.querySelector(".upload-content").style.display = "none"
    predictBtn.disabled = false
    hideError()
  }
  reader.readAsDataURL(file)
}

function resetImageUpload() {
  selectedFile = null
  imageInput.value = ""
  imagePreview.style.display = "none"
  uploadArea.querySelector(".upload-content").style.display = "block"
  previewImg.src = ""
  predictBtn.disabled = true
  hideError()
}

function resetForm() {
  resetImageUpload()
  hideResults()
  hideError()
}

async function testConnection() {
  try {
    testConnectionBtn.disabled = true
    testConnectionBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testing...'

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const API_URL = window.location.origin;

const response = await fetch(`${API_URL}/health`, {
  method: "GET",
  signal: controller.signal,
});

if (response.ok) {
  const data = await response.json();

  if (data.model_loaded) {
    setConnectionStatus("connected");
  } else {
    showError(
      "Backend is running but AI model is not loaded."
    );
    setConnectionStatus("disconnected");
  }
}

    clearTimeout(timeoutId)

    if (response.ok) {
      setConnectionStatus("connected")
    } else {
      setConnectionStatus("disconnected")
    }
  } catch (error) {
    console.log("Connection test failed:", error)
    setConnectionStatus("disconnected")
  } finally {
    testConnectionBtn.disabled = false
    testConnectionBtn.innerHTML = '<i class="fas fa-wifi"></i> Test Connection'
  }
}

function setConnectionStatus(status) {
  connectionStatus = status
  connectionStatusEl.className = `status-indicator ${status}`

  switch (status) {
    case "connected":
      connectionStatusEl.innerHTML = '<i class="fas fa-circle"></i> Connected'
      break
    case "disconnected":
      connectionStatusEl.innerHTML = '<i class="fas fa-circle"></i> Disconnected'
      break
    default:
      connectionStatusEl.innerHTML = '<i class="fas fa-circle"></i> Unknown'
  }
}

async function handlePredict() {
  if (!selectedFile) {
    showError("Upload a banana leaf image before detecting disease.")
    return
  }

  showLoading()
  hideError()
  hideResults()

  const formData = new FormData()
  formData.append("image", selectedFile)

  try {
    const API_URL = window.location.origin

    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error || "Prediction failed")
    }

    const data = await response.json()
    showResults(data)

    // Save to history
    const historyItem = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      filename: selectedFile.name,
      result: data,
    }

    detectionHistory.unshift(historyItem)
    detectionHistory = detectionHistory.slice(0, 50)
    localStorage.setItem("detectionHistory", JSON.stringify(detectionHistory))

    setConnectionStatus("connected")
  } catch (error) {
    console.error(error)
    showError(error.message)
    setConnectionStatus("disconnected")
  } finally {
    hideLoading()
  }
}

 

function showLoading() {
  loadingState.style.display = "block"
  emptyState.style.display = "none"
  resultsContent.style.display = "none"
}

function hideLoading() {
  loadingState.style.display = "none"
}

function showResults(data) {
  // Hide other states
  emptyState.style.display = "none"
  loadingState.style.display = "none"

  // Show results
  resultsContent.style.display = "block"

  // Update disease name and confidence
  document.getElementById("diseaseName").textContent = data.disease || "Unknown"
  document.getElementById("confidence").textContent = `Confidence: ${data.confidence || "N/A"}`

  // Update causes section
  const causesSection = document.getElementById("causesSection")
  const causesText = document.getElementById("causesText")
  if (data.causes && data.causes.trim()) {
    causesText.textContent = data.causes
    causesSection.style.display = "block"
  } else {
    causesSection.style.display = "none"
  }

  // Update prevention section
  const preventionSection = document.getElementById("preventionSection")
  const preventionText = document.getElementById("preventionText")
  if (data.prevention && data.prevention.trim()) {
    preventionText.textContent = data.prevention
    preventionSection.style.display = "block"
  } else {
    preventionSection.style.display = "none"
  }
}

function hideResults() {
  resultsContent.style.display = "none"
  emptyState.style.display = "block"
}

function showError(message) {
  errorText.textContent = message
  errorMessage.style.display = "flex"
}

function hideError() {
  errorMessage.style.display = "none"
}

// History page functions
function initializeHistoryPage() {
  if (!historySearch) return

  // Search functionality
  historySearch.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase()
    filterHistory(searchTerm)
  })

  // Export history
  if (exportHistoryBtn) {
    exportHistoryBtn.addEventListener("click", exportHistory)
  }

  // Clear history
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", clearHistory)
  }
}

function updateHistoryDisplay() {
  if (!historyList) return

  if (detectionHistory.length === 0) {
    emptyHistory.style.display = "block"
    historyList.style.display = "none"
    if (historyStats) historyStats.style.display = "none"
    return
  }

  emptyHistory.style.display = "none"
  historyList.style.display = "block"
  if (historyStats) historyStats.style.display = "block"

  renderHistoryItems(detectionHistory)
  updateHistoryStats()
}

function renderHistoryItems(items) {
  historyList.innerHTML = ""

  items.forEach((item) => {
    const historyItem = createHistoryItem(item)
    historyList.appendChild(historyItem)
  })
}

function createHistoryItem(item) {
  const div = document.createElement("div")
  div.className = "history-item"

  const disease = item.result.disease.toLowerCase()
  const badgeClass = disease === "healthy" ? "healthy" : disease === "sigatoka" ? "sigatoka" : "xanthomonas"

  div.innerHTML = `
        <div class="history-header">
            <div class="history-info">
                <h4>${item.filename}</h4>
                <p>${formatDate(item.timestamp)}</p>
            </div>
            <div class="history-actions-item">
                <span class="disease-badge ${badgeClass}">${item.result.disease}</span>
                <button class="delete-btn" onclick="deleteHistoryItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="history-details">
            <div class="history-detail confidence">
                <h5>Confidence</h5>
                <p>${item.result.confidence}</p>
            </div>
            ${
              item.result.causes
                ? `
                <div class="history-detail causes">
                    <h5>Causes</h5>
                    <p>${item.result.causes}</p>
                </div>
            `
                : ""
            }
            ${
              item.result.prevention
                ? `
                <div class="history-detail prevention">
                    <h5>Prevention</h5>
                    <p>${item.result.prevention}</p>
                </div>
            `
                : ""
            }
        </div>
    `

  return div
}

function filterHistory(searchTerm) {
  const filteredItems = detectionHistory.filter(
    (item) =>
      item.result.disease.toLowerCase().includes(searchTerm) || item.filename.toLowerCase().includes(searchTerm),
  )

  renderHistoryItems(filteredItems)
}

function deleteHistoryItem(id) {
  if (confirm("Are you sure you want to delete this detection result?")) {
    detectionHistory = detectionHistory.filter((item) => item.id !== id)
    localStorage.setItem("detectionHistory", JSON.stringify(detectionHistory))
    updateHistoryDisplay()
  }
}

function exportHistory() {
  if (detectionHistory.length === 0) {
    alert("No history to export")
    return
  }

  const dataStr = JSON.stringify(detectionHistory, null, 2)
  const dataBlob = new Blob([dataStr], { type: "application/json" })
  const url = URL.createObjectURL(dataBlob)

  const link = document.createElement("a")
  link.href = url
  link.download = `plant-disease-history-${new Date().toISOString().split("T")[0]}.json`
  link.click()

  URL.revokeObjectURL(url)
}

function clearHistory() {
  if (confirm("Are you sure you want to clear all detection history? This action cannot be undone.")) {
    detectionHistory = []
    localStorage.removeItem("detectionHistory")
    updateHistoryDisplay()
  }
}

function updateHistoryStats() {
  if (!historyStats) return

  const healthyCount = detectionHistory.filter(
    (item) => item.result.disease.toLowerCase() === "healthy"
  ).length

  const sigatokaCount = detectionHistory.filter(
    (item) => item.result.disease.toLowerCase() === "sigatoka"
  ).length

  const xanthomonasCount = detectionHistory.filter(
    (item) => item.result.disease.toLowerCase() === "xanthomonas"
  ).length

  const avgConfidence =
  detectionHistory.length > 0
    ? Math.round(
        detectionHistory.reduce((acc, item) => {
          const conf = item.result.confidence || "0%"
          const value = parseFloat(conf.replace("%", "")) || 0
          return acc + value
        }, 0) / detectionHistory.length
      )
    : 0

  document.getElementById("healthyCount").textContent = healthyCount
  document.getElementById("sigatokaCount").textContent = sigatokaCount
  document.getElementById("xanthomonasCount").textContent = xanthomonasCount
  document.getElementById("avgConfidence").textContent = `${avgConfidence}%`
}

// Utility functions
function formatDate(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleString()
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add loading animation to buttons
function addButtonLoading(button, originalText) {
  button.disabled = true
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...'

  return () => {
    button.disabled = false
    button.innerHTML = originalText
  }
}


// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  }
})
