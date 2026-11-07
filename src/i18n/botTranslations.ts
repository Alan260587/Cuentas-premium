import { LanguageCode } from './types';
import { Product } from '../types';
import { getLocalizedProduct } from './productTranslations';
import { getDictionary } from './translations';
import { MERCADO_PAGO_LINKS, getMercadoPagoLinkForProduct } from '../data/catalog';

function getMercadoPagoProductLine(product: Product, lang: LanguageCode = 'es'): string {
  const mpUrl = getMercadoPagoLinkForProduct(product);
  if (!mpUrl) return '';
  if (lang === 'en') return `\n• **Pay with Mercado Pago ($${product.priceMxn} MXN):** ${mpUrl}`;
  if (lang === 'pt') return `\n• **Pagar com Mercado Pago ($${product.priceMxn} MXN):** ${mpUrl}`;
  if (lang === 'fr') return `\n• **Payer avec Mercado Pago ($${product.priceMxn} MXN):** ${mpUrl}`;
  return `\n• **Pagar con Mercado Pago ($${product.priceMxn} MXN):** ${mpUrl}`;
}

export interface BotLocalizedTemplates {
  inactivityOffer: (daysSummary: string, startHour: string, endHour: string) => string;
  appointmentConfirmed: (day: string, time: string, reason: string) => string;
  appointmentAskDetails: (
    day: string | null,
    time: string | null,
    reason: string | null,
    daysSummary: string,
    startHour: string,
    endHour: string
  ) => string;
  singleProductInfo: (p: Product, lang: LanguageCode) => string;
  catalogResponse: (products: Product[], lang: LanguageCode) => string;
  recommendationResponse?: (userText?: string) => string;
  paymentConceptRuleResponse: () => string;
  affiliateRulesResponse: () => string;
  scheduleResponse: (daysSummary: string, startHour: string, endHour: string) => string;
  greetingResponse: (daysSummary: string, startHour: string, endHour: string) => string;
  defaultHelpResponse: () => string;
}

type RecommendationUseCase = 'design' | 'languages' | 'video' | 'pdf' | 'entertainment' | 'ai' | 'study' | 'general';

function detectRecommendationUseCase(userText?: string): RecommendationUseCase {
  if (!userText) return 'general';
  const norm = userText
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // 1. Diseño (checked before estudio so "estudiar diseño" -> Figma Pro)
  if (/(disen|design|ui\b|ux\b|prototip|wireframe|maquetac|interfaz|interfaces|grafic|graphic|figma|web\s*design)/.test(norm)) {
    return 'design';
  }
  // 2. Idiomas (checked before estudio so "estudiar idiomas / aprender ingles" -> Duolingo)
  if (/(idioma|idiomas|lengua|language|languages|langue|langues|ingles|english|frances|french|aleman|german|italiano|portugues|japones|coreano|chino|duolingo)/.test(norm)) {
    return 'languages';
  }
  // 3. Video (checked before estudio so "aprender a editar video" -> CapCut)
  if (/(video|videos|editar|edicion|editing|editor|capcut|cap\s*cut|reels|tiktok|shorts|audiovisual|montaje|montage|multimedia)/.test(norm)) {
    return 'video';
  }
  // 4. PDF / Documentos
  if (/(\bpdf\b|pdfs|ilovepdf|ilove\s*pdf|ocr\b|comprimir|convertir\s*documento|firmar\s*documento|escanear|archivos\s*pdf)/.test(norm)) {
    return 'pdf';
  }
  // 5. Entretenimiento / Streaming
  if (/(entretenimiento|entertainment|entretenimento|divertissement|streaming|pelicula|peliculas|serie|series|movie|movies|cine|film|films|netflix|disney)/.test(norm)) {
    return 'entertainment';
  }
  // 6. IA / Inteligencia Artificial
  if (/(inteligencia\s*artificial|artificial\s*intelligence|intelligence\s*artificielle|\bia\b|\bai\b|gemini|google\s*ai|chatgpt|llm|programar|programacion|codigo|coding|redaccion|investigacion|automatiz)/.test(norm)) {
    return 'ai';
  }
  // 7. Estudio / Cursos / Certificaciones
  if (/(estudiar|estudio|estudios|estudar|etudier|curso|cursos|course|courses|cours|certificado|certificados|certification|certificate|universidad|university|universite|carrera|aprender|learn|learning|capacitacion|coursera|diplomado|escuela|colegio)/.test(norm)) {
    return 'study';
  }
  return 'general';
}

