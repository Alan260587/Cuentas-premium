import { GoogleGenAI } from '@google/genai';
import { OFFICIAL_WHATSAPP_NUMBER, OFFICIAL_CATALOG, getMercadoPagoLink, buildCatalogListMessage, buildSystemInstruction, detectTextLanguage, isGeneralCatalogRequest } from './_knowledge.js';

// Busca un producto del catálogo por nombre aproximado (insensible a
// mayúsculas, acentos y signos), para completar precio/duración del pedido.
function findCatalogProduct(name) {
  const norm = String(name || '').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  if (!norm) return undefined;
  return OFFICIAL_CATALOG.find((p) => {
    const pn = p.name.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
    return pn.includes(norm) || norm.includes(pn);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history = [], schedule, isInactivityTrigger = false, lang = 'es' } = req.body || {};
  const detectedLang = isInactivityTrigger ? lang : detectTextLanguage(message || '', lang);

  // Petición GENERAL de catálogo (p. ej. la opción "📋 Ver catálogo y precios"
  // del widget): respuesta determinista con los 11 productos y ambos precios,
  // sin llamar a Gemini. Las preguntas sobre un producto específico, pagos,
  // afiliados, citas o video siguen su camino normal.
  if (!isInactivityTrigger && message && isGeneralCatalogRequest(message)) {
    const catalogReply = buildCatalogListMessage(detectedLang);
    return res.status(200).json({
      replyText: catalogReply,
      reply: catalogReply,
      source: 'catalog-list',
      detectedLang
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({ useLocalEngine: true, detectedLang });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const promptText = isInactivityTrigger
      ? `[SISTEMA: El usuario lleva varios minutos en el chat. Ofrécele amablemente en el idioma "${detectedLang}" agendar una cita rápida en horario de Hermosillo, Sonora.]`
      : `${message}\n\n[INSTRUCCIÓN DE IDIOMA: Responde obligatoriamente en el mismo idioma de este mensaje del cliente (código detectado: ${detectedLang}).]`;

    const contents = [
      ...history.slice(-8).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      })),
      { role: 'user', parts: [{ text: promptText }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents,
      config: {
        systemInstruction: buildSystemInstruction(schedule, detectedLang),
        temperature: 0.3
      }
    });

    let replyText = response.text || '';
    let whatsappUrl;

    const match = replyText.match(/\[\[APPOINTMENT_DATA:(\{.*?\})\]\]/);
    if (match) {
      try {
        const appt = JSON.parse(match[1]);
        replyText = replyText.replace(match[0], '').trim();
        if (appt.day && appt.time) {
          const waMsg = `📅 *SOLICITUD DE CITA OFICIAL*\n\n• *Producto / Motivo:* ${appt.reason || 'Información del catálogo'}\n• *Día solicitado:* ${appt.day}\n• *Hora (Hermosillo, Sonora):* ${appt.time}\n\nPor favor confirma mi cita. ¡Gracias!`;
          whatsappUrl = `https://api.whatsapp.com/send?phone=${OFFICIAL_WHATSAPP_NUMBER}&text=${encodeURIComponent(waMsg)}`;
        }
      } catch {
        // ignore JSON parse errors
      }
    }

    // Pedido confirmado por la IA: mismo patrón que la cita, con el mensaje
    // de pedido prellenado para WhatsApp. El precio se completa desde el
    // catálogo oficial si la IA no lo incluyó.
    const orderMatch = replyText.match(/\[\[ORDER_DATA:(\{.*?\})\]\]/);
    if (orderMatch) {
      try {
        const order = JSON.parse(orderMatch[1]);
        replyText = replyText.replace(orderMatch[0], '').trim();
        if (order.product && order.name) {
          const catalogMatch = findCatalogProduct(order.product);
          const priceMXN = order.priceMXN ?? catalogMatch?.priceMXN;
          const priceUSDT = order.priceUSDT ?? catalogMatch?.priceUSDT;
          const priceLine = priceMXN != null && priceUSDT != null
            ? `• *Precio:* $${priceMXN} MXN / $${Number(priceUSDT).toFixed(2)} USDT\n`
            : '';
          const mpLink = priceMXN != null ? getMercadoPagoLink(priceMXN) : undefined;
          const mpLine = mpLink ? `• *Paga con Mercado Pago:* ${mpLink}\n` : '';
          const waMsg = `🛒 *PEDIDO OFICIAL*\n\n• *Producto:* ${order.product}\n${priceLine}${order.duration ? `• *Duración:* ${order.duration}\n` : ''}${mpLine}• *Cliente:* ${order.name}\n\nPor favor confirma mi pedido. ¡Gracias!`;
          whatsappUrl = `https://api.whatsapp.com/send?phone=${OFFICIAL_WHATSAPP_NUMBER}&text=${encodeURIComponent(waMsg)}`;
        }
      } catch {
        // ignore JSON parse errors
      }
    }

    return res.status(200).json({ reply: replyText, replyText, whatsappUrl, source: 'gemini', detectedLang });
  } catch {
    return res.status(200).json({ useLocalEngine: true, detectedLang });
  }
}
