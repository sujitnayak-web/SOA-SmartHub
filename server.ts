import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey && apiKey.trim() !== '' && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (e) {
      console.warn('Failed to initialize GoogleGenAI client:', e);
    }
  }

  // Status check endpoint for frontend UI
  app.get('/api/assistant/status', (_req, res) => {
    res.json({
      configured: Boolean(ai),
      model: 'gemini-3.8-flash',
      assistantName: 'SOA Smart Assistant'
    });
  });

  const SYSTEM_INSTRUCTION = `You are "SOA Smart Assistant", a friendly, knowledgeable, and polite smart campus AI assistant for SOA University (ITER Campus, Bhubaneswar).

Campus Context & Architecture:
- Main Campus Buildings:
  1. E-Block (Engineering, Computer Science & Engineering, IT, AI & Data Science labs like E-304, Smart Seminar Hall E-101)
  2. A-Block (Core Engineering: Mechanical, Civil, Electrical labs, tutorial halls)
  3. Central Library (Centennial Knowledge Center with reading floors, digital reference section, IEEE journals, 08:00 AM - 11:00 PM)
  4. Administrative Block (ADM-BLK: Dean ITER office, Academic Registrar, Student Section on 1st Floor, Accounts/Finance desk)
  5. Main Gate (Jagamara security entrance, turnstiles, visitor desk, 24/7)
  6. Cafeteria (Student Food Court & dining pavilion, 07:30 AM - 10:00 PM)
  7. Auditorium (ITER Biju Patnaik Memorial Auditorium, 1200-seater)
  8. Campus Parking (Two-wheelers & cars, EV charging, near Main Gate)

Student Services & Sections:
- Student Section (Admin Block 1st floor): handles bonafide certificate requests, academic transcripts, student identity cards, and document verifications (10:00 AM to 03:30 PM).
- Fees: The portal provides an illustrative demo breakdown. Online payments will be available in an upcoming release; actual fees must be confirmed with the official Finance & Accounts section.
- Transport: Bus routes connect Cuttack Badambadi, Master Canteen railway station, Patia/KIIT Square, and local Jagamara feeders. Official schedules and bus passes must be verified with the Transport Department.
- Library Services: Textbooks, research journals, silent study halls. Book issuing will be integrated in future phases.

Rules:
1. Be concise, clear, and helpful.
2. Never invent official university deadlines, fee amounts, bus schedules, contact details, or university policies.
3. If specific official details are unavailable, clearly state that students should confirm with the relevant university department (e.g. Student Section, Accounts Department, or Transport In-charge).
4. Emphasize that you are an AI assistant designed for the SOA SmartHub platform for Ideasprint 2026.`;

  // Server-side Gemini chat endpoint
  app.post('/api/assistant/chat', async (req, res) => {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      return res.json({
        success: false,
        configured: false,
        text: 'GEMINI_API_KEY is not configured on the server. To activate full AI generation, please set a valid GEMINI_API_KEY in your server environment secrets. In the meantime, I am answering with verified campus knowledge graph data.',
        sources: ['SOA SmartHub Knowledge Graph (Local Offline Mode)']
      });
    }

    try {
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          contents.push({
            role: item.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: item.text }]
          });
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const replyText = response.text || 'I understand your query regarding SOA campus. For detailed procedures, please consult the Student Section or your departmental coordinator.';

      return res.json({
        success: true,
        configured: true,
        text: replyText,
        sources: ['Google Gemini 3.8 Flash', 'SOA SmartHub Campus Intelligence']
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Error communicating with Gemini API';
      console.error('Gemini API call failed:', err);
      return res.json({
        success: false,
        configured: true,
        error: errorMsg,
        text: 'The Gemini service encountered a temporary error. Please verify your GEMINI_API_KEY quota or try again in a few moments.',
        sources: ['SOA SmartHub Fallback System']
      });
    }
  });

  // Serve static assets in production or Vite middleware in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`SOA SmartHub server active on http://0.0.0.0:${port}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
