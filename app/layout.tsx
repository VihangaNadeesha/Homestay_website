import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer, Header, WhatsAppButton } from "../components/site-chrome";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  title: { default: "Habaraduwa Family Homestay | Southern Sri Lanka", template: "%s | Habaraduwa Family Homestay" },
  description: "A private upper-floor stay with a Sri Lankan family, surrounded by green and about seven minutes from Habaraduwa Beach.",
  robots: { index: true, follow: true }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${display.variable}`}><Header /><main>{children}</main><Footer /><WhatsAppButton /></body></html>;
}
