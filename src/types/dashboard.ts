// Tipos baseados no seu DashboardOverviewDto
export interface DashboardOverview {
  counts: {
    activeCases: number;
    hearingsNext7Days: number;
  };
  upcomingHearings: Audiencia[];
  recentCases: Processo[];
}

// Baseado na sua entidade Audiencia
export interface Audiencia {
  id: number;
  data: string; // ISO string
  local?: string;
  notas?: string;
  processo: Processo;
  created_at: string;
  updated_at: string;
}

// Baseado na sua entidade Processo
export interface Processo {
  id: number;
  numero: string;
  titulo: string;
  forum?: string;
  status: ProcessoStatus;
  lastUpdateAt?: string;
  created_at: string;
  updated_at: string;
}

export enum ProcessoStatus {
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  ARQUIVADO = 'ARQUIVADO',
  GANHO = 'GANHO',
  PERDIDO = 'PERDIDO',
}

// Tipos para os cards de estatísticas (UI)
export interface StatsCardData {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  trendIcon?: string;
  trendColor?: string;
}