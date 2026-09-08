export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Desarrollo Web' | 'Diseño Print' | 'Redes Sociales' | 'Branding';
  year: string;
  client: string;
  location: string;
  heroImage: string;
  secondaryImage: string;
  gallery: string[];
  summary: string;
  challenge: string;
  solution: string;
  services: string[];
  technologies?: string[];
  results: {
    label: string;
    value: string;
  }[];
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "aura-digital",
    title: "Aura Digital",
    subtitle: "Plataforma e-commerce inmersiva con experiencia 3D interactiva",
    category: "Desarrollo Web",
    year: "2024",
    client: "Aura Luxury Tech",
    location: "Ciudad de México",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop"
    ],
    summary: "Diseño y desarrollo de una tienda en línea de productos de lujo con renders 3D interactivos, animaciones avanzadas y tiempos de carga ultra rápidos.",
    challenge: "El cliente necesitaba transformar su catálogo físico de gama alta en una experiencia digital sofisticada que reflejara la exclusividad de la marca sin sacrificar rendimiento móvil.",
    solution: "Implementamos Next.js con Three.js y Tailwind CSS para lograr microinteracciones fluidas, animaciones con Framer Motion y checkout optimizado.",
    services: [
      "Diseño UI/UX Inmersivo",
      "Desarrollo Frontend Next.js",
      "Modelado & Integración 3D",
      "Optimización de Conversiones"
    ],
    technologies: ["Next.js", "Three.js", "Tailwind CSS", "Framer Motion", "Stripe API"],
    results: [
      { label: "Aumento en tasa de conversión", value: "+145%" },
      { label: "Tiempo promedio en sitio", value: "4m 32s" },
      { label: "Puntaje Lighthouse Speed", value: "98/100" }
    ],
    featured: true
  },
  {
    id: "2",
    slug: "kroma-studio",
    title: "Kroma Studio",
    subtitle: "Sistema de identidad visual integral y guía de marca global",
    category: "Branding",
    year: "2024",
    client: "Kroma Creative Group",
    location: "Guadalajara, Jalisco",
    heroImage: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1542744094-3a31b272c490?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop"
    ],
    summary: "Rediseño completo del sistema de marca para un estudio de arquitectura y diseño de interiores, incluyendo logotipo dinámico, tipografía a medida y papelería corporativa.",
    challenge: "Posicionar a la firma como un referente internacional renovando una imagen que lucía desactualizada y rígida.",
    solution: "Construimos una arquitectura de marca flexible basada en formas geométricas minimalistas con una paleta cromática sobria enriquecida con matices cyan y metálicos.",
    services: [
      "Estrategia de Marca",
      "Diseño de Logotipo & Tipografía",
      "Manual de Identidad Visual",
      "Papelería Física & Merchandising"
    ],
    results: [
      { label: "Reconocimiento de marca", value: "+85%" },
      { label: "Nuevos clientes corporativos", value: "+120%" }
    ],
    featured: true
  },
  {
    id: "3",
    slug: "nebula-magazine",
    title: "Nébula Magazine",
    subtitle: "Edición impresa de colección y maquetación de revista cultural",
    category: "Diseño Print",
    year: "2024",
    client: "Editorial Nébula",
    location: "Monterrey, N.L.",
    heroImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=1200&auto=format&fit=crop"
    ],
    summary: "Diseño editorial de una publicación bimestral especializada en diseño contemporáneo, arquitectura y tecnología con acabados en serigrafía e impresiones táctiles.",
    challenge: "Crear un objeto de deseo físico en una era predominantemente digital que atraiga a coleccionistas y entusiastas del diseño.",
    solution: "Seleccionamos papeles finos texturizados, esquemas reticulares audaces y una dirección de arte fotográfica limpia que realza cada contenido.",
    services: [
      "Diseño Editorial & Retícula",
      "Dirección de Arte Fotográfica",
      "Gestión de Prensa e Impresión Premium",
      "Empaque & Distribución"
    ],
    results: [
      { label: "Ejemplares vendidos en lanzamiento", value: "10,000+" },
      { label: "Premio Diseño Editorial 2024", value: "Ganador Gold" }
    ],
    featured: true
  },
  {
    id: "4",
    slug: "vortex-social",
    title: "Vortex Social",
    subtitle: "Estrategia integral de contenido visual y motion graphics para redes sociales",
    category: "Redes Sociales",
    year: "2024",
    client: "Vortex Energy Drink",
    location: "Miami / Latam",
    heroImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop"
    ],
    summary: "Creación de contenidos en formato vertical, animaciones en 3D/2D para Instagram, TikTok y YouTube Shorts impulsando el alcance orgánico de la marca.",
    challenge: "Captar la atención de la Generación Z en menos de 3 segundos en feeds saturados de información.",
    solution: "Diseñamos un lenguaje visual dinámico con cortes rápidos, colores vibrantes, tipografías hiper-expresivas y plantillas automatizadas.",
    services: [
      "Motion Graphics 2D/3D",
      "Diseño de Plantillas para Social Media",
      "Estrategia Visual de Contenido",
      "Edición de Video en Formato Corto"
    ],
    results: [
      { label: "Impresiones totales en 3 meses", value: "4.2M" },
      { label: "Crecimiento de seguidores", value: "+320%" }
    ],
    featured: true
  },
  {
    id: "5",
    slug: "zenith-architecture",
    title: "Zenith Architecture",
    subtitle: "Portal web de arquitectura de alta gama con recorridos interactivos",
    category: "Desarrollo Web",
    year: "2023",
    client: "Zenith Group",
    location: "Madrid, España",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
    ],
    summary: "Diseño e implementación de un sitio web ultralimpio orientado a mostrar obras arquitectónicas monumentales con navegación horizontal y transiciones fluidas.",
    challenge: "Exhibir fotografías de alta resolución sin degradar la velocidad de carga ni la experiencia táctil en smartphones.",
    solution: "Desarrollo con renderizado híbrido Server/Client en Next.js, optimización agresiva de imágenes WebP/AVIF y animaciones en scroll con GSAP.",
    services: [
      "Arquitectura de Información",
      "Diseño UI/UX Minimalista",
      "Desarrollo Full-stack",
      "SEO Técnico Internacional"
    ],
    results: [
      { label: "Leads calificados mensuales", value: "+95" },
      { label: "Tiempo de carga inicial", value: "0.8s" }
    ],
    featured: false
  },
  {
    id: "6",
    slug: "lumina-coffee",
    title: "Lumina Specialty Coffee",
    subtitle: "Empaques eco-friendly y línea de papelería para café de especialidad",
    category: "Diseño Print",
    year: "2023",
    client: "Lumina Roasters",
    location: "Oaxaca, México",
    heroImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=1200&auto=format&fit=crop"
    ],
    summary: "Desarrollo de empaques compostables con ilustraciones vectoriales botánicas hechas a mano y sistema de etiquetas variables por origen de grano.",
    challenge: "Unificar el respeto por el medio ambiente con una estética de lujo accesible para barras de café gourmet.",
    solution: "Utilizamos tintas vegetales de soya sobre papel kraft reciclado de algodón e stampados en hot-stamping holográfico.",
    services: [
      "Diseño de Packaging",
      "Ilustración Botánica Personalizada",
      "Selección de Materiales Sustentables",
      "Supervisión de Producción de Imprenta"
    ],
    results: [
      { label: "Ventas de empaques en tiendas", value: "+180%" },
      { label: "Huella de carbono reducida", value: "-40%" }
    ],
    featured: false
  },
  {
    id: "7",
    slug: "pulse-campaign",
    title: "Pulse Digital Campaign",
    subtitle: "Campaña visual multicanal y dirección de contenido en redes sociales",
    category: "Redes Sociales",
    year: "2023",
    client: "Pulse Audio Headphones",
    location: "Bogotá, Colombia",
    heroImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1200&auto=format&fit=crop"
    ],
    summary: "Creación y ejecución de la campaña de lanzamiento para una línea de audífonos inalámbricos premium con foco en la generación de contenido dinámico.",
    challenge: "Conectar con audiófilos exigentes y apasionados de la moda urbana mediante una propuesta estética vanguardista.",
    solution: "Desarrollamos una parrilla de contenidos con videos 3D de explosión de componentes, renders cromáticos y colaboraciones con creadores visuales.",
    services: [
      "Dirección Creativa de Campaña",
      "Social Media Graphics & Reels",
      "Diseño de Anuncios Publicitarios (Paid Media)",
      "Storytelling de Producto"
    ],
    results: [
      { label: "ROAS promedio en Ads", value: "4.8x" },
      { label: "Alcance total de campaña", value: "8.5M" }
    ],
    featured: false
  },
  {
    id: "8",
    slug: "stellar-pay",
    title: "Stellar Pay Fintech",
    subtitle: "Plataforma web bancaria y diseño de marca digital para Neobanco",
    category: "Branding",
    year: "2024",
    client: "Stellar Financial",
    location: "Santiago, Chile",
    heroImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0a67daf40955?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop"
    ],
    summary: "Creación de la marca, sistema de diseño en Figma (Design System) y desarrollo web promocional para una de las aplicaciones financieras con mayor crecimiento en LATAM.",
    challenge: "Transmitir la seguridad de un banco tradicional combinada con la innovación tecnológica de una startup moderna.",
    solution: "Diseñamos un ecosistema de marca con tonos azul marino profundo, gradientes cyan y un sistema de componentes modular perfectamente escalable.",
    services: [
      "Estrategia & Naming",
      "Design System UI/UX",
      "Desarrollo Web Next.js",
      "Tarjetas de Crédito Físicas & Virtuales"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Figma"],
    results: [
      { label: "Usuarios registrados en pre-lanzamiento", value: "50,000+" },
      { label: "Satisfacción de usuario UI", value: "4.9/5" }
    ],
    featured: true
  }
];

