/** Données démo SafePit — mine de bauxite (Guinée). */

export type SafePitSeverity = 'observation' | 'near_miss' | 'minor' | 'major' | 'critical';
export type SafePitStatus = 'open' | 'investigating' | 'closed' | 'overdue';
export type InspectionResult = 'conforme' | 'non_conforme' | 'partiel';

export interface SafePitSite {
  id: string;
  name: string;
  zone: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  workers: number;
  lastInspection: string;
  conformityRate: number;
  status: 'active' | 'restricted' | 'closed';
}

export interface SafePitInspection {
  id: string;
  siteName: string;
  zone: string;
  template: string;
  inspector: string;
  date: string;
  score: number;
  result: InspectionResult;
  findings: number;
  photos: number;
}

export interface SafePitIncident {
  id: string;
  ref: string;
  title: string;
  siteName: string;
  zone: string;
  severity: SafePitSeverity;
  status: SafePitStatus;
  reportedBy: string;
  date: string;
  category: string;
  injured: number;
}

export interface SafePitAction {
  id: string;
  title: string;
  source: string;
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'done' | 'overdue';
}

export const SAFEPIT_DEMO_ORG = 'Compagnie Minière de Boké — Site Nord';

export const safepitKpis = {
  daysWithoutLostTime: 47,
  inspectionsThisMonth: 128,
  openIncidents: 6,
  overdueActions: 4,
  conformityRate: 91.2,
  trir: 0.42,
  workersOnSite: 842,
  activeZones: 12,
};

export const safepitSites: SafePitSite[] = [
  { id: '1', name: 'Fosse Nord A', zone: 'Extraction', riskLevel: 'critical', workers: 186, lastInspection: '2026-06-08', conformityRate: 88, status: 'active' },
  { id: '2', name: 'Convoyeur C-12', zone: 'Transport', riskLevel: 'high', workers: 42, lastInspection: '2026-06-09', conformityRate: 94, status: 'active' },
  { id: '3', name: 'Atelier maintenance', zone: 'Support', riskLevel: 'medium', workers: 68, lastInspection: '2026-06-07', conformityRate: 96, status: 'active' },
  { id: '4', name: 'Stockage explosifs', zone: 'Magasin', riskLevel: 'critical', workers: 12, lastInspection: '2026-06-05', conformityRate: 100, status: 'restricted' },
  { id: '5', name: 'Bassin de décantation', zone: 'Environnement', riskLevel: 'medium', workers: 24, lastInspection: '2026-06-04', conformityRate: 85, status: 'active' },
];

export const safepitInspections: SafePitInspection[] = [
  { id: '1', siteName: 'Fosse Nord A', zone: 'Extraction', template: 'Inspection quotidienne engins', inspector: 'Mamadou Camara', date: '2026-06-09 07:30', score: 92, result: 'conforme', findings: 1, photos: 4 },
  { id: '2', siteName: 'Convoyeur C-12', zone: 'Transport', template: 'Sécurité convoyeurs', inspector: 'Fatoumata Diallo', date: '2026-06-09 06:15', score: 78, result: 'non_conforme', findings: 3, photos: 6 },
  { id: '3', siteName: 'Stockage explosifs', zone: 'Magasin', template: 'Audit mensuel explosifs', inspector: 'Ibrahima Bah', date: '2026-06-08 14:00', score: 100, result: 'conforme', findings: 0, photos: 2 },
  { id: '4', siteName: 'Bassin de décantation', zone: 'Environnement', template: 'Contrôle environnement', inspector: 'Aissatou Sow', date: '2026-06-08 10:45', score: 85, result: 'partiel', findings: 2, photos: 3 },
  { id: '5', siteName: 'Atelier maintenance', zone: 'Support', template: 'EPI & outillage', inspector: 'Alpha Condé', date: '2026-06-07 16:20', score: 96, result: 'conforme', findings: 0, photos: 1 },
];

