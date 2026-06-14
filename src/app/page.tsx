// "/" is handled by the next-intl middleware (src/middleware.ts) which rewrites
// the request to the default locale ([locale]/page.tsx with locale="tr").
// This file is never reached in normal operation.
export default function RootPage() {
  return null;
}
