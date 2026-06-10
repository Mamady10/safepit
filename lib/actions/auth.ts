'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DEMO_LOGIN } from '@/lib/mock-data';

const SESSION_COOKIE = 'safepit_session';

export async function signIn(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (email !== DEMO_LOGIN.email || password !== DEMO_LOGIN.password) {
    return { error: 'Identifiants incorrects' };
  }

  const jar = await cookies();
  jar.set(SESSION_COOKIE, JSON.stringify({ email, name: DEMO_LOGIN.name }), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/dashboard');
}

export async function signOut() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect('/login');
}

export async function getSession() {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as { email: string; name: string };
  } catch {
    return null;
  }
}
