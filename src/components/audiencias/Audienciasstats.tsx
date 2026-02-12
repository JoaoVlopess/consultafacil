// src/components/audiencias/AudienciasStats.tsx

import { StatsCards, StatCardConfig } from '@/src/components/Statscards';

interface AudienciasStatsProps {
  stats: {
    hoje: number;
    estaSemana: number;
    esteMes: number;
    totalAgendadas: number;
  };
}

/**
 * Componente de estatísticas de audiências
 * Usa o componente genérico StatsCards
 */
export function AudienciasStats({ stats }: AudienciasStatsProps) {
  const cards: StatCardConfig[] = [
    {
      label: 'Hoje',
      value: stats.hoje,
      icon: 'fas fa-calendar-day',
      color: 'red',
    },
    {
      label: 'Esta Semana',
      value: stats.estaSemana,
      icon: 'fas fa-calendar-week',
      color: 'orange',
    },
    {
      label: 'Este Mês',
      value: stats.esteMes,
      icon: 'fas fa-calendar-alt',
      color: 'blue',
    },
    {
      label: 'Total Agendadas',
      value: stats.totalAgendadas,
      icon: 'fas fa-calendar-check',
      color: 'purple',
    },
  ];

  return <StatsCards cards={cards} columns={4} />;
}