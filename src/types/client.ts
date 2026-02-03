export interface Cliente {
  id: string;                    
  nome: string;                  
  documento: string | null;      
  email: string | null;          
  telefone: string | null;       
  observacoes: string | null;    
  createdBy: string;             
  updatedBy: string | null;      
  createdAt: string;          
  updatedAt: string;             
}