export const safepitIncidents: SafePitIncident[] = [
  { id: '1', ref: 'INC-2026-0142', title: 'Chute de pierre près du convoyeur', siteName: 'Convoyeur C-12', zone: 'Transport', severity: 'near_miss', status: 'investigating', reportedBy: 'Ousmane Barry', date: '2026-06-09 11:20', category: 'Chute / éboulement', injured: 0 },
  { id: '2', ref: 'INC-2026-0138', title: 'Fuite hydraulique sur dump truck DT-07', siteName: 'Fosse Nord A', zone: 'Extraction', severity: 'minor', status: 'open', reportedBy: 'Mariama Keita', date: '2026-06-08 15:45', category: 'Engins lourds', injured: 0 },
  { id: '3', ref: 'INC-2026-0131', title: 'EPI incomplet — zone concasseur', siteName: 'Fosse Nord A', zone: 'Extraction', severity: 'observation', status: 'closed', reportedBy: 'Agent HSE', date: '2026-06-07 08:10', category: 'EPI', injured: 0 },
  { id: '4', ref: 'INC-2026-0124', title: 'Blessure légère main — atelier', siteName: 'Atelier maintenance', zone: 'Support', severity: 'minor', status: 'closed', reportedBy: 'Superviseur atelier', date: '2026-06-05 13:30', category: 'Manutention', injured: 1 },
  { id: '5', ref: 'INC-2026-0119', title: 'Déversement huile — bassin décantation', siteName: 'Bassin de décantation', zone: 'Environnement', severity: 'major', status: 'investigating', reportedBy: 'Équipe environnement', date: '2026-06-04 09:00', category: 'Environnement', injured: 0 },
];

export const safepitActions: SafePitAction[] = [
  { id: '1', title: 'Installer garde-corps section C-12B', source: 'Inspection convoyeur C-12', assignee: 'Équipe maintenance', dueDate: '2026-06-12', priority: 'critical', status: 'in_progress' },
  { id: '2', title: 'Remplacer extincteurs expirés magasin', source: 'Audit explosifs', assignee: 'Sécurité incendie', dueDate: '2026-06-10', priority: 'high', status: 'overdue' },
  { id: '3', title: 'Formation recyclage conduite engins', source: 'Incident INC-2026-0138', assignee: 'RH / Formation', dueDate: '2026-06-15', priority: 'medium', status: 'open' },
  { id: '4', title: 'Nettoyage et confinement déversement huile', source: 'INC-2026-0119', assignee: 'Équipe environnement', dueDate: '2026-06-08', priority: 'high', status: 'overdue' },
  { id: '5', title: 'Vérifier ancrage filets anti-chute fosse', source: 'Inspection quotidienne', assignee: 'Superviseur extraction', dueDate: '2026-06-11', priority: 'critical', status: 'open' },
];

export const safepitIncidentTrend = [
  { mois: 'Jan', incidents: 8, nearMiss: 14 },
  { mois: 'Fév', incidents: 6, nearMiss: 11 },
  { mois: 'Mar', incidents: 5, nearMiss: 9 },
  { mois: 'Avr', incidents: 7, nearMiss: 12 },
  { mois: 'Mai', incidents: 4, nearMiss: 8 },
  { mois: 'Juin', incidents: 3, nearMiss: 6 },
];

export const safepitConformityByZone = [
  { zone: 'Extraction', taux: 88 },
  { zone: 'Transport', taux: 91 },
  { zone: 'Support', taux: 96 },
  { zone: 'Magasin', taux: 100 },
  { zone: 'Environnement', taux: 85 },
];

export const safepitAiInsights = [
  { id: '1', title: 'Risque récurrent convoyeur C-12', description: '3 non-conformités similaires en 30 jours. Planifier arrêt maintenance 4 h cette semaine.', priority: 'high' as const },
  { id: '2', title: 'Tendance positive TRIR', description: 'TRIR en baisse de 18 % sur 6 mois. Maintenir les toolbox talks matinaux.', priority: 'medium' as const },
  { id: '3', title: 'Actions en retard', description: '4 actions dépassent l’échéance — escalade recommandée au directeur HSE.', priority: 'high' as const },
];

export const severityLabels: Record<SafePitSeverity, string> = {
  observation: 'Observation',
  near_miss: 'Quasi-accident',
  minor: 'Incident mineur',
  major: 'Incident majeur',
  critical: 'Critique',
};

export const severityColors: Record<SafePitSeverity, string> = {
  observation: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  near_miss: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  minor: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300',
  major: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
  critical: 'bg-red-600 text-white',
};

export const riskLabels: Record<SafePitSite['riskLevel'], string> = {
  low: 'Faible',
  medium: 'Moyen',
  high: 'Élevé',
  critical: 'Critique',
};

export const riskColors: Record<SafePitSite['riskLevel'], string> = {
  low: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
};

export const DEMO_LOGIN = {
  email: 'hse@demo.safepit.com',
  password: 'demo1234',
  name: 'Directeur HSE',
  org: SAFEPIT_DEMO_ORG,
};
