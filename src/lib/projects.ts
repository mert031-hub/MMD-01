export type Project = {
  slug: string;
  industry: { tr: string; en: string };
  name: string;
  transformation: { tr: string; en: string };
  challenge: { tr: string; en: string };
  approach: { tr: string; en: string };
  deliverables: { tr: string[]; en: string[] };
  /** Public-folder paths (without leading slash) for screenshots, if available. */
  images: {
    desktop: string;
    mobile?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "pi-lot-engineering",
    industry: { tr: "Mühendislik", en: "Engineering" },
    name: "Pi-Lot Engineering",
    transformation: {
      tr: "Teknik uzmanlık, dijital otoriteye dönüştü.",
      en: "Technical expertise transformed into digital authority.",
    },
    challenge: {
      tr: "Pi-Lot Engineering, güçlü bir teknik alt yapıya ve kanıtlanmış uzmanlığa sahipti — ancak bu değer dijitalde görünmüyordu. Potansiyel müşteriler firmanın gerçek kapasitesini anlayamıyor, rakiplerden nasıl ayrıştığını göremiyordu.",
      en: "Pi-Lot Engineering had strong technical foundations and proven expertise — but none of this was visible online. Potential clients couldn't gauge the firm's real capability or understand what set them apart from competitors.",
    },
    approach: {
      tr: "Teknik otoriteyi ön plana çıkaran, sektöre özgü bir dijital kimlik oluşturduk. Tasarım dili netlik ve güven üzerine kuruldu; karmaşıklık değil, kompetans konuşuyor. Yapı, müşteri adaylarının kararlarını hızlandıracak şekilde kurgulandı.",
      en: "We created a sector-specific digital identity that leads with technical authority. The design language is built on clarity and trust — competence speaks, not complexity. The structure was designed to accelerate decision-making for prospective clients.",
    },
    deliverables: {
      tr: [
        "Kurumsal web sitesi",
        "Hizmet mimarisi ve sayfa yapısı",
        "Teknik içerik çerçevesi",
      ],
      en: [
        "Corporate website",
        "Service architecture and page structure",
        "Technical content framework",
      ],
    },
    images: {
      desktop: "projects/pi-lot/desktop.png",
      mobile: "projects/pi-lot/mobile.png",
    },
  },
  {
    slug: "kaleiici-hotel",
    industry: { tr: "Konaklama", en: "Hospitality" },
    name: "Kaleiçi Hotel",
    transformation: {
      tr: "200 yıllık bir miras, modern rezervasyonlar için yeniden tasarlandı.",
      en: "200 years of heritage, redesigned for modern bookings.",
    },
    challenge: {
      tr: "Tarihi bir mülk olarak Kaleiçi Hotel, kendine özgü hikayesini anlatacak ve aynı zamanda sorunsuz bir rezervasyon deneyimi sunacak bir dijital varlığa ihtiyaç duyuyordu. Eski dijital görünümü, mülkün gerçek karakterini yansıtmıyordu.",
      en: "As a historic property, Kaleiçi Hotel needed a digital presence that could tell its unique story while guiding visitors toward a seamless booking experience. The previous digital appearance didn't reflect the true character of the property.",
    },
    approach: {
      tr: "Mirasın görsel dilini korurken modern konuk beklentilerini karşılayan bir tasarım oluşturduk. Her ekran, konuğun mülkü hissetmesini sağlar; her adım, rezervasyona yaklaştırır. İçerik hiyerarşisi, atmosferi önce hissettirip ardından eyleme yönlendirir.",
      en: "We built a design that honors the visual language of heritage while meeting modern guest expectations. Every screen immerses the visitor in the property; every step moves them toward a booking. Content hierarchy creates atmosphere first, then guides toward action.",
    },
    deliverables: {
      tr: [
        "Otel web sitesi",
        "Rezervasyon odaklı sayfa mimarisi",
        "Miras hikayesi anlatı çerçevesi",
      ],
      en: [
        "Hotel website",
        "Booking-focused page architecture",
        "Heritage storytelling framework",
      ],
    },
    images: {
      desktop: "projects/kaleici-hotel/desktop.png",
      mobile: "projects/kaleici-hotel/mobile.png",
    },
  },
  {
    slug: "kocyigit-trade",
    industry: { tr: "Ticaret", en: "Trade" },
    name: "Kocyiğit Trade",
    transformation: {
      tr: "Kurumsal güven, dijital sahaya taşındı.",
      en: "Corporate trust brought into the digital arena.",
    },
    challenge: {
      tr: "Kocyiğit Trade, güçlü bir ticaret geçmişine rağmen dijital varlığı bu ölçeği yansıtmıyordu. Kurumsal kimlik ve güvenilirlik çevrimiçi ortamda görünmez kalmış, şirketin gerçek kapasitesi fark edilmiyordu.",
      en: "Despite a strong trading track record, Kocyiğit Trade's digital presence didn't reflect this scale. Corporate identity and credibility remained invisible online, and the company's real capacity went unnoticed.",
    },
    approach: {
      tr: "Ölçeği ve güvenilirliği öne çıkaran, sade ve kurumsal bir tasarım dili benimsedik. Amaç, web sitesinin müşteri için bir referans noktası gibi işlev görmesi: şirketle çalışmadan önce bile güven duygusunu yerleştirmesi.",
      en: "We adopted a clean, corporate design language that leads with scale and reliability. The goal: a website that functions as a reference point for clients — one that establishes trust even before a first conversation.",
    },
    deliverables: {
      tr: [
        "Kurumsal web sitesi",
        "Hizmet ve ürün mimarisi",
        "Kurumsal kimlik entegrasyonu",
      ],
      en: [
        "Corporate website",
        "Service and product architecture",
        "Corporate identity integration",
      ],
    },
    images: {
      desktop: "projects/kocyigit-trade/desktop.png",
      mobile: "projects/kocyigit-trade/mobile.png",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
