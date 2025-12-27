// src/components/dashboard/StatsGrid.tsx

import { StatsCard } from './StatsCard';
import type { DashboardOverview } from '@/src/types/dashboard';

interface StatsGridProps {
  data: DashboardOverview['counts'];
}

export function StatsGrid({ data }: StatsGridProps) {
  const statsData = [
    {
      title: 'Processos Ativos',
      value: data.activeCases,
      subtitle: '2 novos esta semana',
      icon: 'fa-briefcase',
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trendIcon: 'fa-arrow-up',
      trendColor: 'text-green-600',
    },
    {
      title: 'Audiências (7 dias)',
      value: data.hearingsNext7Days,
      subtitle: 'Próxima amanhã',
      icon: 'fa-gavel',
      iconBgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      trendIcon: 'fa-clock',
      trendColor: 'text-orange-600',
    },
    {
      title: 'Total de Clientes',
      value: 28, // TODO: Adicionar no backend depois
      subtitle: '1 novo cliente',
      icon: 'fa-users',
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      trendIcon: 'fa-user-plus',
      trendColor: 'text-blue-600',
    },
    {
      title: 'Taxa de Sucesso',
      value: '87%', // TODO: Adicionar no backend depois
      subtitle: 'Acima da média',
      icon: 'fa-chart-line',
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      trendIcon: 'fa-trophy',
      trendColor: 'text-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}