export const SERVICES = [
  {
    id: "web",
    number: "01",
    title: "Diseño & Desarrollo Web",
    description: "Crearemos sitios web y aplicaciones web a medida con las últimas tecnologías (Next.js, React, Tailwind). Animaciones fluidas, velocidad de carga instantánea y optimización SEO.",
    items: [
      "Sitios Web Corporativos & Portafolios",
      "Tiendas en Línea (E-Commerce)",
      "Aplicaciones Web Interactivas (Web Apps)",
      "Optimización de Rendimiento & SEO"
    ]
  },
  {
    id: "print",
    number: "02",
    title: "Diseño Print & Editorial",
    description: "Llevamos la esencia de tu marca al mundo físico con materiales impresos de la más alta calidad, terminados de lujo y diseño editorial de nivel internacional.",
    items: [
      "Papelería Corporativa & Tarjetas",
      "Revistas, Catálogos & Libros",
      "Empaques, Etiquetas & Packaging",
      "Impresión de Gran Formato & Espectaculares"
    ]
  },
  {
    id: "social",
    number: "03",
    title: "Redes Sociales & Contenido",
    description: "Potenciamos la presencia digital de tu negocio con contenido visual impactante, animación en motion graphics y estrategias adaptadas a las tendencias.",
    items: [
      "Plantillas Visuales para Instagram & TikTok",
      "Motion Graphics 2D & 3D para Reels/Shorts",
      "Diseño de Banners Publicitarios (Paid Ads)",
      "Dirección de Arte & Contenido Creativo"
    ]
  },
  {
    id: "branding",
    number: "04",
    title: "Branding e Identidad Visual",
    description: "Construimos identidades de marca sólidas y memorables desde el concepto y el logotipo hasta el manual de marca y la voz comunicativa.",
    items: [
      "Estrategia de Marca & Naming",
      "Diseño de Logotipo & Tipografía",
      "Manuales de Identidad Visual",
      "Design Systems & Guías UI"
    ]
  }
];
