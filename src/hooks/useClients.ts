// src/hooks/useProcessos.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ProcessoService } from '@/src/services/processes.service';
import { 
  ProcessesResponse, 
  ProcessQueryParams, 
  ProcessoStatus 
} from '@/src/types/process';

export const mockClients = [
  { id: 1, nome: "Maria Silva", email: "maria.silva@email.com", telefone: "(85) 98765-4321", documento: "123.456.789-00", iniciais: "MS", color: "from-blue-500 to-indigo-600" },
  { id: 2, nome: "João Santos", email: "joao.santos@empresa.com", telefone: "(85) 99123-4567", documento: "987.654.321-00", iniciais: "JS", color: "from-purple-500 to-pink-600" },
  { id: 3, nome: "Ana Paula Oliveira", email: "ana.oliveira@email.com", telefone: "(85) 98888-9999", documento: "456.789.123-00", iniciais: "AP", color: "from-green-500 to-emerald-600" },
  { id: 4, nome: "Carlos Lima", email: "carlos.lima@gmail.com", telefone: "(85) 97777-8888", documento: "789.123.456-00", iniciais: "CL", color: "from-orange-500 to-red-600" },
  { id: 5, nome: "Fernanda Martins", email: "fernanda.m@outlook.com", telefone: "(85) 96666-7777", documento: "321.654.987-00", iniciais: "FM", color: "from-cyan-500 to-blue-600" },
  { id: 6, nome: "Ricardo Souza", email: "ricardo.souza@yahoo.com", telefone: "(85) 95555-4444", documento: "654.321.987-11", iniciais: "RS", color: "from-yellow-500 to-orange-600" },
];

interface UseProcessosParams {
  token: string | null;
  search?: string;
  status?: ProcessoStatus;      
  client_id?: number;          
  page?: number;
  limit?: number;
}

interface UseProcessosReturn {
  data: ProcessesResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const mockData: ProcessesResponse = {
items: [
    {
      id: 1,
      numeroProcesso: '0001234-56.2024.8.26.0100',
      titulo: 'Ação de Cobrança',
      forum: '1ª Vara Cível',
      status: ProcessoStatus.EM_ANDAMENTO,
      client_id: 1,
      user_id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      lastUpdateAt: new Date().toISOString(),
      client: {
        id: 1,
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '(11) 98765-4321',
        documento: '123.456.789-00',
        iniciais: 'JS',
        color: '#4F46E5',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    },
    {
      id: 2,
      numeroProcesso: '0005678-90.2024.8.26.0200',
      titulo: 'Ação Trabalhista',
      forum: '2ª Vara do Trabalho',
      status: ProcessoStatus.PENDENTE,
      client_id: 2,
      user_id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      lastUpdateAt: new Date().toISOString(),
      client: {
        id: 2,
        nome: 'Maria Santos',
        email: 'maria@email.com',
        telefone: '(11) 99876-5432',
        documento: '987.654.321-11',
        iniciais: 'MS',
        color: '#EC4899',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    },
    {
      id: 3,
      numeroProcesso: '0009876-54.2024.8.26.0300',
      titulo: 'Inventário',
      forum: 'Vara de Família',
      status: ProcessoStatus.GANHO,
      client_id: 1,
      user_id: 1,
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      lastUpdateAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      client: {
        id: 1,
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '(11) 98765-4321',
        documento: '123.456.789-00',
        iniciais: 'JS',
        color: '#4F46E5',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    },
  ],
  total: 3,
  page: 1,
  limit: 10,
  totalPages: 1
};

export function useProcessos(params: UseProcessosParams): UseProcessosReturn {
  const [data, setData] = useState<ProcessesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Extrair params
  const { token, search, status, client_id, page, limit } = params;

  // Função para buscar os dados
  const fetchData = useCallback(async () => {
    // ✅ Se não houver token, usa mock
    if (!token) {
      console.log('🔵 Usando dados MOCK (sem token)');
      
      // ✅ Aplicar filtros no mock
      let filteredItems = [...mockData.items];
      
      if (search) {
        const searchLower = search.toLowerCase();
        filteredItems = filteredItems.filter(p => 
          p.numeroProcesso.toLowerCase().includes(searchLower) ||
          p.titulo.toLowerCase().includes(searchLower)
        );
      }
      
      if (status) {
        filteredItems = filteredItems.filter(p => p.status === status);
      }
      
      if (client_id) {
        filteredItems = filteredItems.filter(p => p.client_id === client_id);
      }

      setData({
        items: filteredItems, 
        total: filteredItems.length,
        page: page || 1,
        limit: limit || 10,
        totalPages: Math.ceil(filteredItems.length / (limit || 10)),
      });
      setLoading(false);
      setError(null);
      return;
    }

    // ✅ Com token, faz requisição real
    try {
      setLoading(true);
      setError(null);

      console.log('🟢 Buscando processos da API com filtros:', {
        search,
        status,
        client_id,
        page,
        limit,
      });

      // Montar filtros
      const filters: ProcessQueryParams = {};
      
      if (search) filters.search = search;
      if (status) filters.status = status;
      if (client_id) filters.client_id = client_id;
      if (page) filters.page = page;
      if (limit) filters.limit = limit;

      const result = await ProcessoService.findAll(filters);
      
      console.log('✅ Processos carregados:', result.items.length);
      setData(result);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar processos';
      console.error('❌ Erro ao buscar processos:', err);
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [token, search, status, client_id, page, limit]);

  // ✅ Debounce para busca (300ms)
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