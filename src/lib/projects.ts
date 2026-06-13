export type Project = {
  slug: string;
  industry: { tr: string; en: string };
  name: string;
  liveUrl?: string;
  transformation: { tr: string; en: string };
  challenge: { tr: string; en: string };
  approach: { tr: string; en: string };
  deliverables: { tr: string[]; en: string[] };
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
    liveUrl: "https://pi-lot-seven.vercel.app/",
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
    slug: "kaleici-hotel",
    industry: { tr: "Konaklama", en: "Hospitality" },
    name: "Kaleiçi Hotel",
    liveUrl: "https://kaleici-hotel.vercel.app/",
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
    liveUrl: "https://kocyigit-trade.com/",
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
  {
    slug: "kariva-hotel",
    industry: { tr: "Konaklama", en: "Hospitality" },
    name: "Kariva Hotel",
    liveUrl: "https://kariva-hotel.vercel.app/",
    transformation: {
      tr: "Butik konaklama deneyimi, dijitale taşındı.",
      en: "Boutique hospitality experience brought into the digital space.",
    },
    challenge: {
      tr: "Kariva Hotel, benzersiz konuk deneyimini ve butik kimliğini dijitale yansıtacak bir varlığa ihtiyaç duyuyordu. Büyük zincir otellerin gölgesinde, özgün karakterini öne çıkaracak bir platform yoktu.",
      en: "Kariva Hotel needed a digital presence that could convey its unique guest experience and boutique identity. Without the scale of chain hotels, they needed a platform that led with authentic character.",
    },
    approach: {
      tr: "Butik otellerin güçlü yanı kişiselleştirilmiş deneyimdir. Bu özgünlüğü dijitalde görünür kılmak için atmosfer önce hissettiren, ardından rezervasyona yönlendiren bir yapı kurduk.",
      en: "The strength of boutique hotels is personalized experience. We built a structure that makes this authenticity visible digitally — atmosphere first, then booking action.",
    },
    deliverables: {
      tr: [
        "Otel web sitesi",
        "Rezervasyon odaklı sayfa akışı",
        "Butik kimlik entegrasyonu",
      ],
      en: [
        "Hotel website",
        "Booking-focused page flow",
        "Boutique identity integration",
      ],
    },
    images: {
      desktop: "projects/kariva-hotel/desktop.png",
      mobile: "projects/kariva-hotel/mobile.png",
    },
  },
  {
    slug: "hande-turunckapi",
    industry: { tr: "Kişisel Marka", en: "Personal Brand" },
    name: "Hande Turunçkapı",
    liveUrl: "https://hande-turunckapi.vercel.app/",
    transformation: {
      tr: "Kişisel uzmanlık, güven veren bir dijital kimliğe dönüştü.",
      en: "Personal expertise transformed into a credible digital identity.",
    },
    challenge: {
      tr: "Kişisel bir markanın dijitalde doğru şekilde konumlanması, kurumsal markalara kıyasla daha nüanslı bir yaklaşım gerektirir. Özgünlük ve güvenilirlik aynı anda iletilmeliydi.",
      en: "Positioning a personal brand correctly in the digital space requires a more nuanced approach than corporate brands. Authenticity and credibility needed to be communicated simultaneously.",
    },
    approach: {
      tr: "Kişisel kimliği ön plana alan, güven inşa eden ve potansiyel müşterilerin doğru kişiye ulaştığını hissettiren bir yapı oluşturduk. Tasarım, insana dokunan ama profesyonelliği kaybetmeyen bir denge kuruyor.",
      en: "We created a structure that leads with personal identity, builds trust, and makes potential clients feel they've found the right person. The design strikes a balance — human in tone, professional in execution.",
    },
    deliverables: {
      tr: [
        "Kişisel marka web sitesi",
        "İçerik mimarisi",
        "Dijital kimlik çerçevesi",
      ],
      en: [
        "Personal brand website",
        "Content architecture",
        "Digital identity framework",
      ],
    },
    images: {
      desktop: "projects/hande-turunckapi/desktop.png",
      mobile: "projects/hande-turunckapi/mobile.png",
    },
  },
  {
    slug: "armagan-diyetisyenlik",
    industry: { tr: "Sağlık", en: "Health" },
    name: "Armağan Diyetisyenlik",
    liveUrl: "https://armagan-diyetisyenlik.vercel.app/",
    transformation: {
      tr: "Sağlık uzmanlığı, güven veren bir dijital platforma kavuştu.",
      en: "Health expertise found a trustworthy digital platform.",
    },
    challenge: {
      tr: "Sağlık alanında dijital güvenilirlik, tasarım kalitesinden çok daha fazlasını gerektirir. Potansiyel danışanların uzmanlığı hissedebilmesi ve doğru adımı atabilmesi için net bir yolculuk kurgulanmalıydı.",
      en: "Digital credibility in health requires far more than design quality. A clear journey needed to be built so potential clients could feel the expertise and take the right next step.",
    },
    approach: {
      tr: "Uzmanlığı öne çıkaran, danışan güvenini merkeze alan bir yapı oluşturduk. Bilgi mimarisi, ziyaretçileri anlamaktan harekete geçmeye doğru yönlendirir.",
      en: "We built a structure that leads with expertise and centers on client trust. The information architecture guides visitors from understanding to taking action.",
    },
    deliverables: {
      tr: [
        "Profesyonel web sitesi",
        "Hizmet mimarisi",
        "Danışan güven çerçevesi",
      ],
      en: [
        "Professional website",
        "Service architecture",
        "Client trust framework",
      ],
    },
    images: {
      desktop: "projects/armagan-diyetisyenlik/desktop.png",
      mobile: "projects/armagan-diyetisyenlik/mobile.png",
    },
  },
  {
    slug: "bugra-polat-turizm",
    industry: { tr: "Turizm", en: "Tourism" },
    name: "Buğra Polat Turizm",
    liveUrl: "https://bugrapolatturizm.com/",
    transformation: {
      tr: "Tur deneyiminin özgünlüğü, dijitale aktarıldı.",
      en: "The authenticity of the tour experience was brought into the digital space.",
    },
    challenge: {
      tr: "Turizm sektöründe rakip kalabalığından sıyrılmak, sadece güzel görseller sunmaktan fazlasını gerektirir. Güven, özgünlük ve bilgi kalitesi öne çıkarılmalıydı.",
      en: "Standing out in the crowded tourism sector requires more than attractive visuals. Trust, authenticity, and information quality needed to lead.",
    },
    approach: {
      tr: "Müşteri güveni oluşturacak, tur detaylarını net aktaracak ve harekete geçmeyi kolaylaştıracak bir platform tasarladık. Deneyim öncesi güven, her şeyden önce gelir.",
      en: "We designed a platform that builds client trust, clearly communicates tour details, and makes taking action straightforward. Trust before experience is the foundation.",
    },
    deliverables: {
      tr: [
        "Turizm web sitesi",
        "Tur kataloğu ve sayfa yapısı",
        "Müşteri güven mimarisi",
      ],
      en: [
        "Tourism website",
        "Tour catalogue and page structure",
        "Client trust architecture",
      ],
    },
    images: {
      desktop: "projects/bugra-polat-turizm/desktop.png",
      mobile: "projects/bugra-polat-turizm/mobile.png",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
