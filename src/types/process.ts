
// src/types/process.ts

import { Hearing } from "./audiencia";
import { Cliente } from "./client";

/**
 * ===============================================
 * ENUMS - Mesmo do backend
 * ===============================================
 */

export enum ProcessoStatus {
  PENDENTE = 'PENDENTE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  ARQUIVADO = 'ARQUIVADO',
  GANHO = 'GANHO',
  PERDIDO = 'PERDIDO',
}

/**
 * ===============================================
 * INTERFACES PRINCIPAIS
 * ===============================================
 */

/**
 * Interface do Processo (entidade completa retornada pelo backend)
 * Baseado na entidade Processo do NestJS
 */
export interface Process {
  id: number;
  numeroProcesso: string;
  titulo: string;
  forum?: string;
  status: ProcessoStatus;
  client_id: number;
  user_id: number;
  lastUpdateAt?: string;          // ISO date string
  created_at: string;              // ISO date string
  updated_at: string;              // ISO date string
  deleted_at?: string | null;      // ISO date string ou null
  
  // Relações (quando incluídas no backend)
  client?: Cliente;                // Relação com cliente
  audiencias?: Hearing[];          // Relação com audiências
}

/**
 * DTO para criar processo (CreateProcessoDto do backend)
 * Usado ao fazer POST /processos
 */
export interface CreateProcessDto {
  numeroProcesso: string;          // Obrigatório
  titulo: string;                  // Obrigatório
  forum?: string;                  // Opcional
  status: ProcessoStatus;          // Obrigatório (default PENDENTE)
  client_id: number;               // Obrigatório
}

/**
 * DTO para atualizar processo (UpdateProcessoDto do backend)
 * Usado ao fazer PATCH /processos/:id
 * Todos os campos são opcionais
 */
export interface UpdateProcessDto {
  numeroProcesso?: string;
  titulo?: string;
  forum?: string;
  status?: ProcessoStatus;
  client_id?: number;
  lastUpdateAt?: string;           // ISO date string
}

/**
 * Query params para filtrar/buscar processos (ProcessoQueryDto do backend)
 * Usado em GET /processos?search=&status=&client_id=&page=&limit=
 */
export interface ProcessQueryParams {
  search?: string;                 // Busca por número ou título
  status?: ProcessoStatus;         // Filtrar por status
  client_id?: number;              // Filtrar por cliente
  page?: number;                   // Página atual (default: 1)
  limit?: number;                  // Itens por página (default: 10)
}

/**
 * Resposta paginada da API
 * Estrutura típica retornada pelo backend
 */
export interface ProcessesResponse {
  items: Process[];         
  total: number;         
  page: number;          
  limit: number;           
  totalPages: number;      
}

/**
 * ===============================================
 * TYPES PARA COMPONENTES (UI)
 * ===============================================
 */

/**
 * Dados do formulário (usado no frontend)
 * Combina CreateProcessDto + validações extras do frontend
 */
export interface ProcessFormData {
  numeroProcesso: string;
  titulo: string;
  forum?: string;
  status: ProcessoStatus;
  client_id: number;
  // Campos extras para UX (não enviados ao backend)
  confirmacao?: boolean;           // Checkbox de confirmação
}

/**
 * Estatísticas de processos (para os 4 cards)
 * Calculado no frontend a partir da lista
 */
export interface ProcessStats {
  emAndamento: number;             // Status = EM_ANDAMENTO
  ganhos: number;                  // Status = GANHO
  perdidos: number;                // Status = PERDIDO
  arquivados: number;              // Status = ARQUIVADO
  pendentes: number;               // Status = PENDENTE
  total: number;                   // Todos
}

/**
 * Props para o ProcessCard
 */
export interface ProcessCardProps {
  process: Process;
  onEdit: (process: Process) => void;
  onDelete: (id: number) => void;
}

/**
 * Props para ProcessForm
 */
export interface ProcessFormProps {
  process: Process | null;         // null = criar novo, Process = editar
  onSuccess: () => void;
  onCancel: () => void;
}

/**
 * ===============================================
 * HELPER TYPES
 * ===============================================
 */

/**
 * Tipo para mapeamento de cores por status
 */
export type StatusColorMap = {
  [key in ProcessoStatus]: {
    badge: string;                 // Classes Tailwind para badge
    bg: string;                    // Cor de fundo
    text: string;                  // Cor do texto
    icon: string;                  // Ícone Font Awesome
  };
};

/**
 * Mapeamento de status para labels em português
 */
export const STATUS_LABELS: Record<ProcessoStatus, string> = {
  [ProcessoStatus.PENDENTE]: 'Pendente',
  [ProcessoStatus.EM_ANDAMENTO]: 'Em Andamento',
  [ProcessoStatus.ARQUIVADO]: 'Arquivado',
  [ProcessoStatus.GANHO]: 'Ganho',
  [ProcessoStatus.PERDIDO]: 'Perdido',
};

/**
 * Configuração visual por status
 */
export const STATUS_CONFIG: StatusColorMap = {
  [ProcessoStatus.PENDENTE]: {
    badge: 'bg-yellow-100 text-yellow-800',
    bg: 'bg-yellow-50',
    text: 'text-yellow-600',
    icon: 'fa-clock',
  },
  [ProcessoStatus.EM_ANDAMENTO]: {
    badge: 'bg-blue-100 text-blue-800',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    icon: 'fa-spinner',
  },
  [ProcessoStatus.GANHO]: {
    badge: 'bg-green-100 text-green-800',
    bg: 'bg-green-50',
    text: 'text-green-600',
    icon: 'fa-trophy',
  },
  [ProcessoStatus.PERDIDO]: {
    badge: 'bg-red-100 text-red-800',
    bg: 'bg-red-50',
    text: 'text-red-600',
    icon: 'fa-times-circle',
  },
  [ProcessoStatus.ARQUIVADO]: {
    badge: 'bg-gray-100 text-gray-800',
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    icon: 'fa-archive',
  },
};

/**
 * ===============================================
 * TYPE GUARDS (Validações de tipo em runtime)
 * ===============================================
 */

/**
 * Verifica se um status é válido
 */
export function isValidStatus(status: string): status is ProcessoStatus {
  return Object.values(ProcessoStatus).includes(status as ProcessoStatus);
}

/**
 * Verifica se um processo tem audiências agendadas
 */
export function hasUpcomingHearings(process: Process): boolean {
  if (!process.audiencias || process.audiencias.length === 0) {
    return false;
  }
  
  const now = new Date();
  return process.audiencias.some(
    audiencia => new Date(audiencia.data) > now
  );
}

/**
 * ===============================================
 * IMPORTS DE TIPOS RELACIONADOS
 * ===============================================
 */

/**
 * Interface de Cliente (relação)
 * Importar do arquivo de types de cliente


/**
 * Interface de Audiência (relação)
 * Importar do arquivo de types de audiência
 */

