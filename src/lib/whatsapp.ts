const PHONE = "905349626627";

const MSG_TR = encodeURIComponent(
  "Merhaba, MMDESIGN web sitenizi inceledim. Projem hakkında bilgi almak istiyorum."
);

const MSG_EN = encodeURIComponent(
  "Hello, I visited the MMDESIGN website and I would like to discuss a project."
);

export function waUrl(locale: string): string {
  const msg = locale === "tr" ? MSG_TR : MSG_EN;
  return `https://wa.me/${PHONE}?text=${msg}`;
}
