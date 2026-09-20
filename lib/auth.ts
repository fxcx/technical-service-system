import { cookies } from "next/headers";
import { db } from "../lib/prisma";
import type { SessionUser } from "@/types";

const SESSION_COOKIE = "tech-service-session";

import { compare } from "bcrypt";

export async function validateCredentials(
  email: string,
  password: string
): Promise<SessionUser | null> {
  const user = await db.orm.public.User.first({ email });
  if (!user || !user.isActive) return null;

  // Verify password using bcrypt
  // Note: user.passwordHash needs to be present in the user record
  const isValid = await compare(password, user.passwordHash);
  if (!isValid) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
  };
}

export async function createSession(user: SessionUser): Promise<void> {
  const cookieStore = await cookies();
  // In production, use JWT or secure session token
  const sessionData = JSON.stringify(user);
  const encoded = Buffer.from(sessionData).toString("base64");

  cookieStore.set(SESSION_COOKIE, encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);

  if (!sessionCookie?.value) return null;

  try {
    const decoded = Buffer.from(sessionCookie.value, "base64").toString();
    return JSON.parse(decoded) as SessionUser;
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireAdmin(): Promise<SessionUser> {
  const session = await requireAuth();
  if (session.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
  return session;
}
