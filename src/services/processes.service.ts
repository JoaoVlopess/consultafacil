// src/services/processo.service.ts
import { fetchAPI } from './api';
import type { 
  ProcessFormData,
  ProcessQueryParams,
  ProcessesResponse,
  Process,
} from '@/src/types/process';

// Interfaces para respostas da API
interface ProcessoResponse {
  success: boolean;
  data: Process;
  message?: string;
}

interface ProcessoDeleteResponse {
  success: boolean;
  deleted: boolean;
  message?: string;
}

export class ProcessoService {
  /**
   * Criar novo processo - POST /processos
   */
  static async create(processoData: ProcessFormData): Promise<ProcessoResponse> {
    return fetchAPI<ProcessoResponse>('/processos', {
      method: 'POST',
      body: JSON.stringify(processoData),
    });
  }

  /**
   * Listar processos com filtros - GET /processos
   */
  static async findAll(filters?: ProcessQueryParams): Promise<ProcessesResponse> {
    const searchParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value));
        }
      });
    }

    const queryString = searchParams.toString();
    const url = queryString ? `/processos?${queryString}` : '/processos';

    return fetchAPI<ProcessesResponse>(url, {
      method: 'GET',
    });
  }

  /**
   * Buscar processo por ID - GET /processos/:id
   */
  static async findOne(id: number): Promise<ProcessoResponse> {
    return fetchAPI<ProcessoResponse>(`/processos/${id}`, {
      method: 'GET',
    });
  }

  /**
   * Atualizar processo - PATCH /processos/:id
   */
  static async update(id: number, updateData: Partial<ProcessFormData>): Promise<ProcessoResponse> {
    return fetchAPI<ProcessoResponse>(`/processos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });
  }

  /**
   * Deletar processo - DELETE /processos/:id
   */
  static async remove(id: number): Promise<ProcessoDeleteResponse> {
    return fetchAPI<ProcessoDeleteResponse>(`/processos/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Buscar processos por cliente - GET /processos/cliente/:clienteId
   */
  static async findByCliente(clienteId: number): Promise<ProcessesResponse> {
    return fetchAPI<ProcessesResponse>(`/processos/cliente/${clienteId}`, {
      method: 'GET',
    });
  }

  /**
   * Buscar processos por status
   */
  static async findByStatus(status: string): Promise<ProcessesResponse> {
    return this.findAll({ status: status as any });
  }

  /**
   * Buscar processos com paginação simples
   */
  static async findPaginated(page: number = 1, limit: number = 10): Promise<ProcessesResponse> {
    return this.findAll({ page, limit });
  }

  /**
   * Buscar processos por termo de busca
   */
  static async search(searchTerm: string, page: number = 1): Promise<ProcessesResponse> {
    return this.findAll({ 
      search: searchTerm, 
      page,
      limit: 10 
    });
  }

  /**
   * Buscar estatísticas dos processos
   */
  static async getStats(): Promise<{
    total: number;
    porStatus: Record<string, number>;
    recentes: Process[];
  }> {
    return fetchAPI<{
      total: number;
      porStatus: Record<string, number>;
      recentes: Process[];
    }>('/processos/stats', {
      method: 'GET',
    });
  }
}