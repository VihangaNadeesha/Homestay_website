import { NextResponse } from "next/server";
import { z } from "zod";
import { allowRequest, sameOrigin } from "../../../../lib/security";

const credentials = z.object({ email: z.string().email().max(254), password: z.string().min(12).max(256) });

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allowRequest(`admin-login:${address}`, 5, 15 * 60_000)) return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  const input = credentials.safeParse(await request.json().catch(() => null));
  if (!input.success) return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.json({ error: "Authentication is not configured." }, { status: 503 });
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, { method: "POST", headers: { apikey: key, "Content-Type": "application/json" }, body: JSON.stringify(input.data), cache: "no-store" });
  if (!response.ok) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  const session = await response.json() as { access_token: string; expires_in: number };
  const result = NextResponse.json({ ok: true });
  result.cookies.set("homestay-admin-token", session.access_token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: Math.min(session.expires_in, 60 * 60) });
  return result;
}
