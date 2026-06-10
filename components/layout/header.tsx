'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Menu, Moon, Sun } from 'lucide-react';
import { signOut } from '@/lib/actions/auth';

interface HeaderProps {
  userName: string;
  onMenuClick: () => void;
}

export function Header({ userName, onMenuClick }: HeaderProps) {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle('dark');
  };

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-4 lg:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1">
        <p className="text-sm font-medium hidden sm:block">Plateforme HSE terrain</p>
      </div>

      <Button variant="ghost" size="icon" onClick={toggleDark}>
        {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      <div className="flex items-center gap-3">
        <span className="text-sm hidden md:inline">{userName}</span>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-amber-100 text-amber-800 text-xs">{initials}</AvatarFallback>
        </Avatar>
      </div>

      <form action={signOut}>
        <Button variant="outline" size="sm" type="submit">
          Déconnexion
        </Button>
      </form>
    </header>
  );
}
