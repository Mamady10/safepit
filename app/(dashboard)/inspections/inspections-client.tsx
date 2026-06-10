'use client';

import { DemoBanner } from '@/components/safepit/demo-banner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { safepitInspections } from '@/lib/mock-data';
import { Camera, ClipboardCheck, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const resultStyles = {
  conforme: 'bg-emerald-100 text-emerald-800',
  non_conforme: 'bg-red-100 text-red-800',
  partiel: 'bg-amber-100 text-amber-800',
};
const resultLabels = { conforme: 'Conforme', non_conforme: 'Non conforme', partiel: 'Partiel' };

export function InspectionsClient() {
  return (
    <div className="space-y-6">
      <DemoBanner />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inspections HSE</h1>
          <p className="text-muted-foreground">Checklists terrain, photos et scores</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700"><Plus className="h-4 w-4 mr-2" />Nouvelle inspection</Button>
      </div>
      <div className="grid gap-4">
        {safepitInspections.map((insp, i) => (
          <motion.div key={insp.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700">
                      <ClipboardCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{insp.template}</h3>
                      <p className="text-sm text-muted-foreground">{insp.siteName} · {insp.zone}</p>
                      <p className="text-xs text-muted-foreground mt-1">{insp.inspector} — {insp.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="text-right">
                      <p className="text-2xl font-bold">{insp.score}%</p>
                      <p className="text-[10px] text-muted-foreground uppercase">Score</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${resultStyles[insp.result]}`}>{resultLabels[insp.result]}</span>
                    {insp.findings > 0 && <Badge variant="outline">{insp.findings} écart(s)</Badge>}
                    <Badge variant="secondary" className="gap-1"><Camera className="h-3 w-3" />{insp.photos}</Badge>
                  </div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${insp.score >= 90 ? 'bg-emerald-500' : insp.score >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${insp.score}%` }} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
