// src/app/page.tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('seu-token-de-auth');

  if (!token) {
    redirect('/login');
  } else {
    redirect('/dashboard');
  }

  return null;
}

// depois arrumar isso em middleware