export function buildContextualRecommendation(userText: string = '', lang: LanguageCode = 'es'): string {
  const useCase = detectRecommendationUseCase(userText);

  if (lang === 'en') {
    switch (useCase) {
      case 'design':
        return `🎨 **Recommended Product for Design: Figma Pro (.edu)**\n\n• **Ideal for:** Studying and working in UI/UX design, interactive prototyping, wireframes, and real-time collaboration.\n• **Exact Price:** **$300 MXN / $17.00 USDT**\n• **Duration:** **2 Years**\n• **Pay with Mercado Pago:** ${MERCADO_PAGO_LINKS[300]}\n\n⚠️ *Remember: In the payment reference/concept write the name of who referred you, or only **"pago"**.*`;
      case 'languages':
        return `🦉 **Recommended Product for Languages: Duolingo Super Family**\n\n• **Ideal for:** Learning English, French, German, or 40+ languages ad-free with unlimited hearts.\n• **Exact Price:** **$150 MXN / $8.74 USDT**\n• **Pay with Mercado Pago:** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Remember: In the payment reference/concept write the name of who referred you, or only **"pago"**.*`;
      case 'video':
        return `🎬 **Recommended Product for Video Editing: CapCut Teams**\n\n• **Ideal for:** Professional video editing, Reels, TikToks, auto-captions, and 4K exports without watermarks.\n• **Exact Price:** **$150 MXN / $8.74 USDT**\n• **Duration:** **25 Days**\n• **Pay with Mercado Pago:** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Remember: In the payment reference/concept write the name of who referred you, or only **"pago"**.*`;
      case 'study':
        return `🎓 **Recommended Product for Study & Courses: Coursera Plus**\n\n• **Ideal for:** Unlimited access to 7,000+ official university and industry courses with verifiable certificates.\n• **Exact Price:** **$150 MXN / $8.74 USDT**\n• **Duration:** **12 Months**\n• **Pay with Mercado Pago:** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Remember: In the payment reference/concept write the name of who referred you, or only **"pago"**.*`;
      case 'ai':
        return `🤖 **Recommended Product for Artificial Intelligence: Google AI Pro / Gemini**\n\n• **Ideal for:** Advanced AI research, coding, writing, deep analysis, and 2 TB of Google One cloud storage.\n• **Exact Price:** **$150 MXN / $8.74 USDT**\n• **Duration:** **18 Months**\n• **Pay with Mercado Pago:** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Remember: In the payment reference/concept write the name of who referred you, or only **"pago"**.*`;
      case 'pdf':
        return `📄 **Recommended Product for PDF & Documents: iLovePDF Premium**\n\n• **Ideal for:** Merging, compressing, converting PDF to Word/Excel, OCR scanning, and digital signatures.\n• **Exact Price:** **$100 MXN / $5.83 USDT**\n• **Duration:** **12 Months**\n• **Pay with Mercado Pago:** ${MERCADO_PAGO_LINKS[100]}\n\n⚠️ *Remember: In the payment reference/concept write the name of who referred you, or only **"pago"**.*`;
      case 'entertainment':
        return `🍿 **Recommended Product for Entertainment & Streaming:**\n\n• **Netflix Premium** — **$300 MXN / $17.00 USDT** (**12 Months**) → **Pay with Mercado Pago:** ${MERCADO_PAGO_LINKS[300]}\n• **Disney+ Complete Account** — **$200 MXN / $11.66 USDT** (**12 Months**) → **Pay with Mercado Pago:** ${MERCADO_PAGO_LINKS[200]}\n\n⚠️ *Remember: In the payment reference/concept write the name of who referred you, or only **"pago"**.*`;
      default:
        return `💡 **Personalized Recommendation by Use Case:**\n\n• 🎨 **Design:** **Figma Pro (.edu)** — $300 MXN / 17.00 USDT (2 Years) → ${MERCADO_PAGO_LINKS[300]}\n• 🎓 **Study / Courses:** **Coursera Plus** — $150 MXN / 8.74 USDT (12 Months) → ${MERCADO_PAGO_LINKS[150]}\n• 🤖 **AI:** **Google AI Pro / Gemini** — $150 MXN / 8.74 USDT (18 Months) → ${MERCADO_PAGO_LINKS[150]}\n• 🦉 **Languages:** **Duolingo Super Family** — $150 MXN / 8.74 USDT → ${MERCADO_PAGO_LINKS[150]}\n• 🎬 **Video:** **CapCut Teams** — $150 MXN / 8.74 USDT (25 Days) → ${MERCADO_PAGO_LINKS[150]}\n• 📄 **PDF:** **iLovePDF Premium** — $100 MXN / 5.83 USDT (12 Months) → ${MERCADO_PAGO_LINKS[100]}\n• 🍿 **Entertainment:** **Netflix** ($300 MXN / 17.00 USDT, 12 Months → ${MERCADO_PAGO_LINKS[300]}) or **Disney+** ($200 MXN / 11.66 USDT, 12 Months → ${MERCADO_PAGO_LINKS[200]})\n\nTell me your main goal (design, study, AI, languages, video, PDF, or entertainment) and I will give you the details right away!`;
    }
  }

  if (lang === 'pt') {
    switch (useCase) {
      case 'design':
        return `🎨 **Produto Recomendado para Design: Figma Pro (.edu)**\n\n• **Ideal para:** Estudar e trabalhar com design UI/UX, prototipagem interativa e projetos colaborativos.\n• **Preço Exato:** **$300 MXN / $17.00 USDT**\n• **Duração:** **2 Anos**\n• **Pagar com Mercado Pago:** ${MERCADO_PAGO_LINKS[300]}\n\n⚠️ *Lembre-se: No conceito do pagamento coloque o nome de quem indicou você ou apenas **"pago"**.*`;
      case 'languages':
        return `🦉 **Produto Recomendado para Idiomas: Duolingo Super Família**\n\n• **Ideal para:** Aprender inglês, francês, alemão ou mais de 40 idiomas sem anúncios e com vidas ilimitadas.\n• **Preço Exato:** **$150 MXN / $8.74 USDT**\n• **Pagar com Mercado Pago:** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Lembre-se: No conceito do pagamento coloque o nome de quem indicou você ou apenas **"pago"**.*`;
      case 'video':
        return `🎬 **Produto Recomendado para Vídeo: CapCut Teams**\n\n• **Ideal para:** Edição profissional de vídeo, Reels, TikTok, legendas automáticas e exportação 4K sem marca d'água.\n• **Preço Exato:** **$150 MXN / $8.74 USDT**\n• **Duração:** **25 Dias**\n• **Pagar com Mercado Pago:** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Lembre-se: No conceito do pagamento coloque o nome de quem indicou você ou apenas **"pago"**.*`;
      case 'study':
        return `🎓 **Produto Recomendado para Estudo e Cursos: Coursera Plus**\n\n• **Ideal para:** Acesso ilimitado a mais de 7.000 cursos universitários e certificações oficiais.\n• **Preço Exato:** **$150 MXN / $8.74 USDT**\n• **Duração:** **12 Meses**\n• **Pagar com Mercado Pago:** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Lembre-se: No conceito do pagamento coloque o nome de quem indicou você ou apenas **"pago"**.*`;
      case 'ai':
        return `🤖 **Produto Recomendado para Inteligência Artificial: Google AI Pro / Gemini**\n\n• **Ideal para:** Pesquisa avançada com IA, programação, redação e 2 TB de armazenamento Google One.\n• **Preço Exato:** **$150 MXN / $8.74 USDT**\n• **Duração:** **18 Meses**\n• **Pagar com Mercado Pago:** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Lembre-se: No conceito do pagamento coloque o nome de quem indicou você ou apenas **"pago"**.*`;
      case 'pdf':
        return `📄 **Produto Recomendado para PDF: iLovePDF Premium**\n\n• **Ideal para:** Unir, comprimir, converter PDF para Word/Excel, OCR e assinatura digital.\n• **Preço Exato:** **$100 MXN / $5.83 USDT**\n• **Duração:** **12 Meses**\n• **Pagar com Mercado Pago:** ${MERCADO_PAGO_LINKS[100]}\n\n⚠️ *Lembre-se: No conceito do pagamento coloque o nome de quem indicou você ou apenas **"pago"**.*`;
      case 'entertainment':
        return `🍿 **Produto Recomendado para Entretenimento e Streaming:**\n\n• **Netflix Premium** — **$300 MXN / $17.00 USDT** (**12 Meses**) → **Pagar com Mercado Pago:** ${MERCADO_PAGO_LINKS[300]}\n• **Disney+ Conta Completa** — **$200 MXN / $11.66 USDT** (**12 Meses**) → **Pagar com Mercado Pago:** ${MERCADO_PAGO_LINKS[200]}\n\n⚠️ *Lembre-se: No conceito do pagamento coloque o nome de quem indicou você ou apenas **"pago"**.*`;
      default:
        return `💡 **Recomendação Personalizada por Uso:**\n\n• 🎨 **Design:** **Figma Pro (.edu)** — $300 MXN / 17.00 USDT (2 Anos) → ${MERCADO_PAGO_LINKS[300]}\n• 🎓 **Estudo / Cursos:** **Coursera Plus** — $150 MXN / 8.74 USDT (12 Meses) → ${MERCADO_PAGO_LINKS[150]}\n• 🤖 **IA:** **Google AI Pro / Gemini** — $150 MXN / 8.74 USDT (18 Meses) → ${MERCADO_PAGO_LINKS[150]}\n• 🦉 **Idiomas:** **Duolingo Super Família** — $150 MXN / 8.74 USDT → ${MERCADO_PAGO_LINKS[150]}\n• 🎬 **Vídeo:** **CapCut Teams** — $150 MXN / 8.74 USDT (25 Dias) → ${MERCADO_PAGO_LINKS[150]}\n• 📄 **PDF:** **iLovePDF Premium** — $100 MXN / 5.83 USDT (12 Meses) → ${MERCADO_PAGO_LINKS[100]}\n• 🍿 **Entretenimento:** **Netflix** ($300 MXN / 17.00 USDT, 12 Meses → ${MERCADO_PAGO_LINKS[300]}) ou **Disney+** ($200 MXN / 11.66 USDT, 12 Meses → ${MERCADO_PAGO_LINKS[200]})\n\nDiga-me para qual finalidade você procura uma conta e eu recomendo a opção ideal!`;
    }
  }

  if (lang === 'fr') {
    switch (useCase) {
      case 'design':
        return `🎨 **Produit Recommandé pour le Design : Figma Pro (.edu)**\n\n• **Idéal pour :** Étudier et pratiquer le design UI/UX, le prototypage interactif et le travail collaboratif.\n• **Prix Exact :** **$300 MXN / $17.00 USDT**\n• **Durée :** **2 Ans**\n• **Payer avec Mercado Pago :** ${MERCADO_PAGO_LINKS[300]}\n\n⚠️ *Rappel : Dans le motif du paiement, indiquez le nom de votre parrain ou uniquement **"pago"**.*`;
      case 'languages':
        return `🦉 **Produit Recommandé pour les Langues : Duolingo Super Famille**\n\n• **Idéal pour :** Apprendre l'anglais, le français, l'allemand ou plus de 40 langues sans publicité et avec vies illimitées.\n• **Prix Exact :** **$150 MXN / $8.74 USDT**\n• **Payer avec Mercado Pago :** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Rappel : Dans le motif du paiement, indiquez le nom de votre parrain ou uniquement **"pago"**.*`;
      case 'video':
        return `🎬 **Produit Recommandé pour la Vidéo : CapCut Teams**\n\n• **Idéal pour :** Montage vidéo professionnel, Reels, TikTok, sous-titres automatiques et export 4K sans filigrane.\n• **Prix Exact :** **$150 MXN / $8.74 USDT**\n• **Durée :** **25 Jours**\n• **Payer avec Mercado Pago :** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Rappel : Dans le motif du paiement, indiquez le nom de votre parrain ou uniquement **"pago"**.*`;
      case 'study':
        return `🎓 **Produit Recommandé pour les Études et Cours : Coursera Plus**\n\n• **Idéal pour :** Accès illimité à plus de 7 000 cours universitaires et certificats officiels.\n• **Prix Exact :** **$150 MXN / $8.74 USDT**\n• **Durée :** **12 Mois**\n• **Payer avec Mercado Pago :** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Rappel : Dans le motif du paiement, indiquez le nom de votre parrain ou uniquement **"pago"**.*`;
      case 'ai':
        return `🤖 **Produit Recommandé pour l'IA : Google AI Pro / Gemini**\n\n• **Idéal pour :** Recherche avancée avec IA, programmation, rédaction et 2 To de stockage Google One.\n• **Prix Exact :** **$150 MXN / $8.74 USDT**\n• **Durée :** **18 Mois**\n• **Payer avec Mercado Pago :** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Rappel : Dans le motif du paiement, indiquez le nom de votre parrain ou uniquement **"pago"**.*`;
      case 'pdf':
        return `📄 **Produit Recommandé pour les PDF : iLovePDF Premium**\n\n• **Idéal pour :** Fusionner, compresser, convertir des PDF en Word/Excel, OCR et signature numérique.\n• **Prix Exact :** **$100 MXN / $5.83 USDT**\n• **Durée :** **12 Mois**\n• **Payer avec Mercado Pago :** ${MERCADO_PAGO_LINKS[100]}\n\n⚠️ *Rappel : Dans le motif du paiement, indiquez le nom de votre parrain ou uniquement **"pago"**.*`;
      case 'entertainment':
        return `🍿 **Produit Recommandé pour le Divertissement et Streaming :**\n\n• **Netflix Premium** — **$300 MXN / $17.00 USDT** (**12 Mois**) → **Payer avec Mercado Pago :** ${MERCADO_PAGO_LINKS[300]}\n• **Disney+ Compte Complet** — **$200 MXN / $11.66 USDT** (**12 Mois**) → **Payer avec Mercado Pago :** ${MERCADO_PAGO_LINKS[200]}\n\n⚠️ *Rappel : Dans le motif du paiement, indiquez le nom de votre parrain ou uniquement **"pago"**.*`;
      default:
        return `💡 **Recommandation Personnalisée selon votre Usage :**\n\n• 🎨 **Design :** **Figma Pro (.edu)** — $300 MXN / 17.00 USDT (2 Ans) → ${MERCADO_PAGO_LINKS[300]}\n• 🎓 **Études / Cours :** **Coursera Plus** — $150 MXN / 8.74 USDT (12 Mois) → ${MERCADO_PAGO_LINKS[150]}\n• 🤖 **IA :** **Google AI Pro / Gemini** — $150 MXN / 8.74 USDT (18 Mois) → ${MERCADO_PAGO_LINKS[150]}\n• 🦉 **Langues :** **Duolingo Super Famille** — $150 MXN / 8.74 USDT → ${MERCADO_PAGO_LINKS[150]}\n• 🎬 **Vidéo :** **CapCut Teams** — $150 MXN / 8.74 USDT (25 Jours) → ${MERCADO_PAGO_LINKS[150]}\n• 📄 **PDF :** **iLovePDF Premium** — $100 MXN / 5.83 USDT (12 Mois) → ${MERCADO_PAGO_LINKS[100]}\n• 🍿 **Divertissement :** **Netflix** ($300 MXN / 17.00 USDT, 12 Mois → ${MERCADO_PAGO_LINKS[300]}) ou **Disney+** ($200 MXN / 11.66 USDT, 12 Mois → ${MERCADO_PAGO_LINKS[200]})\n\nDites-moi votre besoin principal et je vous conseillerai immédiatement !`;
    }
  }

  // Default: Spanish ('es' and fallback)
  switch (useCase) {
    case 'design':
      return `🎨 **Producto recomendado para Diseño: Figma Pro (.edu)**\n\n• **Ideal para:** Estudiar y trabajar en diseño UI/UX, prototipado interactivo, wireframes y proyectos colaborativos.\n• **Precio exacto:** **$300 MXN / $17.00 USDT**\n• **Duración:** **2 Años**\n• **Pagar con Mercado Pago:** ${MERCADO_PAGO_LINKS[300]}\n\n⚠️ *Recuerda: En el concepto de pago pon el nombre de quien te recomendó o únicamente **"pago"** (nunca el nombre del producto).*`;
    case 'languages':
      return `🦉 **Producto recomendado para Idiomas: Duolingo Super Familiar**\n\n• **Ideal para:** Aprender inglés, francés, alemán o más de 40 idiomas sin anuncios y con vidas ilimitadas.\n• **Precio exacto:** **$150 MXN / $8.74 USDT**\n• **Pagar con Mercado Pago:** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Recuerda: En el concepto de pago pon el nombre de quien te recomendó o únicamente **"pago"** (nunca el nombre del producto).*`;
    case 'video':
      return `🎬 **Producto recomendado para Edición de Video: CapCut Teams**\n\n• **Ideal para:** Edición profesional de video, Reels, TikTok, subtítulos automáticos con IA y exportación en 4K sin marca de agua.\n• **Precio exacto:** **$150 MXN / $8.74 USDT**\n• **Duración:** **25 Días**\n• **Pagar con Mercado Pago:** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Recuerda: En el concepto de pago pon el nombre de quien te recomendó o únicamente **"pago"** (nunca el nombre del producto).*`;
    case 'study':
      return `🎓 **Producto recomendado para Estudio y Cursos: Coursera Plus**\n\n• **Ideal para:** Acceso ilimitado a más de 7,000 cursos universitarios y certificaciones oficiales con valor curricular.\n• **Precio exacto:** **$150 MXN / $8.74 USDT**\n• **Duración:** **12 Meses**\n• **Pagar con Mercado Pago:** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Recuerda: En el concepto de pago pon el nombre de quien te recomendó o únicamente **"pago"** (nunca el nombre del producto).*`;
    case 'ai':
      return `🤖 **Producto recomendado para Inteligencia Artificial: Google AI Pro / Gemini**\n\n• **Ideal para:** Investigación avanzada con IA, programación, redacción, análisis de documentos y 2 TB de almacenamiento en Google One.\n• **Precio exacto:** **$150 MXN / $8.74 USDT**\n• **Duración:** **18 Meses**\n• **Pagar con Mercado Pago:** ${MERCADO_PAGO_LINKS[150]}\n\n⚠️ *Recuerda: En el concepto de pago pon el nombre de quien te recomendó o únicamente **"pago"** (nunca el nombre del producto).*`;
    case 'pdf':
      return `📄 **Producto recomendado para PDF y Documentos: iLovePDF Premium**\n\n• **Ideal para:** Unir, comprimir, convertir PDF a Word/Excel, reconocimiento OCR y firmas digitales sin límite.\n• **Precio exacto:** **$100 MXN / $5.83 USDT**\n• **Duración:** **12 Meses**\n• **Pagar con Mercado Pago:** ${MERCADO_PAGO_LINKS[100]}\n\n⚠️ *Recuerda: En el concepto de pago pon el nombre de quien te recomendó o únicamente **"pago"** (nunca el nombre del producto).*`;
    case 'entertainment':
      return `🍿 **Producto recomendado para Entretenimiento y Streaming:**\n\n• **Netflix Premium** — **$300 MXN / $17.00 USDT** (**12 Meses**) → **Pagar con Mercado Pago:** ${MERCADO_PAGO_LINKS[300]}\n• **Disney+ Cuenta Completa** — **$200 MXN / $11.66 USDT** (**12 Meses**) → **Pagar con Mercado Pago:** ${MERCADO_PAGO_LINKS[200]}\n\n⚠️ *Recuerda: En el concepto de pago pon el nombre de quien te recomendó o únicamente **"pago"** (nunca el nombre del producto).*`;
    default:
      return `💡 **Recomendación personalizada según tu necesidad:**\n\n• 🎨 **Para estudiar o trabajar en Diseño:** **Figma Pro (.edu)** — **$300 MXN / 17.00 USDT** (2 Años) → ${MERCADO_PAGO_LINKS[300]}\n• 🎓 **Para Estudio / Cursos universitarios:** **Coursera Plus** — **$150 MXN / 8.74 USDT** (12 Meses) → ${MERCADO_PAGO_LINKS[150]}\n• 🤖 **Para Inteligencia Artificial (IA):** **Google AI Pro / Gemini** — **$150 MXN / 8.74 USDT** (18 Meses) → ${MERCADO_PAGO_LINKS[150]}\n• 🦉 **Para aprender Idiomas:** **Duolingo Super Familiar** — **$150 MXN / 8.74 USDT** → ${MERCADO_PAGO_LINKS[150]}\n• 🎬 **Para edición de Video:** **CapCut Teams** — **$150 MXN / 8.74 USDT** (25 Días) → ${MERCADO_PAGO_LINKS[150]}\n• 📄 **Para documentos PDF:** **iLovePDF Premium** — **$100 MXN / 5.83 USDT** (12 Meses) → ${MERCADO_PAGO_LINKS[100]}\n• 🍿 **Para Entretenimiento:** **Netflix** ($300 MXN / 17.00 USDT, 12 Meses → ${MERCADO_PAGO_LINKS[300]}) o **Disney+** ($200 MXN / 11.66 USDT, 12 Meses → ${MERCADO_PAGO_LINKS[200]})\n\nDime para qué uso buscas tu cuenta (diseño, idiomas, video, estudio, IA, PDF o entretenimiento) y te doy los detalles al instante.`;
  }
}

