import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória')
})

export const signUpClienteSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(120),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().optional(),
  document: z.string().optional(),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não conferem',
  path: ['confirmPassword']
})

export const signUpAdvogadoSchema = signUpClienteSchema.safeExtend({
  oab: z.string().min(5, 'Número OAB obrigatório')
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignUpClienteInput = z.infer<typeof signUpClienteSchema>
export type SignUpAdvogadoInput = z.infer<typeof signUpAdvogadoSchema>