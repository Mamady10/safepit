'use client';

import { useState } from 'react';
import { DemoBanner } from '@/components/safepit/demo-banner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { riskColors, riskLabels, safepitSites } from '@/lib/mock-data';
import { MapPin, Pickaxe, Plus, Search, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export function PuitsClient() {
  const [search, setSearch] = useState('');
  const filtered = safepitSites.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.zone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <DemoBanner />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sites & zones</h1>
          <p className="text-muted-foreground">Cartographie des zones à risque et effectifs</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700" disabled>
          <Plus className="h-4 w-4 mr-2" /> Nouvelle zone
        </Button>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Rechercher…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((site, i) => (
          <motion.div key={site.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700">
                      <Pickaxe className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{site.name}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{site.zone}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${riskColors[site.riskLevel]}`}>{riskLabels[site.riskLevel]}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-muted/50 p-2">
                    <p className="text-[10px] text-muted-foreground uppercase">Effectif</p>
                    <p className="font-semibold flex items-center gap-1"><Users className="h-3.5 w-3.5" />{site.workers}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2">
                    <p className="text-[10px] text-muted-foreground uppercase">Conformité</p>
                    <p className="font-semibold">{site.conformityRate}%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Inspection : {site.lastInspection}</span>
                  <Badge variant={site.status === 'restricted' ? 'destructive' : 'secondary'} className="text-[10px]">
                    {site.status === 'active' ? 'Actif' : site.status === 'restricted' ? 'Restreint' : 'Fermé'}
                  </Badge>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${site.conformityRate}%` }} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
