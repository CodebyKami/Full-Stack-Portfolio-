import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import Groq from "groq-sdk";
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
  contentSecurityPolicy: false, // Disable CSP for development with Vite
}));

// Supabase Client (Server-side)
const supabaseUrl = process.env.SUPABASE_URL || "https://hhrjoxrdmckvdxhsuwce.supabase.co";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Groq Client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// AI Assistant Endpoint
app.post("/api/ai", async (req, res) => {
  try {
    const { message, context } = req.body;

    // Fetch portfolio data for context
    const { data: projects } = await supabase.from("projects").select("*");
    const { data: skills } = await supabase.from("skills").select("*");
    const { data: experience } = await supabase.from("experience").select("*");

    const portfolioContext = `
      Developer Portfolio Data:
      Projects: ${JSON.stringify(projects)}
      Skills: ${JSON.stringify(skills)}
      Experience: ${JSON.stringify(experience)}
      Current Page: ${context?.page || "Home"}
    `;

    const systemPrompt = `
      You are a professional AI portfolio assistant for a developer.
      
      Your goals:
      - Answer questions about skills, projects, and experience based on the provided data.
      - Help clients understand developer capabilities.
      - Suggest relevant projects from the list.
      - Generate proposals for client needs if they describe a project.
      
      IMPORTANT:
      - Be concise and professional.
      - Be persuasive (convert visitors into clients).
      - If the user shows interest in hiring or project discussion, ALWAYS guide them toward the 'Hire Me' or contact section.
      
      ${portfolioContext}
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      model: "llama3-8b-8192",
    });

    res.json({ response: chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't process that." });
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
