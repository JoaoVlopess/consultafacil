// src/components/processos/ProcessesStats.tsx

import { StatsCards, StatCardConfig } from '@/src/components/Statscards';

interface ProcessesStatsProps {
  stats: {
    emAndamento: number;
    ganhos: number;
    arquivados: number;
    total: number;
  };
}

export function ProcessesStats({ stats }: ProcessesStatsProps) {
  const cards: StatCardConfig[] = [
    {
      label: 'Em Andamento',
      value: stats.emAndamento,
      icon: 'fas fa-spinner',
      color: 'blue',
    },
    {
      label: 'Ganhos',
      value: stats.ganhos,
      icon: 'fas fa-trophy',
      color: 'green',
    },
    {
      label: 'Arquivados',
      value: stats.arquivados,
      icon: 'fas fa-archive',
      color: 'gray',
    },
    {
      label: 'Total',
      value: stats.total,
      icon: 'fas fa-briefcase',
      color: 'purple',
    },
  ];

  return <StatsCards cards={cards} columns={4} />;
}