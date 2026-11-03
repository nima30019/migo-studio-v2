/**
 * Vercel Serverless Function — MIGO AI Gemini Streaming Endpoint
 *
 * Automatically recognized by Vercel when deploying from Git.
 * Environment Variable required in Vercel Dashboard: GEMINI_API_KEY
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

const MIGO_SYSTEM_INSTRUCTION = `You are MIGO AI, the Senior Creative Technology & Spatial Engineering Consultant for MIGO Studio (استودیو فناوری خلاق MIGO).
Your role is to consult with website visitors, explore MIGO's 6 core service families (VR/MR, Zero-Install WebAR, Interactive Games & Systems, 3D WebGL Visualization, Industrial Simulations & Digital Twins, Interactive Exhibition LiDAR Installations), explain spatial technologies, and guide them to start a project.

CORE PRINCIPLES:
1. Fluently respond in natural, professional Persian when the user writes in Persian. Respond in English when they write in English.
2. Ground all answers in MIGO's real portfolio: AeroTurbine VR Rig (/work/holo-industrial-vr), Lumina Motion Wall (/work/lumina-motion-wall), ChronoSpatial WebAR Configurator (/work/webar-luxury-showcase), PetroSim Digital Twin (/work/petrosim-digital-twin), PulseRush Arcade (/work/kinetic-arcade-game).
3. Format internal links with localized markdown: [عنوان لینک](/fa/services/...) or [Project Name](/en/work/...) or [Start a Project](/en/start-project).
4. Never invent client names or fixed prices. Guide inquiries to the 5-step brief at /start-project.`;

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on server' });
  }

  try {
    const { message, history = [] } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: MIGO_SYSTEM_INSTRUCTION,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 1200,
      },
    });

    const formattedHistory = history
      .filter((m) => m.content && typeof m.content === 'string')
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

    const chat = model.startChat({ history: formattedHistory });
    const resultStream = await chat.sendMessageStream(message);

    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    });

    for await (const chunk of resultStream.stream) {
      const text = chunk.text();
      if (text) {
        res.write(`data: ${JSON.stringify({ delta: text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Vercel API error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  }
};
