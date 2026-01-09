// src/lib/auth.ts

const TOKEN_KEY = '@consultafacil:token';
const USER_KEY = '@consultafacil:user';

/**
 * Gerenciamento de token JWT no localStorage
 */
export const tokenStorage = {
  get: (): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
      return null;
    }
  },

  set: (token: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Erro ao salvar token:', error);
    }
  },

  remove: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Erro ao remover token:', error);
    }
  },
};

/**
 * Gerenciamento de dados do usuário no localStorage
 */
export const userStorage = {
  get: (): any | null => {
    if (typeof window === 'undefined') return null;
    try {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Erro ao recuperar usuário:', error);
      return null;
    }
  },

  set: (user: any): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  },

  remove: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
    }
  },
};

/**
 * Limpa todos os dados de autenticação
 */
export const clearAuth = (): void => {
  tokenStorage.remove();
  userStorage.remove();
};

/**
 * Verifica se o usuário está autenticado
 */
export const isAuthenticated = (): boolean => {
  const token = tokenStorage.get();
  return !!token;
};

/**
 * Decodifica o token JWT (básico - sem verificação de assinatura)
 */
export const decodeToken = (token: string): any | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
};

/**
 * Verifica se o token está expirado
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

/**
 * Obtém o tempo restante até a expiração do token (em segundos)
 */
export const getTokenExpirationTime = (token: string): number | null => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return null;

    const currentTime = Date.now() / 1000;
    const timeRemaining = decoded.exp - currentTime;
    
    return timeRemaining > 0 ? timeRemaining : 0;
  } catch (error) {
    return null;
  }
};