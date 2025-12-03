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



## AI Mock Mode

If `OPENAI_API_KEY` is not set, the app uses a deterministic mock system.
- Try prompts containing "feedback" for a feedback form.
- Try prompts containing "register" for a registration form.
- Any other prompt returns a default form.
