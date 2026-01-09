// src/components/auth/AuthBrandingPanel.tsx

import { Scale } from 'lucide-react';

interface AuthBrandingPanelProps {
  variant: 'login' | 'signup';
}

export function AuthBrandingPanel({ variant }: AuthBrandingPanelProps) {
  const content = {
    login: {
      title: 'Bem-vindo de volta',
      description: 'Acesse sua conta e continue gerenciando seus processos jurídicos com eficiência.',
    },
    signup: {
      title: 'Simplifique a gestão do seu escritório',
      description: 'Acompanhe clientes, processos e audiências em um só lugar. Rápido, moderno e descomplicado.',
    },
  };

  return (
    <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 items-center justify-center text-white">
      <div className="max-w-md">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
            <Scale className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">ConsultaFácil</h1>
            <p className="text-sm text-blue-100">Gestão Jurídica Inteligente</p>
          </div>
        </div>

        {/* Conteúdo */}
        <h2 className="text-3xl font-bold mb-6">
          {content[variant].title}
        </h2>

        <p className="text-lg text-blue-100 mb-8">
          {content[variant].description}
        </p>

        {/* Features */}
        <ul className="space-y-4">
          <li className="flex items-start">
            <i className="fas fa-check-circle text-xl mr-3 mt-1"></i>
            <span>Organização completa de processos</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle text-xl mr-3 mt-1"></i>
            <span>Dashboard com visão executiva</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle text-xl mr-3 mt-1"></i>
            <span>Lembretes de audiências automáticos</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle text-xl mr-3 mt-1"></i>
            <span>Acesso seguro de qualquer lugar</span>
          </li>
        </ul>
      </div>
    </div>
  );
}