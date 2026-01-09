// src/contexts/AuthContext.tsx

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/src/services/auth.service';
import { tokenStorage, userStorage } from '@/src/lib/auth';
import type { AuthDto, SignUpFormData, User } from '@/src/types/auth';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthDto) => Promise<void>;
  signup: (data: SignUpFormData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const storedToken = tokenStorage.get();
    const storedUser = userStorage.get();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    
    setIsLoading(false);
  }, []);

  const login = async (credentials: AuthDto) => {
    try {
      const response = await AuthService.login(credentials);
      
      // Salvar token e usuário
      tokenStorage.set(response.access_token);
      userStorage.set(response.user);
      
      setToken(response.access_token);
      setUser(response.user);

      toast.success('Login realizado com sucesso!', {
        description: `Bem-vindo de volta, ${response.user.nome}!`,
      });
      
      router.push('/dashboard');
    } catch (error: any) {
      const errorMessage = error.message?.includes('401') || error.message?.includes('senha')
        ? 'E-mail ou senha incorretos'
        : error.message || 'Erro ao fazer login';

      toast.error('Erro no login', {
        description: errorMessage,
      });
      throw error;
    }
  };

  const signup = async (data: SignUpFormData) => {
    try {
      const response = await AuthService.signup(data);
      
      // Salvar token e usuário
      tokenStorage.set(response.access_token);
      userStorage.set(response.user);
      
      setToken(response.access_token);
      setUser(response.user);

      toast.success('Cadastro realizado com sucesso!', {
        description: `Bem-vindo, ${response.user.nome}!`,
      });
      
      router.push('/dashboard');
    } catch (error: any) {
      let errorMessage = 'Verifique os dados informados';
      
      if (error.message?.includes('email')) {
        errorMessage = 'Este e-mail já está cadastrado';
      } else if (error.message?.includes('OAB')) {
        errorMessage = 'Este registro OAB já está cadastrado';
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error('Erro ao criar conta', {
        description: errorMessage,
      });
      throw error;
    }
  };

  const logout = () => {
    tokenStorage.remove();
    userStorage.remove();
    setToken(null);
    setUser(null);
    toast.info('Você saiu da sua conta');
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}