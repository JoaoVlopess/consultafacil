'use client';

import { useState, useEffect } from 'react';
import { DashboardService } from '@/src/services/dashboard.service';
import type { DashboardOverview } from '@/src/types/dashboard';

interface UseDashboardReturn {
  data: DashboardOverview | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const mockData = {
  counts: { activeCases: 12, hearingsNext7Days: 4 },
  upcomingHearings: [
    { id: 1, data: new Date().toISOString(), processo: { numeroProcesso: '00123-SP' } },
    { id: 2, data: new Date().toISOString(), processo: { numeroProcesso: '00124-SP' } },
  ],
  recentCases: [
    { id: 1, titulo: 'Processo Teste', lastUpdateAt: new Date().toISOString() },
    { id: 2, titulo: 'Processo Teste 2', lastUpdateAt: new Date().toISOString() }
  ]
};


export function useDashboard(token?: string): UseDashboardReturn {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);




const fetchData = async () => {
    // Se não houver token, usamos o mock e encerramos a função sem retornar valor
    /*if (!token) {
      setData(mockData as any); // O 'as any' é para evitar conflito de tipos com o mock
      setLoading(false);
      setError(null);
      return; // Aqui retornamos 'void', resolvendo o erro do TS
    }*/

         if (!token) {
       setError('Token não fornecido');
       setLoading(false);
       return;
     }

    try {
      setLoading(true);
      setError(null);
      const result = await DashboardService.getOverview(token);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}