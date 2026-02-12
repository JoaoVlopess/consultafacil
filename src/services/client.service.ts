
import { fetchAPI } from './api';
import type {
  Cliente,
  CreateClienteDto,
  UpdateClienteDto,
  ClienteQueryParams,
  ClientesResponse,
  ClienteStats,
} from '@/src/types/client';

export const clienteService = {
  /**
   * Busca clientes com paginação e busca
   * 
   * @param params - Parâmetros de query (search, page, limit)
   * @param token - Token JWT (opcional, pega do localStorage se não fornecido)
   * @returns Promise com resposta paginada
   * 
   * @example
   * const clientes = await clienteService.getAll({
   *   search: 'Maria',
   *   page: 1,
   *   limit: 10
   * });
   */
  async getAll(
    params: ClienteQueryParams = {},
  ): Promise<ClientesResponse> {
    const { page = 1, limit = 10, search = '' } = params;

    // Constrói query string
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());
    if (search) {
      queryParams.append('search', search);
    }

    // Faz requisição
    const data = await fetchAPI<ClientesResponse>(
      `/clientes?${queryParams.toString()}`,
      {
        method: 'GET',
      }
    );

    return data;
  },

  /**
   * Busca um cliente específico por ID
   * 
   * @param id - ID do cliente
   * @param token - Token JWT (opcional, pega do localStorage se não fornecido)
   * @returns Promise com o cliente
   * @throws Error se cliente não for encontrado (404)
   * 
   * @example
   * const cliente = await clienteService.getById(123);
   */
  async getById(id: number): Promise<Cliente> {
    const data = await fetchAPI<Cliente>(`/clientes/${id}`, {
      method: 'GET',
      
    });

    return data;
  },

  /**
   * Cria um novo cliente
   * 
   * @param clienteData - Dados do cliente a ser criado
   * @param token - Token JWT (opcional, pega do localStorage se não fornecido)
   * @returns Promise com o cliente criado
   * 
   * @example
   * const novoCliente = await clienteService.create({
   *   nome: 'Maria Silva',
   *   email: 'maria@email.com',
   *   telefone: '85987654321',
   *   documento: '12345678900'
   * });
   */
  async create(clienteData: CreateClienteDto): Promise<Cliente> {
    const data = await fetchAPI<Cliente>('/clientes', {
      method: 'POST',
      body: JSON.stringify(clienteData)
      
    });

    return data;
  },

  /**
   * Atualiza um cliente existente
   * 
   * @param id - ID do cliente
   * @param clienteData - Dados a serem atualizados
   * @param token - Token JWT (opcional, pega do localStorage se não fornecido)
   * @returns Promise com o cliente atualizado
   * 
   * @example
   * const clienteAtualizado = await clienteService.update(123, {
   *   telefone: '85999999999'
   * });
   */
  async update(
    id: number,
    clienteData: UpdateClienteDto

  ): Promise<Cliente> {
    const data = await fetchAPI<Cliente>(`/clientes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(clienteData)

    });

    return data;
  },

  /**
   * Remove um cliente (soft delete)
   * 
   * @param id - ID do cliente a ser removido
   * @param token - Token JWT (opcional, pega do localStorage se não fornecido)
   * @returns Promise void
   * 
   * @example
   * await clienteService.delete(123);
   */
  async delete(id: number): Promise<void> {
    await fetchAPI<void>(`/clientes/${id}`, {
      method: 'DELETE'

    });
  },

  /**
   * Busca estatísticas dos clientes
   * 
   * NOTA: Este endpoint precisa ser implementado no backend
   * Por enquanto, é um mock baseado nos dados da imagem
   * 
   * @param token - Token JWT (opcional, pega do localStorage se não fornecido)
   * @returns Promise com estatísticas
   * 
   * @example
   * const stats = await clienteService.getStats();
   * // { processosAtivos: 23, novosEsteMes: 2, totalClientes: 28 }
   */
  async getStats(): Promise<ClienteStats> {
    // TODO: Implementar endpoint no backend
    // Por enquanto, retorna mock baseado na UI
    try {
      const data = await fetchAPI<ClienteStats>('/clientes/stats', {
        method: 'GET',
      });
      return data;
    } catch (error) {
      // Fallback: mock data
      console.warn(
        'Endpoint /clientes/stats não implementado. Usando mock data.'
      );
      return {
        processosAtivos: 0,
        novosEsteMes: 0,
        totalClientes: 0,
      };
    }
  },

  /**
   * Busca clientes por documento
   * 
   * Helper útil para verificar duplicatas
   * 
   * @param documento - CPF ou CNPJ
   * @param token - Token JWT (opcional)
   * @returns Promise com clientes encontrados
   */
  async findByDocumento(documento: string): Promise<Cliente[]> {
    const response = await this.getAll({ search: documento, limit: 1 });
    return response.data.filter((c) => c.documento === documento);
  },

  /**
   * Busca clientes por email
   * 
   * Helper útil para verificar duplicatas
   * 
   * @param email - Email do cliente
   * @param token - Token JWT (opcional)
   * @returns Promise com clientes encontrados
   */
  async findByEmail(email: string): Promise<Cliente[]> {
    const response = await this.getAll({ search: email, limit: 1 });
    return response.data.filter((c) => c.email === email);
  },
};

// ============================================================================
// HELPERS AUXILIARES
// ============================================================================

/**
 * Formata documento (CPF ou CNPJ)
 * 
 * @param documento - Documento sem formatação
 * @returns Documento formatado
 * 
 * @example
 * formatarDocumento('12345678900') // '123.456.789-00'
 * formatarDocumento('12345678000190') // '12.345.678/0001-90'
 */
export function formatarDocumento(documento: string | null): string {
  if (!documento) return '';

  const apenasNumeros = documento.replace(/\D/g, '');

  // CPF: 123.456.789-00
  if (apenasNumeros.length === 11) {
    return apenasNumeros.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    );
  }

  // CNPJ: 12.345.678/0001-90
  if (apenasNumeros.length === 14) {
    return apenasNumeros.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5'
    );
  }

  return documento;
}

/**
 * Formata telefone brasileiro
 * 
 * @param telefone - Telefone sem formatação
 * @returns Telefone formatado
 * 
 * @example
 * formatarTelefone('85987654321') // '(85) 98765-4321'
 * formatarTelefone('8532211234') // '(85) 3221-1234'
 */
export function formatarTelefone(telefone: string | null): string {
  if (!telefone) return '';

  const apenasNumeros = telefone.replace(/\D/g, '');

  // Celular: (85) 98765-4321
  if (apenasNumeros.length === 11) {
    return apenasNumeros.replace(
      /(\d{2})(\d{5})(\d{4})/,
      '($1) $2-$3'
    );
  }

  // Fixo: (85) 3221-1234
  if (apenasNumeros.length === 10) {
    return apenasNumeros.replace(
      /(\d{2})(\d{4})(\d{4})/,
      '($1) $2-$3'
    );
  }

  return telefone;
}

/**
 * Gera iniciais do nome
 * 
 * @param nome - Nome completo
 * @returns Iniciais (máximo 2 letras)
 * 
 * @example
 * gerarIniciais('Maria Silva') // 'MS'
 * gerarIniciais('João') // 'JO'
 */
export function gerarIniciais(nome: string): string {
  if (!nome) return '';

  const palavras = nome.trim().split(' ');

  if (palavras.length === 1) {
    return palavras[0].substring(0, 2).toUpperCase();
  }

  return (
    palavras[0].charAt(0).toUpperCase() +
    palavras[palavras.length - 1].charAt(0).toUpperCase()
  );
}

/**
 * Gera cor de avatar baseada no nome
 * 
 * @param nome - Nome do cliente
 * @returns Código de cor hexadecimal
 * 
 * @example
 * gerarCorAvatar('Maria Silva') // '#6366f1' (azul)
 */
export function gerarCorAvatar(nome: string): string {
  const cores = [
    '#6366f1', // blue (como "MS" na imagem)
    '#ec4899', // pink (como "JS" na imagem)
    '#10b981', // green (como "AP" na imagem)
    '#f97316', // orange (como "CL" na imagem)
    '#06b6d4', // cyan (como "FM" na imagem)
    '#8b5cf6', // purple
    '#f59e0b', // amber
    '#14b8a6', // teal
  ];


  let hash = 0;
  for (let i = 0; i < nome.length; i++) {
    hash = nome.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % cores.length;
  return cores[index];
}

/**
 * Converte Cliente para ClienteDisplay
 * 
 * Adiciona campos formatados para exibição
 * 
 * @param cliente - Cliente da API
 * @returns Cliente com campos de exibição
 */
export function converterParaDisplay(cliente: Cliente): ClienteDisplay {
  return {
    ...cliente,
    iniciais: gerarIniciais(cliente.nome),
    documentoFormatado: formatarDocumento(cliente.documento),
    telefoneFormatado: formatarTelefone(cliente.telefone),
    avatarColor: gerarCorAvatar(cliente.nome),
  };
}

// Tipo auxiliar já exportado
import type { ClienteDisplay } from '@/src/types/client';