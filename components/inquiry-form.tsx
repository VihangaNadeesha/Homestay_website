"use client";
import { useState } from "react";
import { fallbackRooms } from "../lib/content";

const whatsappNumbers = ["94727037320", "94762177320"];

export function InquiryForm({ room }: { room?: string }) {
  const [status, setStatus] = useState<string>();
  const [fallbackLinks, setFallbackLinks] = useState<string[]>([]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requiredFields = ["name", "email", "phone", "guests", "checkIn", "checkOut"];
    const missingField = requiredFields.find((field) => !String(formData.get(field) || "").trim());
    if (missingField) {
      setStatus("Please complete all required fields before sending your inquiry.");
      return;
    }
    if (String(formData.get("checkOut")) <= String(formData.get("checkIn"))) {
      setStatus("Check-out must be after check-in.");
      return;
    }
    const message = [
      "Hello Habaraduwa Family Homestay,",
      "",
      `Name: ${formData.get("name") || "-"}`,
      `Email: ${formData.get("email") || "-"}`,
      `Phone / WhatsApp: ${formData.get("phone") || "-"}`,
      `Preferred room: ${roomName(String(formData.get("room") || ""))}`,
      `Guests: ${formData.get("guests") || "-"}`,
      `Check-in: ${formData.get("checkIn") || "-"}`,
      `Check-out: ${formData.get("checkOut") || "-"}`,
      `Message: ${formData.get("message") || "-"}`,
    ].join("\n");
    const links = whatsappNumbers.map((number) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`);
    setFallbackLinks(links);
    setStatus("Opening WhatsApp. Press Send in the chat to deliver your inquiry.");
    const whatsappWindow = window.open(links[0], "_blank");
    if (!whatsappWindow) setStatus("Your browser blocked the WhatsApp tab. Use the WhatsApp link below to continue.");

    try {
      const response = await fetch("/api/inquiries", { method: "POST", body: formData });
      if (response.ok) {
        const result = await response.json();
        if (result.emailSent) setStatus("WhatsApp opened and the inquiry was also emailed to the homestay.");
      }
    } catch {
      setStatus("WhatsApp is ready. Use the second contact link below if the first chat did not open.");
    }
  }

  return <form noValidate onSubmit={submit} className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/10 sm:grid-cols-2"><input type="hidden" name="website" tabIndex={-1} autoComplete="off"/><Field label="Your name" name="name" required/><Field label="Email" name="email" type="email" required/><Field label="WhatsApp or phone" name="phone" required/><label className="grid gap-1 text-sm font-medium">Preferred room<select name="room" defaultValue={room} className="rounded-lg border border-ink/20 bg-white p-3"><option value="">Please choose</option>{fallbackRooms.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label><Field label="Guests" name="guests" type="number" min="1" required/><Field label="Check-in" name="checkIn" type="date" required/><Field label="Check-out" name="checkOut" type="date" required/><label className="grid gap-1 text-sm font-medium sm:col-span-2">Message<textarea name="message" rows={4} maxLength={2000} className="rounded-lg border border-ink/20 p-3" placeholder="Tell us a little about your stay." /></label><button className="rounded-full bg-leaf px-5 py-3 font-bold text-white sm:col-span-2" type="submit">Send inquiry</button>{status && <p className="sm:col-span-2 text-sm" role="status">{status}</p>}{fallbackLinks[1] && <p className="sm:col-span-2 text-sm text-ink/70">If the second chat did not open, <a className="font-bold underline" href={fallbackLinks[1]} target="_blank" rel="noreferrer">open the second WhatsApp contact</a>.</p>}</form>;
}

function roomName(slug: string) {
  return fallbackRooms.find((item) => item.slug === slug)?.name || "Not specified";
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label className="grid gap-1 text-sm font-medium">{label}<input {...props} className="rounded-lg border border-ink/20 p-3" /></label>;
}