const botTemplates: Record<LanguageCode, BotLocalizedTemplates> = {
  es: {
    inactivityOffer: (days, start, end) =>
      `¡Hola! Veo que **Javier** se encuentra atendiendo a otros clientes y han transcurrido más de 3 minutos sin que pueda responderte personalmente 😊.\n\nPara respetar tu tiempo y asegurar tu entrega, he activado el sistema de **Citas Prioritarias**:\n• **Días disponibles:** ${days} *(Domingos cerrado)*\n• **Horarios (Hermosillo, Sonora):** ${start} a ${end}\n\nSi deseas agendar, dime tu **nombre**, qué **día**, **hora** y **producto/motivo** prefieres.`,
    appointmentConfirmed: (day, time, reason) =>
      `✅ **¡Excelente! He preparado tu solicitud de cita oficial:**\n\n• **Día:** ${day}\n• **Hora:** ${time} (Hora de Hermosillo, Sonora)\n• **Motivo / Producto:** ${reason}\n\nHaz clic en el botón verde de abajo para enviar y confirmar tu cita directamente en nuestro WhatsApp oficial (**+52 662 180 5354**).`,
    appointmentAskDetails: (day, time, reason, days, start, end) => {
      const missing: string[] = [];
      if (!day) missing.push('el **día** (Lunes a Sábado)');
      if (!time) missing.push(`la **hora** (entre ${start} y ${end}, hora de Hermosillo)`);
      if (!reason) missing.push('el **producto o motivo** de tu cita');
      return `📅 ¡Con gusto agendamos tu cita!\n\nNuestro horario oficial en **Hermosillo, Sonora** es:\n• **${days}** de **${start} a ${end}** *(Domingos cerrado)*.\n\nPara generar tu ticket directo a WhatsApp, por favor indícame ${missing.join(', ')}.\n\n*(Ejemplo: "Quiero cita el martes a las 4:00 PM para Figma Pro")*`;
    },
    singleProductInfo: (product, lang) => {
      const loc = getLocalizedProduct(product, lang);
      const durLine = loc.duration ? `\n• **Duración:** ${loc.duration}` : '';
      return `✨ **${loc.name}**\n${loc.description}\n${durLine}\n• **Precio en México:** $${product.priceMxn} MXN\n• **Precio Internacional (Cripto):** $${product.priceUsd.toFixed(2)} ${product.currencyType}${getMercadoPagoProductLine(product, lang)}\n• **Incluye:** ${loc.highlights.join(', ')}\n\n⚠️ **Recuerda la Regla del Concepto:** Al pagar por transferencia o Binance, en el concepto pon el **nombre y apellido de quien te recomendó**, o solo **"pago"** si nadie te recomendó (nunca pongas "${loc.name}"). ¿Deseas comprarlo o agendar una cita?`;
    },
    catalogResponse: (products, lang) => {
      const list = products
        .map((p, i) => {
          const loc = getLocalizedProduct(p, lang);
          const dur = loc.duration ? ` (${loc.duration})` : '';
          return `${i + 1}. **${loc.name}**${dur} — $${p.priceMxn} MXN / $${p.priceUsd.toFixed(2)} ${p.currencyType}`;
        })
        .join('\n');
      return `📋 **CATÁLOGO OFICIAL (${products.length} PRODUCTOS ACTIVOS):**\n\n${list}\n\n💳 *Enlaces directos de Mercado Pago por precio:*\n• **$300 MXN / 17.00 USDT (Figma Pro 2 Años / Netflix cuenta completa 12 Meses):** ${MERCADO_PAGO_LINKS[300]}\n• **$200 MXN / 11.66 USDT (Disney cuenta completa 12 Meses):** ${MERCADO_PAGO_LINKS[200]}\n• **$150 MXN / 8.74 USDT (Coursera Plus 12m, Google AI Pro / Gemini 18m, CapCut Teams 25d, Microsoft 365 Family 12m, Eleven Reader 12m, Mause AI 31B, Duolingo Super Familiar, Granola Business 12m):** ${MERCADO_PAGO_LINKS[150]}\n• **$100 MXN / 5.83 USDT (ilove pdf premium 12 meses):** ${MERCADO_PAGO_LINKS[100]}\n\n¿Cuál de estos productos te interesa adquirir o sobre cuál deseas más detalles?`;
    },
    recommendationResponse: (userText) => buildContextualRecommendation(userText, 'es'),
    paymentConceptRuleResponse: () =>
      `🏦 **MÉTODOS DE PAGO OFICIALES Y REGLA ESTRICTA DEL CONCEPTO:**\n\n🇲🇽 **En México (Transferencia o Depósito):**\n• **Titular Oficial:** Javier Alan Rodriguez Yescas\n• **Banco Nu:** \`5101 2586 6554 7429\`\n• **Bancoppel:** \`4169 1606 2471 2155\`\n\n💳 **Pagar con Mercado Pago (Enlaces Oficiales Exclusivos por Precio):**\n• **Productos de $300 MXN (Figma Pro / Netflix 12 Meses):** ${MERCADO_PAGO_LINKS[300]}\n• **Productos de $200 MXN (Disney premium 1 año completo / Disney 12 meses cuenta completa):** ${MERCADO_PAGO_LINKS[200]}\n• **7 Productos de $150 MXN (Coursera Plus, Google AI Pro / Gemini, CapCut Teams, Microsoft 365 Family, Eleven Reader, Mause AI y Duolingo Super Familiar):** ${MERCADO_PAGO_LINKS[150]}\n• **Producto de $100 MXN (iLovePDF Premium):** ${MERCADO_PAGO_LINKS[100]}\n\n🌎 **Internacional (Venezuela, Colombia u Otro País — Sin Comisiones):**\n• **Binance Pay (USDT):** ID \`453667986\` (o correo \`javieralanrodriguezyescas31@gmail.com\`)\n\n🚨 **REGLA ESTRICTA E INQUEBRANTABLE DEL CONCEPTO DE PAGO:**\nEn el concepto, nota o referencia debes escribir el **Nombre y Apellido de quien te recomendó**, o escribir únicamente la palabra **"pago"** si nadie te recomendó.\n**PROHIBIDO escribir nombres de productos o marcas** (como Figma, Coursera, Duolingo, cuenta, etc.). Si incumples esta regla, **se pierde el dinero sin reembolso ni entrega de cuenta**.`,
    affiliateRulesResponse: () =>
      `🤝 **PROGRAMA DE AFILIADOS / VENDEDORES (3 REGLAS ACUMULATIVAS):**\n\nNuestras **3 reglas son 100% acumulativas** y se suman entre sí al mismo tiempo:\n\n1️⃣ **Regla 1:** Por cada **3 Figma Pro** ($300 MXN / 17.00 USDT) vendidos → Ganas **1 cuenta Figma Pro GRATIS**.\n2️⃣ **Regla 2:** Por cada **6 productos de $150 MXN** (8.74 USDT) vendidos → Ganas **1 cuenta Figma Pro GRATIS**.\n3️⃣ **Regla 3:** Por cada **4 productos de $150 MXN** (8.74 USDT) vendidos → Ganas **1 cuenta de $150 MXN GRATIS**.\n\n✨ *¡Ejemplo oficial del simulador: con **3 Figma Pro y 12 cuentas base** ganas simultáneamente **1 Figma Pro** (Regla 1) + **2 Figma Pro** (Regla 2) + **3 cuentas de $150** (Regla 3) = **$1,350 MXN / $77.22 USDT** en premios gratis!*`,
    scheduleResponse: (days, start, end) =>
      `🕒 **HORARIO OFICIAL DE ATENCIÓN:**\n\n• **Días hábiles:** ${days} *(Domingos cerrado)*\n• **Horario:** ${start} a ${end}\n• **Zona Horaria:** Hora de **Hermosillo, Sonora** (UTC-7, sin horario de verano).\n\n¿Te gustaría agendar una cita dentro de este horario? Dime qué día y hora prefieres.`,
    greetingResponse: (days, start, end) =>
      `¡Hola! 👋 Bienvenido al **Asistente Inteligente Oficial** de Javier Alan Rodriguez Yescas.\n\nRespondo automáticamente en tu idioma y puedo ayudarte con:\n1. **Catálogo y precios** de los productos oficiales (MXN y USDT).\n2. **Datos de pago** (Banco Nu, Bancoppel, Mercado Pago y Binance Pay ID 453667986) y la **regla estricta del concepto**.\n3. **Programa de afiliados** (las 3 reglas acumulativas).\n4. **Agendar una cita** (${days}, ${start} a ${end} hora Hermosillo).\n\n¿Qué información deseas consultar?`,
    defaultHelpResponse: () =>
      `Gracias por tu mensaje 😊. Puedo brindarte información verificada sobre:\n\n• 📋 **El catálogo completo y precios** ($300 MXN Figma Pro / Netflix, $200 MXN Disney, $150 MXN los 7 productos base, $100 MXN ilove pdf).\n• 🏦 **Pagos con Mercado Pago, transferencia, Binance y regla estricta del concepto**.\n• ⭐ **Recomendaciones personalizadas** según tu perfil.\n• 🤝 **Las 3 reglas acumulativas de afiliados**.\n• 📅 **Agendar una cita** en horario de Hermosillo, Sonora.\n\nEscribe tu duda o dime qué producto te interesa.`,
  },

  en: {
    inactivityOffer: (days, start, end) =>
      `Hello! I see that **Javier** is currently assisting other clients and more than 3 minutes have passed 😊.\n\nTo respect your time and guarantee your delivery, I have activated the **Priority Appointment System**:\n• **Available days:** ${days} *(Closed on Sundays)*\n• **Hours (Hermosillo, Sonora):** ${start} to ${end}\n\nTo schedule, tell me your **name**, and what **day**, **time**, and **product/reason** you prefer.`,
    appointmentConfirmed: (day, time, reason) =>
      `✅ **Great! I have prepared your official appointment request:**\n\n• **Day:** ${day}\n• **Time:** ${time} (Hermosillo, Sonora Time)\n• **Reason / Product:** ${reason}\n\nClick the green button below to send and confirm your appointment directly on our official WhatsApp (**+52 662 180 5354**).`,
    appointmentAskDetails: (day, time, reason, days, start, end) => {
      const missing: string[] = [];
      if (!day) missing.push('the **day** (Monday to Saturday)');
      if (!time) missing.push(`the **time** (between ${start} and ${end}, Hermosillo time)`);
      if (!reason) missing.push('the **product or reason** for your appointment');
      return `📅 I would be happy to schedule your appointment!\n\nOur official business hours in **Hermosillo, Sonora** are:\n• **${days}** from **${start} to ${end}** *(Closed on Sundays)*.\n\nTo generate your direct WhatsApp ticket, please tell me ${missing.join(', ')}.\n\n*(Example: "I want an appointment on Tuesday at 4:00 PM for Figma Pro")*`;
    },
    singleProductInfo: (product, lang) => {
      const loc = getLocalizedProduct(product, lang);
      const durLine = loc.duration ? `\n• **Duration:** ${loc.duration}` : '';
      return `✨ **${loc.name}**\n${loc.description}\n${durLine}\n• **Price in Mexico:** $${product.priceMxn} MXN\n• **International Price (Crypto):** $${product.priceUsd.toFixed(2)} ${product.currencyType}${getMercadoPagoProductLine(product, lang)}\n• **Includes:** ${loc.highlights.join(', ')}\n\n⚠️ **Payment Reference Rule:** When paying via bank transfer or Binance, write the **first and last name of the person who referred you**, or only **"pago"** if no one referred you (never write "${loc.name}"). Would you like to buy it or book an appointment?`;
    },
    catalogResponse: (products, lang) => {
      const list = products
        .map((p, i) => {
          const loc = getLocalizedProduct(p, lang);
          const dur = loc.duration ? ` (${loc.duration})` : '';
          return `${i + 1}. **${loc.name}**${dur} — $${p.priceMxn} MXN / $${p.priceUsd.toFixed(2)} ${p.currencyType}`;
        })
        .join('\n');
      return `📋 **OFFICIAL CATALOG (${products.length} ACTIVE PRODUCTS):**\n\n${list}\n\n💳 *Official Mercado Pago Links by Exact Price:*\n• **$300 MXN / 17.00 USDT (Figma Pro 2 Years / Netflix Full Account 12 Months):** ${MERCADO_PAGO_LINKS[300]}\n• **$200 MXN / 11.66 USDT (Disney Full Account 12 Months):** ${MERCADO_PAGO_LINKS[200]}\n• **$150 MXN / 8.74 USDT (Coursera Plus 12m, Google AI Pro / Gemini 18m, CapCut Teams 25d, Microsoft 365 Family 12m, Eleven Reader 12m, Mause AI 31B, Duolingo Super Family, Granola Business 12m):** ${MERCADO_PAGO_LINKS[150]}\n• **$100 MXN / 5.83 USDT (iLovePDF Premium 12 Months):** ${MERCADO_PAGO_LINKS[100]}\n\nWhich of these products would you like to purchase or learn more about?`;
    },
    recommendationResponse: (userText) => buildContextualRecommendation(userText, 'en'),
    paymentConceptRuleResponse: () =>
      `🏦 **OFFICIAL PAYMENT METHODS & STRICT REFERENCE RULE:**\n\n🇲🇽 **In Mexico (Bank Transfer / Card):**\n• **Official Beneficiary:** Javier Alan Rodriguez Yescas\n• **Banco Nu:** \`5101 2586 6554 7429\`\n• **Bancoppel:** \`4169 1606 2471 2155\`\n\n💳 **Pay with Mercado Pago (Official Links by Exact Price):**\n• **$300 MXN (Figma Pro / Netflix 12 Months):** ${MERCADO_PAGO_LINKS[300]}\n• **$200 MXN (Disney+ Full 1 Year / Disney+ 12 Months Full Account):** ${MERCADO_PAGO_LINKS[200]}\n• **7 Products of $150 MXN (Coursera Plus, Google AI Pro / Gemini, CapCut Teams, Microsoft 365 Family, Eleven Reader, Mause AI, Duolingo Super Familiar):** ${MERCADO_PAGO_LINKS[150]}\n• **$100 MXN (iLovePDF Premium):** ${MERCADO_PAGO_LINKS[100]}\n\n🌎 **International (Venezuela, Colombia & Other Countries — Zero Fees):**\n• **Binance Pay (USDT):** ID \`453667986\` (or email \`javieralanrodriguezyescas31@gmail.com\`)\n\n🚨 **STRICT & UNBREAKABLE PAYMENT REFERENCE RULE:**\nIn the transfer reference/note field, write the **First and Last Name of the person who referred you**, or write only **"pago"** if no one referred you.\n**DO NOT write product or brand names** (such as Figma, Coursera, Duolingo, account, etc.). Violating this rule results in **forfeiture of funds with no refund and no account delivery**.`,
    affiliateRulesResponse: () =>
      `🤝 **AFFILIATES / SELLERS PROGRAM (3 CUMULATIVE RULES):**\n\nOur **3 rules are 100% cumulative** and add up simultaneously:\n\n1️⃣ **Rule 1:** For every **3 Figma Pro** ($300 MXN / 17.00 USDT) sold → You earn **1 FREE Figma Pro account**.\n2️⃣ **Rule 2:** For every **6 products of $150 MXN** (8.74 USDT) sold → You earn **1 FREE Figma Pro account**.\n3️⃣ **Rule 3:** For every **4 products of $150 MXN** (8.74 USDT) sold → You earn **1 FREE $150 MXN account**.\n\n✨ *Official simulator example: with **3 Figma Pro + 12 base accounts** sold, you earn **1 Figma Pro** (Rule 1) + **2 Figma Pro** (Rule 2) + **3 $150 accounts** (Rule 3) = **$1,350 MXN / $77.22 USDT** in free rewards!*`,
    scheduleResponse: (days, start, end) =>
      `🕒 **OFFICIAL BUSINESS HOURS:**\n\n• **Business Days:** ${days} *(Closed on Sundays)*\n• **Hours:** ${start} to ${end}\n• **Time Zone:** **Hermosillo, Sonora** time (UTC-7, no daylight saving time).\n\nWould you like to book an appointment during these hours? Let me know what day and time you prefer.`,
    greetingResponse: (days, start, end) =>
      `Hello! 👋 Welcome to the **Official Intelligent Assistant**.\n\nI automatically reply in your language and can help you with:\n1. **Catalog & prices** for all official products (MXN & USDT).\n2. **Payment methods** (Banco Nu, Bancoppel, Mercado Pago & Binance Pay ID 453667986) and the **strict payment reference rule**.\n3. **Affiliate program** (the 3 cumulative rules).\n4. **Booking an appointment** (${days}, ${start} to ${end} Hermosillo time).\n\nHow can I help you today?`,
    defaultHelpResponse: () =>
      `Thank you for your message 😊. I can provide verified information about:\n\n• 📋 **The full catalog & prices** ($300 MXN Figma Pro / Netflix, $200 MXN Disney+, $150 MXN for the 7 base products, $100 MXN iLovePDF).\n• 🏦 **Payments via Mercado Pago, bank transfer, Binance & the strict reference rule**.\n• ⭐ **Product recommendations** tailored to your needs.\n• 🤝 **The 3 cumulative affiliate rules**.\n• 📅 **Booking an appointment** in Hermosillo, Sonora time.\n\nType your question or let me know which product interests you.`,
  },

  pt: {
    inactivityOffer: (days, start, end) =>
      `Olá! Vejo que **Javier** está atendendo outros clientes e passaram mais de 3 minutos 😊.\n\nAtivei o sistema de **Agendamento Prioritário**:\n• **Dias disponíveis:** ${days} *(Fechado aos domingos)*\n• **Horário (Hermosillo, Sonora):** ${start} às ${end}\n\nPara agendar, diga seu **nome**, qual **dia**, **hora** e **produto/motivo** prefere.`,
    appointmentConfirmed: (day, time, reason) =>
      `✅ **Perfeito! Preparei sua solicitação de agendamento oficial:**\n\n• **Dia:** ${day}\n• **Hora:** ${time} (Horário de Hermosillo, Sonora)\n• **Motivo / Produto:** ${reason}\n\nClique no botão verde abaixo para enviar e confirmar seu agendamento diretamente no nosso WhatsApp oficial (**+52 662 180 5354**).`,
    appointmentAskDetails: (day, time, reason, days, start, end) => {
      const missing: string[] = [];
      if (!day) missing.push('o **dia** (Segunda a Sábado)');
      if (!time) missing.push(`a **hora** (entre ${start} e ${end}, horário de Hermosillo)`);
      if (!reason) missing.push('o **produto ou motivo** do atendimento');
      return `📅 Com prazer agendamos seu horário!\n\nNosso horário oficial em **Hermosillo, Sonora** é:\n• **${days}** das **${start} às ${end}** *(Fechado aos domingos)*.\n\nPara gerar seu ticket direto para o WhatsApp, informe ${missing.join(', ')}.`;
    },
    singleProductInfo: (product, lang) => {
      const loc = getLocalizedProduct(product, lang);
      const durLine = loc.duration ? `\n• **Duração:** ${loc.duration}` : '';
      return `✨ **${loc.name}**\n${loc.description}\n${durLine}\n• **Preço no México:** $${product.priceMxn} MXN\n• **Preço Internacional (Cripto):** $${product.priceUsd.toFixed(2)} ${product.currencyType}${getMercadoPagoProductLine(product, lang)}\n• **Inclui:** ${loc.highlights.join(', ')}\n\n⚠️ **Lembre-se da Regra do Conceito:** Na descrição da transferência ou Binance, coloque o **nome e sobrenome de quem indicou você**, ou apenas **"pago"** se ninguém indicou (nunca escreva "${loc.name}"). Deseja comprar ou agendar um horário?`;
    },
    catalogResponse: (products, lang) => {
      const list = products
        .map((p, i) => {
          const loc = getLocalizedProduct(p, lang);
          const dur = loc.duration ? ` (${loc.duration})` : '';
          return `${i + 1}. **${loc.name}**${dur} — $${p.priceMxn} MXN / $${p.priceUsd.toFixed(2)} ${p.currencyType}`;
        })
        .join('\n');
      return `📋 **CATÁLOGO OFICIAL (${products.length} PRODUTOS ATIVOS):**\n\n${list}\n\n💳 *Links oficiais do Mercado Pago por preço exato:*\n• **$300 MXN / 17.00 USDT (Figma Pro 2 Anos / Netflix Conta Completa 12 Meses):** ${MERCADO_PAGO_LINKS[300]}\n• **$200 MXN / 11.66 USDT (Disney Conta Completa 12 Meses):** ${MERCADO_PAGO_LINKS[200]}\n• **$150 MXN / 8.74 USDT (Coursera Plus 12m, Google AI Pro / Gemini 18m, CapCut Teams 25d, Microsoft 365 Family 12m, Eleven Reader 12m, Mause AI 31B, Duolingo Super Família, Granola Business 12m):** ${MERCADO_PAGO_LINKS[150]}\n• **$100 MXN / 5.83 USDT (iLovePDF Premium 12 Meses):** ${MERCADO_PAGO_LINKS[100]}\n\nQual destes produtos você deseja adquirir?`;
    },
    recommendationResponse: (userText) => buildContextualRecommendation(userText, 'pt'),
    paymentConceptRuleResponse: () =>
      `🏦 **MÉTODOS DE PAGAMENTO E REGRA ESTRITA DO CONCEITO:**\n\n🇲🇽 **No México (Transferência):**\n• **Beneficiário:** Javier Alan Rodriguez Yescas\n• **Banco Nu:** \`5101 2586 6554 7429\`\n• **Bancoppel:** \`4169 1606 2471 2155\`\n\n💳 **Pagar com Mercado Pago (Links Oficiais por Preço Exato):**\n• **$300 MXN (Figma Pro / Netflix 12 Meses):** ${MERCADO_PAGO_LINKS[300]}\n• **$200 MXN (Disney+ 1 Ano Completo / Disney+ 12 Meses Conta Completa):** ${MERCADO_PAGO_LINKS[200]}\n• **7 Produtos de $150 MXN (Coursera Plus, Google AI Pro / Gemini, CapCut Teams, Microsoft 365 Family, Eleven Reader, Mause AI e Duolingo Super Familiar):** ${MERCADO_PAGO_LINKS[150]}\n• **$100 MXN (iLovePDF Premium):** ${MERCADO_PAGO_LINKS[100]}\n\n🌎 **Internacional (Venezuela, Colômbia e Outros Países):**\n• **Binance Pay (USDT):** ID \`453667986\` (\`javieralanrodriguezyescas31@gmail.com\`)\n\n🚨 **REGRA ESTRITA DO CONCEITO DE PAGAMENTO:**\nNo conceito/nota da transferência coloque o **Nome e Sobrenome de quem indicou você**, ou apenas **"pago"** se ninguém indicou. **NÃO coloque nomes de produtos** (Figma, Coursera, etc.). Caso descumpra, **NÃO haverá reembolso nem entrega da conta**.`,
    affiliateRulesResponse: () =>
      `🤝 **PROGRAMA DE AFILIADOS / VENDEDORES (3 REGRAS CUMULATIVAS):**\n\nNossas **3 regras são 100% cumulativas** e somam-se simultaneamente:\n\n1️⃣ **Regra 1:** A cada **3 Figma Pro** ($300 MXN / 17.00 USDT) vendidos → Ganhe **1 conta Figma Pro GRÁTIS**.\n2️⃣ **Regra 2:** A cada **6 produtos de $150 MXN** (8.74 USDT) vendidos → Ganhe **1 conta Figma Pro GRÁTIS**.\n3️⃣ **Regra 3:** A cada **4 produtos de $150 MXN** (8.74 USDT) vendidos → Ganhe **1 conta de $150 MXN GRÁTIS**.\n\n✨ *Exemplo oficial: vendendo 3 Figma Pro e 12 contas de $150 MXN você ganha **1 Figma Pro** (Regra 1) + **2 Figma Pro** (Regra 2) + **3 contas de $150** (Regra 3) = **$1,350 MXN / $77.22 USDT**!*`,
    scheduleResponse: (days, start, end) =>
      `🕒 **HORÁRIO OFICIAL DE ATENDIMENTO:**\n\n• **Dias úteis:** ${days} *(Fechado aos domingos)*\n• **Horário:** ${start} às ${end}\n• **Fuso Horário:** **Hermosillo, Sonora** (UTC-7).\n\nDeseja agendar um horário? Diga qual dia e hora prefere.`,
    greetingResponse: (days, start, end) =>
      `Olá! 👋 Bem-vindo ao **Assistente Inteligente Oficial**.\n\nPosso ajudar no seu idioma com:\n1. **Catálogo e preços** dos produtos oficiais (MXN e USDT).\n2. **Formas de pagamento** (Banco Nu, Bancoppel, Mercado Pago e Binance ID 453667986) e a **regra estrita do conceito**.\n3. **Programa de afiliados** (3 regras cumulativas).\n4. **Agendar atendimento** (${days}, ${start} às ${end} hora Hermosillo).\n\nComo posso ajudar hoje?`,
    defaultHelpResponse: () =>
      `Obrigado pela mensagem 😊. Posso ajudar com:\n\n• 📋 **O catálogo completo e preços** ($300 MXN Figma Pro / Netflix, $200 MXN Disney+, $150 MXN os 7 produtos base, $100 MXN ilove pdf).\n• 🏦 **Pagamentos com Mercado Pago, transferência, Binance e regra do conceito**.\n• ⭐ **Recomendações** de acordo com o que você procura.\n• 🤝 **As 3 regras cumulativas de afiliados**.\n• 📅 **Agendar um horário** em Hermosillo, Sonora.\n\nDigite sua dúvida ou diga qual produto interessa a você.`,
  },

  fr: {
    inactivityOffer: (days, start, end) =>
      `Bonjour ! **Javier** est actuellement occupé avec d’autres clients 😊.\n\nSouhaitez-vous **prendre un rendez-vous prioritaire** sur WhatsApp ?\n• **Jours :** ${days} *(Fermé le dimanche)*\n• **Heures (Hermosillo) :** ${start} à ${end}\n\nIndiquez-moi votre **nom**, le **jour**, l’**heure** et le **produit/motif** souhaités.`,
    appointmentConfirmed: (day, time, reason) =>
      `✅ **Parfait ! J’ai préparé votre demande de rendez-vous officiel :**\n\n• **Jour :** ${day}\n• **Heure :** ${time} (Heure de Hermosillo, Sonora)\n• **Motif / Produit :** ${reason}\n\nCliquez sur le bouton vert ci-dessous pour confirmer votre RDV sur notre WhatsApp officiel (**+52 662 180 5354**).`,
    appointmentAskDetails: (day, time, reason, days, start, end) =>
      `📅 Avec plaisir pour planifier votre rendez-vous !\n\nNos horaires officiels à **Hermosillo, Sonora** sont :\n• **${days}** de **${start} à ${end}** *(Fermé le dimanche)*.\n\nVeuillez m’indiquer le **jour** (Lundi au Samedi), l’**heure** (${start} - ${end}) et le **produit ou motif**.`,
    singleProductInfo: (product, lang) => {
      const loc = getLocalizedProduct(product, lang);
      const durLine = loc.duration ? `\n• **Durée :** ${loc.duration}` : '';
      return `✨ **${loc.name}**\n${loc.description}\n${durLine}\n• **Prix au Mexique :** $${product.priceMxn} MXN\n• **Prix International (Crypto) :** $${product.priceUsd.toFixed(2)} ${product.currencyType}${getMercadoPagoProductLine(product, lang)}\n• **Inclus :** ${loc.highlights.join(', ')}\n\n⚠️ **Rappel :** Dans le motif du virement, indiquez le **nom et prénom de votre parrain**, ou uniquement **"pago"** (n’écrivez jamais "${loc.name}").`;
    },
    catalogResponse: (products, lang) => {
      const list = products
        .map((p, i) => {
          const loc = getLocalizedProduct(p, lang);
          const dur = loc.duration ? ` (${loc.duration})` : '';
          return `${i + 1}. **${loc.name}**${dur} — $${p.priceMxn} MXN / $${p.priceUsd.toFixed(2)} ${p.currencyType}`;
        })
        .join('\n');
      return `📋 **CATALOGUE OFFICIEL (${products.length} PRODUITS ACTIFS) :**\n\n${list}\n\n💳 *Liens officiels Mercado Pago par prix exact :*\n• **$300 MXN / 17.00 USDT (Figma Pro 2 Ans / Netflix Compte Complet 12 Mois) :** ${MERCADO_PAGO_LINKS[300]}\n• **$200 MXN / 11.66 USDT (Disney Compte Complet 12 Mois) :** ${MERCADO_PAGO_LINKS[200]}\n• **$150 MXN / 8.74 USDT (Coursera Plus 12m, Google AI Pro / Gemini 18m, CapCut Teams 25j, Microsoft 365 Family 12m, Eleven Reader 12m, Mause AI 31B, Duolingo Super Famille, Granola Business 12m) :** ${MERCADO_PAGO_LINKS[150]}\n• **$100 MXN / 5.83 USDT (iLovePDF Premium 12 Mois) :** ${MERCADO_PAGO_LINKS[100]}\n\nLequel de ces produits vous intéresse ?`;
    },
    recommendationResponse: (userText) => buildContextualRecommendation(userText, 'fr'),
    paymentConceptRuleResponse: () =>
      `🏦 **MOYENS DE PAIEMENT ET RÈGLE STRICTE DU MOTIF :**\n\n🇲🇽 **Au Mexique :**\n• **Bénéficiaire :** Javier Alan Rodriguez Yescas\n• **Banco Nu :** \`5101 2586 6554 7429\` | **Bancoppel :** \`4169 1606 2471 2155\`\n\n💳 **Payer avec Mercado Pago (Liens Officiels par Prix Exact) :**\n• **$300 MXN (Figma Pro / Netflix 12 Mois) :** ${MERCADO_PAGO_LINKS[300]}\n• **$200 MXN (Disney+ 1 An Complet / Disney+ 12 Mois Compte Complet) :** ${MERCADO_PAGO_LINKS[200]}\n• **7 Produits à $150 MXN (Coursera Plus, Google AI Pro / Gemini, CapCut Teams, Microsoft 365 Family, Eleven Reader, Mause AI et Duolingo Super Familiar) :** ${MERCADO_PAGO_LINKS[150]}\n• **$100 MXN (iLovePDF Premium) :** ${MERCADO_PAGO_LINKS[100]}\n\n🌎 **International (USDT sans frais) :**\n• **Binance Pay :** ID \`453667986\` (\`javieralanrodriguezyescas31@gmail.com\`)\n\n🚨 **RÈGLE STRICTE DU MOTIF DE PAIEMENT :**\nIndiquez le **Nom et Prénom de la personne qui vous a recommandé**, ou uniquement **"pago"** si personne ne vous a recommandé. **N’écrivez AUCUN nom de produit** (aucun remboursement en cas de non-respect).`,
    affiliateRulesResponse: () =>
      `🤝 **PROGRAMME D’AFFILIATION (3 RÈGLES CUMULATIVES) :**\n\nNos **3 règles sont 100 % cumulatives** et simultanées :\n\n1️⃣ **Règle 1 :** Pour **3 Figma Pro** ($300 MXN / 17.00 USDT) vendus → **1 compte Figma Pro GRATUIT**.\n2️⃣ **Règle 2 :** Pour **6 produits à $150 MXN** (8.74 USDT) vendus → **1 compte Figma Pro GRATUIT**.\n3️⃣ **Règle 3 :** Pour **4 produits à $150 MXN** (8.74 USDT) vendus → **1 compte à $150 MXN GRATUIT**.\n\n✨ *Avec 3 Figma Pro et 12 ventes à $150 MXN, vous gagnez **1 + 2 Figma Pro gratuits** + **3 comptes à $150 MXN gratuits** ($1,350 MXN / $77.22 USDT) !*`,
    scheduleResponse: (days, start, end) =>
      `🕒 **HORAIRES OFFICIELS :**\n\n• **Jours ouvrables :** ${days} *(Fermé le dimanche)*\n• **Heures :** ${start} à ${end} (Heure de Hermosillo, Sonora GMT-7).\n\nSouhaitez-vous prendre rendez-vous ?`,
    greetingResponse: (days, start, end) =>
      `Bonjour ! 👋 Bienvenue sur l’**Assistant Intelligent Officiel**.\n\nJe peux vous aider dans votre langue concernant :\n1. **Le catalogue et les tarifs** des produits officiels (MXN et USDT).\n2. **Les paiements** (Banco Nu, Bancoppel, Mercado Pago, Binance ID 453667986) et la règle stricte du motif.\n3. **Les 3 règles cumulatives d’affiliation**.\n4. **La prise de rendez-vous** (${days}, ${start} à ${end}).\n\nComment puis-je vous aider ?`,
    defaultHelpResponse: () =>
      `Merci pour votre message 😊. Je peux vous renseigner sur :\n• 📋 **Le catalogue complet et les tarifs** ($300 MXN Figma Pro / Netflix, $200 MXN Disney+, $150 MXN les 7 produits de base, $100 MXN iLovePDF).\n• 🏦 **Les paiements via Mercado Pago, virement, Binance et la règle du motif**.\n• ⭐ **Nos recommandations** personnalisées.\n• 🤝 **Les 3 règles cumulatives d’affiliation**.\n• 📅 **Prendre un rendez-vous**.\n\nQue souhaitez-vous savoir ?`,
  },

  de: {
    inactivityOffer: (days, start, end) =>
      `Möchten Sie einen **schnellen Termin** über WhatsApp vereinbaren? 😊\n\n📅 **Offizielle Zeiten (Hermosillo, Sonora):**\n• **${days}** von **${start} bis ${end}** *(Sonntags geschlossen)*.\n\nNennen Sie mir einfach Ihren gewünschten **Tag**, die **Uhrzeit** und das **Produkt**.`,
    appointmentConfirmed: (day, time, reason) =>
      `✅ **Perfekt! Ihre offizielle Terminanfrage ist bereit:**\n\n• **Tag:** ${day}\n• **Uhrzeit:** ${time} (Hermosillo-Zeit)\n• **Grund / Produkt:** ${reason}\n\nKlicken Sie unten auf den grünen Button, um den Termin per WhatsApp (**+52 662 180 5354**) zu bestätigen.`,
    appointmentAskDetails: (day, time, reason, days, start, end) =>
      `📅 Gerne vereinbaren wir Ihren Termin!\n\nUnsere Geschäftszeiten in **Hermosillo, Sonora**:\n• **${days}** von **${start} bis ${end}** *(Sonntags geschlossen)*.\n\nBitte nennen Sie mir **Tag** (Montag bis Samstag), **Uhrzeit** (${start} - ${end}) und **Produkt/Grund**.`,
    singleProductInfo: (product, lang) => {
      const loc = getLocalizedProduct(product, lang);
      return `✨ **${loc.name}**\n${loc.description}\n\n• **Preis in Mexiko:** $${product.priceMxn} MXN\n• **Internationaler Preis (Krypto):** $${product.priceUsd.toFixed(2)} ${product.currencyType}\n• **Enthält:** ${loc.highlights.join(', ')}\n\n⚠️ **Wichtig:** Geben Sie im Verwendungszweck den **Vor- und Nachnamen Ihres Empfehlers** oder nur **"pago"** an (niemals "${loc.name}").`;
    },
    catalogResponse: (products, lang) => {
      const list = products
        .map((p, i) => {
          const loc = getLocalizedProduct(p, lang);
          const dur = loc.duration ? ` (${loc.duration})` : '';
          return `${i + 1}. **${loc.name}**${dur} — $${p.priceMxn} MXN / $${p.priceUsd.toFixed(2)} ${p.currencyType}`;
        })
        .join('\n');
      return `📋 **OFFIZIELLER KATALOG (${products.length} PRODUKTE):**\n\n${list}\n\n💡 *Preisübersicht:*\n• **Figma Pro (.edu) / Netflix:** $300 MXN / 17.00 USDT\n• **Disney cuenta completa:** $200 MXN / 11.66 USDT\n• **ilove pdf premium 12 Monate:** $100 MXN / 5.83 USDT\n• **8 Produkte zu $150 MXN:** je $150 MXN / 8.74 USDT.\n\nWelches Produkt interessiert Sie?`;
    },
    paymentConceptRuleResponse: () =>
      `🏦 **ZAHLUNGSMETHODEN & STRENGE VERWENDUNGSZWECK-REGEL:**\n\n🇲🇽 **In Mexiko:**\n• **Empfänger:** Javier Alan Rodriguez Yescas\n• **Banco Nu:** \`5101 2586 6554 7429\` | **Bancoppel:** \`4169 1606 2471 2155\`\n\n🌎 **International (USDT):**\n• **Binance Pay ID:** \`453667986\` (\`javieralanrodriguezyescas31@gmail.com\`)\n\n🚨 **STRENGE REGEL:** Schreiben Sie in den Verwendungszweck den **Namen Ihres Empfehlers** oder nur **"pago"**. **KEINE Produktnamen** (sonst keine Rückerstattung und keine Lieferung).`,
    affiliateRulesResponse: () =>
      `🤝 **PARTNERPROGRAMM (3 KUMULATIVE REGELN):**\n\nAlle **3 Regeln sind 100 % kumulativ** und gelten gleichzeitig:\n1️⃣ **Regel 1:** Je **3 verkaufte Figma Pro** ($300 MXN / 17.00 USDT) → **1 Figma Pro GRATIS**.\n2️⃣ **Regel 2:** Je **6 verkaufte $150 MXN Produkte** (8.74 USDT) → **1 Figma Pro GRATIS**.\n3️⃣ **Regel 3:** Je **4 verkaufte $150 MXN Produkte** (8.74 USDT) → **1 $150 MXN Konto GRATIS**.\n\n✨ *Mit 3 Figma Pro und 12 Basisverkäufen erhalten Sie gleichzeitig **3 gratis Figma Pro** + **3 gratis $150 Konten** ($1,350 MXN / $77.22 USDT)!*`,
    scheduleResponse: (days, start, end) =>
      `🕒 **OFFIZIELLE ÖFFNUNGSZEITEN:**\n• **Tage:** ${days} *(Sonntags geschlossen)*\n• **Uhrzeit:** ${start} bis ${end} (Hermosillo GMT-7).\n\nMöchten Sie einen Termin buchen?`,
    greetingResponse: (days, start, end) =>
      `Hallo! 👋 Willkommen beim **Offiziellen KI-Assistenten**.\n\nIch helfe Ihnen auf Deutsch bei:\n1. **Katalog & Preisen** der 12 Produkte (MXN & USDT).\n2. **Zahlungsmethoden** & strenger Verwendungszweck-Regel.\n3. **Partnerprogramm** (3 kumulative Regeln).\n4. **Terminbuchung** (${days}, ${start} bis ${end}).`,
    defaultHelpResponse: () =>
      `Vielen Dank für Ihre Nachricht 😊. Fragen Sie mich gerne nach:\n• 📋 **Den 12 Katalogprodukten**\n• 🏦 **Zahlung & Verwendungszweck-Regel**\n• 🤝 **Den 3 Partnerregeln**\n• 📅 **Einer Terminbuchung**.`,
  },

  it: {
    inactivityOffer: (days, start, end) =>
      `Vuoi **prenotare un appuntamento rapido** su WhatsApp? 😊\n\n📅 **Orario Ufficiale (Hermosillo, Sonora):**\n• **${days}** dalle **${start} alle ${end}** *(Domenica chiuso)*.\n\nIndicami **giorno**, **ora** e **prodotto/motivo**.`,
    appointmentConfirmed: (day, time, reason) =>
      `✅ **Perfetto! Ho preparato la tua richiesta di appuntamento ufficiale:**\n\n• **Giorno:** ${day}\n• **Ora:** ${time} (Ora di Hermosillo)\n• **Motivo / Prodotto:** ${reason}\n\nClicca sul pulsante verde qui sotto per confermare su WhatsApp (**+52 662 180 5354**).`,
    appointmentAskDetails: (day, time, reason, days, start, end) =>
      `📅 Prenotiamo subito il tuo appuntamento!\n\nOrario ufficiale a **Hermosillo, Sonora**:\n• **${days}** dalle **${start} alle ${end}** *(Domenica chiuso)*.\n\nIndicami **giorno** (Lunedì-Sabato), **ora** (${start}-${end}) e **prodotto/motivo**.`,
    singleProductInfo: (product, lang) => {
      const loc = getLocalizedProduct(product, lang);
      return `✨ **${loc.name}**\n${loc.description}\n\n• **Prezzo in Messico:** $${product.priceMxn} MXN\n• **Prezzo Internazionale (Crypto):** $${product.priceUsd.toFixed(2)} ${product.currencyType}\n• **Include:** ${loc.highlights.join(', ')}\n\n⚠️ **Ricorda:** Nella causale del bonifico inserisci il **nome di chi ti ha raccomandato** o solo **"pago"** (mai scrivere "${loc.name}").`;
    },
    catalogResponse: (products, lang) => {
      const list = products
        .map((p, i) => {
          const loc = getLocalizedProduct(p, lang);
          const dur = loc.duration ? ` (${loc.duration})` : '';
          return `${i + 1}. **${loc.name}**${dur} — $${p.priceMxn} MXN / $${p.priceUsd.toFixed(2)} ${p.currencyType}`;
        })
        .join('\n');
      return `📋 **CATALOGO UFFICIALE DEI ${products.length} PRODOTTI:**\n\n${list}\n\n💡 *Riepilogo prezzi:*\n• **Figma Pro (.edu) / Netflix:** $300 MXN / 17.00 USDT\n• **Disney cuenta completa:** $200 MXN / 11.66 USDT\n• **ilove pdf premium 12 mesi:** $100 MXN / 5.83 USDT\n• **8 prodotti da $150 MXN:** $150 MXN / 8.74 USDT ciascuno.`;
    },
    paymentConceptRuleResponse: () =>
      `🏦 **METODI DI PAGAMENTO E REGOLA RIGIDA DELLA CAUSALE:**\n\n🇲🇽 **In Messico:**\n• **Beneficiario:** Javier Alan Rodriguez Yescas\n• **Banco Nu:** \`5101 2586 6554 7429\` | **Bancoppel:** \`4169 1606 2471 2155\`\n\n🌎 **Internazionale (USDT):**\n• **Binance Pay ID:** \`453667986\` (\`javieralanrodriguezyescas31@gmail.com\`)\n\n🚨 **REGOLA RIGIDA:** Nella causale inserisci il **nome di chi ti ha raccomandato** o solo **"pago"**. **NON scrivere nomi di prodotti** (nessun rimborso in caso di violazione).`,
    affiliateRulesResponse: () =>
      `🤝 **PROGRAMMA AFFILIATI (3 REGOLE CUMULATIVE):**\n\nLe **3 regole sono 100% cumulative** e simultanee:\n1️⃣ **Regola 1:** Ogni **3 Figma Pro** ($300 MXN / 17.00 USDT) venduti → **1 Figma Pro GRATIS**.\n2️⃣ **Regola 2:** Ogni **6 prodotti da $150 MXN** (8.74 USDT) venduti → **1 Figma Pro GRATIS**.\n3️⃣ **Regola 3:** Ogni **4 prodotti da $150 MXN** (8.74 USDT) venduti → **1 account da $150 MXN GRATIS**.\n\n✨ *Con 3 Figma Pro e 12 vendite base ottieni **3 Figma Pro gratis** + **3 account da $150 MXN gratis** ($1,350 MXN / $77.22 USDT)!*`,
    scheduleResponse: (days, start, end) =>
      `🕒 **ORARIO UFFICIALE:**\n• **Giorni lavorativi:** ${days} *(Domenica chiuso)*\n• **Orario:** dalle ${start} alle ${end} (Hermosillo GMT-7).`,
    greetingResponse: (days, start, end) =>
      `Ciao! 👋 Benvenuto nell’**Assistente Intelligente Ufficiale**.\n\nPosso aiutarti nella tua lingua con:\n1. **Catalogo e prezzi** dei 12 prodotti (MXN e USDT).\n2. **Pagamenti** e regola rigida della causale.\n3. **Programma affiliati** (3 regole cumulative).\n4. **Prenotazione appuntamenti** (${days}, ${start} - ${end}).`,
    defaultHelpResponse: () =>
      `Grazie per il messaggio 😊. Chiedimi pure informazioni su **Catalogo (12 prodotti)**, **Pagamenti**, **3 Regole Affiliati** o **Appuntamenti**.`,
  },

  zh: {
    inactivityOffer: (days, start, end) =>
      `您好！**Javier** 目前正在接待其他客户，已超过 3 分钟未能亲自回复您 😊。\n\n我已为您开启**优先预约系统**：\n• **营业日：** ${days} *(周日休息)*\n• **时间（埃莫西约）：** ${start} 至 ${end}\n\n如需预约，请告诉我您的**姓名**、**日期**、**时间**和**产品/事由**。`,
    appointmentConfirmed: (day, time, reason) =>
      `✅ **太好了！我已经为您准备好官方预约申请：**\n\n• **日期：** ${day}\n• **时间：** ${time}（埃莫西约时间 GMT-7）\n• **事由 / 产品：** ${reason}\n\n请点击下方的绿色按钮，直接发送至我们的官方 WhatsApp (**+52 662 180 5354**) 确认预约。`,
    appointmentAskDetails: (day, time, reason, days, start, end) =>
      `📅 很高兴为您安排预约！\n\n我们在**索诺拉州埃莫西约**的官方营业时间为：\n• **${days}** **${start} 至 ${end}** *(周日休息)*。\n\n请告诉我您希望预约的**日期**（周一至周六）、**时间**（${start} - ${end}）以及**产品或事由**。`,
    singleProductInfo: (product, lang) => {
      const loc = getLocalizedProduct(product, lang);
      return `✨ **${loc.name}**\n${loc.description}\n\n• **墨西哥价格：** $${product.priceMxn} MXN\n• **国际价格（加密货币）：** $${product.priceUsd.toFixed(2)} ${product.currencyType}\n• **包含内容：** ${loc.highlights.join('、')}\n\n⚠️ **重要提醒：** 转账或 Binance 付款时，付款备注栏请填写**推荐人的姓名**，若无推荐人请仅填写 **"pago"**（严禁填写“${loc.name}”）。请问您想购买还是预约咨询？`;
    },
    catalogResponse: (products, lang) => {
      const list = products
        .map((p, i) => {
          const loc = getLocalizedProduct(p, lang);
          const dur = loc.duration ? ` (${loc.duration})` : '';
          return `${i + 1}. **${loc.name}**${dur} — $${p.priceMxn} MXN / $${p.priceUsd.toFixed(2)} ${p.currencyType}`;
        })
        .join('\n');
      return `📋 **12 款官方产品目录：**\n\n${list}\n\n💡 *价格速览：*\n• **Figma Pro (.edu) / Netflix：** $300 MXN / 17.00 USDT\n• **Disney cuenta completa：** $200 MXN / 11.66 USDT\n• **ilove pdf premium 12个月：** $100 MXN / 5.83 USDT\n• **8 款 $150 MXN 产品：** 每款 $150 MXN / 8.74 USDT。\n\n请问您对哪款产品感兴趣？`;
    },
    paymentConceptRuleResponse: () =>
      `🏦 **支付方式与严格付款备注规则：**\n\n🇲🇽 **墨西哥境内（银行转账）：**\n• **官方收款人：** Javier Alan Rodriguez Yescas\n• **Banco Nu：** \`5101 2586 6554 7429\`\n• **Bancoppel：** \`4169 1606 2471 2155\`\n\n🌎 **国际支付（USDT 免手续费）：**\n• **Binance Pay ID：** \`453667986\`（邮箱 \`javieralanrodriguezyescas31@gmail.com\`）\n\n🚨 **严格的付款备注规则：**\n在转账备注中必须填写**推荐人的姓名**，如果没有推荐人则仅填写 **"pago"**。**严禁填写任何产品或品牌名称**（如 Figma、Coursera 等），违规将**不予退款且不予发货**。`,
    affiliateRulesResponse: () =>
      `🤝 **联盟伙伴 / 销售计划（3 条可累加规则）：**\n\n我们的 **3 条规则 100% 同时累加生效**：\n\n1️⃣ **规则 1：** 每售出 **3 个 Figma Pro** ($300 MXN / 17.00 USDT) → 免费获得 **1 个 Figma Pro 账户**。\n2️⃣ **规则 2：** 每售出 **6 个 $150 MXN 产品** (8.74 USDT) → 免费获得 **1 个 Figma Pro 账户**。\n3️⃣ **规则 3：** 每售出 **4 个 $150 MXN 产品** (8.74 USDT) → 免费获得 **1 个 $150 MXN 账户**。\n\n✨ *官方模拟器示例：售出 3 个 Figma Pro 和 12 个基础账户，可同时获得 **1 + 2 个免费 Figma Pro** + **3 个免费 $150 MXN 账户**（总价值 **$1,350 MXN / $77.22 USDT**）！*`,
    scheduleResponse: (days, start, end) =>
      `🕒 **官方营业时间：**\n\n• **营业日：** ${days} *(周日休息)*\n• **时间：** ${start} 至 ${end}\n• **时区：** **索诺拉州埃莫西约时间** (UTC-7，无夏令时)。\n\n您需要预约这段时间的客服吗？`,
    greetingResponse: (days, start, end) =>
      `您好！👋 欢迎使用**官方智能助手**。\n\n我可以使用中文为您提供以下帮助：\n1. **12 款官方产品目录与价格**（MXN 与 USDT）。\n2. **支付方式**（Banco Nu、Bancoppel、Binance ID 453667986）与**严格的备注规则**。\n3. **联盟计划**（3 条可累加奖励规则）。\n4. **预约服务**（${days}，${start} 至 ${end} 埃莫西约时间）。\n\n请问您需要了解哪方面的信息？`,
    defaultHelpResponse: () =>
      `感谢您的留言 😊。我可以为您解答：\n• 📋 **12 款官方产品目录与价格**\n• 🏦 **支付方式与备注规则**\n• 🤝 **3 条可累加联盟奖励规则**\n• 📅 **按埃莫西约时间预约专属客服**。\n\n请直接输入您的问题！`,
  },

  ja: {
    inactivityOffer: (days, start, end) =>
      `ご覧いただきありがとうございます 😊。現在 **Javier** が他のお客様を対応中のため、**優先予約システム**をご案内いたします：\n\n📅 **公式営業時間（ソノラ州エルモシージョ）：**\n• **${days}** **${start} 〜 ${end}** *(日曜定休)*\n\nご希望の**お名前**、**曜日**、**時間**、**商品/用件**をお知らせください。`,
    appointmentConfirmed: (day, time, reason) =>
      `✅ **ありがとうございます！公式予約リクエストを作成しました：**\n\n• **曜日：** ${day}\n• **時間：** ${time}（エルモシージョ時間 GMT-7）\n• **用件 / 商品：** ${reason}\n\n下の緑色のボタンをクリックして、公式WhatsApp (**+52 662 180 5354**) で予約を確定してください。`,
    appointmentAskDetails: (day, time, reason, days, start, end) =>
      `📅 喜んで予約を承ります！\n\n**エルモシージョ（ソノラ州）**の公式営業時間：\n• **${days}** **${start} 〜 ${end}** *(日曜定休)*\n\nご希望の**曜日**（月曜〜土曜）、**時間**（${start}〜${end}）、および**商品または用件**をお知らせください。`,
    singleProductInfo: (product, lang) => {
      const loc = getLocalizedProduct(product, lang);
      return `✨ **${loc.name}**\n${loc.description}\n\n• **メキシコ国内価格：** $${product.priceMxn} MXN\n• **海外価格（仮想通貨）：** $${product.priceUsd.toFixed(2)} ${product.currencyType}\n• **内容：** ${loc.highlights.join('、')}\n\n⚠️ **重要：** 振込やBinanceの備考欄には**紹介者の氏名**、紹介者がいない場合は **"pago"** のみをご記入ください（"${loc.name}" などの商品名は絶対に書かないでください）。`;
    },
    catalogResponse: (products, lang) => {
      const list = products
        .map((p, i) => {
          const loc = getLocalizedProduct(p, lang);
          const dur = loc.duration ? ` (${loc.duration})` : '';
          return `${i + 1}. **${loc.name}**${dur} — $${p.priceMxn} MXN / $${p.priceUsd.toFixed(2)} ${p.currencyType}`;
        })
        .join('\n');
      return `📋 **公式12商品カタログ：**\n\n${list}\n\n💡 *価格概要：*\n• **Figma Pro (.edu) / Netflix：** $300 MXN / 17.00 USDT\n• **Disney cuenta completa：** $200 MXN / 11.66 USDT\n• **ilove pdf premium 12ヶ月：** $100 MXN / 5.83 USDT\n• **8つの $150 MXN 商品：** 各 $150 MXN / 8.74 USDT。\n\nどの商品をご希望ですか？`;
    },
    paymentConceptRuleResponse: () =>
      `🏦 **お支払い方法と振込備考欄の厳格なルール：**\n\n🇲🇽 **メキシコ国内：**\n• **受取人：** Javier Alan Rodriguez Yescas\n• **Banco Nu：** \`5101 2586 6554 7429\` | **Bancoppel：** \`4169 1606 2471 2155\`\n\n🌎 **海外決済（USDT）：**\n• **Binance Pay ID：** \`453667986\` (\`javieralanrodriguezyescas31@gmail.com\`)\n\n🚨 **厳格なルール：**\n備考・参照欄には**紹介者の氏名**、または紹介者がいない場合は **"pago"** のみをご記入ください。**商品名やブランド名は絶対に記入しないでください**（違反時は返金・納品不可）。`,
    affiliateRulesResponse: () =>
      `🤝 **アフィリエイトプログラム（3つの累積ルール）：**\n\n**3つのルールは100%同時に累積**されます：\n1️⃣ **ルール1：** **Figma Pro** ($300 MXN / 17.00 USDT) を**3本**販売するごとに → **Figma Pro 1アカウント無料**。\n2️⃣ **ルール2：** **$150 MXNの商品** (8.74 USDT) を**6本**販売するごとに → **Figma Pro 1アカウント無料**。\n3️⃣ **ルール3：** **$150 MXNの商品** (8.74 USDT) を**4本**販売するごとに → **$150 MXNのアカウント1つ無料**。\n\n✨ *Figma Pro 3本＋基本商品12本販売で、**無料Figma Pro 3つ**＋**無料$150アカウント 3つ**（計 **$1,350 MXN / $77.22 USDT**）を獲得できます！*`,
    scheduleResponse: (days, start, end) =>
      `🕒 **公式営業時間：**\n• **営業日：** ${days} *(日曜定休)*\n• **時間：** ${start} 〜 ${end}（エルモシージョ時間 GMT-7）。`,
    greetingResponse: (days, start, end) =>
      `こんにちは！👋 **公式AIアシスタント**へようこそ。\n\n日本語で以下のご案内が可能です：\n1. **全12商品のカタログと価格**（MXN / USDT）\n2. **お支払い方法**と振込備考欄の厳格なルール\n3. **3つの累積アフィリエイトルール**\n4. **予約の手配**（${days} ${start}〜${end}）\n\nどのようなご用件でしょうか？`,
    defaultHelpResponse: () =>
      `メッセージありがとうございます 😊。**12商品のカタログ**、**お支払いルール**、**3つのアフィリエイトルール**、または**予約**についてお気軽にご質問ください。`,
  },

  ko: {
    inactivityOffer: (days, start, end) =>
      `잠시 정보를 둘러보고 계시네요 😊. WhatsApp을 통해 1:1 안내를 받을 수 있도록 **우선 상담 예약**을 진행해 드릴까요?\n\n📅 **공식 운영 시간 (소노라주 에르모시요):**\n• **${days}** **${start} ~ ${end}** *(일요일 휴무)*\n\n원하시는 **요일**, **시간**, **제품/사유**를 알려주세요.`,
    appointmentConfirmed: (day, time, reason) =>
      `✅ **좋습니다! 공식 상담 예약 요청을 준비했습니다:**\n\n• **요일:** ${day}\n• **시간:** ${time} (에르모시요 시간 GMT-7)\n• **사유 / 제품:** ${reason}\n\n아래 초록색 버튼을 클릭하여 공식 WhatsApp (**+52 662 180 5354**)으로 예약을 확정하세요.`,
    appointmentAskDetails: (day, time, reason, days, start, end) =>
      `📅 기꺼이 상담 예약을 도와드리겠습니다!\n\n**에르모시요(소노라)** 공식 운영 시간:\n• **${days}** **${start} ~ ${end}** *(일요일 휴무)*\n\n원하시는 **요일**(월~토), **시간**(${start}~${end}) 및 **관심 제품**을 알려주세요.`,
    singleProductInfo: (product, lang) => {
      const loc = getLocalizedProduct(product, lang);
      return `✨ **${loc.name}**\n${loc.description}\n\n• **멕시코 가격:** $${product.priceMxn} MXN\n• **해외 가격 (암호화폐):** $${product.priceUsd.toFixed(2)} ${product.currencyType}\n• **포함 사항:** ${loc.highlights.join(', ')}\n\n⚠️ **중요:** 이체 메모란에는 **추천인 성함** 또는 추천인이 없을 경우 **"pago"**만 적으세요 ("${loc.name}" 등 제품명 절대 기재 금지).`;
    },
    catalogResponse: (products, lang) => {
      const list = products
        .map((p, i) => {
          const loc = getLocalizedProduct(p, lang);
          const dur = loc.duration ? ` (${loc.duration})` : '';
          return `${i + 1}. **${loc.name}**${dur} — $${p.priceMxn} MXN / $${p.priceUsd.toFixed(2)} ${p.currencyType}`;
        })
        .join('\n');
      return `📋 **공식 12개 제품 카탈로그:**\n\n${list}\n\n💡 *가격 요약:*\n• **Figma Pro (.edu) / Netflix:** $300 MXN / 17.00 USDT\n• **Disney cuenta completa:** $200 MXN / 11.66 USDT\n• **ilove pdf premium 12개월:** $100 MXN / 5.83 USDT\n• **$150 MXN 8개 제품:** 각 $150 MXN / 8.74 USDT.\n\n어떤 제품에 관심이 있으신가요?`;
    },
    paymentConceptRuleResponse: () =>
      `🏦 **결제 방법 및 엄격한 입금 메모 규칙:**\n\n🇲🇽 **멕시코 국내:**\n• **수취인:** Javier Alan Rodriguez Yescas\n• **Banco Nu:** \`5101 2586 6554 7429\` | **Bancoppel:** \`4169 1606 2471 2155\`\n\n🌎 **해외 결제 (USDT):**\n• **Binance Pay ID:** \`453667986\` (\`javieralanrodriguezyescas31@gmail.com\`)\n\n🚨 **엄격한 입금 메모 규칙:**\n이체 메모란에는 반드시 **추천인 성함** 또는 **"pago"**만 입력해야 합니다. **제품명이나 브랜드명을 절대 적지 마세요** (위반 시 환불 불가 및 계정 전달 불가).`,
    affiliateRulesResponse: () =>
      `🤝 **제휴 / 판매자 프로그램 (3가지 누적 규칙):**\n\n저희 **3가지 규칙은 100% 동시에 누적**됩니다:\n1️⃣ **규칙 1:** **Figma Pro** ($300 MXN / 17.00 USDT) **3개 판매 시마다** → **Figma Pro 1계정 무료**.\n2️⃣ **규칙 2:** **$150 MXN 제품** (8.74 USDT) **6개 판매 시마다** → **Figma Pro 1계정 무료**.\n3️⃣ **규칙 3:** **$150 MXN 제품** (8.74 USDT) **4개 판매 시마다** → **$150 MXN 계정 1개 무료**.\n\n✨ *Figma Pro 3개 + 기본 계정 12개 판매 시 **무료 Figma Pro 3개** + **무료 $150 계정 3개** ($1,350 MXN / $77.22 USDT)를 모두 받게 됩니다!*`,
    scheduleResponse: (days, start, end) =>
      `🕒 **공식 상담 시간:**\n• **영업일:** ${days} *(일요일 휴무)*\n• **시간:** ${start} ~ ${end} (에르모시요 시간 GMT-7).`,
    greetingResponse: (days, start, end) =>
      `안녕하세요! 👋 **공식 지능형 AI 어시스턴트**입니다.\n\n한국어로 다음 안내를 도와드립니다:\n1. **12개 공식 제품 카탈로그 및 가격** (MXN 및 USDT)\n2. **결제 방법** 및 엄격한 은행 입금 메모 규칙\n3. **3가지 누적 제휴 규칙**\n4. **상담 예약** (${days}, ${start} ~ ${end})\n\n무엇을 도와드릴까요?`,
    defaultHelpResponse: () =>
      `메시지 감사합니다 😊. **12개 제품 카탈로그**, **결제 및 입금 메모 규칙**, **3가지 제휴 규칙**, 또는 **상담 예약**에 대해 질문해 주세요.`,
  },

  ar: {
    inactivityOffer: (days, start, end) =>
      `مرحباً! نلاحظ أن **Javier** يخدم عملاء آخرين حالياً 😊.\n\nهل ترغب في **حجز موعد ذو أولوية** عبر واتساب؟\n\n📅 **ساعات العمل الرسمية (هيرموسيلو، سونورا):**\n• **${days}** من **${start} إلى ${end}** *(مغلق يوم الأحد)*.\n\nللحجز، أخبرني **باليوم**، **الوقت**، و**المنتج أو السبب** المفضل لديك.`,
    appointmentConfirmed: (day, time, reason) =>
      `✅ **ممتاز! لقد قمت بتجهيز طلب موعدك الرسمي:**\n\n• **اليوم:** ${day}\n• **الوقت:** ${time} (بتوقيت هيرموسيلو، سونورا)\n• **السبب / المنتج:** ${reason}\n\nاضغط على الزر الأخضر أدناه لإرسال وتأكيد موعدك مباشرة عبر واتساب الرسمي (**+52 662 180 5354**).`,
    appointmentAskDetails: (day, time, reason, days, start, end) =>
      `📅 يسعدنا جداً حجز موعدك!\n\nساعات العمل الرسمية لدينا في **هيرموسيلو، سونورا** هي:\n• **${days}** من **${start} إلى ${end}** *(مغلق يوم الأحد)*.\n\nيرجى تزويدي **باليوم** (من الاثنين إلى السبت)، **الوقت** (${start} - ${end})، و**المنتج أو سبب الموعد**.`,
    singleProductInfo: (product, lang) => {
      const loc = getLocalizedProduct(product, lang);
      return `✨ **${loc.name}**\n${loc.description}\n\n• **السعر في المكسيك:** $${product.priceMxn} MXN\n• **السعر الدولي (عملات رقمية):** $${product.priceUsd.toFixed(2)} ${product.currencyType}\n• **يشمل:** ${loc.highlights.join('، ')}\n\n⚠️ **تذكر:** عند الدفع، اكتب **اسم الشخص الذي أوصاك** أو كلمة **"pago"** فقط في خانة البيان (لا تكتب أبداً "${loc.name}"). هل ترغب في شرائه أو حجز موعد؟`;
    },
    catalogResponse: (products, lang) => {
      const list = products
        .map((p, i) => {
          const loc = getLocalizedProduct(p, lang);
          const dur = loc.duration ? ` (${loc.duration})` : '';
          return `${i + 1}. **${loc.name}**${dur} — $${p.priceMxn} MXN / $${p.priceUsd.toFixed(2)} ${p.currencyType}`;
        })
        .join('\n');
      return `📋 **الكتالوج الرسمي المكون من 12 منتجاً:**\n\n${list}\n\n💡 *ملخص سريع للأسعار:*\n• **Figma Pro (.edu) / Netflix:** $300 MXN / 17.00 USDT\n• **Disney cuenta completa:** $200 MXN / 11.66 USDT\n• **ilove pdf premium لمدة 12 شهراً:** $100 MXN / 5.83 USDT\n• **8 منتجات بقيمة $150 MXN:** $150 MXN / 8.74 USDT لكل منتج.\n\nأي منتج تود الحصول عليه؟`;
    },
    paymentConceptRuleResponse: () =>
      `🏦 **طرق الدفع والقاعدة الصارمة لبيان التحويل:**\n\n🇲🇽 **في المكسيك:**\n• **المستفيد:** Javier Alan Rodriguez Yescas\n• **Banco Nu:** \`5101 2586 6554 7429\` | **Bancoppel:** \`4169 1606 2471 2155\`\n\n🌎 **دولياً (USDT بدون عمولة):**\n• **Binance Pay ID:** \`453667986\` (\`javieralanrodriguezyescas31@gmail.com\`)\n\n🚨 **قاعدة صارمة لبيان الدفع:**\nفي خانة البيان/الملاحظة، يجب كتابة **اسم ولقب الشخص الذي أوصاك** أو كلمة **"pago"** فقط. **يُمنع منعاً باتاً كتابة أسماء المنتجات** (مثل Figma أو Coursera)، وفي حال المخالفة **لن يتم استرداد المبلغ ولن يتم تسليم الحساب**.`,
    affiliateRulesResponse: () =>
      `🤝 **برنامج المسوقين بالعمولة (3 قواعد تراكمية):**\n\nقواعدنا **الثلاث تراكمية بنسبة 100%** وتُحسب معاً في نفس الوقت:\n1️⃣ **القاعدة 1:** لكل **3 مبيعات Figma Pro** ($300 MXN / 17.00 USDT) ← تربح **حساب Figma Pro مجاناً**.\n2️⃣ **القاعدة 2:** لكل **6 مبيعات من فئة $150 MXN** (8.74 USDT) ← تربح **حساب Figma Pro مجاناً**.\n3️⃣ **القاعدة 3:** لكل **4 مبيعات من فئة $150 MXN** (8.74 USDT) ← تربح **حساب بقيمة $150 MXN مجاناً**.\n\n✨ *مثال المحاكي الرسمي: عند بيع 3 Figma Pro و12 حساباً أساسياً تربح **3 حسابات Figma Pro مجانية** + **3 حسابات بقيمة $150 مجانية** ($1,350 MXN / $77.22 USDT)!*`,
    scheduleResponse: (days, start, end) =>
      `🕒 **ساعات العمل الرسمية:**\n• **أيام العمل:** ${days} *(مغلق يوم الأحد)*\n• **الأوقات:** من ${start} إلى ${end} (بتوقيت هيرموسيلو GMT-7).`,
    greetingResponse: (days, start, end) =>
      `مرحباً بك! 👋 أنا **المساعد الذكي الرسمي**.\n\nأتحدث بلغتك تلقائياً ويمكنني مساعدتك في:\n1. **كتالوج وأسعار المنتجات الـ 12 الرسمية** (MXN و USDT).\n2. **طرق الدفع** والقاعدة الصارمة لبيان التحويل.\n3. **برنامج المسوقين بالعمولة** (3 قواعد تراكمية).\n4. **حجز موعد رسمي** (${days}، من ${start} إلى ${end}).\n\nكيف يمكنني مساعدتك اليوم؟`,
    defaultHelpResponse: () =>
      `شكراً لرسالتك 😊. يمكنني تزويدك بمعلومات دقيقة حول **المنتجات الـ 12**، **طرق الدفع**، **القواعد التراكمية الـ 3 للمسوقين**، أو **حجز موعد**.`,
  },

  hi: {
    inactivityOffer: (days, start, end) =>
      `नमस्ते! क्या आप WhatsApp पर व्यक्तिगत सहायता के लिए **त्वरित अपॉइंटमेंट बुक** करना चाहेंगे? 😊\n\n📅 **आधिकारिक समय (हर्मोसिलो, सोनोरा):**\n• **${days}** **${start} से ${end}** *(रविवार बंद)*।\n\nकृपया अपना पसंदीदा **दिन**, **समय** और **उत्पाद** बताएं।`,
    appointmentConfirmed: (day, time, reason) =>
      `✅ **बहुत बढ़िया! मैंने आपका आधिकारिक अपॉइंटमेंट अनुरोध तैयार कर लिया है:**\n\n• **दिन:** ${day}\n• **समय:** ${time} (हर्मोसिलो समय GMT-7)\n• **कारण / उत्पाद:** ${reason}\n\nहमारे आधिकारिक WhatsApp (**+52 662 180 5354**) पर पुष्टि करने के लिए नीचे दिए गए हरे बटन पर क्लिक करें।`,
    appointmentAskDetails: (day, time, reason, days, start, end) =>
      `📅 हम खुशी से आपका अपॉइंटमेंट बुक करेंगे!\n\n**हर्मोसिलो, सोनोरा** में हमारा समय:\n• **${days}** **${start} से ${end}** *(रविवार बंद)*।\n\nकृपया **दिन** (सोमवार-शनिवार), **समय** (${start}-${end}) और **उत्पाद/कारण** बताएं।`,
    singleProductInfo: (product, lang) => {
      const loc = getLocalizedProduct(product, lang);
      return `✨ **${loc.name}**\n${loc.description}\n\n• **मेक्सिको मूल्य:** $${product.priceMxn} MXN\n• **अंतर्राष्ट्रीय मूल्य (क्रिप्टो):** $${product.priceUsd.toFixed(2)} ${product.currencyType}\n• **शामिल है:** ${loc.highlights.join(', ')}\n\n⚠️ **महत्वपूर्ण नियम:** भुगतान विवरण/रेफरेंस में **केवल सिफारिश करने वाले का नाम** या **"pago"** लिखें (कभी भी "${loc.name}" न लिखें)।`;
    },
    catalogResponse: (products, lang) => {
      const list = products
        .map((p, i) => {
          const loc = getLocalizedProduct(p, lang);
          const dur = loc.duration ? ` (${loc.duration})` : '';
          return `${i + 1}. **${loc.name}**${dur} — $${p.priceMxn} MXN / $${p.priceUsd.toFixed(2)} ${p.currencyType}`;
        })
        .join('\n');
      return `📋 **आधिकारिक 12-उत्पाद कैटलॉग:**\n\n${list}\n\n💡 *मूल्य सारांश:*\n• **Figma Pro (.edu) / Netflix:** $300 MXN / 17.00 USDT\n• **Disney cuenta completa:** $200 MXN / 11.66 USDT\n• **ilove pdf premium 12 महीने:** $100 MXN / 5.83 USDT\n• **8 ($150 MXN) उत्पाद:** $150 MXN / 8.74 USDT प्रत्येक।`;
    },
    paymentConceptRuleResponse: () =>
      `🏦 **भुगतान के तरीके और सख्त रेफरेंस नियम:**\n\n🇲🇽 **मेक्सिको में:**\n• **लाभार्थी:** Javier Alan Rodriguez Yescas\n• **Banco Nu:** \`5101 2586 6554 7429\` | **Bancoppel:** \`4169 1606 2471 2155\`\n\n🌎 **अंतर्राष्ट्रीय (USDT):**\n• **Binance Pay ID:** \`453667986\` (\`javieralanrodriguezyescas31@gmail.com\`)\n\n🚨 **सख्त नियम:** भुगतान रेफरेंस में **सिफारिश करने वाले का नाम** या केवल **"pago"** लिखें। **किसी भी उत्पाद का नाम न लिखें** (उल्लंघन करने पर कोई रिफंड या खाता नहीं दिया जाएगा)।`,
    affiliateRulesResponse: () =>
      `🤝 **एफिलिएट प्रोग्राम (3 संचयी नियम):**\n\nहमारे **तीनों नियम 100% संचयी हैं** और एक साथ जुड़ते हैं:\n1️⃣ **नियम 1:** हर **3 Figma Pro** ($300 MXN / 17.00 USDT) बेचने पर → **1 Figma Pro खाता मुफ़्त**।\n2️⃣ **नियम 2:** हर **6 ($150 MXN) उत्पाद** (8.74 USDT) बेचने पर → **1 Figma Pro खाता मुफ़्त**।\n3️⃣ **नियम 3:** हर **4 ($150 MXN) उत्पाद** (8.74 USDT) बेचने पर → **1 ($150 MXN) खाता मुफ़्त**।\n\n✨ *3 Figma Pro और 12 बेस खाते बेचने पर आपको एक साथ **3 मुफ़्त Figma Pro** + **3 मुफ़्त $150 खाते** ($1,350 MXN / $77.22 USDT) मिलते हैं!*`,
    scheduleResponse: (days, start, end) =>
      `🕒 **आधिकारिक कार्य समय:**\n• **कार्य दिवस:** ${days} *(रविवार बंद)*\n• **समय:** ${start} से ${end} (हर्मोसिलो समय GMT-7)।`,
    greetingResponse: (days, start, end) =>
      `नमस्ते! 👋 **आधिकारिक एआई सहायक** में आपका स्वागत है।\n\nमैं आपकी भाषा में सहायता कर सकता हूँ:\n1. **12 आधिकारिक उत्पादों का कैटलॉग और कीमतें** (MXN और USDT)\n2. **भुगतान के तरीके** और सख्त रेफरेंस नियम\n3. **3 संचयी एफिलिएट नियम**\n4. **अपॉइंटमेंट बुकिंग** (${days}, ${start} - ${end})`,
    defaultHelpResponse: () =>
      `आपके संदेश के लिए धन्यवाद 😊। आप मुझसे **12 उत्पादों के कैटलॉग**, **भुगतान नियम**, **3 एफिलिएट नियमों**, या **अपॉइंटमेंट** के बारे में पूछ सकते हैं।`,
  },

  ru: {
    inactivityOffer: (days, start, end) =>
      `Здравствуйте! Хотите **быстро записаться на консультацию** в WhatsApp? 😊\n\n📅 **Официальные часы работы (Эрмосильо, Сонора):**\n• **${days}** с **${start} до ${end}** *(Воскресенье — выходной)*.\n\nНапишите удобный **день**, **время** и **продукт/вопрос**.`,
    appointmentConfirmed: (day, time, reason) =>
      `✅ **Отлично! Ваша заявка на официальную встречу готова:**\n\n• **День:** ${day}\n• **Время:** ${time} (время Эрмосильо GMT-7)\n• **Причина / Продукт:** ${reason}\n\nНажмите зеленую кнопку ниже, чтобы подтвердить запись в официальном WhatsApp (**+52 662 180 5354**).`,
    appointmentAskDetails: (day, time, reason, days, start, end) =>
      `📅 С удовольствием запишем вас на консультацию!\n\nЧасы работы в **Эрмосильо, Сонора**:\n• **${days}** с **${start} до ${end}** *(Воскресенье — выходной)*.\n\nУкажите желаемый **день** (Пн–Сб), **время** (${start}–${end}) и **продукт**.`,
    singleProductInfo: (product, lang) => {
      const loc = getLocalizedProduct(product, lang);
      return `✨ **${loc.name}**\n${loc.description}\n\n• **Цена в Мексике:** $${product.priceMxn} MXN\n• **Международная цена (Крипто):** $${product.priceUsd.toFixed(2)} ${product.currencyType}\n• **Включает:** ${loc.highlights.join(', ')}\n\n⚠️ **Важно:** В назначении платежа указывайте **имя рекомендателя** или только слово **"pago"** (никогда не пишите "${loc.name}").`;
    },
    catalogResponse: (products, lang) => {
      const list = products
        .map((p, i) => {
          const loc = getLocalizedProduct(p, lang);
          const dur = loc.duration ? ` (${loc.duration})` : '';
          return `${i + 1}. **${loc.name}**${dur} — $${p.priceMxn} MXN / $${p.priceUsd.toFixed(2)} ${p.currencyType}`;
        })
        .join('\n');
      return `📋 **ОФИЦИАЛЬНЫЙ КАТАЛОГ ИЗ 12 ПРОДУКТОВ:**\n\n${list}\n\n💡 *Краткая сводка цен:*\n• **Figma Pro (.edu) / Netflix:** $300 MXN / 17.00 USDT\n• **Disney cuenta completa:** $200 MXN / 11.66 USDT\n• **ilove pdf premium 12 месяцев:** $100 MXN / 5.83 USDT\n• **8 продуктов по $150 MXN:** по $150 MXN / 8.74 USDT.\n\nКакой продукт вас интересует?`;
    },
    paymentConceptRuleResponse: () =>
      `🏦 **СПОСОБЫ ОПЛАТЫ И СТРОГОЕ ПРАВИЛО НАЗНАЧЕНИЯ ПЛАТЕЖА:**\n\n🇲🇽 **В Мексике:**\n• **Получатель:** Javier Alan Rodriguez Yescas\n• **Banco Nu:** \`5101 2586 6554 7429\` | **Bancoppel:** \`4169 1606 2471 2155\`\n\n🌎 **Международные платежи (USDT):**\n• **Binance Pay ID:** \`453667986\` (\`javieralanrodriguezyescas31@gmail.com\`)\n\n🚨 **СТРОГОЕ ПРАВИЛО:** В назначении платежа пишите **Имя и Фамилию рекомендателя** или только **"pago"**. **ЗАПРЕЩЕНО писать названия продуктов** (иначе без возврата средств и без выдачи аккаунта).`,
    affiliateRulesResponse: () =>
      `🤝 **ПАРТНЕРСКАЯ ПРОГРАММА (3 НАКОПИТЕЛЬНЫХ ПРАВИЛА):**\n\nВсе **3 правила на 100% накопительные** и действуют одновременно:\n1️⃣ **Правило 1:** За каждые **3 проданных Figma Pro** ($300 MXN / 17.00 USDT) → **1 аккаунт Figma Pro БЕСПЛАТНО**.\n2️⃣ **Правило 2:** За каждые **6 проданных продуктов по $150 MXN** (8.74 USDT) → **1 аккаунт Figma Pro БЕСПЛАТНО**.\n3️⃣ **Правило 3:** За каждые **4 проданных продукта по $150 MXN** (8.74 USDT) → **1 аккаунт за $150 MXN БЕСПЛАТНО**.\n\n✨ *При продаже 3 Figma Pro и 12 базовых аккаунтов вы получаете сразу **3 бесплатных Figma Pro** + **3 бесплатных аккаунта по $150 MXN** ($1,350 MXN / $77.22 USDT)!*`,
    scheduleResponse: (days, start, end) =>
      `🕒 **ОФИЦИАЛЬНОЕ РАСПИСАНИЕ:**\n• **Рабочие дни:** ${days} *(Воскресенье — выходной)*\n• **Часы:** с ${start} до ${end} (время Эрмосильо GMT-7).`,
    greetingResponse: (days, start, end) =>
      `Здравствуйте! 👋 Добро пожаловать в **Официальный ИИ-Ассистент**.\n\nЯ автоматически отвечаю на вашем языке и помогу с:\n1. **Каталогом и ценами** на 12 продуктов (MXN и USDT).\n2. **Способами оплаты** и строгим правилом назначения платежа.\n3. **Партнерской программой** (3 накопительных правила).\n4. **Записью на консультацию** (${days}, ${start}–${end}).`,
    defaultHelpResponse: () =>
      `Спасибо за сообщение 😊. Спрашивайте о **Каталоге (12 продуктов)**, **Правилах оплаты**, **3 правилах для партнеров** или **Записи на встречу**.`,
  },

  tr: {
    inactivityOffer: (days, start, end) =>
      `WhatsApp üzerinden **hızlı randevu** almak ister misiniz? 😊\n\n📅 **Resmi Saatler (Hermosillo, Sonora):**\n• **${days}** **${start} - ${end}** *(Pazar kapalı)*.\n\nLütfen tercih ettiğiniz **gün**, **saat** ve **ürünü** belirtin.`,
    appointmentConfirmed: (day, time, reason) =>
      `✅ **Harika! Resmi randevu talebinizi hazırladım:**\n\n• **Gün:** ${day}\n• **Saat:** ${time} (Hermosillo Saati GMT-7)\n• **Neden / Ürün:** ${reason}\n\nResmi WhatsApp hattımızda (**+52 662 180 5354**) onaylamak için aşağıdaki yeşil가 버튼을 클릭하세요.`,
    appointmentAskDetails: (day, time, reason, days, start, end) =>
      `📅 Randevunuzu memnuniyetle planlarız!\n\n**Hermosillo, Sonora** resmi çalışma saatlerimiz:\n• **${days}** **${start} - ${end}** *(Pazar kapalı)*.\n\nLütfen **gün** (Pazartesi-Cumartesi), **saat** (${start}-${end}) ve **ürün/nedeni** belirtin.`,
    singleProductInfo: (product, lang) => {
      const loc = getLocalizedProduct(product, lang);
      return `✨ **${loc.name}**\n${loc.description}\n\n• **Meksika Fiyatı:** $${product.priceMxn} MXN\n• **Uluslararası Fiyat (Kripto):** $${product.priceUsd.toFixed(2)} ${product.currencyType}\n• **İçerik:** ${loc.highlights.join(', ')}\n\n⚠️ **Önemli:** Havale açıklama kısmına **sizi 추천/tavsiye eden kişinin adını** veya sadece **"pago"** yazın (asla "${loc.name}" yazmayın).`;
    },
    catalogResponse: (products, lang) => {
      const list = products
        .map((p, i) => {
          const loc = getLocalizedProduct(p, lang);
          const dur = loc.duration ? ` (${loc.duration})` : '';
          return `${i + 1}. **${loc.name}**${dur} — $${p.priceMxn} MXN / $${p.priceUsd.toFixed(2)} ${p.currencyType}`;
        })
        .join('\n');
      return `📋 **RESMİ 12 ÜRÜNLÜK KATALOG:**\n\n${list}\n\n💡 *Fiyat Özeti:*\n• **Figma Pro (.edu) / Netflix:** $300 MXN / 17.00 USDT\n• **Disney cuenta completa:** $200 MXN / 11.66 USDT\n• **ilove pdf premium 12 ay:** $100 MXN / 5.83 USDT\n• **8 adet $150 MXN ürün:** her biri $150 MXN / 8.74 USDT.`;
    },
    paymentConceptRuleResponse: () =>
      `🏦 **ÖDEME YÖNTEMLERİ VE KESİN AÇIKLAMA KURALI:**\n\n🇲🇽 **Meksika İçi:**\n• **Alıcı:** Javier Alan Rodriguez Yescas\n• **Banco Nu:** \`5101 2586 6554 7429\` | **Bancoppel:** \`4169 1606 2471 2155\`\n\n🌎 **Uluslararası (USDT):**\n• **Binance Pay ID:** \`453667986\` (\`javieralanrodriguezyescas31@gmail.com\`)\n\n🚨 **KESİN KURAL:** Açıklama kısmına **sizi tavsiye eden kişinin adını** veya sadece **"pago"** yazın. **Ürün adı YAZMAYIN** (aksi takdirde iade ve teslimat yapılmaz).`,
    affiliateRulesResponse: () =>
      `🤝 **SATIŞ ORTAKLIĞI PROGRAMI (3 BİRİKİMLİ KURAL):**\n\n**3 kuralımız %100 birikimlidir** ve aynı anda işler:\n1️⃣ **Kural 1:** Satılan her **3 Figma Pro** ($300 MXN / 17.00 USDT) için → **1 Figma Pro ÜCRETSİZ**.\n2️⃣ **Kural 2:** Satılan her **6 adet $150 MXN ürün** (8.74 USDT) için → **1 Figma Pro ÜCRETSİZ**.\n3️⃣ **Kural 3:** Satılan her **4 adet $150 MXN ürün** (8.74 USDT) için → **1 adet $150 MXN hesap ÜCRETSİZ**.\n\n✨ *3 Figma Pro ve 12 temel satışla aynı anda **3 ücretsiz Figma Pro** + **3 ücretsiz $150 hesap** ($1,350 MXN / $77.22 USDT) kazanırsınız!*`,
    scheduleResponse: (days, start, end) =>
      `🕒 **RESMİ ÇALIŞMA SAATLERİ:**\n• **İş Günleri:** ${days} *(Pazar kapalı)*\n• **Saatler:** ${start} - ${end} (Hermosillo GMT-7).`,
    greetingResponse: (days, start, end) =>
      `Merhaba! 👋 **Resmi Akıllı Asistana** hoş geldiniz.\n\nSize Türkçe olarak şu konularda yardımcı olabilirim:\n1. **12 resmi ürünün kataloğu ve fiyatları** (MXN ve USDT)\n2. **Ödeme yöntemleri** ve kesin banka açıklama kuralı\n3. **3 birikimli satış ortaklığı kuralı**\n4. **Randevu alma** (${days}, ${start} - ${end})\n\nSize nasıl yardımcı olabilirim?`,
    defaultHelpResponse: () =>
      `Mesajınız için teşekkürler 😊. **12 ürünlük katalog**, **ödeme kuralı**, **3 ortaklık kuralı** veya **randevu** hakkında soru sorabilirsiniz.`,
  },
};

