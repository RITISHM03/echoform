# EchoForms

An AI-powered form generator built with Next.js 14, Tailwind CSS, and OpenAI.

## Features

- **AI Form Generation**: Describe your form in plain English, and AI builds it.
- **Form Preview**: Real-time preview of the generated form.
- **Modern UI**: Built with Tailwind CSS and Shadcn UI principles.
- **Production Ready**: Optimized for Vercel deployment.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Prisma ORM)
- **Auth**: NextAuth.js (Configured but not fully implemented in this phase)
- **AI**: OpenAI API (with Mock Fallback)

## Getting Started

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Copy `.env.example` to `.env` and fill in the values.
   ```bash
   cp .env.example .env
   ```
   
   Required for AI:
   - `OPENAI_API_KEY` (Leave empty to use Mock Mode)

   Required for Database:
   - `DATABASE_URL` (PostgreSQL connection string)

4. **Run the development server**
   ```bash
   npm run dev
   ```

## Deployment on Vercel

1. Push your code to GitHub.
2. Import the project in Vercel.
3. Add the Environment Variables in Vercel Project Settings.
4. Deploy!

## Database Setup (Supabase/Neon)

1. Create a project on Supabase or Neon.
2. Get the connection string (Transaction Mode for Supabase).
3. Set `DATABASE_URL` in `.env`.
4. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

## AI Mock Mode

If `OPENAI_API_KEY` is not set, the app uses a deterministic mock system.
- Try prompts containing "feedback" for a feedback form.
- Try prompts containing "register" for a registration form.
- Any other prompt returns a default form.
