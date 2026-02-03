
export interface Cliente {
  id: number;                    // ID do cliente
  nome: string;                  // Nome completo ou razão social
  documento: string | null;      // CPF ou CNPJ (opcional)
  email: string | null;          // Email do cliente (opcional)
  telefone: string | null;       // Telefone do cliente (opcional)
  observacoes?: string | null;    // Observações internas (opcional)
  user_id?: number;               // ID do advogado dono do cliente
  created_by?: string;            // ID do usuário que criou (string)
  updated_by?: string | null;     // ID do usuário que atualizou (string, opcional)
  deleted_by?: string | null;     // ID do usuário que deletou (string, opcional)
  iniciais?: string
  color?: string
  created_at?: string;            // Data de criação (ISO string)
  updated_at?: string;            // Data de atualização (ISO string)
  deleted_at?: string | null;     // Data de deleção - soft delete (ISO string, opcional)
}

/**
 * CreateClienteDto - Dados para criar um novo cliente
 * 
 * IMPORTANTE: NÃO incluir campos que o backend adiciona automaticamente:
 * - id (banco gera)
 * - user_id (backend pega do token JWT)
 * - created_by (backend pega do token JWT)
 * - created_at, updated_at (banco gera)
 */
export interface CreateClienteDto {
  nome: string;           // Obrigatório
  documento?: string;     // Opcional
  email?: string;         // Opcional
  telefone?: string;      // Opcional
  observacoes?: string;   // Opcional
}

/**
 * UpdateClienteDto - Dados para atualizar um cliente
 * 
 * Todos os campos são opcionais
 */
export interface UpdateClienteDto {
  nome?: string;
  documento?: string;
  email?: string;
  telefone?: string;
  observacoes?: string;
}

/**
 * ClienteQueryParams - Parâmetros para busca e paginação
 * 
 * Baseado no ClienteQueryDto do backend
 */
export interface ClienteQueryParams {
  search?: string;   // Termo de busca (nome, documento, email)
  page?: number;     // Página atual (default: 1)
  limit?: number;    // Itens por página (default: 10)
}

/**
 * ClientesResponse - Resposta paginada da API
 * 
 * Estrutura retornada pelo endpoint GET /clientes
 */
export interface ClientesResponse {
  data: Cliente[];   // Array de clientes
  total: number;     // Total de registros
  page: number;      // Página atual
  limit: number;     // Itens por página
}

/**
 * ApiResponse - Resposta genérica da API
 */
export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * ApiError - Estrutura de erro do NestJS
 */
export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp?: string;
  path?: string;
}

/**
 * ClienteStats - Estatísticas da dashboard
 * 
 * Para os cards: "Processos Ativos", "Novos esse Mês", "Total de Clientes"
 */
export interface ClienteStats {
  processosAtivos: number;   // 23
  novosEsteMes: number;      // 2
  totalClientes: number;     // 28
}


export interface ClienteDisplay extends Cliente {
  iniciais: string;              // Ex: "MS" para "Maria Silva"
  documentoFormatado?: string;   // Ex: "123.456.789-00"
  telefoneFormatado?: string;    // Ex: "(85) 98765-4321"
  avatarColor: string;           // Cor do avatar baseada no nome
}



export type ClienteFormData = CreateClienteDto;
export type ClienteUpdateFormData = UpdateClienteDto;