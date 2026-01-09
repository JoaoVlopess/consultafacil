// src/lib/validations/auth.ts

import { z } from 'zod';

/**
 * Schema de validação para SignUp (Cadastro)
 */
export const signUpSchema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(300, 'Nome muito longo'),
  
  email: z.string()
    .email('E-mail inválido')
    .max(200, 'E-mail muito longo'),
  
  registro_oab: z.string()
    .min(5, 'Registro OAB inválido')
    .max(50, 'Registro OAB muito longo')
    .regex(/^[A-Z]{2}\s?\d{4,6}$/, 'Formato: UF 123456 (ex: CE 123456)'),
  
  password: z.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(64, 'Senha muito longa'),
  
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

/**
 * Schema de validação para Login
 */
export const loginSchema = z.object({
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),
  
  password: z.string()
    .min(1, 'Senha é obrigatória'),
});

/**
 * Tipos TypeScript inferidos dos schemas
 */
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;