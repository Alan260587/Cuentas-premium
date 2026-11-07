import { Product } from '../types';
import { LanguageCode, LocalizedProductContent } from './types';

export const PRODUCT_TRANSLATIONS: Record<
  LanguageCode,
  Record<string, LocalizedProductContent>
> = {
  es: {
    'eleven-reader': {
      name: 'Eleven reader 12 meses ultra',
      category: 'Inteligencia Artificial & Audio',
      description:
        'Acceso Ultra de 12 meses para lectura natural de textos con voces de inteligencia artificial de última generación.',
      highlights: [
        'Voces ultra realistas de IA en múltiples idiomas',
        '12 Meses de suscripción activa garantizada',
        'Conversión de libros, PDFs y artículos a voz',
        'Ideal para estudio, productividad y accesibilidad',
      ],
      duration: '12 Meses Ultra',
      promoBadge: 'IA Premium',
      stockNote: 'Entrega Rápida',
    },
    'ilove-pdf-premium': {
      name: 'ilove pdf premium 12 meses',
      category: 'Productividad & Documentos',
      description:
        'Herramientas completas para unir, dividir, comprimir, convertir y editar archivos PDF sin límites.',
      highlights: [
        'Conversión y compresión ilimitada de documentos',
        'OCR profesional para reconocimiento óptico de texto',
        'Edición y firmado digital de contratos y PDFs',
        '12 Meses completos de licencia Premium',
      ],
      duration: '12 Meses',
      promoBadge: 'Super Precio',
      stockNote: 'Entrega Rápida',
    },
    'mause-ai': {
      name: 'mause ai 31 billon tokens',
      category: 'Inteligencia Artificial',
      description:
        'Paquete de 31 billones de tokens para procesamiento, análisis y generación avanzada con inteligencia artificial.',
      highlights: [
        '31 Billones de tokens de alta capacidad',
        'Modelos avanzados de razonamiento y texto',
        'Generación rápida para flujos profesionales',
        'Activación directa en tu cuenta',
      ],
      duration: '31 Billon Tokens',
      promoBadge: 'Tokens Masivos',
      stockNote: 'Entrega Rápida',
    },
    'coursera-plus': {
      name: 'Coursera Plus (12 Meses)',
      category: 'Educación & Certificaciones',
      description:
        'Acceso ilimitado por 12 meses a especializaciones, cursos y certificaciones profesionales universitarias.',
      highlights: [
        '12 Meses de acceso ilimitado a +7,000 cursos',
        'Certificados oficiales con validez laboral',
        'Especializaciones de universidades top',
        'Aprende a tu propio ritmo',
      ],
      duration: '12 Meses',
      promoBadge: 'Más Solicitado',
      stockNote: 'Entrega Rápida',
    },
    'google-ai-pro': {
      name: 'Google AI Pro / Gemini (18 Meses)',
      category: 'Inteligencia Artificial',
      description:
        'Inteligencia artificial avanzada por 18 meses con Gemini Pro para redacción, análisis, programación y flujos de trabajo.',
      highlights: [
        '18 Meses de Gemini Pro de máxima capacidad',
        'Análisis profundo y generación de código',
        'Redacción profesional e investigación',
        'Integración con herramientas Google',
      ],
      duration: '18 Meses',
      promoBadge: 'Más Solicitado',
      stockNote: 'Entrega Rápida',
    },
    'capcut-teams': {
      name: 'CapCut Teams (25 Días)',
      category: 'Edición de Video',
      description:
        'Editor de video profesional con herramientas avanzadas para creadores de contenido y proyectos audiovisuales.',
      highlights: [
        '25 Días de acceso completo Pro Teams',
        'Efectos, filtros y transiciones VIP',
        'Herramientas avanzadas de IA para video',
        'Exportación en máxima resolución sin marcas',
      ],
      duration: '25 Días Garantizados',
      stockNote: 'Entrega Rápida',
    },
    'microsoft-365': {
      name: 'Microsoft 365 Family (12 Meses)',
      category: 'Productividad & Nube',
      description:
        'Suscripción familiar por 12 meses para aplicaciones de Office, almacenamiento en la nube y herramientas de productividad avanzadas.',
      highlights: [
        '12 Meses de Word, Excel, PowerPoint y Outlook completos',
        'Almacenamiento seguro en la nube OneDrive',
        'Instalable en PC, Mac, tablets y celulares',
        'Actualizaciones y seguridad continua',
      ],
      duration: '12 Meses',
      stockNote: 'Entrega Rápida',
    },
    'figma-pro': {
      name: 'Figma Pro (.edu)',
      category: 'Diseño UI/UX & Prototipado',
      description:
        'Licencia educativa Pro por 2 años para diseño de interfaces, prototipado y trabajo colaborativo avanzado.',
      highlights: [
        '2 Años completos de licencia Pro',
        'Historial de versiones ilimitado',
        'Colaboración en tiempo real sin límites',
        'Acceso a FigJam y librerías completas',
      ],
      duration: '2 Años de Licencia (.edu)',
      promoBadge: 'Licencia 2 Años',
      stockNote: 'Entrega Rápida',
    },
    'duolingo-super': {
      name: 'Duolingo Super Familiar',
      category: 'Educación & Certificaciones',
      description:
        'Aprende inglés, francés, alemán o más de 40 idiomas más rápido, sin anuncios y con vidas ilimitadas.',
      highlights: [
        'Vidas ilimitadas para practicar sin interrupciones',
        'Cero anuncios al terminar cada lección',
        'Práctica personalizada de errores y desafíos legendarios',
        'Se activa directamente en tu perfil personal',
      ],
      duration: '',
      stockNote: 'Entrega Rápida',
    },
  },
  en: {
    'eleven-reader': {
      name: 'Eleven Reader 12 Months Ultra',
      category: 'Artificial Intelligence & Audio',
      description:
        '12-month Ultra access for natural text reading with next-generation artificial intelligence voices.',
      highlights: [
        'Ultra-realistic AI voices in multiple languages',
        '12 Months of guaranteed active subscription',
        'Convert books, PDFs and articles to speech',
        'Ideal for study, productivity and accessibility',
      ],
      duration: '12 Months Ultra',
      promoBadge: 'Premium AI',
      stockNote: 'Fast Delivery',
    },
    'ilove-pdf-premium': {
      name: 'iLovePDF Premium 12 Months',
      category: 'Productivity & Documents',
      description:
        'Complete tools to merge, split, compress, convert and edit PDF files without limits.',
      highlights: [
        'Unlimited document conversion and compression',
        'Professional OCR for optical text recognition',
        'Digital editing and signing of contracts and PDFs',
        'Full 12 months of Premium license',
      ],
      duration: '12 Months',
      promoBadge: 'Super Price',
      stockNote: 'Fast Delivery',
    },
    'mause-ai': {
      name: 'Mause AI 31 Billion Tokens',
      category: 'Artificial Intelligence',
      description:
        '31 billion tokens package for advanced processing, analysis and generation with artificial intelligence.',
      highlights: [
        '31 Billion high-capacity tokens',
        'Advanced reasoning and text models',
        'Fast generation for professional workflows',
        'Direct activation on your account',
      ],
      duration: '31 Billion Tokens',
      promoBadge: 'Massive Tokens',
      stockNote: 'Fast Delivery',
    },
    'coursera-plus': {
      name: 'Coursera Plus (12 Months)',
      category: 'Education & Certifications',
      description:
        'Unlimited 12-month access to university specializations, courses and professional certifications.',
      highlights: [
        '12 Months unlimited access to 7,000+ courses',
        'Official career-valid certificates',
        'Specializations from top universities',
        'Learn at your own pace',
      ],
      duration: '12 Months',
      promoBadge: 'Most Requested',
      stockNote: 'Fast Delivery',
    },
    'google-ai-pro': {
      name: 'Google AI Pro / Gemini (18 Months)',
      category: 'Artificial Intelligence',
      description:
        'Advanced artificial intelligence for 18 months with Gemini Pro for writing, analysis, coding and workflows.',
      highlights: [
        '18 Months full-capacity Gemini Pro',
        'Deep analysis and code generation',
        'Professional writing and research',
        'Integration with Google tools',
      ],
      duration: '18 Months',
      promoBadge: 'Most Requested',
      stockNote: 'Fast Delivery',
    },
    'capcut-teams': {
      name: 'CapCut Teams (25 Days)',
      category: 'Video Editing',
      description:
        'Professional video editor with advanced tools for content creators and audiovisual projects.',
      highlights: [
        '25 Days of full Pro Teams access',
        'VIP effects, filters and transitions',
        'Advanced AI video tools',
        'Maximum resolution export without watermarks',
      ],
      duration: '25 Guaranteed Days',
      stockNote: 'Fast Delivery',
    },
    'microsoft-365': {
      name: 'Microsoft 365 Family (12 Months)',
      category: 'Productivity & Cloud',
      description:
        '12-month family subscription for Office applications, cloud storage and advanced productivity tools.',
      highlights: [
        '12 Months full Word, Excel, PowerPoint and Outlook',
        'Secure OneDrive cloud storage',
        'Installable on PC, Mac, tablets and phones',
        'Continuous updates and security',
      ],
      duration: '12 Months',
      stockNote: 'Fast Delivery',
    },
    'figma-pro': {
      name: 'Figma Pro (.edu)',
      category: 'UI/UX Design & Prototyping',
      description:
        '2-year educational Pro license for interface design, prototyping and advanced collaborative work.',
      highlights: [
        'Full 2 years of Pro license',
        'Unlimited version history',
        'Unlimited real-time collaboration',
        'Access to FigJam and full libraries',
      ],
      duration: '2-Year License (.edu)',
      promoBadge: '2-Year License',
      stockNote: 'Fast Delivery',
    },
    'duolingo-super': {
      name: 'Duolingo Super Family',
      category: 'Education & Certifications',
      description:
        'Learn English, French, German or 40+ languages faster, ad-free and with unlimited hearts.',
      highlights: [
        'Unlimited hearts for uninterrupted practice',
        'Zero ads after every lesson',
        'Personalized mistake practice and legendary challenges',
        'Activated directly on your personal profile',
      ],
      duration: '',
      stockNote: 'Fast Delivery',
    },
  },
  pt: {
    'eleven-reader': {
      name: 'Eleven Reader 12 Meses Ultra',
      category: 'Inteligência Artificial & Áudio',
      description:
        'Acesso Ultra de 12 meses para leitura natural de textos com vozes de inteligência artificial de última geração.',
      highlights: [
        'Vozes de IA ultra realistas em vários idiomas',
        '12 Meses de assinatura ativa garantida',
        'Conversão de livros, PDFs e artigos em voz',
        'Ideal para estudo, produtividade e acessibilidade',
      ],
      duration: '12 Meses Ultra',
      promoBadge: 'IA Premium',
      stockNote: 'Entrega Rápida',
    },
    'ilove-pdf-premium': {
      name: 'iLovePDF Premium 12 Meses',
      category: 'Produtividade & Documentos',
      description:
        'Ferramentas completas para juntar, dividir, comprimir, converter e editar arquivos PDF sem limites.',
      highlights: [
        'Conversão e compressão ilimitada de documentos',
        'OCR profissional para reconhecimento óptico de texto',
        'Edição e assinatura digital de contratos e PDFs',
        '12 Meses completos de licença Premium',
      ],
      duration: '12 Meses',
      promoBadge: 'Super Preço',
      stockNote: 'Entrega Rápida',
    },
    'mause-ai': {
      name: 'Mause AI 31 Bilhões de Tokens',
      category: 'Inteligência Artificial',
      description:
        'Pacote de 31 bilhões de tokens para processamento, análise e geração avançada com inteligência artificial.',
      highlights: [
        '31 Bilhões de tokens de alta capacidade',
        'Modelos avançados de raciocínio e texto',
        'Geração rápida para fluxos profissionais',
        'Ativação direta em sua conta',
      ],
      duration: '31 Bilhões de Tokens',
      promoBadge: 'Tokens Massivos',
      stockNote: 'Entrega Rápida',
    },
    'coursera-plus': {
      name: 'Coursera Plus (12 Meses)',
      category: 'Educação & Certificações',
      description:
        'Acesso ilimitado por 12 meses a especializações, cursos e certificações profissionais universitárias.',
      highlights: [
        '12 Meses de acesso ilimitado a +7.000 cursos',
        'Certificados oficiais com validade profissional',
        'Especializações de universidades de ponta',
        'Aprenda no seu próprio ritmo',
      ],
      duration: '12 Meses',
      promoBadge: 'Mais Solicitado',
      stockNote: 'Entrega Rápida',
    },
    'google-ai-pro': {
      name: 'Google AI Pro / Gemini (18 Meses)',
      category: 'Inteligência Artificial',
      description:
        'Inteligência artificial avançada por 18 meses com Gemini Pro para redação, análise, programação e fluxos de trabalho.',
      highlights: [
        '18 Meses de Gemini Pro de capacidade máxima',
        'Análise profunda e geração de código',
        'Redação profissional e pesquisa',
        'Integração com ferramentas Google',
      ],
      duration: '18 Meses',
      promoBadge: 'Mais Solicitado',
      stockNote: 'Entrega Rápida',
    },
    'capcut-teams': {
      name: 'CapCut Teams (25 Dias)',
      category: 'Edição de Vídeo',
      description:
        'Editor de vídeo profissional com ferramentas avançadas para criadores de conteúdo e projetos audiovisuais.',
      highlights: [
        '25 Dias de acesso completo Pro Teams',
        'Efeitos, filtros e transições VIP',
        'Ferramentas avançadas de IA para vídeo',
        'Exportação em resolução máxima sem marca d’água',
      ],
      duration: '25 Dias Garantidos',
      stockNote: 'Entrega Rápida',
    },
    'microsoft-365': {
      name: 'Microsoft 365 Family (12 Meses)',
      category: 'Produtividade & Nuvem',
      description:
        'Assinatura familiar por 12 meses para aplicativos Office, armazenamento em nuvem e ferramentas avançadas de produtividade.',
      highlights: [
        '12 Meses de Word, Excel, PowerPoint e Outlook completos',
        'Armazenamento seguro na nuvem OneDrive',
        'Instalável em PC, Mac, tablets e celulares',
        'Atualizações e segurança contínua',
      ],
      duration: '12 Meses',
      stockNote: 'Entrega Rápida',
    },
    'figma-pro': {
      name: 'Figma Pro (.edu)',
      category: 'Design UI/UX & Prototipagem',
      description:
        'Licença educacional Pro por 2 anos para design de interfaces, prototipagem e trabalho colaborativo avançado.',
      highlights: [
        '2 Anos completos de licença Pro',
        'Histórico de versões ilimitado',
        'Colaboração em tempo real sem limites',
        'Acesso ao FigJam e bibliotecas completas',
      ],
      duration: '2 Anos de Licença (.edu)',
      promoBadge: 'Licença 2 Anos',
      stockNote: 'Entrega Rápida',
    },
    'duolingo-super': {
      name: 'Duolingo Super Família',
      category: 'Educação & Certificações',
      description:
        'Aprenda inglês, francês, alemão ou mais de 40 idiomas mais rápido, sem anúncios e com vidas ilimitadas.',
      highlights: [
        'Vidas ilimitadas para praticar sem interrupções',
        'Zero anúncios ao terminar cada lição',
        'Prática personalizada de erros e desafios lendários',
        'Ativado diretamente no seu perfil pessoal',
      ],
      duration: '',
      stockNote: 'Entrega Rápida',
    },
  },
  fr: {
    'eleven-reader': {
      name: 'Eleven Reader 12 Mois Ultra',
      category: 'Intelligence Artificielle & Audio',
      description:
        'Accès Ultra de 12 mois pour une lecture naturelle de textes avec des voix d’intelligence artificielle de dernière génération.',
      highlights: [
        'Voix IA ultra-réalistes en plusieurs langues',
        '12 Mois d’abonnement actif garanti',
        'Conversion de livres, PDF et articles en voix',
        'Idéal pour les études, la productivité et l’accessibilité',
      ],
      duration: '12 Mois Ultra',
      promoBadge: 'IA Premium',
      stockNote: 'Livraison Rapide',
    },
    'ilove-pdf-premium': {
      name: 'iLovePDF Premium 12 Mois',
      category: 'Productivité & Documents',
      description:
        'Outils complets pour fusionner, diviser, compresser, convertir et modifier des fichiers PDF sans limites.',
      highlights: [
        'Conversion et compression illimitées de documents',
        'OCR professionnel pour la reconnaissance optique de texte',
        'Édition et signature numérique de contrats et PDF',
        '12 Mois complets de licence Premium',
      ],
      duration: '12 Mois',
      promoBadge: 'Super Prix',
      stockNote: 'Livraison Rapide',
    },
    'mause-ai': {
      name: 'Mause AI 31 Milliards de Tokens',
      category: 'Intelligence Artificielle',
      description:
        'Pack de 31 milliards de tokens pour le traitement, l’analyse et la génération avancée par intelligence artificielle.',
      highlights: [
        '31 Milliards de tokens haute capacité',
        'Modèles avancés de raisonnement et de texte',
        'Génération rapide pour flux professionnels',
        'Activation directe sur votre compte',
      ],
      duration: '31 Milliards de Tokens',
      promoBadge: 'Tokens Massifs',
      stockNote: 'Livraison Rapide',
    },
    'coursera-plus': {
      name: 'Coursera Plus (12 Mois)',
      category: 'Éducation & Certifications',
      description:
        'Accès illimité pendant 12 mois aux spécialisations, cours et certifications professionnelles universitaires.',
      highlights: [
        '12 Mois d’accès illimité à +7 000 cours',
        'Certificats officiels à valeur professionnelle',
        'Spécialisations des meilleures universités',
        'Apprenez à votre propre rythme',
      ],
      duration: '12 Mois',
      promoBadge: 'Le Plus Demandé',
      stockNote: 'Livraison Rapide',
    },
    'google-ai-pro': {
      name: 'Google AI Pro / Gemini (18 Mois)',
      category: 'Intelligence Artificielle',
      description:
        'Intelligence artificielle avancée pendant 18 mois avec Gemini Pro pour la rédaction, l’analyse, la programmation et les flux de travail.',
      highlights: [
        '18 Mois de Gemini Pro à capacité maximale',
        'Analyse approfondie et génération de code',
        'Rédaction professionnelle et recherche',
        'Intégration avec les outils Google',
      ],
      duration: '18 Mois',
      promoBadge: 'Le Plus Demandé',
      stockNote: 'Livraison Rapide',
    },
    'capcut-teams': {
      name: 'CapCut Teams (25 Jours)',
      category: 'Montage Vidéo',
      description:
        'Éditeur vidéo professionnel avec des outils avancés pour les créateurs de contenu et projets audiovisuels.',
      highlights: [
        '25 Jours d’accès complet Pro Teams',
        'Effets, filtres et transitions VIP',
        'Outils vidéo IA avancés',
        'Exportation haute résolution sans filigrane',
      ],
      duration: '25 Jours Garantis',
      stockNote: 'Livraison Rapide',
    },
    'microsoft-365': {
      name: 'Microsoft 365 Family (12 Mois)',
      category: 'Productivité & Cloud',
      description:
        'Abonnement familial de 12 mois pour les applications Office, le stockage cloud et les outils de productivité avancés.',
      highlights: [
        '12 Mois de Word, Excel, PowerPoint et Outlook complets',
        'Stockage cloud sécurisé OneDrive',
        'Installable sur PC, Mac, tablettes et mobiles',
        'Mises à jour et sécurité continues',
      ],
      duration: '12 Mois',
      stockNote: 'Livraison Rapide',
    },
    'figma-pro': {
      name: 'Figma Pro (.edu)',
      category: 'Design UI/UX & Prototypage',
      description:
        'Licence éducative Pro de 2 ans pour le design d’interfaces, le prototypage et le travail collaboratif avancé.',
      highlights: [
        '2 Ans complets de licence Pro',
        'Historique des versions illimité',
        'Collaboration en temps réel sans limites',
        'Accès à FigJam et aux bibliothèques complètes',
      ],
      duration: 'Licence 2 Ans (.edu)',
      promoBadge: 'Licence 2 Ans',
      stockNote: 'Livraison Rapide',
    },
    'duolingo-super': {
      name: 'Duolingo Super Famille',
      category: 'Éducation & Certifications',
      description:
        'Apprenez l’anglais, le français, l’allemand ou plus de 40 langues plus vite, sans publicité et avec des vies illimitées.',
      highlights: [
        'Vies illimitées pour pratiquer sans interruption',
        'Zéro publicité à la fin de chaque leçon',
        'Pratique personnalisée des erreurs et défis légendaires',
        'Activé directement sur votre profil personnel',
      ],
      duration: '',
      stockNote: 'Livraison Rapide',
    },
  },
  de: {
    'eleven-reader': {
      name: 'Eleven Reader 12 Monate Ultra',
      category: 'Künstliche Intelligenz & Audio',
      description:
        '12 Monate Ultra-Zugang für natürliches Vorlesen von Texten mit KI-Stimmen der neuesten Generation.',
      highlights: [
        'Ultrarealistische KI-Stimmen in mehreren Sprachen',
        '12 Monate garantiertes aktives Abonnement',
        'Umwandlung von Büchern, PDFs und Artikeln in Sprache',
        'Ideal für Studium, Produktivität und Barrierefreiheit',
      ],
      duration: '12 Monate Ultra',
      promoBadge: 'Premium KI',
      stockNote: 'Schnelle Lieferung',
    },
    'ilove-pdf-premium': {
      name: 'iLovePDF Premium 12 Monate',
      category: 'Produktivität & Dokumente',
      description:
        'Komplette Werkzeuge zum Zusammenfügen, Teilen, Komprimieren, Konvertieren und Bearbeiten von PDF-Dateien ohne Limits.',
      highlights: [
        'Unbegrenzte Dokumentkonvertierung und -komprimierung',
        'Professionelle OCR zur optischen Texterkennung',
        'Digitale Bearbeitung und Signatur von Verträgen und PDFs',
        'Volle 12 Monate Premium-Lizenz',
      ],
      duration: '12 Monate',
      promoBadge: 'Superpreis',
      stockNote: 'Schnelle Lieferung',
    },
    'mause-ai': {
      name: 'Mause AI 31 Milliarden Tokens',
      category: 'Künstliche Intelligenz',
      description:
        'Paket mit 31 Milliarden Tokens für fortgeschrittene Verarbeitung, Analyse und Generierung mit künstlicher Intelligenz.',
      highlights: [
        '31 Milliarden Hochleistungs-Tokens',
        'Fortgeschrittene Denk- und Textmodelle',
        'Schnelle Generierung für professionelle Workflows',
        'Direkte Aktivierung in Ihrem Konto',
      ],
      duration: '31 Mrd. Tokens',
      promoBadge: 'Massive Tokens',
      stockNote: 'Schnelle Lieferung',
    },
    'coursera-plus': {
      name: 'Coursera Plus',
      category: 'Bildung & Zertifizierungen',
      description:
        'Unbegrenzter Zugang zu universitären Spezialisierungen, Kursen und beruflichen Zertifizierungen.',
      highlights: [
        'Unbegrenzter Zugang zu +7.000 Kursen',
        'Offizielle beruflich anerkannte Zertifikate',
        'Spezialisierungen von Top-Universitäten',
        'Lernen Sie in Ihrem eigenen Tempo',
      ],
      duration: 'Aktives Abo',
      promoBadge: 'Sehr Gefragt',
      stockNote: 'Schnelle Lieferung',
    },
    'google-ai-pro': {
      name: 'Google AI Pro / Gemini',
      category: 'Künstliche Intelligenz',
      description:
        'Fortgeschrittene künstliche Intelligenz mit Gemini Pro für Texterstellung, Analyse, Programmierung und Workflows.',
      highlights: [
        'Gemini Pro mit maximaler Kapazität',
        'Tiefenanalyse und Codegenerierung',
        'Professionelles Schreiben und Recherche',
        'Integration mit Google-Tools',
      ],
      duration: 'Premium-Zugang',
      promoBadge: 'Sehr Gefragt',
      stockNote: 'Schnelle Lieferung',
    },
    'capcut-teams': {
      name: 'CapCut Teams (25 Tage)',
      category: 'Videobearbeitung',
      description:
        'Professioneller Videoeditor mit fortschrittlichen Werkzeugen für Content-Ersteller und audiovisuelle Projekte.',
      highlights: [
        '25 Tage voller Pro Teams Zugang',
        'VIP-Effekte, Filter und Übergänge',
        'Erweiterte KI-Videowerkzeuge',
        'Export in maximaler Auflösung ohne Wasserzeichen',
      ],
      duration: '25 Garantierte Tage',
      stockNote: 'Schnelle Lieferung',
    },
    'microsoft-365': {
      name: 'Microsoft 365 Family',
      category: 'Produktivität & Cloud',
      description:
        'Familienabonnement für Office-Anwendungen, Cloud-Speicher und erweiterte Produktivitätswerkzeuge.',
      highlights: [
        'Komplettes Word, Excel, PowerPoint und Outlook',
        'Sicherer OneDrive Cloud-Speicher',
        'Installierbar auf PC, Mac, Tablets und Smartphones',
        'Fortlaufende Updates und Sicherheit',
      ],
      duration: 'Offizielles Abo',
      stockNote: 'Schnelle Lieferung',
    },
    'figma-pro': {
      name: 'Figma Pro (.edu)',
      category: 'UI/UX Design & Prototyping',
      description:
        '2-jährige Pro-Bildungslizenz für Interface-Design, Prototyping und fortgeschrittene Zusammenarbeit.',
      highlights: [
        'Volle 2 Jahre Pro-Lizenz',
        'Unbegrenzter Versionsverlauf',
        'Unbegrenzte Echtzeit-Zusammenarbeit',
        'Zugang zu FigJam und kompletten Bibliotheken',
      ],
      duration: '2 Jahre Lizenz (.edu)',
      promoBadge: '2-Jahres-Lizenz',
      stockNote: 'Schnelle Lieferung',
    },
    'duolingo-super': {
      name: 'Duolingo Super Familie',
      category: 'Bildung & Zertifizierungen',
      description:
        'Lernen Sie Englisch, Französisch, Deutsch oder über 40 Sprachen schneller, werbefrei und mit unbegrenzten Herzen.',
      highlights: [
        'Unbegrenzte Herzen zum unterbrechungsfreien Üben',
        'Keine Werbung nach jeder Lektion',
        'Personalisiertes Fehlertraining und legendäre Herausforderungen',
        'Direkt in Ihrem persönlichen Profil aktiviert',
      ],
      duration: '',
      stockNote: 'Schnelle Lieferung',
    },
  },
  it: {
    'eleven-reader': {
      name: 'Eleven Reader 12 Mesi Ultra',
      category: 'Intelligenza Artificiale & Audio',
      description:
        'Accesso Ultra di 12 mesi per la lettura naturale di testi con voci di intelligenza artificiale di ultima generazione.',
      highlights: [
        'Voci IA ultra realistiche in più lingue',
        '12 Mesi di abbonamento attivo garantito',
        'Conversione di libri, PDF e articoli in voce',
        'Ideale per studio, produttività e accessibilità',
      ],
      duration: '12 Mesi Ultra',
      promoBadge: 'IA Premium',
      stockNote: 'Consegna Rapida',
    },
    'ilove-pdf-premium': {
      name: 'iLovePDF Premium 12 Mesi',
      category: 'Produttività & Documenti',
      description:
        'Strumenti completi per unire, dividere, comprimere, convertire e modificare file PDF senza limiti.',
      highlights: [
        'Conversione e compressione illimitata di documenti',
        'OCR professionale per riconoscimento ottico del testo',
        'Modifica e firma digitale di contratti e PDF',
        '12 Mesi completi di licenza Premium',
      ],
      duration: '12 Mesi',
      promoBadge: 'Super Prezzo',
      stockNote: 'Consegna Rapida',
    },
    'mause-ai': {
      name: 'Mause AI 31 Miliardi di Token',
      category: 'Intelligenza Artificiale',
      description:
        'Pacchetto da 31 miliardi di token per elaborazione, analisi e generazione avanzata con intelligenza artificiale.',
      highlights: [
        '31 Miliardi di token ad alta capacità',
        'Modelli avanzati di ragionamento e testo',
        'Generazione rapida per flussi professionali',
        'Attivazione diretta sul tuo account',
      ],
      duration: '31 Miliardi di Token',
      promoBadge: 'Token Massivi',
      stockNote: 'Consegna Rapida',
    },
    'coursera-plus': {
      name: 'Coursera Plus',
      category: 'Istruzione & Certificazioni',
      description:
        'Accesso illimitato a specializzazioni, corsi e certificazioni professionali universitarie.',
      highlights: [
        'Accesso illimitato a oltre 7.000 corsi',
        'Certificati ufficiali validi per il lavoro',
        'Specializzazioni delle migliori università',
        'Impara al tuo ritmo',
      ],
      duration: 'Abbonamento Attivo',
      promoBadge: 'Più Richiesto',
      stockNote: 'Consegna Rapida',
    },
    'google-ai-pro': {
      name: 'Google AI Pro / Gemini',
      category: 'Intelligenza Artificiale',
      description:
        'Intelligenza artificiale avanzata con Gemini Pro per scrittura, analisi, programmazione e flussi di lavoro.',
      highlights: [
        'Gemini Pro alla massima capacità',
        'Analisi approfondita e generazione di codice',
        'Scrittura professionale e ricerca',
        'Integrazione con gli strumenti Google',
      ],
      duration: 'Accesso Premium',
      promoBadge: 'Più Richiesto',
      stockNote: 'Consegna Rapida',
    },
    'capcut-teams': {
      name: 'CapCut Teams (25 Giorni)',
      category: 'Video Editing',
      description:
        'Editor video professionale con strumenti avanzati per content creator e progetti audiovisivi.',
      highlights: [
        '25 Giorni di accesso completo Pro Teams',
        'Effetti, filtri e transizioni VIP',
        'Strumenti avanzati IA per video',
        'Esportazione alla massima risoluzione senza filigrana',
      ],
      duration: '25 Giorni Garantiti',
      stockNote: 'Consegna Rapida',
    },
    'microsoft-365': {
      name: 'Microsoft 365 Family',
      category: 'Produttività & Cloud',
      description:
        'Abbonamento familiare per applicazioni Office, archiviazione cloud e strumenti di produttività avanzati.',
      highlights: [
        'Word, Excel, PowerPoint e Outlook completi',
        'Archiviazione cloud sicura su OneDrive',
        'Installabile su PC, Mac, tablet e smartphone',
        'Aggiornamenti e sicurezza continui',
      ],
      duration: 'Abbonamento Ufficiale',
      stockNote: 'Consegna Rapida',
    },
    'figma-pro': {
      name: 'Figma Pro (.edu)',
      category: 'Design UI/UX & Prototipazione',
      description:
        'Licenza educativa Pro per 2 anni per design di interfacce, prototipazione e lavoro collaborativo avanzato.',
      highlights: [
        '2 Anni completi di licenza Pro',
        'Cronologia versioni illimitata',
        'Collaborazione in tempo reale senza limiti',
        'Accesso a FigJam e librerie complete',
      ],
      duration: 'Licenza 2 Anni (.edu)',
      promoBadge: 'Licenza 2 Anni',
      stockNote: 'Consegna Rapida',
    },
    'duolingo-super': {
      name: 'Duolingo Super Famiglia',
      category: 'Istruzione & Certificazioni',
      description:
        'Impara inglese, francese, tedesco o oltre 40 lingue più velocemente, senza pubblicità e con vite illimitate.',
      highlights: [
        'Vite illimitate per esercitarti senza interruzioni',
        'Zero pubblicità alla fine di ogni lezione',
        'Pratica personalizzata degli errori e sfide leggendarie',
        'Attivato direttamente sul tuo profilo personale',
      ],
      duration: '',
      stockNote: 'Consegna Rapida',
    },
  },
  zh: {
    'eleven-reader': {
      name: 'Eleven Reader 12个月 Ultra版',
      category: '人工智能与音频',
      description: '12个月Ultra访问权限，使用新一代人工智能语音自然朗读文本。',
      highlights: [
        '支持多语言的超逼真AI语音',
        '保证12个月有效订阅',
        '将书籍、PDF和文章转换为语音',
        '非常适合学习、办公效率和无障碍阅读',
      ],
      duration: '12个月 Ultra',
      promoBadge: '高级AI',
      stockNote: '极速发货',
    },
    'ilove-pdf-premium': {
      name: 'iLovePDF Premium 12个月高级版',
      category: '办公效率与文档',
      description: '无限制合并、拆分、压缩、转换和编辑PDF文件的完整工具。',
      highlights: [
        '无限文档转换与压缩',
        '专业OCR光学字符识别',
        '合同与PDF数字编辑和签名',
        '完整12个月高级版授权',
      ],
      duration: '12个月',
      promoBadge: '超值特价',
      stockNote: '极速发货',
    },
    'mause-ai': {
      name: 'Mause AI 310亿 Tokens套餐',
      category: '人工智能',
      description: '310亿Tokens大容量套餐，用于高级人工智能处理、分析与生成。',
      highlights: [
        '310亿高容量Tokens',
        '高级推理与文本模型',
        '专为专业工作流打造的快速生成',
        '直接在您的账户中激活',
      ],
      duration: '310亿 Tokens',
      promoBadge: '海量Tokens',
      stockNote: '极速发货',
    },
    'coursera-plus': {
      name: 'Coursera Plus 专业版',
      category: '教育与认证',
      description: '无限访问大学专项课程、专业课程和职业认证。',
      highlights: [
        '无限访问 7,000+ 门课程',
        '具有职业效力的官方证书',
        '顶尖大学专项课程',
        '按自己的节奏学习',
      ],
      duration: '有效订阅',
      promoBadge: '最受欢迎',
      stockNote: '极速发货',
    },
    'google-ai-pro': {
      name: 'Google AI Pro / Gemini',
      category: '人工智能',
      description: '搭载Gemini Pro的高级人工智能，适用于写作、分析、编程和工作流。',
      highlights: [
        '满血版 Gemini Pro',
        '深度分析与代码生成',
        '专业写作与研究',
        '与Google工具深度集成',
      ],
      duration: '高级访问权限',
      promoBadge: '最受欢迎',
      stockNote: '极速发货',
    },
    'capcut-teams': {
      name: 'CapCut Teams 剪映团队版 (25天)',
      category: '视频剪辑',
      description: '面向内容创作者和视听项目的专业视频编辑器，提供高级工具。',
      highlights: [
        '25天完整 Pro Teams 访问权限',
        'VIP特效、滤镜与转场',
        '高级AI视频工具',
        '无水印最高分辨率导出',
      ],
      duration: '25天质保',
      stockNote: '极速发货',
    },
    'microsoft-365': {
      name: 'Microsoft 365 家庭版',
      category: '办公效率与云端',
      description: '包含Office应用、云存储和高级生产力工具的家庭订阅。',
      highlights: [
        '完整的 Word、Excel、PowerPoint 和 Outlook',
        '安全的 OneDrive 云存储',
        '支持在 PC、Mac、平板和手机上安装',
        '持续更新与安全保障',
      ],
      duration: '官方订阅',
      stockNote: '极速发货',
    },
    'figma-pro': {
      name: 'Figma Pro (.edu 教育专业版)',
      category: 'UI/UX设计与原型',
      description: '2年期Pro教育授权，用于界面设计、原型制作和高级协作。',
      highlights: [
        '完整2年 Pro 授权',
        '无限版本历史记录',
        '无限制实时协作',
        '访问 FigJam 和完整组件库',
      ],
      duration: '2年授权 (.edu)',
      promoBadge: '2年授权',
      stockNote: '极速发货',
    },
    'duolingo-super': {
      name: 'Duolingo Super 多邻国超级家庭版',
      category: '教育与认证',
      description: '更快学习英语、法语、德语等40多种语言，无广告且拥有无限红心。',
      highlights: [
        '无限红心，练习不中断',
        '每节课后零广告干扰',
        '个性化错题练习与传奇挑战',
        '直接在您的个人资料上激活',
      ],
      duration: '',
      stockNote: '极速发货',
    },
  },
  ja: {
    'eleven-reader': {
      name: 'Eleven Reader 12ヶ月 Ultra',
      category: '人工知能＆オーディオ',
      description:
        '次世代のAI音声でテキストを自然に読み上げる12ヶ月間のUltraアクセス。',
      highlights: [
        '多言語対応の超リアルなAI音声',
        '12ヶ月間のアクティブサブスクリプション保証',
        '書籍、PDF、記事を音声に変換',
        '学習、生産性向上、アクセシビリティに最適',
      ],
      duration: '12ヶ月 Ultra',
      promoBadge: 'プレミアムAI',
      stockNote: '迅速納品',
    },
    'ilove-pdf-premium': {
      name: 'iLovePDF Premium 12ヶ月',
      category: '生産性＆ドキュメント',
      description:
        'PDFファイルの結合、分割、圧縮、変換、編集を無制限に行える完全なツール群。',
      highlights: [
        '無制限のドキュメント変換・圧縮',
        '光学文字認識のためのプロ仕様OCR',
        '契約書やPDFのデジタル編集・署名',
        '12ヶ月間の完全なPremiumライセンス',
      ],
      duration: '12ヶ月',
      promoBadge: '特別価格',
      stockNote: '迅速納品',
    },
    'mause-ai': {
      name: 'Mause AI 310億トークン',
      category: '人工知能',
      description:
        '人工知能による高度な処理、分析、生成のための310億トークンパッケージ。',
      highlights: [
        '大容量310億トークン',
        '高度な推論およびテキストモデル',
        'プロフェッショナルなワークフロー向けの高速生成',
        'アカウントへの直接アクティベーション',
      ],
      duration: '310億トークン',
      promoBadge: '大容量トークン',
      stockNote: '迅速納品',
    },
    'coursera-plus': {
      name: 'Coursera Plus',
      category: '教育＆認定資格',
      description:
        '大学の専門講座、コース、プロフェッショナル認定資格への無制限アクセス。',
      highlights: [
        '7,000以上のコースに無制限アクセス',
        'キャリアに有効な公式認定証',
        'トップ大学の専門講座',
        '自分のペースで学習可能',
      ],
      duration: '有効なサブスクリプション',
      promoBadge: '大人気',
      stockNote: '迅速納品',
    },
    'google-ai-pro': {
      name: 'Google AI Pro / Gemini',
      category: '人工知能',
      description:
        '文章作成、分析、プログラミング、ワークフロー向けのGemini Pro搭載高度AI。',
      highlights: [
        '最高性能のGemini Pro',
        '深い分析とコード生成',
        'プロフェッショナルな執筆とリサーチ',
        'Googleツールとの統合',
      ],
      duration: 'プレミアムアクセス',
      promoBadge: '大人気',
      stockNote: '迅速納品',
    },
    'capcut-teams': {
      name: 'CapCut Teams (25日間)',
      category: '動画編集',
      description:
        'コンテンツ制作者や映像プロジェクト向けの高度なツールを備えたプロ用動画エディター。',
      highlights: [
        '25日間のPro Teams完全アクセス',
        'VIPエフェクト、フィルター、トランジション',
        '動画向け高度AIツール',
        '透かしなしの最高解像度エクスポート',
      ],
      duration: '25日間保証',
      stockNote: '迅速納品',
    },
    'microsoft-365': {
      name: 'Microsoft 365 Family',
      category: '生産性＆クラウド',
      description:
        'Officeアプリ、クラウドストレージ、高度な生産性ツール向けのファミリーサブスクリプション。',
      highlights: [
        'Word、Excel、PowerPoint、Outlook完備',
        '安全なOneDriveクラウドストレージ',
        'PC、Mac、タブレット、スマホにインストール可能',
        '継続的なアップデートとセキュリティ',
      ],
      duration: '公式サブスクリプション',
      stockNote: '迅速納品',
    },
    'figma-pro': {
      name: 'Figma Pro (.edu)',
      category: 'UI/UXデザイン＆プロトタイピング',
      description:
        'インターフェース設計、プロトタイピング、高度な共同作業のための2年間Pro教育ライセンス。',
      highlights: [
        '2年間の完全なProライセンス',
        '無制限のバージョン履歴',
        '無制限のリアルタイム共同作業',
        'FigJamと完全なライブラリへのアクセス',
      ],
      duration: '2年ライセンス (.edu)',
      promoBadge: '2年ライセンス',
      stockNote: '迅速納品',
    },
    'duolingo-super': {
      name: 'Duolingo Super ファミリー',
      category: '教育＆認定資格',
      description:
        '英語、フランス語、ドイツ語など40以上の言語を広告なし・ハート無制限でより速く学習。',
      highlights: [
        '中断なく練習できる無制限のハート',
        'レッスン後の広告ゼロ',
        '間違いの個別復習とレジェンドチャレンジ',
        '個人のプロフィールに直接有効化',
      ],
      duration: '',
      stockNote: '迅速納品',
    },
  },
  ko: {
    'eleven-reader': {
      name: 'Eleven Reader 12개월 울트라',
      category: '인공지능 & 오디오',
      description:
        '차세대 인공지능 음성으로 자연스러운 텍스트 낭독을 제공하는 12개월 울트라 액세스.',
      highlights: [
        '다국어 지원 초현실적 AI 음성',
        '12개월 활성 구독 보장',
        '책, PDF 및 기사를 음성으로 변환',
        '학습, 생산성 및 접근성에 이상적',
      ],
      duration: '12개월 울트라',
      promoBadge: '프리미엄 AI',
      stockNote: '빠른 전달',
    },
    'ilove-pdf-premium': {
      name: 'iLovePDF Premium 12개월',
      category: '생산성 & 문서',
      description:
        '제한 없이 PDF 파일을 병합, 분할, 압축, 변환 및 편집할 수 있는 완벽한 도구.',
      highlights: [
        '무제한 문서 변환 및 압축',
        '광학 텍스트 인식을 위한 전문 OCR',
        '계약서 및 PDF 디지털 편집 및 서명',
        '12개월 전체 프리미엄 라이선스',
      ],
      duration: '12개월',
      promoBadge: '슈퍼 특가',
      stockNote: '빠른 전달',
    },
    'mause-ai': {
      name: 'Mause AI 310억 토큰',
      category: '인공지능',
      description:
        '인공지능을 통한 고급 처리, 분석 및 생성을 위한 310억 토큰 패키지.',
      highlights: [
        '고용량 310억 토큰',
        '고급 추론 및 텍스트 모델',
        '전문 워크플로를 위한 빠른 생성',
        '계정에 직접 활성화',
      ],
      duration: '310억 토큰',
      promoBadge: '대용량 토큰',
      stockNote: '빠른 전달',
    },
    'coursera-plus': {
      name: 'Coursera Plus',
      category: '교육 & 자격증',
      description:
        '대학 전문 과정, 강좌 및 전문 자격증에 무제한 액세스.',
      highlights: [
        '7,000개 이상의 강좌 무제한 수강',
        '취업에 유효한 공식 수료증',
        '최고 대학의 전문화 과정',
        '나만의 속도로 학습',
      ],
      duration: '활성 구독',
      promoBadge: '인기 상품',
      stockNote: '빠른 전달',
    },
    'google-ai-pro': {
      name: 'Google AI Pro / Gemini',
      category: '인공지능',
      description:
        '작문, 분석, 프로그래밍 및 워크플로를 위한 Gemini Pro 기반 고급 인공지능.',
      highlights: [
        '최대 용량의 Gemini Pro',
        '심층 분석 및 코드 생성',
        '전문적인 글쓰기 및 리서치',
        'Google 도구와 통합',
      ],
      duration: '프리미엄 액세스',
      promoBadge: '인기 상품',
      stockNote: '빠른 전달',
    },
    'capcut-teams': {
      name: 'CapCut Teams (25일)',
      category: '비디오 편집',
      description:
        '콘텐츠 제작자 및 시청각 프로젝트를 위한 고급 도구를 갖춘 전문 비디오 편집기.',
      highlights: [
        '25일 전체 Pro Teams 액세스',
        'VIP 효과, 필터 및 전환',
        '고급 비디오용 AI 도구',
        '워터마크 없는 최고 해상도 내보내기',
      ],
      duration: '25일 보장',
      stockNote: '빠른 전달',
    },
    'microsoft-365': {
      name: 'Microsoft 365 패밀리',
      category: '생산성 & 클라우드',
      description:
        'Office 애플리케이션, 클라우드 스토리지 및 고급 생산성 도구를 위한 가족 구독.',
      highlights: [
        '전체 Word, Excel, PowerPoint 및 Outlook',
        '안전한 OneDrive 클라우드 스토리지',
        'PC, Mac, 태블릿 및 휴대폰에 설치 가능',
        '지속적인 업데이트 및 보안',
      ],
      duration: '공식 구독',
      stockNote: '빠른 전달',
    },
    'figma-pro': {
      name: 'Figma Pro (.edu)',
      category: 'UI/UX 디자인 & 프로토타이핑',
      description:
        '인터페이스 디자인, 프로토타이핑 및 고급 협업을 위한 2년 교육용 Pro 라이선스.',
      highlights: [
        '전체 2년 Pro 라이선스',
        '무제한 버전 기록',
        '제한 없는 실시간 협업',
        'FigJam 및 전체 라이브러리 액세스',
      ],
      duration: '2년 라이선스 (.edu)',
      promoBadge: '2년 라이선스',
      stockNote: '빠른 전달',
    },
    'duolingo-super': {
      name: 'Duolingo Super 패밀리',
      category: '교육 & 자격증',
      description:
        '광고 없이 무제한 하트로 영어, 프랑스어, 독일어 등 40개 이상의 언어를 더 빠르게 학습하세요.',
      highlights: [
        '중단 없는 연습을 위한 무제한 하트',
        '레슨 종료 후 광고 제로',
        '맞춤형 오답 노트 및 전설 챌린지',
        '개인 프로필에 직접 활성화',
      ],
      duration: '',
      stockNote: '빠른 전달',
    },
  },
  ar: {
    'eleven-reader': {
      name: 'Eleven Reader الترا 12 شهراً',
      category: 'الذكاء الاصطناعي والصوتيات',
      description:
        'وصول Ultra لمدة 12 شهراً لقراءة النصوص بشكل طبيعي بأحدث أصوات الذكاء الاصطناعي.',
      highlights: [
        'أصوات ذكاء اصطناعي واقعية للغاية بلغات متعددة',
        'اشتراك نشط مضمون لمدة 12 شهراً',
        'تحويل الكتب وملفات PDF والمقالات إلى صوت',
        'مثالي للدراسة والإنتاجية وإمكانية الوصول',
      ],
      duration: '12 شهراً Ultra',
      promoBadge: 'ذكاء اصطناعي مميز',
      stockNote: 'تسليم سريع',
    },
    'ilove-pdf-premium': {
      name: 'iLovePDF Premium لمدة 12 شهراً',
      category: 'الإنتاجية والمستندات',
      description:
        'أدوات كاملة لدمج وتقسيم وضغط وتحويل وتحرير ملفات PDF بلا حدود.',
      highlights: [
        'تحويل وضغط غير محدود للمستندات',
        'تقنية OCR احترافية للتعرف الضوئي على النصوص',
        'تحرير وتوقيع رقمي للعقود وملفات PDF',
        'ترخيص Premium كامل لمدة 12 شهراً',
      ],
      duration: '12 شهراً',
      promoBadge: 'سعر ممتاز',
      stockNote: 'تسليم سريع',
    },
    'mause-ai': {
      name: 'Mause AI باقة 31 مليار رمز (Tokens)',
      category: 'الذكاء الاصطناعي',
      description:
        'باقة 31 مليار توكن للمعالجة والتحليل والتوليد المتقدم باستخدام الذكاء الاصطناعي.',
      highlights: [
        '31 مليار توكن عالي السعة',
        'نماذج متقدمة للتفكير والنصوص',
        'توليد سريع لتدفقات العمل الاحترافية',
        'تفعيل مباشر في حسابك',
      ],
      duration: '31 مليار توكن',
      promoBadge: 'توكنات ضخمة',
      stockNote: 'تسليم سريع',
    },
    'coursera-plus': {
      name: 'Coursera Plus',
      category: 'التعليم والشهادات',
      description:
        'وصول غير محدود إلى التخصصات والدورات والشهادات المهنية الجامعية.',
      highlights: [
        'وصول غير محدود لأكثر من 7,000 دورة',
        'شهادات رسمية معتمدة مهنياً',
        'تخصصات من أفضل الجامعات العالمية',
        'تعلم بالسرعة التي تناسبك',
      ],
      duration: 'اشتراك نشط',
      promoBadge: 'الأكثر طلباً',
      stockNote: 'تسليم سريع',
    },
    'google-ai-pro': {
      name: 'Google AI Pro / Gemini',
      category: 'الذكاء الاصطناعي',
      description:
        'ذكاء اصطناعي متقدم مع Gemini Pro للكتابة والتحليل والبرمجة وتدفقات العمل.',
      highlights: [
        'Gemini Pro بأقصى قدرة',
        'تحليل عميق وتوليد الأكواد البرمجية',
        'كتابة احترافية وبحث علمي',
        'تكامل مع أدوات Google',
      ],
      duration: 'وصول مميز',
      promoBadge: 'الأكثر طلباً',
      stockNote: 'تسليم سريع',
    },
    'capcut-teams': {
      name: 'CapCut Teams (25 يوماً)',
      category: 'تحرير الفيديو',
      description:
        'محرر فيديو احترافي بأدوات متقدمة لصناع المحتوى والمشاريع المرئية.',
      highlights: [
        '25 يوماً من الوصول الكامل لـ Pro Teams',
        'تأثيرات وفلاتر وانتقالات VIP',
        'أدوات ذكاء اصطناعي متقدمة للفيديو',
        'تصدير بأعلى دقة بدون علامات مائية',
      ],
      duration: '25 يوماً مضمونة',
      stockNote: 'تسليم سريع',
    },
    'microsoft-365': {
      name: 'Microsoft 365 Family',
      category: 'الإنتاجية والسحابة',
      description:
        'اشتراك عائلي لتطبيقات Office والتخزين السحابي وأدوات الإنتاجية المتقدمة.',
      highlights: [
        'برامج Word وExcel وPowerPoint وOutlook كاملة',
        'تخزين سحابي آمن عبر OneDrive',
        'قابل للتثبيت على الكمبيوتر وMac والأجهزة اللوحية والهواتف',
        'تحديثات وأمان مستمر',
      ],
      duration: 'اشتراك رسمي',
      stockNote: 'تسليم سريع',
    },
    'figma-pro': {
      name: 'Figma Pro (.edu)',
      category: 'تصميم UI/UX والنماذج الأولية',
      description:
        'ترخيص تعليمي Pro لمدة عامين لتصميم الواجهات والنماذج الأولية والعمل التعاوني المتقدم.',
      highlights: [
        'عامان كاملان من ترخيص Pro',
        'سجل إصدارات غير محدود',
        'تعاون في الوقت الفعلي بلا حدود',
        'وصول إلى FigJam والمكتبات الكاملة',
      ],
      duration: 'ترخيص لمدة عامين (.edu)',
      promoBadge: 'ترخيص عامين',
      stockNote: 'تسليم سريع',
    },
    'duolingo-super': {
      name: 'Duolingo Super العائلي',
      category: 'التعليم والشهادات',
      description:
        'تعلم الإنجليزية أو الفرنسية أو الألمانية أو أكثر من 40 لغة بشكل أسرع، بدون إعلانات وبمحاولات غير محدودة.',
      highlights: [
        'محاولات غير محدودة للتدرب دون انقطاع',
        'صفر إعلانات بعد كل درس',
        'تدريب مخصص على الأخطاء وتحديات أسطورية',
        'يتم التفعيل مباشرة على ملفك الشخصي',
      ],
      duration: '',
      stockNote: 'تسليم سريع',
    },
  },
  hi: {
    'eleven-reader': {
      name: 'Eleven Reader 12 महीने Ultra',
      category: 'आर्टिफिशियल इंटेलिजेंस और ऑडियो',
      description:
        'अत्याधुनिक आर्टिफिशियल इंटेलिजेंस आवाज़ों के साथ प्राकृतिक टेक्स्ट रीडिंग के लिए 12 महीने का Ultra एक्सेस।',
      highlights: [
        'कई भाषाओं में अल्ट्रा-रियलिस्टिक AI आवाज़ें',
        '12 महीने की गारंटीकृत सक्रिय सदस्यता',
        'किताबों, PDF और लेखों को आवाज़ में बदलें',
        'अध्ययन, उत्पादकता और सुगम्यता के लिए आदर्श',
      ],
      duration: '12 महीने Ultra',
      promoBadge: 'प्रीमियम AI',
      stockNote: 'तेज़ डिलीवरी',
    },
    'ilove-pdf-premium': {
      name: 'iLovePDF Premium 12 महीने',
      category: 'उत्पादकता और दस्तावेज़',
      description:
        'बिना किसी सीमा के PDF फ़ाइलों को जोड़ने, विभाजित करने, कंप्रेस करने, बदलने और संपादित करने के संपूर्ण टूल।',
      highlights: [
        'असीमित दस्तावेज़ रूपांतरण और संपीड़न',
        'ऑप्टिकल टेक्स्ट पहचान के लिए प्रोफेशनल OCR',
        'अनुबंधों और PDF का डिजिटल संपादन और हस्ताक्षर',
        'पूरे 12 महीने का प्रीमियम लाइसेंस',
      ],
      duration: '12 महीने',
      promoBadge: 'सुपर कीमत',
      stockNote: 'तेज़ डिलीवरी',
    },
    'mause-ai': {
      name: 'Mause AI 31 बिलियन टोकन',
      category: 'आर्टिफिशियल इंटेलिजेंस',
      description:
        'आर्टिफिशियल इंटेलिजेंस के साथ उन्नत प्रोसेसिंग, विश्लेषण और जनरेशन के लिए 31 बिलियन टोकन पैकेज।',
      highlights: [
        '31 बिलियन उच्च-क्षमता वाले टोकन',
        'उन्नत तर्क और टेक्स्ट मॉडल',
        'पेशेवर वर्कफ़्लो के लिए तेज़ जनरेशन',
        'आपके खाते में सीधा एक्टिवेशन',
      ],
      duration: '31 बिलियन टोकन',
      promoBadge: 'विशाल टोकन',
      stockNote: 'तेज़ डिलीवरी',
    },
    'coursera-plus': {
      name: 'Coursera Plus',
      category: 'शिक्षा और प्रमाणन',
      description:
        'विश्वविद्यालय के स्पेशलाइजेशन, कोर्स और पेशेवर प्रमाणपत्रों तक असीमित पहुंच।',
      highlights: [
        '7,000+ कोर्सेज तक असीमित पहुंच',
        'करियर के लिए मान्य आधिकारिक प्रमाणपत्र',
        'शीर्ष विश्वविद्यालयों से स्पेशलाइजेशन',
        'अपनी गति से सीखें',
      ],
      duration: 'सक्रिय सदस्यता',
      promoBadge: 'सबसे अधिक मांग',
      stockNote: 'तेज़ डिलीवरी',
    },
    'google-ai-pro': {
      name: 'Google AI Pro / Gemini',
      category: 'आर्टिफिशियल इंटेलिजेंस',
      description:
        'लेखन, विश्लेषण, प्रोग्रामिंग और वर्कफ़्लो के लिए Gemini Pro के साथ उन्नत आर्टिफिशियल इंटेलिजेंस।',
      highlights: [
        'अधिकतम क्षमता वाला Gemini Pro',
        'गहन विश्लेषण और कोड जनरेशन',
        'पेशेवर लेखन और अनुसंधान',
        'Google टूल्स के साथ एकीकरण',
      ],
      duration: 'प्रीमियम एक्सेस',
      promoBadge: 'सबसे अधिक मांग',
      stockNote: 'तेज़ डिलीवरी',
    },
    'capcut-teams': {
      name: 'CapCut Teams (25 दिन)',
      category: 'वीडियो एडिटिंग',
      description:
        'कंटेंट क्रिएटर्स और ऑडियोविजुअल प्रोजेक्ट्स के लिए उन्नत टूल्स वाला प्रोफेशनल वीडियो एडिटर।',
      highlights: [
        '25 दिनों का पूर्ण Pro Teams एक्सेस',
        'VIP इफेक्ट्स, फिल्टर और ट्रांजिशन',
        'वीडियो के लिए उन्नत AI टूल्स',
        'बिना वॉटरमार्क के अधिकतम रेजोल्यूशन में एक्सपोर्ट',
      ],
      duration: '25 गारंटीकृत दिन',
      stockNote: 'तेज़ डिलीवरी',
    },
    'microsoft-365': {
      name: 'Microsoft 365 Family',
      category: 'उत्पादकता और क्लाउड',
      description:
        'Office एप्लिकेशन, क्लाउड स्टोरेज और उन्नत उत्पादकता टूल्स के लिए पारिवारिक सदस्यता।',
      highlights: [
        'संपूर्ण Word, Excel, PowerPoint और Outlook',
        'सुरक्षित OneDrive क्लाउड स्टोरेज',
        'PC, Mac, टैबलेट और मोबाइल पर इंस्टॉल करने योग्य',
        'निरंतर अपडेट और सुरक्षा',
      ],
      duration: 'आधिकारिक सदस्यता',
      stockNote: 'तेज़ डिलीवरी',
    },
    'figma-pro': {
      name: 'Figma Pro (.edu)',
      category: 'UI/UX डिज़ाइन और प्रोटोटाइपिंग',
      description:
        'इंटरफ़ेस डिज़ाइन, प्रोटोटाइपिंग और उन्नत सहयोगी कार्य के लिए 2-वर्षीय एजुकेशनल Pro लाइसेंस।',
      highlights: [
        'पूरे 2 साल का Pro लाइसेंस',
        'असीमित वर्शन हिस्ट्री',
        'बिना सीमा के रियल-टाइम सहयोग',
        'FigJam और संपूर्ण लाइब्रेरी तक पहुंच',
      ],
      duration: '2 साल का लाइसेंस (.edu)',
      promoBadge: '2 साल का लाइसेंस',
      stockNote: 'तेज़ डिलीवरी',
    },
    'duolingo-super': {
      name: 'Duolingo Super फैमिली',
      category: 'शिक्षा और प्रमाणन',
      description:
        'बिना विज्ञापनों और असीमित लाइफ के साथ अंग्रेजी, फ्रेंच, जर्मन या 40+ भाषाएं तेजी से सीखें।',
      highlights: [
        'बिना रुकावट अभ्यास के लिए असीमित लाइफ',
        'हर पाठ के बाद शून्य विज्ञापन',
        'गलतियों का व्यक्तिगत अभ्यास और लेजेंडरी चुनौतियां',
        'सीधे आपकी व्यक्तिगत प्रोफ़ाइल पर सक्रिय',
      ],
      duration: '',
      stockNote: 'तेज़ डिलीवरी',
    },
  },
  ru: {
    'eleven-reader': {
      name: 'Eleven Reader 12 месяцев Ultra',
      category: 'Искусственный интеллект и аудио',
      description:
        'Доступ Ultra на 12 месяцев для естественного озвучивания текстов голосами ИИ нового поколения.',
      highlights: [
        'Ультрареалистичные голоса ИИ на многих языках',
        '12 месяцев гарантированной активной подписки',
        'Преобразование книг, PDF и статей в речь',
        'Идеально для учебы, продуктивности и доступности',
      ],
      duration: '12 месяцев Ultra',
      promoBadge: 'Премиум ИИ',
      stockNote: 'Быстрая доставка',
    },
    'ilove-pdf-premium': {
      name: 'iLovePDF Premium 12 месяцев',
      category: 'Продуктивность и документы',
      description:
        'Полный набор инструментов для объединения, разделения, сжатия, конвертации и редактирования PDF без ограничений.',
      highlights: [
        'Безлимитная конвертация и сжатие документов',
        'Профессиональный OCR для оптического распознавания текста',
        'Цифровое редактирование и подпись договоров и PDF',
        'Полные 12 месяцев лицензии Premium',
      ],
      duration: '12 месяцев',
      promoBadge: 'Супер цена',
      stockNote: 'Быстрая доставка',
    },
    'mause-ai': {
      name: 'Mause AI 31 миллиард токенов',
      category: 'Искусственный интеллект',
      description:
        'Пакет из 31 миллиарда токенов для продвинутой обработки, анализа и генерации с помощью искусственного интеллекта.',
      highlights: [
        '31 миллиард токенов высокой емкости',
        'Продвинутые модели рассуждений и текста',
        'Быстрая генерация для профессиональных процессов',
        'Прямая активация на ваш аккаунт',
      ],
      duration: '31 млрд токенов',
      promoBadge: 'Массивные токены',
      stockNote: 'Быстрая доставка',
    },
    'coursera-plus': {
      name: 'Coursera Plus',
      category: 'Образование и сертификаты',
      description:
        'Безлимитный доступ к университетским специализациям, курсам и профессиональным сертификатам.',
      highlights: [
        'Безлимитный доступ к +7 000 курсов',
        'Официальные сертификаты для карьеры',
        'Специализации от топовых университетов',
        'Учитесь в удобном для вас темпе',
      ],
      duration: 'Активная подписка',
      promoBadge: 'Хит продаж',
      stockNote: 'Быстрая доставка',
    },
    'google-ai-pro': {
      name: 'Google AI Pro / Gemini',
      category: 'Искусственный интеллект',
      description:
        'Продвинутый искусственный интеллект с Gemini Pro для написания текстов, анализа, программирования и рабочих процессов.',
      highlights: [
        'Gemini Pro максимальной мощности',
        'Глубокий анализ и генерация кода',
        'Профессиональное написание текстов и исследования',
        'Интеграция с инструментами Google',
      ],
      duration: 'Премиум доступ',
      promoBadge: 'Хит продаж',
      stockNote: 'Быстрая доставка',
    },
    'capcut-teams': {
      name: 'CapCut Teams (25 дней)',
      category: 'Видеомонтаж',
      description:
        'Профессиональный видеоредактор с продвинутыми инструментами для создателей контента и видеопроектов.',
      highlights: [
        '25 дней полного доступа Pro Teams',
        'VIP эффекты, фильтры и переходы',
        'Продвинутые ИИ-инструменты для видео',
        'Экспорт в максимальном разрешении без водяных знаков',
      ],
      duration: '25 дней с гарантией',
      stockNote: 'Быстрая доставка',
    },
    'microsoft-365': {
      name: 'Microsoft 365 Family',
      category: 'Продуктивность и облако',
      description:
        'Семейная подписка на приложения Office, облачное хранилище и продвинутые инструменты продуктивности.',
      highlights: [
        'Полные версии Word, Excel, PowerPoint и Outlook',
        'Надежное облачное хранилище OneDrive',
        'Установка на ПК, Mac, планшеты и смартфоны',
        'Постоянные обновления и безопасность',
      ],
      duration: 'Официальная подписка',
      stockNote: 'Быстрая доставка',
    },
    'figma-pro': {
      name: 'Figma Pro (.edu)',
      category: 'UI/UX дизайн и прототипирование',
      description:
        'Образовательная лицензия Pro на 2 года для дизайна интерфейсов, прототипирования и совместной работы.',
      highlights: [
        'Полные 2 года лицензии Pro',
        'Безлимитная история версий',
        'Совместная работа в реальном времени без ограничений',
        'Доступ к FigJam и полным библиотекам',
      ],
      duration: 'Лицензия на 2 года (.edu)',
      promoBadge: 'Лицензия 2 года',
      stockNote: 'Быстрая доставка',
    },
    'duolingo-super': {
      name: 'Duolingo Super Семейный',
      category: 'Образование и сертификаты',
      description:
        'Изучайте английский, французский, немецкий и более 40 языков быстрее, без рекламы и с бесконечными жизнями.',
      highlights: [
        'Бесконечные жизни для практики без перерывов',
        'Ноль рекламы после каждого урока',
        'Персональная работа над ошибками и легендарные уровни',
        'Активируется прямо на ваш личный профиль',
      ],
      duration: '',
      stockNote: 'Быстрая доставка',
    },
  },
  tr: {
    'eleven-reader': {
      name: 'Eleven Reader 12 Ay Ultra',
      category: 'Yapay Zeka ve Ses',
      description:
        'Yeni nesil yapay zeka sesleriyle doğal metin okuma için 12 aylık Ultra erişim.',
      highlights: [
        'Birden fazla dilde ultra gerçekçi YZ sesleri',
        '12 Ay garantili aktif abonelik',
        'Kitapları, PDF’leri ve makaleleri sese dönüştürün',
        'Çalışma, verimlilik ve erişilebilirlik için ideal',
      ],
      duration: '12 Ay Ultra',
      promoBadge: 'Premium YZ',
      stockNote: 'Hızlı Teslimat',
    },
    'ilove-pdf-premium': {
      name: 'iLovePDF Premium 12 Ay',
      category: 'Verimlilik ve Belgeler',
      description:
        'PDF dosyalarını sınırsızca birleştirmek, bölmek, sıkıştırmak, dönüştürmek ve düzenlemek için eksiksiz araçlar.',
      highlights: [
        'Sınırsız belge dönüştürme ve sıkıştırma',
        'Optik metin tanıma için profesyonel OCR',
        'Sözleşmelerin ve PDF’lerin dijital düzenlenmesi ve imzalanması',
        'Tam 12 aylık Premium lisans',
      ],
      duration: '12 Ay',
      promoBadge: 'Süper Fiyat',
      stockNote: 'Hızlı Teslimat',
    },
    'mause-ai': {
      name: 'Mause AI 31 Milyar Token',
      category: 'Yapay Zeka',
      description:
        'Yapay zeka ile gelişmiş işleme, analiz ve üretim için 31 milyar token paketi.',
      highlights: [
        '31 Milyar yüksek kapasiteli token',
        'Gelişmiş akıl yürütme ve metin modelleri',
        'Profesyonel iş akışları için hızlı üretim',
        'Hesabınızda doğrudan aktivasyon',
      ],
      duration: '31 Milyar Token',
      promoBadge: 'Devasa Token',
      stockNote: 'Hızlı Teslimat',
    },
    'coursera-plus': {
      name: 'Coursera Plus',
      category: 'Eğitim ve Sertifikalar',
      description:
        'Üniversite uzmanlıklarına, kurslara ve profesyonel sertifikalara sınırsız erişim.',
      highlights: [
        '+7.000 kursa sınırsız erişim',
        'İş hayatında geçerli resmi sertifikalar',
        'En iyi üniversitelerden uzmanlıklar',
        'Kendi hızınızda öğrenin',
      ],
      duration: 'Aktif Abonelik',
      promoBadge: 'En Çok İstenen',
      stockNote: 'Hızlı Teslimat',
    },
    'google-ai-pro': {
      name: 'Google AI Pro / Gemini',
      category: 'Yapay Zeka',
      description:
        'Yazım, analiz, programlama ve iş akışları için Gemini Pro ile gelişmiş yapay zeka.',
      highlights: [
        'Maksimum kapasiteli Gemini Pro',
        'Derin analiz ve kod üretimi',
        'Profesyonel yazım ve araştırma',
        'Google araçlarıyla entegrasyon',
      ],
      duration: 'Premium Erişim',
      promoBadge: 'En Çok İstenen',
      stockNote: 'Hızlı Teslimat',
    },
    'capcut-teams': {
      name: 'CapCut Teams (25 Gün)',
      category: 'Video Düzenleme',
      description:
        'İçerik üreticileri ve görsel-işitsel projeler için gelişmiş araçlara sahip profesyonel video düzenleyici.',
      highlights: [
        '25 Gün tam Pro Teams erişimi',
        'VIP efektler, filtreler ve geçişler',
        'Video için gelişmiş YZ araçları',
        'Filigransız maksimum çözünürlükte dışa aktarma',
      ],
      duration: '25 Garantili Gün',
      stockNote: 'Hızlı Teslimat',
    },
    'microsoft-365': {
      name: 'Microsoft 365 Family',
      category: 'Verimlilik ve Bulut',
      description:
        'Office uygulamaları, bulut depolama ve gelişmiş üretkenlik araçları için aile aboneliği.',
      highlights: [
        'Tam Word, Excel, PowerPoint ve Outlook',
        'Güvenli OneDrive bulut depolama',
        'PC, Mac, tablet ve telefonlara kurulabilir',
        'Sürekli güncellemeler ve güvenlik',
      ],
      duration: 'Resmi Abonelik',
      stockNote: 'Hızlı Teslimat',
    },
    'figma-pro': {
      name: 'Figma Pro (.edu)',
      category: 'UI/UX Tasarım ve Prototipleme',
      description:
        'Arayüz tasarımı, prototipleme ve gelişmiş ortak çalışma için 2 yıllık eğitim Pro lisansı.',
      highlights: [
        'Tam 2 yıllık Pro lisans',
        'Sınırsız sürüm geçmişi',
        'Sınırsız gerçek zamanlı işbirliği',
        'FigJam ve tam kütüphanelere erişim',
      ],
      duration: '2 Yıllık Lisans (.edu)',
      promoBadge: '2 Yıllık Lisans',
      stockNote: 'Hızlı Teslimat',
    },
    'duolingo-super': {
      name: 'Duolingo Super Aile',
      category: 'Eğitim ve Sertifikalar',
      description:
        'İngilizce, Fransızca, Almanca veya 40’tan fazla dili reklamsız ve sınırsız canla daha hızlı öğrenin.',
      highlights: [
        'Kesintisiz pratik için sınırsız can',
        'Her ders sonunda sıfır reklam',
        'Kişiselleştirilmiş hata pratiği ve efsanevi görevler',
        'Doğrudan kişisel profilinizde etkinleştirilir',
      ],
      duration: '',
      stockNote: 'Hızlı Teslimat',
    },
  },
};

