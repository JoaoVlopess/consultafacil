// src/app/page.tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function HomePage() {

redirect('/login');


  return null;
}

// depois arrumar isso em middleware