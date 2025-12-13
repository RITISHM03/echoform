# Deployment Guide for Vercel

## Prerequisites
- A [Vercel](https://vercel.com) account.
- A [GitHub](https://github.com) account (recommended) or Vercel CLI.
- Your **MongoDB Atlas** connection string.
- Your **Google Gemini API Key**.

## Step 1: Push to GitHub (Recommended)
1. Push your code to a GitHub repository.
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

## Step 2: Import into Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. Import your `echoform` repository.

## Step 3: Configure Environment Variables
In the "Configure Project" screen, add the following Environment Variables. 

**IMPORTANT**: Copy these values from your local `.env` file.

| Variable Name | Description | Example Value |
|est |---|---|
| `MONGODB_URI` | **Required**. Connection string to MongoDB. | `mongodb+srv://user:pass@...` |
| `LLM_PROVIDER` | **Required**. Set to `google`. | `google` |
| `GEMINI_API_KEY` | **Required**. Your Google AI Studio key. | `AIzaSy...` |
| `GEMINI_MODEL` | Optional. Defaults to `gemini-1.5-flash`. | `gemini-2.0-flash` |
| `NEXTAUTH_SECRET` | **Required**. A random string for security. | Generate one: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | **Warning**: Vercel sets this automatically! | **DO NOT SET THIS ON VERCEL** |

*Note: If you add Authentication later, you'll need `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` too.*

## Step 4: MongoDB Atlas Whitelist
**Crucial Step**: Vercel's IP addresses change dynamically.
1. Go to **MongoDB Atlas Dashboard** -> **Network Access**.
2. Add IP Address.
3. Select **"Allow Access from Anywhere"** (`0.0.0.0/0`).
   *(Or for better security, see Vercel's integration guide, but "Allow All" is easiest for starting out).*

## Step 5: Deploy
1. Click **"Deploy"**.
2. Wait for the build to finish.
3. If it fails, check the "Building" logs.

## Troubleshooting
- **Build Stuck / Infinite Load**: You likely set the "Build Command" to `npm run dev`.
    - **FIX**: Go to **Settings** -> **General** -> **Build & Development Settings**.
    - Change **Build Command** to `npm run build` (or leave it empty/default).
    - **NEVER** use `npm run dev` in Vercel.

- **Build Error (Prisma)**: If it tries to run `prisma generate`, make sure you removed `prisma` from `package.json` (I have done this for you).
- **Connection Error**: Double check `MONGODB_URI` includes the correct password (no special characters that break URL parsing).