export function getBotTemplates(lang: LanguageCode): BotLocalizedTemplates {
  const base = botTemplates[lang] || botTemplates.es;
  return {
    ...base,
    recommendationResponse:
      base.recommendationResponse ||
      botTemplates.en.recommendationResponse ||
      botTemplates.es.recommendationResponse,
    singleProductInfo: (product, l) => {
      const raw = base.singleProductInfo(product, l);
      const mpUrl = getMercadoPagoLinkForProduct(product);
      if (!mpUrl || raw.includes(mpUrl)) return raw;
      return `${raw}${getMercadoPagoProductLine(product, l)}`;
    },
    paymentConceptRuleResponse: () => {
      const raw = base.paymentConceptRuleResponse();
      if (raw.includes(MERCADO_PAGO_LINKS[150])) return raw;
      return `${raw}\n\n💳 **Mercado Pago:**\n• $300 MXN (Figma Pro / Netflix): ${MERCADO_PAGO_LINKS[300]}\n• $200 MXN (Disney 12m / 1y): ${MERCADO_PAGO_LINKS[200]}\n• $150 MXN (7 base products): ${MERCADO_PAGO_LINKS[150]}\n• $100 MXN (iLovePDF Premium): ${MERCADO_PAGO_LINKS[100]}`;
    },
  };
}

export function formatLocalizedDaysSummary(enabledDays: string[], lang: LanguageCode): string {
  const dict = getDictionary(lang);
  const dayNames: Record<string, string> = {
    lunes: dict.days.lunes,
    martes: dict.days.martes,
    miercoles: dict.days.miercoles,
    jueves: dict.days.jueves,
    viernes: dict.days.viernes,
    sabado: dict.days.sabado,
    domingo: dict.days.domingo,
  };

  if (!enabledDays || enabledDays.length === 0) return dict.days.noDays;
  const order = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
  const sorted = [...enabledDays].sort((a, b) => order.indexOf(a) - order.indexOf(b));

  if (sorted.length === 6 && !sorted.includes('domingo')) {
    return dict.days.monToSat;
  }
  if (sorted.length === 5 && !sorted.includes('sabado') && !sorted.includes('domingo')) {
    return dict.days.monToFri;
  }
  if (sorted.length === 7) {
    return dict.days.allDays;
  }
  return sorted.map(d => dayNames[d] || d).join(', ');
}
