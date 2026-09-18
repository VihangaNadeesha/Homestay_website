import { NextResponse } from "next/server";
import { sameOrigin } from "../../../../lib/security";
export async function POST(request: Request) { if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 }); const result = NextResponse.json({ ok: true }); result.cookies.set("homestay-admin-token", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 }); return result; }
