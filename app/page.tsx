import Link from "next/link";
import { InquiryForm } from "../components/inquiry-form";
import { RoomCard } from "../components/room-card";
import { fallbackRooms } from "../lib/content";

const highlights = [
  ["Privacy", "An upper-floor place with room to settle into your own rhythm."],
  ["Green surroundings", "A quiet local setting to wake up gently and enjoy the outdoors."],
  ["Local family welcome", "Friendly guidance, honest hospitality and a real home feeling."],
];

const gallery = [
  ["/assets/homestay/Amma%27s%20authentic%20curries.jpeg", "Sri Lankan home-cooked curry"],
  ["/assets/homestay/Balcony.jpeg", "Private balcony with green views"],
  ["/assets/homestay/Kitchen%20Area%20And%20Appliances.jpeg", "Kitchen area and appliances"],
  ["/assets/homestay/Hot%20water%20facility.jpeg", "Hot-water bathroom facility"],
  ["/assets/homestay/Passage.jpeg", "Upper-floor passage"],
  ["/assets/homestay/Greeny%20Side%20view%20of%20the%20home.jpeg", "Green side view of the home"],
];

export default function Home() {
  return (
    <>
      <section className="shell grid min-h-[68svh] items-center gap-8 py-10 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="eyebrow">Habaraduwa · Southern Sri Lanka</p>
          <h1 className="display mt-4 text-5xl leading-[.98] sm:text-6xl">Your peaceful little home in Southern Sri Lanka.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink/75">A private upper-floor stay with a warm local family, surrounded by green and about seven minutes inland from Habaraduwa Beach.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-full bg-leaf px-5 py-3 font-bold text-white" href="#inquire">Check availability</Link>
            <Link className="rounded-full border border-ink/30 px-5 py-3 font-bold" href="/stay">Explore the homestay</Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] bg-sand/35 ring-1 ring-ink/10">
          <img src="/assets/homestay/Your%20Homestay%20-%20Front%20View.jpeg" alt="Front view of the homestay" className="min-h-80 w-full object-cover" />
        </div>
      </section>

      <section className="bg-sand/45 py-16">
        <div className="shell grid gap-10 md:grid-cols-2">
          <div><p className="eyebrow">A family homestay</p><h2 className="display mt-3 text-4xl">Private space, local warmth.</h2></div>
          <p className="max-w-lg leading-8 text-ink/80">This is not a resort. It is a comfortable place to settle in: your own upper-floor accommodation, a calm green setting and a real Sri Lankan family nearby when you need a local welcome.</p>
        </div>
      </section>

      <section className="shell py-16">
        <p className="eyebrow">Rooms & prices</p>
        <h2 className="display mt-3 text-4xl">Choose the stay that fits.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">{fallbackRooms.map((room) => <RoomCard key={room.slug} room={room} />)}</div>
      </section>

      <section className="bg-ink py-16 text-cream">
        <div className="shell grid gap-7 md:grid-cols-3">
          <div><p className="eyebrow text-sand">Why stay here</p><h2 className="display mt-3 text-4xl">Close to the coast, away from the rush.</h2></div>
          {highlights.map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="display text-2xl">{title}</p><p className="mt-2 text-sm leading-6 text-cream/75">{text}</p></div>)}
        </div>
      </section>

      <section className="shell py-16">
        <p className="eyebrow">Life at the homestay</p>
        <h2 className="display mt-3 text-4xl">A home that feels lived in.</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map(([src, alt]) => <div key={src} className="overflow-hidden rounded-2xl bg-sand/30 ring-1 ring-ink/10"><img src={src} alt={alt} className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-[1.02]" /></div>)}
        </div>
      </section>

      <section id="inquire" className="shell pb-20 pt-8">
        <div className="rounded-[2rem] bg-sand/45 p-6 md:p-8">
          <p className="eyebrow">Inquire</p><h2 className="display mt-3 text-4xl">Ask about your dates.</h2>
          <div className="mt-5 max-w-3xl"><InquiryForm room="" /></div>
        </div>
      </section>
    </>
  );
}
