export interface AuthDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  nome: string;              
  email: string;
  registro_oab: string;     
  password: string;
  created_by?: string;        
}

export interface SignUpFormData {
  nome: string;
  email: string;
  registro_oab: string;
  password: string;
  confirmPassword?: string; 
}

export interface AuthResponse {
  token: string;   
  perfil: User;    
}

export interface User {
  id: number;
  nome: string;             
  email: string;
  registro_oab: string;     
  created_by: string;
  created_at: string;
  updated_at?: string;
  updated_by?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthDto) => Promise<void>;
  signup: (data: SignUpFormData) => Promise<void>;
  logout: () => void;
}