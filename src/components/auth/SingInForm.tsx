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
import { signUpClienteSchema, signUpAdvogadoSchema } from '@/src/lib/validations/auth'
import { Scale } from 'lucide-react'

interface SignInFormProps {
  userType: 'cliente' | 'advogado'
  onUserTypeChange: (type: 'cliente' | 'advogado') => void
}

export function SignInForm({ userType, onUserTypeChange }: SignInFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefone: '',
    document: '',
    oab: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Selecionar schema baseado no tipo de usuário
      const schema = userType === 'advogado' ? signUpAdvogadoSchema : signUpClienteSchema
      
      // Preparar dados para validação
      const dataToValidate = userType === 'advogado' 
        ? formData 
        : {
            name: formData.name,
            email: formData.email,
            telefone: formData.telefone,
            document: formData.document,
            password: formData.password,
            confirmPassword: formData.confirmPassword
          }
      
      // Validação com Zod
      const validated = schema.parse(dataToValidate)
      
      // Simular chamada à API (substitua pela sua implementação)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Cadastro realizado!', {
        description: `Bem-vindo ao ConsultaFácil, ${formData.name}`,
      })
      
      router.push('/dashboard')
    } catch (error: any) {
      toast.error('Erro ao criar conta', {
        description: error.errors?.[0]?.message || 'Verifique os dados informados',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Máscara de telefone
  const handlePhoneChange = (value: string) => {
    let phoneValue = value.replace(/\D/g, '')
    if (phoneValue.length <= 11) {
      phoneValue = phoneValue.replace(/^(\d{2})(\d)/g, '($1) $2')
      phoneValue = phoneValue.replace(/(\d)(\d{4})$/, '$1-$2')
    }
    setFormData(prev => ({ ...prev, telefone: phoneValue }))
  }

  return (
    <div className="w-full max-w-xl">
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
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Crie sua conta</CardTitle>
          <CardDescription>
            Comece a gerenciar seus processos hoje mesmo
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <UserTypeSelector 
              value={userType} 
              onChange={onUserTypeChange} 
            />

            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({
                  ...prev, 
                  name: e.target.value
                }))}
                className="h-11"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className="h-11"
                />
              </div>
            </div>

            {userType === 'advogado' && (
              <div className="space-y-2">
                <Label htmlFor="oab">Número da OAB</Label>
                <Input
                  id="oab"
                  type="text"
                  placeholder="OAB/UF 000000"
                  value={formData.oab}
                  onChange={(e) => setFormData(prev => ({
                    ...prev, 
                    oab: e.target.value
                  }))}
                  className="h-11"
                  required
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PasswordInput
                label="Senha"
                placeholder="Crie uma senha forte"
                value={formData.password}
                onChange={(value) => setFormData(prev => ({
                  ...prev,
                  password: value
                }))}
              />

              <PasswordInput
                label="Confirmar senha"
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={(value) => setFormData(prev => ({
                  ...prev,
                  confirmPassword: value
                }))}
              />
            </div>

            <div className="flex items-start space-x-2 pt-1">
              <Checkbox id="terms" required className="mt-0.5" />
              <label 
                htmlFor="terms"
                className="text-xs text-slate-600 cursor-pointer leading-relaxed"
              >
                Concordo com os{' '}
                <Link href="/termos" className="text-blue-600 hover:underline">
                  Termos de Uso
                </Link>
                {' '}e{' '}
                <Link href="/privacidade" className="text-blue-600 hover:underline">
                  Política de Privacidade
                </Link>
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Criando conta...</span>
                </span>
              ) : (
                'Criar conta'
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
            Já tem uma conta?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:underline">
              Fazer login
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