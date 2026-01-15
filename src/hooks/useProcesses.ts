//  # Hook para buscar processos
// src/hooks/useProcessos.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ProcessoService } from '@/src/services/processes.service';
import type { ProcessoListResponse, ProcessoFilters } from '@/src/types/process';

interface UseProcessosParams {
  token: string | null;
  search?: string;
  status?: string;
  client_id?: string;
  page?: number;
  limit?: number;
}

interface UseProcessosReturn {
  data: ProcessoListResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Mock data para desenvolvimento/testes
const mockData: ProcessoListResponse = {
  data: [
    {
      id: 1,
      numeroProcesso: '0001234-56.2024.8.26.0100',
      titulo: 'Ação de Cobrança',
      forum: '1ª Vara Cível',
      status: 'EM_ANDAMENTO',
      client_id: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastUpdateAt: new Date().toISOString(),
      client: {
        id: 1,
        nome: 'João Silva',
        email: 'joao@email.com'
      }
    },
    {
      id: 2,
      numeroProcesso: '0005678-90.2024.8.26.0200',
      titulo: 'Ação Trabalhista',
      forum: '2ª Vara do Trabalho',
      status: 'PENDENTE',
      client_id: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      client: {
        id: 2,
        nome: 'Maria Santos',
        email: 'maria@email.com'
      }
    }
  ],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 2,
    itemsPerPage: 10
  }
};

export function useProcessos(params: UseProcessosParams): UseProcessosReturn {
  const [data, setData] = useState<ProcessoListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os dados
  const fetchData = useCallback(async () => {
    const { token, search, status, client_id, page, limit } = params;

    // Se não houver token, usamos o mock e encerramos a função
    if (!token) {
      setData(mockData);
      setLoading(false);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Montar filtros
      const filters: ProcessoFilters = {};
      
      if (search) filters.search = search;
      if (status) filters.status = status as any;
      if (client_id) filters.client_id = parseInt(client_id);
      if (page) filters.page = page;
      if (limit) filters.limit = limit;

      const result = await ProcessoService.findAll(filters);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar processos');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [params.token, params.search, params.status, params.client_id, params.page, params.limit]);

  // Debounce para busca (300ms)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}