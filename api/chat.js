import { GoogleGenAI } from '@google/genai';
import { OFFICIAL_CATALOG, PAYMENT_INFO, buildSystemInstruction, detectTextLanguage } from './_knowledge.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history = [], schedule, lang = 'es' } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Mensaje requerido' });
  }

  const detectedLang = detectTextLanguage(message, lang);
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const contents = [
        ...history.slice(-8).map((m) => ({
          role: m.sender === 'user' || m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text || m.content || '' }]
        })),
        {
          role: 'user',
          parts: [{ text: `${message}\n\n[INSTRUCCIÓN DE IDIOMA: Responde obligatoriamente en el idioma detectado "${detectedLang}".]` }]
        }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents,
        config: {
          systemInstruction: buildSystemInstruction(schedule, detectedLang),
          temperature: 0.3
        }
      });

      const replyText = (response.text || '').replace(/\[\[APPOINTMENT_DATA:\{.*?\}\]\]/g, '').trim();
      if (replyText) {
        return res.status(200).json({ reply: replyText, replyText, source: 'gemini', detectedLang });
      }
    } catch {
      // Fallback to local engine if Gemini fails
    }
  }

  return res.status(200).json({ useLocalEngine: true, detectedLang });
}