function resolveCanonicalId(product: Product): string | null {
  const id = (product.id || '').toLowerCase();
  const name = (product.name || '').toLowerCase();

  if (PRODUCT_TRANSLATIONS.es[id]) return id;
  if (id === 'figma-pro-edu' || name.includes('figma')) return 'figma-pro';
  if (id === 'ilovepdf-premium' || name.includes('ilove pdf') || name.includes('ilovepdf')) return 'ilove-pdf-premium';
  if (id === 'google-ai-pro-gemini' || name.includes('google ai') || name.includes('gemini')) return 'google-ai-pro';
  if (id === 'microsoft-365-family' || name.includes('microsoft 365') || name.includes('office 365')) return 'microsoft-365';
  if (id === 'eleven-reader-ultra' || name.includes('eleven reader') || name.includes('elevenreader')) return 'eleven-reader';
  if (id === 'mause-ai-tokens' || name.includes('mause ai')) return 'mause-ai';
  if (id === 'duolingo-super-familiar' || name.includes('duolingo')) return 'duolingo-super';
  if (id.includes('coursera') || name.includes('coursera')) return 'coursera-plus';
  if (id.includes('capcut') || name.includes('capcut')) return 'capcut-teams';
  return null;
}

function localizeDynamicCategory(category: string, lang: LanguageCode): string {
  const clean = (category || '').trim();
  const lower = clean.toLowerCase();
  if (lower.includes('streaming') || lower.includes('entretenimiento') || lower.includes('entertainment')) {
    if (lang === 'es') return 'Streaming & Entretenimiento';
    if (lang === 'en') return 'Streaming & Entertainment';
    if (lang === 'pt') return 'Streaming & Entretenimento';
    if (lang === 'fr') return 'Streaming & Divertissement';
    if (lang === 'de') return 'Streaming & Unterhaltung';
    if (lang === 'it') return 'Streaming & Intrattenimento';
  }
  return clean;
}

