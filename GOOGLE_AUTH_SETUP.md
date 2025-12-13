# Google OAuth Setup Guide

To enable "Login with Google", you need to create credentials in the Google Cloud Console.

## Steps

1.  **Go to Google Cloud Console**:
    - [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

2.  **Create a Project** (if you haven't):
    - Click the dropdown at the top -> "New Project".
    - Name it "EchoForms" -> Create.

3.  **Configure OAuth Consent Screen**:
    - Sidebar -> "OAuth consent screen".
    - User Type: **External**.
    - Fill in App Name ("EchoForms"), Support Email, and Developer Email.
    - Click "Save and Continue".
    - (Optional) Scopes: You can skip adding scopes, the defaults (`email`, `profile`, `openid`) are fine.
    - **Test Users**: Add your own email address so you can test it before verification.

4.  **Create Credentials**:
    - Sidebar -> "Credentials".
    - Click **"+ CREATE CREDENTIALS"** -> **"OAuth client ID"**.
    - Application type: **Web application**.
    - Name: "NextAuth Client".
    - **Authorized JavaScript origins**:
        - `http://localhost:3000`
        - `https://your-vercel-app.vercel.app` (Add this after deploying)
    - **Authorized redirect URIs**:
        - `http://localhost:3000/api/auth/callback/google`
        - `https://your-vercel-app.vercel.app/api/auth/callback/google` (Add this after deploying)
    - Click **CREATE**.

5.  **Copy Credentials**:
    - Copy **Client ID** and **Client Secret**.

6.  **Update `.env`**:
    - Paste them into your `.env` (or `.env.local`) file:
      ```bash
      GOOGLE_CLIENT_ID="your-client-id"
      GOOGLE_CLIENT_SECRET="your-client-secret"
      ```

7.  **Generate NextAuth Secret**:
    - Run `openssl rand -base64 32` in terminal.
    - Copy the string to `NEXTAUTH_SECRET` in `.env`.

8.  **Restart Server**:
    - Stop and start `npm run dev`.

## Vercel Deployment

1.  Add `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `NEXTAUTH_SECRET` to Vercel Environment Variables.
2.  **Important**: Don't forget to update the Google Cloud Console permissions (Step 4) with your Vercel URL!
