// src/app/(auth)/signup/page.tsx

import { AuthBrandingPanel } from '@/src/components/auth/AuthBrandingPanel';
import { SignUpForm } from '@/src/components/auth/SingInForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar Conta - ConsultaFácil',
  description: 'Crie sua conta no ConsultaFácil',
};

export default function Page() {
  return (
    <div className="min-h-screen flex">
      {/* Painel de Branding (Desktop) */}
      <AuthBrandingPanel variant="signup" />
      
      {/* Formulário de Cadastro */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <SignUpForm />
      </div>
    </div>
  );
}