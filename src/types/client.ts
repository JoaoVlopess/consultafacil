
export interface Cliente {
  id: number;                    
  nome: string;                  
  documento: string | null;      
  email: string | null;          
  telefone: string | null;       
  observacoes?: string | null;    
  user_id?: number;               
  created_by?: string;            
  updated_by?: string | null;    
  deleted_by?: string | null;     
  iniciais?: string
  color?: string
  created_at?: string;            
  updated_at?: string;            
  deleted_at?: string | null;     
}

export interface CreateClienteDto {
  nome: string;           
  documento?: string;     
  email?: string;        
  telefone?: string;      
  observacoes?: string;   
}


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
  search?: string;   
  page?: number;     
  limit?: number;  
}

/**
 * ClientesResponse - Resposta paginada da API
 * 
 * Estrutura retornada pelo endpoint GET /clientes
 */
export interface ClientesResponse {
  data: Cliente[];   
  total: number;    
  page: number;      
  limit: number;     
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
  processosAtivos: number;   
  novosEsteMes: number;      
  totalClientes: number;     
}


export interface ClienteDisplay extends Cliente {
  iniciais: string;             
  documentoFormatado?: string;  
  telefoneFormatado?: string;   
  avatarColor: string;           
}



export type ClienteFormData = CreateClienteDto;
export type ClienteUpdateFormData = UpdateClienteDto;