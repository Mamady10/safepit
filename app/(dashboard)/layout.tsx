import { getSession } from '@/lib/actions/auth';
import { redirect } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/login');

  return <DashboardShell userName={session.name}>{children}</DashboardShell>;
}
