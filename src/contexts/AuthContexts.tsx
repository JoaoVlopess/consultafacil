// src/contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/src/services/auth.service';
import { tokenStorage, userStorage, clearAuth } from '@/src/lib/auth';
import { toast } from 'sonner';
import type { AuthDto, SignUpFormData, User, AuthContextType } from '@/src/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    checkAuth();
  }, []);


  const checkAuth = async () => {
    try {
      const savedToken = tokenStorage.get();
      const savedUser = userStorage.get();

      if (savedToken && savedUser) {
        //  Verificar se o token ainda é válido
        // const { valid } = await AuthService.verifyToken(savedToken);
        // if (!valid) {
        //   clearAuth();
        //   setIsLoading(false);
        //   return;
        // }

        setToken(savedToken);
        setUser(savedUser);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      clearAuth();
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login - POST /auth/login
   * 
   * Backend retorna: { token, perfil }
   */
  const login = async (credentials: AuthDto) => {
    try {
      setIsLoading(true);

      const response = await AuthService.login(credentials);

      // Salvar token e usuário
      tokenStorage.set(response.token);
      userStorage.set(response.perfil);

      setToken(response.token);
      setUser(response.perfil);

      toast.success('Login realizado com sucesso!');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Erro no login:', error);

      // Tratamento de erros específicos do backend
      const errorMessage = error.message || '';

      if (errorMessage.includes('404') || errorMessage.includes('não encontrado')) {
        toast.error('Usuário não encontrado no sistema.');
      } else if (errorMessage.includes('401') || errorMessage.includes('inválidas')) {
        toast.error('Credenciais inválidas. Verifique email e senha.');
      } else {
        toast.error('Erro ao fazer login. Tente novamente.');
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * SignUp - POST /auth/signUp
   * 
   * Backend retorna apenas o perfil do usuário criado (sem token)
   * Usuário precisa fazer login após o cadastro
   */
  const signup = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);

      await AuthService.signup(data);

      toast.success('Conta criada com sucesso! Faça login para continuar.');

      // Redirecionar para login
      router.push('/login');
    } catch (error: any) {
      console.error('Erro no cadastro:', error);

      // Tratamento de erros específicos do backend
      const errorMessage = error.message || '';

      if (errorMessage.includes('409') || errorMessage.includes('Conflict')) {
        // ConflictException - Email ou OAB duplicado
        if (errorMessage.includes('e-mail') || errorMessage.includes('email')) {
          toast.error('Este e-mail já está cadastrado.');
        } else if (errorMessage.includes('OAB')) {
          toast.error('Este registro OAB já está cadastrado.');
        } else {
          toast.error('E-mail ou OAB já cadastrados.');
        }
      } else if (errorMessage.includes('400') || errorMessage.includes('Bad Request')) {
        toast.error('Dados inválidos. Verifique os campos.');
      } else {
        toast.error('Erro ao criar conta. Tente novamente.');
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout
   */
  const logout = () => {
    clearAuth();
    setUser(null);
    setToken(null);
    toast.success('Logout realizado com sucesso!');
    router.push('/login');
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para usar o contexto de autenticação
 * 
 * @example
 * const { user, isAuthenticated, login, logout } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }

  return context;
}