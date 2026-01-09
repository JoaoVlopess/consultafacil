// src/components/auth/SignUpForm.tsx

'use client';

import { useState } from 'react';
import { useAuth } from '@/src/contexts/AuthContexts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Checkbox } from '@/src/components/ui/checkbox';
import { Scale } from 'lucide-react';
import Link from 'next/link';
import { signUpSchema } from '@/src/lib/validations/auth';

export function SignUpForm() {
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    registro_oab: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validação com Zod
      const validated = signUpSchema.parse(formData);

      // Chamar o signup do contexto
      await signup(validated);
    } catch (error: any) {
      if (error.errors) {
        // Erros de validação do Zod já são mostrados pelo toast no catch
        console.error('Validation errors:', error.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Máscara para OAB (ex: CE 123456)
  const handleOabChange = (value: string) => {
    let oabValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    if (oabValue.length >= 2) {
      oabValue = oabValue.slice(0, 2) + ' ' + oabValue.slice(2, 8);
    }
    
    setFormData(prev => ({ ...prev, registro_oab: oabValue }));
  };

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

      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Crie sua conta</CardTitle>
          <CardDescription>
            Comece a gerenciar seus processos hoje mesmo
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome completo */}
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Seu nome completo"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  nome: e.target.value,
                }))}
                className="h-11"
                required
                disabled={isLoading}
              />
            </div>

            {/* Email e OAB */}
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
                    email: e.target.value,
                  }))}
                  className="h-11"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registro_oab">Registro OAB</Label>
                <Input
                  id="registro_oab"
                  type="text"
                  placeholder="CE 123456"
                  value={formData.registro_oab}
                  onChange={(e) => handleOabChange(e.target.value)}
                  className="h-11"
                  required
                  disabled={isLoading}
                  maxLength={9}
                />
                <p className="text-xs text-gray-500">Formato: UF 123456</p>
              </div>
            </div>

            {/* Senha e Confirmar Senha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      password: e.target.value,
                    }))}
                    className="h-11 pr-10"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Repita a senha"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))}
                    className="h-11 pr-10"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Termos */}
            <div className="flex items-start space-x-2 pt-1">
              <Checkbox id="terms" required className="mt-0.5" disabled={isLoading} />
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

            {/* Botão */}
            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <i className="fas fa-spinner fa-spin"></i>
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
  );
}