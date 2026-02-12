
// src/types/process.ts

import { Hearing } from "./audiencia";
import { Cliente } from "./client";



export enum ProcessoStatus {
  PENDENTE = 'PENDENTE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  ARQUIVADO = 'ARQUIVADO',
  GANHO = 'GANHO',
  PERDIDO = 'PERDIDO',
}

export interface Process {
  id: number;
  numeroProcesso: string;
  titulo: string;
  forum?: string;
  status: ProcessoStatus;
  client_id: number;
  user_id: number;
  lastUpdateAt?: string;          
  created_at: string;              
  updated_at: string;              
  deleted_at?: string | null;      
  

  cliente?: Cliente;              
  audiencias?: Hearing[];         
}


export interface CreateProcessDto {
  numeroProcesso: string;          
  titulo: string;                  
  forum?: string;                  
  status: ProcessoStatus;          
  client_id: number;               
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
  lastUpdateAt?: string;           
}

/**
 * Query params para filtrar/buscar processos (ProcessoQueryDto do backend)
 * Usado em GET /processos?search=&status=&client_id=&page=&limit=
 */
export interface ProcessQueryParams {
  search?: string;                 
  status?: ProcessoStatus;         
  client_id?: number;              
  page?: number;                   
  limit?: number;                  
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
  confirmacao?: boolean;           
}

/**
 * Estatísticas de processos (para os 4 cards)
 * Calculado no frontend a partir da lista
 */
export interface ProcessStats {
  emAndamento: number;             
  ganhos: number;                  
  perdidos: number;                
  arquivados: number;              
  pendentes: number;               
  total: number;                  
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
  process: Process | null;        
  onCancel: () => void;
}

export type StatusColorMap = {
  [key in ProcessoStatus]: {
    badge: string;                 
    bg: string;                   
    text: string;             
    icon: string;                 
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


export function isValidStatus(status: string): status is ProcessoStatus {
  return Object.values(ProcessoStatus).includes(status as ProcessoStatus);
}


export function hasUpcomingHearings(process: Process): boolean {
  if (!process.audiencias || process.audiencias.length === 0) {
    return false;
  }
  
  const now = new Date();
  return process.audiencias.some(
    audiencia => new Date(audiencia.data) > now
  );
}


