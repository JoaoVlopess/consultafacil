// src/components/dashboard/StatsGrid.tsx

import { StatsCard } from '../dashboard/StatsCard';
import type { DashboardOverview } from '@/src/types/dashboard';


export function StatsGridCli() {
  const statsData = [
    {
      title: 'Processos Ativos',
      value: '23',
      subtitle: '',
      icon: 'fa-briefcase',
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trendIcon: '',
      trendColor: '',
    },
    {
      title: 'Novos esse Mês',
      value: '2', // TODO: Adicionar no backend depois
      subtitle: '',
      icon: 'fa-chart-line',
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      trendIcon: '',
      trendColor: '',
    },
    {
      title: 'Total de Clientes',
      value: 28, // TODO: Adicionar no backend depois
      subtitle: '',
      icon: 'fa-users',
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      trendIcon: '',
      trendColor: '',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
      {statsData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}