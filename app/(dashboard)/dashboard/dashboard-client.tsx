'use client';

import Link from 'next/link';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { ChartCard, KonaBarChart, KonaLineChart } from '@/components/dashboard/charts';
import { DataTable, StatusBadge } from '@/components/dashboard/data-table';
import { DemoBanner } from '@/components/safepit/demo-banner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  SAFEPIT_DEMO_ORG,
  safepitActions,
  safepitAiInsights,
  safepitConformityByZone,
  safepitIncidentTrend,
  safepitIncidents,
  safepitInspections,
  safepitKpis,
  severityColors,
  severityLabels,
} from '@/lib/mock-data';
import {
  AlertTriangle,
  CalendarCheck,
  ClipboardCheck,
  Pickaxe,
  ShieldCheck,
  TrendingDown,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';

export function DashboardClient() {
  const recentIncidents = safepitIncidents.slice(0, 4);
  const urgentActions = safepitActions.filter((a) => a.status === 'overdue' || a.priority === 'critical');

  return (
    <div className="space-y-6">
      <DemoBanner />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight">Tableau de bord HSE</h1>
              <Badge className="bg-amber-600">SafePit</Badge>
            </div>
            <p className="text-muted-foreground mt-1">{SAFEPIT_DEMO_ORG}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button asChild variant="outline" size="sm">
              <Link href="/inspections">Nouvelle inspection</Link>
            </Button>
            <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700">
              <Link href="/incidents">Déclarer incident</Link>
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Jours sans accident avec arrêt" value={safepitKpis.daysWithoutLostTime} change={12} icon={ShieldCheck} color="bg-emerald-500" index={0} />
        <KpiCard title="Inspections ce mois" value={safepitKpis.inspectionsThisMonth} icon={ClipboardCheck} color="bg-blue-500" index={1} />
        <KpiCard title="Incidents ouverts" value={safepitKpis.openIncidents} change={-25} icon={AlertTriangle} color="bg-amber-500" index={2} />
        <KpiCard title="TRIR (12 mois)" value={safepitKpis.trir.toFixed(2)} change={-18} icon={TrendingDown} color="bg-violet-500" index={3} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Taux conformité" value={`${safepitKpis.conformityRate}%`} icon={CalendarCheck} color="bg-teal-500" index={4} />
        <KpiCard title="Personnel sur site" value={safepitKpis.workersOnSite} icon={Users} color="bg-indigo-500" index={5} />
        <KpiCard title="Zones actives" value={safepitKpis.activeZones} icon={Pickaxe} color="bg-orange-500" index={6} />
        <KpiCard title="Actions en retard" value={safepitKpis.overdueActions} icon={AlertTriangle} color="bg-red-500" index={7} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Tendance incidents & quasi-accidents">
          <KonaLineChart
            data={safepitIncidentTrend}
            xKey="mois"
            lines={[
              { key: 'incidents', color: '#ef4444', name: 'Incidents' },
              { key: 'nearMiss', color: '#f59e0b', name: 'Quasi-accidents' },
            ]}
          />
        </ChartCard>
        <ChartCard title="Conformité par zone (%)">
          <KonaBarChart data={safepitConformityByZone} xKey="zone" bars={[{ key: 'taux', color: '#D97706', name: 'Conformité' }]} />
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <DataTable
          title="Incidents récents"
          data={recentIncidents as unknown as Record<string, unknown>[]}
          className="lg:col-span-2"
          columns={[
            { key: 'ref', label: 'Réf.' },
            { key: 'title', label: 'Description' },
            { key: 'siteName', label: 'Site' },
            {
              key: 'severity',
              label: 'Gravité',
              render: (row) => (
                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${severityColors[row.severity as keyof typeof severityColors]}`}>
                  {severityLabels[row.severity as keyof typeof severityLabels]}
                </span>
              ),
            },
            { key: 'status', label: 'Statut', render: (row) => <StatusBadge status={String(row.status)} /> },
          ]}
        />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recommandations IA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {safepitAiInsights.map((insight) => (
              <div key={insight.id} className="rounded-lg border p-3 text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{insight.title}</span>
                  {insight.priority === 'high' && <Badge variant="destructive" className="text-[10px]">Urgent</Badge>}
                </div>
                <p className="text-muted-foreground text-xs">{insight.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <DataTable
        title="Actions prioritaires"
        data={urgentActions as unknown as Record<string, unknown>[]}
        columns={[
          { key: 'title', label: 'Action' },
          { key: 'assignee', label: 'Responsable' },
          { key: 'dueDate', label: 'Échéance' },
          { key: 'priority', label: 'Priorité', render: (row) => <StatusBadge status={String(row.priority)} /> },
          { key: 'status', label: 'Statut', render: (row) => <StatusBadge status={String(row.status)} /> },
        ]}
      />

      <p className="text-xs text-muted-foreground text-center">
        {safepitInspections.length} inspections cette semaine —{' '}
        <Link href="/inspections" className="text-primary hover:underline">consulter</Link>
      </p>
    </div>
  );
}
