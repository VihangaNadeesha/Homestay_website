"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [message, setMessage] = useState<string>();
  async function login(formData: FormData) {
    setMessage("Signing in…");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(formData)) });
    if (response.ok) window.location.assign("/admin"); else setMessage("Sign-in was not successful. Check your details and try again.");
  }
  return <section className="shell py-16"><div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/10"><p className="eyebrow">Restricted access</p><h1 className="display mt-3 text-4xl">Admin sign in</h1><form action={login} className="mt-6 grid gap-4"><label className="grid gap-1 text-sm font-medium">Email<input required type="email" name="email" autoComplete="email" className="rounded-lg border border-ink/20 p-3" /></label><label className="grid gap-1 text-sm font-medium">Password<input required type="password" name="password" autoComplete="current-password" className="rounded-lg border border-ink/20 p-3" /></label><button className="rounded-full bg-leaf px-5 py-3 font-bold text-white">Sign in</button>{message && <p role="status" className="text-sm">{message}</p>}</form></div></section>;
}
