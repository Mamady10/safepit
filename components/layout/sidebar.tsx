'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Pickaxe,
  ClipboardCheck,
  AlertTriangle,
  ListChecks,
  FileText,
  ShieldAlert,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const nav = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Sites & zones', href: '/puits', icon: Pickaxe },
  { label: 'Inspections', href: '/inspections', icon: ClipboardCheck },
  { label: 'Incidents', href: '/incidents', icon: AlertTriangle },
  { label: 'Actions', href: '/actions', icon: ListChecks },
  { label: 'Rapports', href: '/rapports', icon: FileText },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-[#0F172A] text-white transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
              <ShieldAlert className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">SafePit</span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-4 mt-4">
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-xs text-amber-300">
            HSE Mines & Industrie — Guinée
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {nav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-amber-600 text-white'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-4 text-[10px] text-white/40">
          safepit.com · Plateforme HSE indépendante
        </div>
      </aside>
    </>
  );
}
