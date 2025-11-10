'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Checkbox } from '@/src/components/ui/checkbox'
import { UserTypeSelector } from './UserTypeSelector'
import { PasswordInput } from './PasswordInput'
import { loginSchema } from '@/src/lib/validations/auth'
import { Scale } from 'lucide-react'

interface LoginFormProps {
  userType: 'cliente' | 'advogado'
  onUserTypeChange: (type: 'cliente' | 'advogado') => void
}

export function LoginForm({ userType, onUserTypeChange }: LoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Validação com Zod
      const validated = loginSchema.parse(formData)
      
      // Simular chamada à API (substitua pela sua implementação)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Login realizado!', {
        description: `Bem-vindo como ${userType === 'cliente' ? 'Cliente' : 'Advogado'}`,
      })
      
      router.push('/dashboard')
    } catch (error: any) {
      toast.error('Erro ao fazer login', {
        description: error.errors?.[0]?.message || 'Verifique suas credenciais',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo mobile */}
      <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
          <Scale className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold">ConsultaFácil</h1>
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
          <CardDescription>
            Entre com suas credenciais para continuar
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <UserTypeSelector 
              value={userType} 
              onChange={onUserTypeChange} 
            />

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev, 
                  email: e.target.value
                }))}
                className="h-11"
              />
            </div>

            <PasswordInput
              label="Senha"
              value={formData.password}
              onChange={(value) => setFormData(prev => ({
                ...prev,
                password: value
              }))}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label 
                  htmlFor="remember"
                  className="text-sm text-slate-600 cursor-pointer"
                >
                  Lembrar de mim
                </label>
              </div>
              <Button variant="link" size="sm" className="px-0 text-blue-600">
                Esqueci a senha
              </Button>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Entrando...</span>
                </span>
              ) : (
                `Entrar como ${userType === 'cliente' ? 'Cliente' : 'Advogado'}`
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">ou</span>
            </div>
          </div>

          <p className="text-center text-sm text-slate-600">
            Ainda não tem conta?{' '}
            <Link href="/cadastro" className="font-medium text-blue-600 hover:underline">
              Solicite acesso
            </Link>
          </p>
        </CardFooter>
      </Card>

      <p className="text-center text-sm text-slate-500 mt-8">
        © 2025 ConsultaFácil. Todos os direitos reservados.
      </p>
    </div>
  )
}
