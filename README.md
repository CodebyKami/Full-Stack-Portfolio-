# Aura - Premium AI Portfolio SaaS

A complete, production-ready, ultra-premium AI-powered portfolio SaaS web application.

## 🚀 Features

- **AI Portfolio Assistant**: Intelligent chat agent that answers questions about your skills, projects, and experience.
- **Automated Proposal Generator**: AI can generate project proposals based on client input.
- **Premium UI/UX**: Glassmorphism, neon glows, and smooth Framer Motion animations.
- **Full-Stack Architecture**: Express.js backend with Vite/React frontend.
- **Supabase Integration**: Real-time database, authentication, and storage.
- **Admin Panel**: Secure dashboard to manage projects, skills, and messages.

## 🛠 Tech Stack

- **Frontend**: Next.js (simulated via Vite/React), Tailwind CSS, ShadCN UI, Framer Motion, Zustand.
- **Backend**: Node.js, Express.js.
- **Database**: Supabase.
- **AI**: Groq (LLaMA 3).

## ⚙️ Setup Instructions

1. **Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   GROQ_API_KEY=your_groq_api_key
   SUPABASE_URL=https://hhrjoxrdmckvdxhsuwce.supabase.co
   SUPABASE_ANON_KEY=sb_publishable_qH4yArd--J_MscJj1sBlqA_Gft3eNko
   ADMIN_EMAIL=kamranrasool0045@gmail.com
   ```

2. **Database Setup**:
   - Go to your Supabase project.
   - Run the SQL provided in `supabase/schema.sql` in the SQL Editor.

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

## 🔐 Admin Access

To access the admin panel:
1. Go to `/admin`.
2. Log in with your Supabase credentials.
3. Use the "Seed Data" button to quickly populate the portfolio with sample content.

## 🤖 AI Agent Configuration

The AI agent uses the Groq API. Ensure you have a valid API key from [Groq Console](https://console.groq.com/). The system prompt is configured in `server.ts` to act as a professional portfolio assistant.

---

Built with ❤️ by Aura AI.
