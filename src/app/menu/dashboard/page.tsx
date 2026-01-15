// src/app/(dashboard)/page.tsx

'use client';

import { useAuth } from '@/src/contexts/AuthContexts';
import { useDashboard } from '@/src/hooks/useDashboard';
import { 
  StatsGrid, 
  UpcomingHearings, 
  RecentUpdates, 
  QuickActions 
} from '@/src/components/dashboard';
import { HeaderForPage } from '@/src/components/HeaderForPage';

export default function DashboardPage() {
  const { user, token } = useAuth();
  const { data, loading, error } = useDashboard(token ?? undefined);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-exclamation-circle text-4xl text-red-600 mb-4"></i>
          <p className="text-red-600 font-semibold mb-2">Erro ao carregar dados</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Nenhum dado disponível</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <HeaderForPage title={`Bem-vindo de volta, ${user?.nome || 'Advogado'}!`} subtitle={' Aqui está um resumo das suas atividades jurídicas'}  button= {false}/>


      {/* Stats Grid - 4 Cards */}
      <StatsGrid data={data.counts} />

      {/* Content Grid - Audiências + Atualizações */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <UpcomingHearings hearings={data.upcomingHearings} />
        <RecentUpdates cases={data.recentCases} />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}