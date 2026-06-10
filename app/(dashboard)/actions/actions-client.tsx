'use client';

import { DemoBanner } from '@/components/safepit/demo-banner';
import { StatusBadge } from '@/components/dashboard/data-table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { safepitActions } from '@/lib/mock-data';
import { Calendar, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';

const priorityColors = { low: 'border-l-slate-400', medium: 'border-l-blue-500', high: 'border-l-orange-500', critical: 'border-l-red-600' };
const columns = [
  { key: 'overdue' as const, label: 'En retard', color: 'text-red-600' },
  { key: 'in_progress' as const, label: 'En cours', color: 'text-blue-600' },
  { key: 'open' as const, label: 'À faire', color: 'text-amber-600' },
];

export function ActionsClient() {
  const grouped = {
    overdue: safepitActions.filter((a) => a.status === 'overdue'),
    in_progress: safepitActions.filter((a) => a.status === 'in_progress'),
    open: safepitActions.filter((a) => a.status === 'open'),
  };

  return (
    <div className="space-y-6">
      <DemoBanner />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Actions correctives</h1>
        <p className="text-muted-foreground">Écarts issus des inspections et incidents</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {columns.map((col) => (
          <div key={col.key} className="space-y-3">
            <h2 className={`text-sm font-semibold flex items-center gap-2 ${col.color}`}>
              <ListChecks className="h-4 w-4" />{col.label}
              <Badge variant="secondary" className="text-[10px]">{grouped[col.key].length}</Badge>
            </h2>
            {grouped[col.key].map((action, i) => (
              <motion.div key={action.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className={`border-l-4 ${priorityColors[action.priority]}`}>
                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-medium text-sm">{action.title}</h3>
                    <p className="text-xs text-muted-foreground">{action.source}</p>
                    <p className="text-xs">{action.assignee}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />{action.dueDate}</span>
                      <StatusBadge status={action.priority} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
