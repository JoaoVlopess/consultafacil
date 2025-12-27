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

export function useDashboard(token?: string): UseDashboardReturn {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
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