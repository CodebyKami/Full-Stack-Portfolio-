import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
}));

// Supabase Client (Server-side)
const supabaseUrl = process.env.SUPABASE_URL || "https://hhrjoxrdmckvdxhsuwce.supabase.co";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "sb_publishable_qH4yArd--J_MscJj1sBlqA_Gft3eNko";
const supabase = createClient(supabaseUrl, supabaseKey);

// Gemini Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// AI Assistant Endpoint
app.post("/api/ai", async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY is not configured",
        details: "Please add your GEMINI_API_KEY to the environment variables in settings."
      });
    }

    // Fetch portfolio data for context with fallback
    let projects = [];
    let skills = [];
    let experience = [];

    try {
      const { data: p } = await supabase.from("projects").select("*");
      const { data: s } = await supabase.from("skills").select("*");
      const { data: e } = await supabase.from("experience").select("*");
      projects = p || [];
      skills = s || [];
      experience = e || [];
    } catch (dbError) {
      console.error("Database fetch error (AI context):", dbError);
    }

    const portfolioContext = `
      Developer Portfolio Data:
      Name: Kamran Rasool
      Role: Senior Web Developer & Automation Specialist
      Expertise: WordPress, GoHighLevel, Squarespace, Full-Stack Solutions
      Projects: ${JSON.stringify(projects)}
      Skills: ${JSON.stringify(skills)}
      Experience: ${JSON.stringify(experience)}
      Current Page: ${context?.page || "Home"}
    `;

    const systemPrompt = `
      You are Kamran Rasool's professional AI portfolio assistant.
      
      Your goals:
      - Answer questions about Kamran's skills, projects, and experience.
      - Help potential clients understand how Kamran can help them with WordPress, GHL, or Squarespace.
      - Be concise, professional, and persuasive.
      - If interested in hiring, guide them to the contact form.
      
      Developer Context:
      ${portfolioContext}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(systemPrompt + "\n\nUser Question: " + message);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text || "I'm sorry, I couldn't process that." });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to process AI request" });
  }
});

// Contact Endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const { data, error } = await supabase
      .from("messages")
      .insert([{ name, email, subject, message }]);

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
