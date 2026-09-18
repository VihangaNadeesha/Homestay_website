import { notFound } from "next/navigation";
import Link from "next/link";
import { fallbackRooms, money } from "../../../lib/content";
import { InquiryForm } from "../../../components/inquiry-form";

export function generateStaticParams() {
  return fallbackRooms.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = fallbackRooms.find((item) => item.slug === slug);
  return { title: room?.name || "Room", description: room?.description };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = fallbackRooms.find((item) => item.slug === slug);
  if (!room) notFound();

  return (
    <section className="shell py-14">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-sand/35 ring-1 ring-ink/10">
          <img src={room.image} alt={`${room.name} accommodation`} className="min-h-[26rem] w-full object-cover" />
        </div>
        <div>
          <p className="eyebrow">Upper-floor accommodation</p>
          <h1 className="display mt-3 text-5xl">{room.name}</h1>
          <p className="mt-5 leading-8 text-ink/75">{room.description}</p>
          <div className="mt-6 rounded-xl bg-sand/45 p-5"><p className="font-bold">{money(room.daily)} / day</p><p className="mt-1 text-sm">{money(room.monthly)} / month</p></div>
          {room.details.length > 0 && <><h2 className="display mt-8 text-2xl">What is included</h2><ul className="mt-3 grid gap-2 text-sm">{room.details.map((item) => <li key={item}>— {item}</li>)}</ul></>}
          <Link className="mt-8 inline-block rounded-full bg-leaf px-5 py-3 font-bold text-white" href="#inquire">Ask about this room</Link>
        </div>
      </div>
      <div id="inquire" className="mt-16 max-w-3xl"><h2 className="display text-3xl">Check your dates</h2><p className="mt-2 text-sm text-ink/70">Availability is confirmed manually by the family.</p><div className="mt-5"><InquiryForm room={room.slug} /></div></div>
    </section>
  );
}
