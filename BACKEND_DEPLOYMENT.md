# GREEN Diagnosis Backend Deployment Guide

## Overview
The Flask backend is currently offline. This guide shows how to deploy it to enable real disease predictions.

## Current Status
- **Frontend:** Deployed on Vercel (✓ Running)
- **Backend:** Offline on Render (✗ Not responding)
- **Fallback:** Demo mode active (showing mock predictions)

## Quick Deploy to Render (Recommended)

### Step 1: Push to GitHub
Make sure your code is pushed to GitHub with the `main.py` file in the root directory.

```bash
git add -A
git commit -m "Deploy backend to Render"
git push origin main
```

### Step 2: Connect Render
1. Go to https://render.com
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Select the branch (main)
5. Fill in the settings:
   - **Name:** `green-diagnosis-api` (or your preferred name)
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn main:app`
   - **Instance Type:** Free (or Paid for better uptime)

### Step 3: Set Environment Variables (if needed)
Add any required environment variables in Render dashboard under "Environment"

### Step 4: Deploy
Click "Create Web Service" and wait for deployment to complete (usually 2-3 minutes)

### Step 5: Update Frontend
Once backend is deployed, update the API endpoint in `app/detection/page.tsx`:

Replace:
```typescript
"https://green-diagnosis.onrender.com/predict"
```

With your new Render URL:
```typescript
"https://your-app-name.onrender.com/predict"
```

Then redeploy frontend to Vercel.

---

## Alternative: Deploy to Railway

1. Go to https://railway.app
2. Create a new project
3. Connect your GitHub repository
4. Railway automatically detects Python and deploys
5. Copy the public URL and update frontend endpoint

---

## Alternative: Deploy to Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create green-diagnosis-api`
4. Deploy: `git push heroku main`
5. Copy Heroku URL and update frontend

---

## Backend Health Check
After deployment, verify the backend is running:

```bash
curl https://your-backend-url.com/health
```

Expected response:
```json
{
  "status": "healthy",
  "message": "GREEN Diagnosis Backend is running",
  "model_loaded": true,
  "version": "2.0.0"
}
```

---

## Frontend Current State
- **Detection Page:** Shows demo predictions when backend is offline
- **Demo Badge:** Indicates predictions are simulated
- **Backend Info Card:** Shows deployment instructions

---

## Requirements
- Python 3.8+
- Flask 3.1.0
- TensorFlow 2.16.1
- OpenCV 4.10.0
- All dependencies in `requirements.txt`

---

## Model Download
The backend automatically downloads the trained model from Google Drive on first run. Make sure the server has internet access during the first deployment.

Model size: ~500MB (will be downloaded once and cached)

---

## Cost Considerations
- **Render Free Tier:** Spins down after 15 minutes of inactivity
- **Railway Free Tier:** Includes free usage credits
- **Heroku:** No longer has free tier (paid starting at $7/month)

For production, upgrade to a paid tier to avoid cold starts.

---

## Troubleshooting

### Backend not loading model?
Check server logs to see if Google Drive download failed. Model can be manually uploaded if needed.

### CORS errors?
The Flask app is configured with CORS. If still getting errors, add your Vercel URL to the `CORS` configuration in `main.py`.

### Timeout errors?
Model prediction takes ~5-10 seconds. Increase the timeout in frontend from 30s to 60s if needed.

### Port issues?
Backend runs on PORT environment variable (default 5000). Render/Railway automatically handle this.

---

## Need Help?
Check the logs in your deployment platform dashboard for detailed error messages.
