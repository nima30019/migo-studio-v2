/**
 * MIGO AI — Dedicated Backend Streaming Server
 * 
 * Ready to run on any Node.js host, VPS, Docker container, or cPanel Node.js app.
 * Streams real-time Google Gemini 1.5 Flash completions directly to the frontend.
 * 
 * Usage:
 *   1. Set GEMINI_API_KEY in environment or .env
 *   2. Run: node server/index.js
 */

const http = require('http');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const PORT = process.env.PORT || 3002;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

const MIGO_SYSTEM_INSTRUCTION = `You are MIGO AI, the Senior Creative Technology & Spatial Engineering Consultant for MIGO Studio (استودیو فناوری خلاق MIGO).
Your role is to consult with website visitors, explore MIGO's 6 core service families (VR/MR, Zero-Install WebAR, Interactive Games & Systems, 3D WebGL Visualization, Industrial Simulations & Digital Twins, Interactive Exhibition LiDAR Installations), explain spatial technologies, and guide them to start a project.

CORE PRINCIPLES:
1. Fluently respond in natural, professional Persian when the user writes in Persian. Respond in English when they write in English.
2. Ground all answers in MIGO's real portfolio: AeroTurbine VR Rig (/work/holo-industrial-vr), Lumina Motion Wall (/work/lumina-motion-wall), ChronoSpatial WebAR Configurator (/work/webar-luxury-showcase), PetroSim Digital Twin (/work/petrosim-digital-twin), PulseRush Arcade (/work/kinetic-arcade-game).
3. Format internal links with localized markdown: [عنوان لینک](/fa/services/...) or [Project Name](/en/work/...) or [Start a Project](/en/start-project).
4. Never invent client names or fixed prices. Guide inquiries to the 5-step brief at /start-project.`;

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check endpoint
  if (req.method === 'GET' && (req.url === '/' || req.url === '/health' || req.url === '/api/health')) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      status: 'healthy',
      service: 'MIGO AI Backend',
      hasApiKey: Boolean(GEMINI_API_KEY),
      model: 'gemini-1.5-flash',
    }));
    return;
  }

  // Chat API endpoint
  if (req.method === 'POST' && (req.url === '/api/chat' || req.url === '/chat')) {
    if (!GEMINI_API_KEY) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({
        error: 'GEMINI_API_KEY_NOT_CONFIGURED',
        message: 'Please set GEMINI_API_KEY in server environment variables.',
      }));
      return;
    }

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      // Safety limit: max 1MB
      if (body.length > 1e6) {
        req.socket.destroy();
      }
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const userMessage = payload.message || payload.query || '';
        const history = payload.history || [];

        if (!userMessage) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing message parameter' }));
          return;
        }

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction: MIGO_SYSTEM_INSTRUCTION,
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            maxOutputTokens: 1200,
          },
        });

        // Format history
        const formattedHistory = history
          .filter((msg) => msg.content && typeof msg.content === 'string')
          .map((msg) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
          }));

        const chat = model.startChat({ history: formattedHistory });
        const resultStream = await chat.sendMessageStream(userMessage);

        // SSE Streaming headers
        res.writeHead(200, {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
          'X-Accel-Buffering': 'no',
        });

        for await (const chunk of resultStream.stream) {
          const text = chunk.text();
          if (text) {
            res.write(`data: ${JSON.stringify({ delta: text })}\n\n`);
          }
        }

        res.write('data: [DONE]\n\n');
        res.end();
      } catch (err) {
        console.error('[MIGO Server Error]:', err);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'GENERATION_ERROR', details: err.message }));
        } else {
          res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
          res.end();
        }
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
  console.log(`[MIGO AI Server] Listening on http://localhost:${PORT}`);
  console.log(`[MIGO AI Server] Gemini API Key status: ${GEMINI_API_KEY ? 'Configured (Ready)' : 'Missing'}`);
});
