// src/services/auth.service.ts

import { fetchAPI } from './api';
import type { AuthDto, SignUpFormData, SignUpDto, AuthResponse } from '@/src/types/auth';

export class AuthService {
  /**
   * Login - POST /auth/login
   */
  static async login(credentials: AuthDto): Promise<AuthResponse> {
    return fetchAPI<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  /**
   * SignUp - POST /auth/signUp
   */
   static async signup(formData: SignUpFormData): Promise<any> {
    
    const { confirmPassword, ...signUpData } = formData;

    return fetchAPI<any>('/auth/signUp', {
      method: 'POST',
      body: JSON.stringify(signUpData),
    });
  }

  static async verifyToken(token: string): Promise<{ valid: boolean }> {
    try {
      await fetchAPI('/auth/verify', {
        method: 'GET',
        token,
      });
      return { valid: true };
    } catch {
      return { valid: false };
    }
  }
}