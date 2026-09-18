import { notFound } from "next/navigation";
import Link from "next/link";

const content: Record<string, { title: string; eyebrow: string; body: string }> = {
  experience: { eyebrow: "The pace of your stay", title: "Make space for a quieter day.", body: "Spend time on the balcony, return to green surroundings after the coast, and experience Habaraduwa at a more local pace. The homestay is about seven minutes inland from Habaraduwa Beach." },
  gallery: { eyebrow: "Property gallery", title: "A real home, ready to welcome you.", body: "See the spaces, details and surroundings that make the homestay feel comfortable and local." },
  food: { eyebrow: "Food on request", title: "Sri Lankan curries from Amma’s kitchen.", body: "Authentic homemade Sri Lankan food may be available on request. Contact the family in advance to ask what can be prepared during your stay." },
  location: { eyebrow: "Habaraduwa, Southern Sri Lanka", title: "Near the coast, in a calmer setting.", body: "The accommodation is within a family home in Habaraduwa, approximately seven minutes inland from Habaraduwa Beach. Contact the family for exact arrival guidance after your inquiry is confirmed." },
  reviews: { eyebrow: "Guest reviews", title: "Only genuine guest voices belong here.", body: "No verified guest reviews were supplied, so none are displayed. Reviews can be published from the admin dashboard only after they have been verified." },
  faq: { eyebrow: "Helpful details", title: "Questions before you inquire?", body: "Availability is confirmed directly by the family. Rates are listed per day and per month. Homemade curries may be available on request. Personal laundry is available for the Bigger Double Room on request at Rs. 200–500/kg." },
  privacy: { eyebrow: "Privacy", title: "How inquiry information is handled.", body: "We collect the contact and stay details you submit so the family can respond to your inquiry. Inquiry data is not published. It is stored privately and should only be accessed by authorised homestay administrators. Contact us to request access, correction or deletion where applicable." },
  terms: { eyebrow: "Terms", title: "A clear, inquiry-first stay.", body: "Submitting an inquiry does not create a booking or guarantee availability. The family confirms dates, room details and any requested arrangements directly. Prices shown are subject to confirmation by the family before a stay is agreed." },
  guides: { eyebrow: "Local guides", title: "Local notes will be shared here.", body: "This future section is intentionally empty until the family has genuine local guidance to publish." },
  offers: { eyebrow: "Offers", title: "No offers are currently published.", body: "Check directly with the family for confirmed dates and prices." },
  availability: { eyebrow: "Availability", title: "Ask the family about dates.", body: "Live availability is not displayed until it is managed from the database. Send an inquiry and the family will confirm directly." },
};

const galleryImages = [
  ["/assets/homestay/Your%20Homestay%20-%20Front%20View.jpeg", "Front view of the homestay"],
  ["/assets/homestay/Greeny%20Side%20view%20of%20the%20home.jpeg", "Green side view of the home"],
  ["/assets/homestay/Bigger%20Room%20AC.jpeg", "Bigger air-conditioned room"],
  ["/assets/homestay/Small%20AC%20Room.jpeg", "Small air-conditioned room"],
  ["/assets/homestay/Balcony.jpeg", "Balcony with greenery"],
  ["/assets/homestay/Kitchen%20Area%20And%20Appliances.jpeg", "Kitchen area and appliances"],
  ["/assets/homestay/Hot%20water%20facility.jpeg", "Hot-water bathroom facility"],
  ["/assets/homestay/Passage.jpeg", "Upper-floor passage"],
];

const foodImages = [
  ["/assets/homestay/Amma%27s%20authentic%20curries.jpeg", "Authentic Sri Lankan curries"],
  ["/assets/homestay/Amma%27s%20authentic%20curries%20-%20Breaky.jpeg", "Homemade breakfast"],
];

export function generateStaticParams() {
  return Object.keys(content).map((page) => ({ page }));
}

export default async function Info({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const current = content[page];
  if (!current) notFound();

  if (page === "gallery") {
    return (
      <section className="shell py-14">
        <p className="eyebrow">{current.eyebrow}</p>
        <h1 className="display mt-3 max-w-3xl text-5xl">{current.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/75">{current.body}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map(([src, alt]) => (
            <figure key={src} className="overflow-hidden rounded-2xl bg-sand/30 ring-1 ring-ink/10">
              <img src={src} alt={alt} className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-[1.02]" />
              <figcaption className="px-4 py-3 text-sm text-ink/70">{alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  if (page === "food") {
    return (
      <section className="shell py-14">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">{current.eyebrow}</p>
            <h1 className="display mt-3 max-w-3xl text-5xl">{current.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/75">{current.body}</p>
            <Link href="/contact" className="mt-8 inline-block rounded-full bg-leaf px-5 py-3 font-bold text-white">Ask about food</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {foodImages.map(([src, alt]) => <figure key={src} className="overflow-hidden rounded-2xl bg-sand/30 ring-1 ring-ink/10"><img src={src} alt={alt} className="aspect-[4/3] w-full object-cover" /><figcaption className="px-4 py-3 text-sm text-ink/70">{alt}</figcaption></figure>)}
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <img src="/assets/homestay/Kitchen%20Area%20And%20Appliances.jpeg" alt="Kitchen area and appliances" className="aspect-[16/9] w-full rounded-2xl object-cover ring-1 ring-ink/10" />
          <img src="/assets/homestay/Kitchen%20Area%20And%20Private%20Access%20to%20the%20Floor.jpeg" alt="Kitchen and private access to the upper floor" className="aspect-[16/9] w-full rounded-2xl object-cover ring-1 ring-ink/10" />
        </div>
      </section>
    );
  }

  return <section className="shell py-14"><p className="eyebrow">{current.eyebrow}</p><h1 className="display mt-3 max-w-3xl text-5xl">{current.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-ink/75">{current.body}</p>{!["privacy", "terms", "gallery", "reviews", "guides"].includes(page) && <Link href="/contact" className="mt-8 inline-block rounded-full bg-leaf px-5 py-3 font-bold text-white">Send an inquiry</Link>}</section>;
}
