import { NextResponse } from "next/server";

// Requires CONTACT_WEBHOOK_URL, see "Contact form" in the README.

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const fail = (error: string, status: number) =>
  NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return fail("Please fill in your name, a valid email and a message.", 400);
  }
  if (name.length > 200 || subject.length > 200 || message.length > 5000) {
    return fail("Your message is too long.", 400);
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    console.error("CONTACT_WEBHOOK_URL is not set");
    return fail("The contact form is temporarily unavailable. Please try again later.", 503);
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message, sentAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);
  } catch (err) {
    console.error("Contact webhook failed:", err);
    return fail("Message could not be sent. Please try again later.", 502);
  }

  return NextResponse.json({ ok: true });
}
