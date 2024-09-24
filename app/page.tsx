import { redirect } from 'next/navigation';

export default function HomePage() {
  // Редирект на страницу dashboard
  redirect('/dashboard');
}
