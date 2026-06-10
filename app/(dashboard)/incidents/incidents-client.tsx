'use client';

import { useState } from 'react';
import { DemoBanner } from '@/components/safepit/demo-banner';
import { DataTable, StatusBadge } from '@/components/dashboard/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { safepitIncidents, severityColors, severityLabels, type SafePitSeverity } from '@/lib/mock-data';
import { AlertTriangle, Plus, User } from 'lucide-react';

export function IncidentsClient() {
  const [filter, setFilter] = useState<SafePitSeverity | 'all'>('all');
  const filtered = filter === 'all' ? safepitIncidents : safepitIncidents.filter((i) => i.severity === filter);
  const filters: { label: string; value: SafePitSeverity | 'all' }[] = [
    { label: 'Tous', value: 'all' },
    { label: 'Quasi-accidents', value: 'near_miss' },
    { label: 'Mineurs', value: 'minor' },
    { label: 'Majeurs', value: 'major' },
  ];

  return (
    <div className="space-y-6">
      <DemoBanner />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Registre des incidents</h1>
          <p className="text-muted-foreground">Déclarations, enquêtes et suivi légal</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700"><Plus className="h-4 w-4 mr-2" />Déclarer</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button key={f.value} variant={filter === f.value ? 'default' : 'outline'} size="sm" onClick={() => setFilter(f.value)} className={filter === f.value ? 'bg-amber-600 hover:bg-amber-700' : ''}>{f.label}</Button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((inc) => (
          <Card key={inc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-600"><AlertTriangle className="h-5 w-5" /></div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">{inc.ref}</p>
                    <h3 className="font-semibold">{inc.title}</h3>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${severityColors[inc.severity]}`}>{severityLabels[inc.severity]}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="outline">{inc.siteName}</Badge>
                <Badge variant="outline">{inc.category}</Badge>
                {inc.injured > 0 && <Badge variant="destructive">{inc.injured} blessé(s)</Badge>}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User className="h-3 w-3" />{inc.reportedBy}</span>
                <span>{inc.date}</span>
              </div>
              <StatusBadge status={inc.status === 'closed' ? 'Succès' : inc.status === 'investigating' ? 'En cours' : 'En attente'} />
            </CardContent>
          </Card>
        ))}
      </div>
      <DataTable
        title="Vue tableau — registre légal"
        data={filtered as unknown as Record<string, unknown>[]}
        columns={[
          { key: 'ref', label: 'Réf.' },
          { key: 'title', label: 'Description' },
          { key: 'siteName', label: 'Site' },
          { key: 'category', label: 'Catégorie' },
          { key: 'severity', label: 'Gravité', render: (row) => <span className={`rounded-full px-2 py-0.5 text-xs ${severityColors[row.severity as keyof typeof severityColors]}`}>{severityLabels[row.severity as keyof typeof severityLabels]}</span> },
          { key: 'date', label: 'Date' },
        ]}
      />
    </div>
  );
}
