export enum ProcessoStatus {
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  PENDENTE = 'PENDENTE',
  ENCERRADO = 'ENCERRADO',
  ARQUIVADO = 'ARQUIVADO',
  GANHO = 'GANHO',
  PERDIDO = 'PERDIDO',
}


// Interface principal do Processo
export interface Processo {
  id: number;
  numeroProcesso: string;
  titulo: string;
  forum?: string;
  status: ProcessoStatus;
  client_id: number;
  createdAt: string;
  updatedAt: string;
  lastUpdateAt?: string;
}

// Processo com dados do cliente (para listagem)
export interface ProcessoWithClient extends Processo {
  client: {
    id: number;
    nome: string;
    email?: string;
  };
}

// Para criar/editar processo
export interface ProcessoFormData {
  numeroProcesso: string;
  titulo: string;
  forum?: string;
  status: ProcessoStatus;
  client_id: number;
}

// Para filtros/busca
export interface ProcessoFilters {
  search?: string;
  status?: ProcessoStatus;
  client_id?: number;
  page?: number;
  limit?: number;
}

// Resposta da API para listagem
export interface ProcessoListResponse {
  data: ProcessoWithClient[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Labels para exibição
export const StatusLabels: Record<ProcessoStatus, string> = {
  [ProcessoStatus.PENDENTE]: 'Pendente',
  [ProcessoStatus.EM_ANDAMENTO]: 'Em Andamento',
  [ProcessoStatus.ENCERRADO]: 'encerrado',
  [ProcessoStatus.ARQUIVADO]: 'Arquivado',
  [ProcessoStatus.GANHO]: 'Ganho',
  [ProcessoStatus.PERDIDO]: 'Perdido'
};

// Cores para badges
export const StatusColors: Record<ProcessoStatus, string> = {
  [ProcessoStatus.PENDENTE]: 'amarelo',
  [ProcessoStatus.EM_ANDAMENTO]: 'azul',
  [ProcessoStatus.ENCERRADO]: 'cinza',
  [ProcessoStatus.ARQUIVADO]: 'laranja',
  [ProcessoStatus.GANHO]: 'verde',
  [ProcessoStatus.PERDIDO]: 'vermelho'
};