function localizeDynamicStockNote(stockNote: string | undefined, lang: LanguageCode): string {
  const raw = (stockNote || 'Entrega Rápida').trim();
  if (/^(entrega\s+r[aá]pida|fast\s+delivery|livraison\s+rapide)$/i.test(raw)) {
    if (lang === 'es' || lang === 'pt') return 'Entrega Rápida';
    if (lang === 'en') return 'Fast Delivery';
    if (lang === 'fr') return 'Livraison Rapide';
    if (lang === 'de') return 'Schnelle Lieferung';
    if (lang === 'it') return 'Consegna Rapida';
  }
  return raw;
}

function localizeLiveFirestoreProduct(product: Product, lang: LanguageCode): Product | null {
  const nameLower = (product.name || '').toLowerCase();
  const idLower = (product.id || '').toLowerCase();

  // 1) Disney cuenta completa ($200 MXN / $11.66 USDT - 12 meses - categoría Streaming)
  if (nameLower.includes('disney') || idLower.includes('disney')) {
    const map: Record<string, Partial<Product>> = {
      es: {
        name: 'Disney cuenta completa',
        category: 'Streaming',
        description: 'Cuenta completa de Disney+ por 12 meses para disfrutar series, películas y deportes en vivo sin interrupciones.',
        highlights: [
          '12 Meses de cuenta completa garantizada',
          'Perfiles simultáneos y reproducción en 4K HDR',
          'Deportes en vivo con ESPN y estrenos exclusivos',
          'Entrega rápida y garantía durante todo el año',
        ],
        duration: '12 Meses',
        promoBadge: product.promoBadge ? 'Cuenta Completa' : undefined,
        stockNote: 'Entrega Rápida',
      },
      en: {
        name: 'Disney Full Account',
        category: 'Streaming',
        description: 'Full 12-month Disney+ account to enjoy series, movies, and live sports without interruptions.',
        highlights: [
          '12 Months guaranteed full account',
          'Multiple profiles and 4K HDR playback',
          'Live sports with ESPN and exclusive premieres',
          'Fast delivery and full-year warranty',
        ],
        duration: '12 Months',
        promoBadge: product.promoBadge ? 'Full Account' : undefined,
        stockNote: 'Fast Delivery',
      },
      pt: {
        name: 'Disney Conta Completa',
        category: 'Streaming',
        description: 'Conta completa Disney+ por 12 meses para curtir séries, filmes e esportes ao vivo sem interrupções.',
        highlights: [
          '12 Meses de conta completa garantida',
          'Perfis simultâneos e reprodução em 4K HDR',
          'Esportes ao vivo com ESPN e estreias exclusivas',
          'Entrega rápida e garantia durante todo o ano',
        ],
        duration: '12 Meses',
        promoBadge: product.promoBadge ? 'Conta Completa' : undefined,
        stockNote: 'Entrega Rápida',
      },
      fr: {
        name: 'Disney Compte Complet',
        category: 'Streaming',
        description: 'Compte complet Disney+ pendant 12 mois pour profiter des séries, films et sports en direct sans interruption.',
        highlights: [
          '12 Mois de compte complet garanti',
          'Profils simultanés et lecture en 4K HDR',
          'Sports en direct avec ESPN et sorties exclusives',
          'Livraison rapide et garantie toute l’année',
        ],
        duration: '12 Mois',
        promoBadge: product.promoBadge ? 'Compte Complet' : undefined,
        stockNote: 'Livraison Rapide',
      },
    };
    const tr = map[lang] || map.en;
    return { ...product, ...tr };
  }

  // 2) Netflix cuenta completa ($300 MXN / $17.00 USDT - 12 meses - categoría Streaming)
  if (nameLower.includes('netflix') || idLower.includes('netflix')) {
    const map: Record<string, Partial<Product>> = {
      es: {
        name: 'Netflix cuenta completa',
        category: 'Streaming',
        description: 'Cuenta completa de Netflix Premium Ultra HD 4K por 12 meses con acceso completo al catálogo internacional de series y películas.',
        highlights: [
          '12 Meses de cuenta completa Netflix Premium 4K Ultra HD',
          'Sin anuncios y con descargas disponibles',
          'Compatible con Smart TV, celular, tablet y PC',
          'Activación inmediata y soporte garantizado',
        ],
        duration: '12 Meses',
        promoBadge: product.promoBadge ? 'Cuenta Completa' : undefined,
        stockNote: 'Entrega Rápida',
      },
      en: {
        name: 'Netflix Full Account',
        category: 'Streaming',
        description: 'Full 12-month Netflix Premium Ultra HD 4K account with complete access to the international series and movies catalog.',
        highlights: [
          '12 Months of full account Netflix Premium 4K Ultra HD',
          'Ad-free streaming with offline downloads',
          'Compatible with Smart TV, phone, tablet, and PC',
          'Immediate activation and guaranteed support',
        ],
        duration: '12 Months',
        promoBadge: product.promoBadge ? 'Full Account' : undefined,
        stockNote: 'Fast Delivery',
      },
      pt: {
        name: 'Netflix Conta Completa',
        category: 'Streaming',
        description: 'Conta completa Netflix Premium Ultra HD 4K por 12 meses com acesso completo ao catálogo internacional de séries e filmes.',
        highlights: [
          '12 Meses de conta completa Netflix Premium 4K Ultra HD',
          'Sem anúncios e com downloads disponíveis',
          'Compatível com Smart TV, celular, tablet e PC',
          'Ativação imediata e suporte garantido',
        ],
        duration: '12 Meses',
        promoBadge: product.promoBadge ? 'Conta Completa' : undefined,
        stockNote: 'Entrega Rápida',
      },
      fr: {
        name: 'Netflix Compte Complet',
        category: 'Streaming',
        description: 'Compte complet Netflix Premium Ultra HD 4K de 12 mois avec accès complet au catalogue international de séries et films.',
        highlights: [
          '12 Mois de compte complet Netflix Premium 4K Ultra HD',
          'Sans publicité et téléchargements hors ligne',
          'Compatible Smart TV, mobile, tablette et PC',
          'Activation immédiate et support garanti',
        ],
        duration: '12 Mois',
        promoBadge: product.promoBadge ? 'Compte Complet' : undefined,
        stockNote: 'Livraison Rapide',
      },
    };
    const tr = map[lang] || map.en;
    return { ...product, ...tr };
  }

  // 3) Granola Business ($150 MXN / $8.74 USDT - 12 meses - Notas Empresariales (Sin Recompensa))
  if (nameLower.includes('granola') || idLower.includes('granola')) {
    const map: Record<string, Partial<Product>> = {
      es: {
        name: 'Granola Business',
        category: 'Notas Empresariales (Sin Recompensa)',
        description: 'Bloc de notas empresarial con inteligencia artificial por 12 meses para transcribir, resumir y organizar reuniones automáticamente.',
        highlights: [
          '12 Meses de suscripción activa Granola Business',
          'Transcripción y resúmenes automáticos de reuniones',
          'Plantillas inteligentes para equipos y negocios',
          'Compatible con Mac, Windows y plataformas de videollamada',
        ],
        duration: '12 Meses',
        promoBadge: product.promoBadge ? 'Plan Business' : undefined,
        stockNote: 'Entrega Rápida',
      },
      en: {
        name: 'Granola Business',
        category: 'Business Notes (Non-Reward)',
        description: '12-month enterprise AI notepad that automatically transcribes, summarizes, and organizes your meetings.',
        highlights: [
          '12 Months of active Granola Business subscription',
          'Automatic meeting transcription and smart summaries',
          'Intelligent templates for teams and business',
          'Compatible with Mac, Windows, and video call platforms',
        ],
        duration: '12 Months',
        promoBadge: product.promoBadge ? 'Business Plan' : undefined,
        stockNote: 'Fast Delivery',
      },
      pt: {
        name: 'Granola Business',
        category: 'Notas Empresariais (Sem Recompensa)',
        description: 'Bloco de notas empresarial com inteligência artificial por 12 meses para transcrever, resumir e organizar reuniões automaticamente.',
        highlights: [
          '12 Meses de assinatura ativa Granola Business',
          'Transcrição e resumos automáticos de reuniões',
          'Modelos inteligentes para equipes e negócios',
          'Compatível com Mac, Windows e plataformas de videochamada',
        ],
        duration: '12 Meses',
        promoBadge: product.promoBadge ? 'Plano Business' : undefined,
        stockNote: 'Entrega Rápida',
      },
      fr: {
        name: 'Granola Business',
        category: 'Notes d’Entreprise (Sans Récompense)',
        description: 'Bloc-notes d’entreprise propulsé par l’IA pendant 12 mois pour transcrire, résumer et organiser vos réunions automatiquement.',
        highlights: [
          '12 Mois d’abonnement actif Granola Business',
          'Transcription et résumés automatiques de réunions',
          'Modèles intelligents pour équipes et entreprises',
          'Compatible Mac, Windows et plateformes de visioconférence',
        ],
        duration: '12 Mois',
        promoBadge: product.promoBadge ? 'Forfait Business' : undefined,
        stockNote: 'Livraison Rapide',
      },
    };
    const tr = map[lang] || map.en;
    return { ...product, ...tr };
  }

  return null;
}

