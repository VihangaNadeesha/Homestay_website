import Link from "next/link";
import { getPublicSettings, whatsappUrl } from "../lib/content";

const links = [["Stay", "/stay"], ["Experience", "/experience"], ["Gallery", "/gallery"], ["Food", "/food"], ["Location", "/location"]] as const;

function SocialIcon({ type }: { type: "facebook" | "instagram" | "whatsapp" }) {
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V7.3c0-.9.2-1.5 1.5-1.5h1.6V2.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.2H7.5V14h2.7v8h3.3Z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.3-3.2a1.3 1.3 0 1 1-1.3 1.3 1.3 1.3 0 0 1 1.3-1.3Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M20.5 3.5A11.1 11.1 0 0 0 4.9 15.6L3.8 20l4.6-1.2a11.2 11.2 0 0 0 5.2 1.5h.1A11.2 11.2 0 0 0 20.5 3.5ZM12 18.3h-.1a9.2 9.2 0 0 1-4.7-1.3l-.3-.2-2.7.7.7-2.6-.2-.3A9.2 9.2 0 1 1 12 18.3Zm5.1-6.8c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.4.2-.7.1a7.7 7.7 0 0 1-2.2-1.4 8.7 8.7 0 0 1-1.6-2c-.2-.3 0-.5.2-.6.2-.2.3-.4.5-.6.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.9-.9-2.6-.2-.7-.5-.6-.7-.6h-.6c-.2 0-.5.1-.8.4-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.2.2 2 3.2 4.9 4.5.7.3 1.2.5 1.6.6.7.2 1.3.2 1.7.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4Z" />
    </svg>
  );
}

export async function Header() { const settings = await getPublicSettings(); return <header className="border-b border-ink/10 bg-cream/95"><div className="shell flex min-h-16 items-center justify-between gap-4 py-3"><Link className="block shrink-0" href="/" aria-label="Habaraduwa Family Homestay home"><img src="/assets/logos/Homestay%20Logo%20HD.png" alt="Habaraduwa Family Homestay" className="h-auto w-[11rem] sm:w-[13rem]" /></Link><nav className="hidden gap-5 text-sm md:flex" aria-label="Main navigation">{links.map(([name, href]) => <Link key={href} href={href}>{name}</Link>)}</nav><a className="rounded-full bg-leaf px-4 py-2 text-sm font-bold text-white" href={whatsappUrl(settings.whatsappNumber)}>WhatsApp</a></div></header>; }
export async function Footer() {
  const settings = await getPublicSettings();
  const socialLinks = [
    { name: "Facebook", href: settings.facebookUrl, icon: "facebook" as const },
    { name: "Instagram", href: settings.instagramUrl, icon: "instagram" as const },
    { name: "WhatsApp", href: whatsappUrl(settings.whatsappNumber), icon: "whatsapp" as const },
  ];

  return (
    <footer className="mt-20 bg-ink pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-12 text-cream">
      <div className="shell grid gap-8 md:grid-cols-3">
        <div>
          <img src="/assets/logos/Homestay%20Logo%20HD.png" alt="Habaraduwa Family Homestay" className="w-[13rem] brightness-0 invert" />
          <p className="display mt-5 text-2xl">Come for the coast.<br/>Stay for the calm.</p>
          <p className="mt-4 max-w-xs text-sm text-cream/75">A private upper-floor stay in a warm local family home in Habaraduwa, Southern Sri Lanka.</p>
          <div className="mt-5 flex items-center gap-3">
            {socialLinks.map(({ name, href, icon }) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-cream transition hover:border-leaf hover:bg-leaf/10 hover:text-sand">
                <SocialIcon type={icon} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow text-sand">Explore</p>
          <div className="mt-3 grid gap-2 text-sm">{links.map(([n,h])=><Link key={h} href={h}>{n}</Link>)}<Link href="/contact">Contact & inquiry</Link></div>
        </div>
        <div>
          <p className="eyebrow text-sand">Useful links</p>
          <div className="mt-3 grid gap-2 text-sm"><Link href="/faq">Frequently asked questions</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </div>
      <div className="shell mt-10 border-t border-white/15 pt-5 text-xs text-cream/60">Copyright © {new Date().getFullYear()} HABARADUWA FAMILY HOMESTAY. All Rights Reserved. <span className="block mt-2 sm:inline sm:mt-0">[Web Design and Development by <a className="underline underline-offset-2 hover:text-cream" href="https://lk.linkedin.com/in/vihanga-hemachandra" target="_blank" rel="noreferrer">Vihanga H.</a>]</span></div>
    </footer>
  );
}
export async function WhatsAppButton() { const s=await getPublicSettings(); return <a aria-label="Start an inquiry on WhatsApp" className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-20 rounded-full bg-clay px-4 py-3 text-sm font-bold text-white shadow-lg" href={whatsappUrl(s.whatsappNumber)}>WhatsApp</a>; }
