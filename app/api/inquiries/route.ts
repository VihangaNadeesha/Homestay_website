import { NextResponse } from "next/server";
import { inquirySchema } from "../../../lib/validation";
import { supabaseAdmin } from "../../../lib/supabase/admin";
import { allowRequest, sameOrigin } from "../../../lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allowRequest(`inquiry:${address}`)) return NextResponse.json({ error: "Too many inquiries. Please try again shortly." }, { status: 429 });

  const data = Object.fromEntries(await request.formData());
  const parsed = inquirySchema.safeParse(data);
  if (!parsed.success) return NextResponse.json({ error: "Please check the details and try again." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true, emailSent: false });

  const inquiry = parsed.data;
  let saved = false;
  const client = supabaseAdmin();
  if (client) {
    const { error } = await client.from("booking_inquiries").insert({
      guest_name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      room_slug: inquiry.room || null,
      guests: inquiry.guests,
      check_in: inquiry.checkIn,
      check_out: inquiry.checkOut,
      message: inquiry.message,
      status: "new",
    });
    saved = !error;
  }

  const emailSent = await sendInquiryEmail(inquiry);
  return NextResponse.json({ ok: saved || emailSent, saved, emailSent });
}

async function sendInquiryEmail(inquiry: {
  name: string;
  email: string;
  phone: string;
  room: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  message?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  if (!apiKey || !from) return false;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        ["Authorization"]: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: ["vihanga.hema@gmail.com"],
        reply_to: inquiry.email,
        subject: `New homestay inquiry from ${inquiry.name}`,
        text: [
          "New Habaraduwa Family Homestay inquiry",
          "",
          `Name: ${inquiry.name}`,
          `Customer email: ${inquiry.email}`,
          `Phone / WhatsApp: ${inquiry.phone}`,
          `Preferred room: ${inquiry.room || "Not specified"}`,
          `Guests: ${inquiry.guests}`,
          `Check-in: ${inquiry.checkIn}`,
          `Check-out: ${inquiry.checkOut}`,
          `Message: ${inquiry.message || "-"}`,
        ].join("\n"),
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}