function normalizeTranslatedDuration(duration: string, canonicalId: string | null, lang: LanguageCode): string {
  // Duolingo Super Familiar has NO declared duration
  if (canonicalId === 'duolingo-super') {
    return '';
  }

  const clean = (duration || '').trim();
  const isGeneric =
    !clean ||
    /^(suscripci[oó]n\s+activa|acceso\s+premium|suscripci[oó]n\s+oficial|active\s+subscription|premium\s+access|official\s+subscription|assinatura\s+ativa|acesso\s+premium|assinatura\s+oficial|abonnement\s+actif|acc[eè]s\s+premium|abonnement\s+officiel)$/i.test(
      clean
    );

  if (!isGeneric) return clean;

  if (canonicalId === 'google-ai-pro') {
    if (lang === 'en') return '18 Months';
    if (lang === 'fr') return '18 Mois';
    return '18 Meses';
  }
  if (canonicalId === 'figma-pro') {
    if (lang === 'en') return '2-Year License (.edu)';
    if (lang === 'fr') return 'Licence de 2 Ans (.edu)';
    if (lang === 'pt') return '2 Anos de Licença (.edu)';
    return '2 Años de Licencia (.edu)';
  }
  if (canonicalId === 'capcut-teams') {
    if (lang === 'en') return '25 Guaranteed Days';
    if (lang === 'fr') return '25 Jours Garantis';
    if (lang === 'pt') return '25 Dias Garantidos';
    return '25 Días Garantizados';
  }
  if (canonicalId === 'mause-ai') {
    return '31 Billon Tokens';
  }
  if (canonicalId === 'eleven-reader') {
    if (lang === 'en') return '12 Months Ultra';
    if (lang === 'fr') return '12 Mois Ultra';
    return '12 Meses Ultra';
  }
  if (lang === 'en') return '12 Months';
  if (lang === 'fr') return '12 Mois';
  return '12 Meses';
}

export function getLocalizedProduct(product: Product, lang: LanguageCode): Product {
  // First check if this is one of the live Firestore products (Disney, Netflix, Granola)
  const liveLocalized = localizeLiveFirestoreProduct(product, lang);
  if (liveLocalized) {
    return liveLocalized;
  }

  const canonicalId = resolveCanonicalId(product);
  const langDict = PRODUCT_TRANSLATIONS[lang] || PRODUCT_TRANSLATIONS.es;
  const translated = (canonicalId && langDict[canonicalId]) || langDict[product.id];

  if (!translated) {
    return {
      ...product,
      category: localizeDynamicCategory(product.category, lang),
      duration: normalizeTranslatedDuration(product.duration, canonicalId, lang),
      stockNote: localizeDynamicStockNote(product.stockNote, lang),
    };
  }

  return {
    ...product,
    name: lang === 'es' ? product.name : translated.name,
    category: translated.category,
    description: translated.description,
    highlights: translated.highlights,
    duration: normalizeTranslatedDuration(translated.duration, canonicalId, lang),
    promoBadge: product.promoBadge ? translated.promoBadge || product.promoBadge : '',
    stockNote: translated.stockNote || localizeDynamicStockNote(product.stockNote, lang),
  };
}
