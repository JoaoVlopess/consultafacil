//AuthBrandingPanel

import { Scale, CheckCircle2 } from 'lucide-react'

interface AuthBrandingPanelProps {
  variant: 'login' | 'signup'
}

export function AuthBrandingPanel({ variant }: AuthBrandingPanelProps) {
  const content = {
    login: {
      title: 'Simplifique a gestão\ndo seu escritório',
      description: 'Acompanhe clientes, processos e audiências em um só lugar. Rápido, moderno e descomplicado.',
      features: [
        'Organização completa de processos',
        'Dashboard com visão executiva',
        'Lembretes de audiências automáticos',
        'Acesso seguro de qualquer lugar'
      ],
      testimonial: '"Transformou a forma como gerenciamos nossos casos. Simples e eficiente."',
      author: '— Dr. Roberto Silva, Advogado'
    },
    signup: {
      title: 'Comece agora sua\njornada jurídica',
      description: 'Cadastre-se gratuitamente e tenha acesso a todas as ferramentas de gestão jurídica.',
      features: [
        'Cadastro rápido e gratuito',
        'Interface intuitiva e moderna',
        'Segurança de dados garantida',
        'Suporte especializado'
      ],
      testimonial: '"Cadastro simples e em poucos minutos já estava usando o sistema."',
      author: '— Dra. Marina Costa, Advogada'
    }
  }

  const data = content[variant]

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 flex-col justify-between relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full -ml-36 -mb-36" />
      
      <div className="relative z-10">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-16">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
            <Scale className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">ConsultaFácil</h1>
            <p className="text-blue-100 text-sm">Gestão Jurídica Inteligente</p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white leading-tight whitespace-pre-line">
            {data.title}
          </h2>
          <p className="text-blue-100 text-lg">
            {data.description}
          </p>
          
          <div className="space-y-4 pt-8">
            {data.features.map((feature, i) => (
              <div key={i} className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-blue-200 flex-shrink-0" />
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-blue-200 text-sm">
          {data.testimonial}
        </p>
        <p className="text-white font-medium mt-2">{data.author}</p>
      </div>
    </div>
  )
}
