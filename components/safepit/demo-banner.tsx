import { Badge } from '@/components/ui/badge';
import { ShieldAlert } from 'lucide-react';

export function DemoBanner() {
  return (
    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 dark:border-amber-800/50 px-4 py-3 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-white shrink-0">
        <ShieldAlert className="h-4 w-4" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-900 dark:text-amber-100 text-sm">Environnement démo</span>
          <Badge variant="outline" className="text-[10px] border-amber-400">safepit.com</Badge>
        </div>
        <p className="text-xs text-amber-800/80 dark:text-amber-200/70">
          Données fictives — mine de bauxite Boké. Production : base dédiée SafePit.
        </p>
      </div>
    </div>
  );
}
