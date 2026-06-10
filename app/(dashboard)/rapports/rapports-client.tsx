'use client';

import { DemoBanner } from '@/components/safepit/demo-banner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, FileSpreadsheet, FileText, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const reports = [
  { id: '1', title: 'Registre incidents — Juin 2026', type: 'pdf' as const, description: 'Export légal conforme ICMM.', size: '245 Ko', date: '09/06/2026' },
  { id: '2', title: 'Synthèse inspections hebdomadaire', type: 'excel' as const, description: 'Scores et écarts par zone.', size: '128 Ko', date: '09/06/2026' },
  { id: '3', title: 'Indicateurs TRIR / LTIFR — S1 2026', type: 'pdf' as const, description: 'Tableau de bord direction.', size: '312 Ko', date: '01/06/2026' },
  { id: '4', title: 'Audit HSE — Stockage explosifs', type: 'pdf' as const, description: 'Rapport mensuel zone magasin.', size: '1,2 Mo', date: '05/06/2026' },
];

export function RapportsClient() {
  return (
    <div className="space-y-6">
      <DemoBanner />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rapports HSE</h1>
          <p className="text-muted-foreground">Exports audit et indicateurs direction</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700">Générer un rapport</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {reports.map((report, i) => {
          const Icon = report.type === 'pdf' ? FileText : FileSpreadsheet;
          const color = report.type === 'pdf' ? 'text-red-500 bg-red-50' : 'text-emerald-500 bg-emerald-50';
          return (
            <motion.div key={report.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}><Icon className="h-6 w-6" /></div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{report.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{report.date} · {report.size}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1"><Download className="h-3.5 w-3.5 mr-1.5" />Télécharger</Button>
                    <Button variant="ghost" size="sm"><Share2 className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
