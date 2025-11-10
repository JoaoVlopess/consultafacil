'use client'

import { User, Briefcase, CheckCircle2 } from 'lucide-react'
import { Label } from '@/src/components/ui/label'
import { cn } from '@/src/lib/utils'

interface UserTypeSelectorProps {
  value: 'cliente' | 'advogado'
  onChange: (type: 'cliente' | 'advogado') => void
}

const userTypes = [
  {
    id: 'cliente' as const,
    label: 'Cliente',
    icon: User,
    description: 'Acompanhe seus processos'
  },
  {
    id: 'advogado' as const,
    label: 'Advogado',
    icon: Briefcase,
    description: 'Gerencie seu escritório'
  }
]

export function UserTypeSelector({ value, onChange }: UserTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Entrar como</Label>
      <div className="grid grid-cols-2 gap-3">
        {userTypes.map((type) => {
          const Icon = type.icon
          const isSelected = value === type.id
          
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onChange(type.id)}
              className={cn(
                "relative p-4 rounded-xl border-2 transition-all",
                isSelected 
                  ? "border-blue-500 bg-blue-50" 
                  : "border-slate-200 bg-white hover:border-slate-300"
              )}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                  isSelected 
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600" 
                    : "bg-slate-100"
                )}>
                  <Icon className={cn(
                    "w-5 h-5",
                    isSelected ? "text-white" : "text-slate-600"
                  )} />
                </div>
                <div className="text-center">
                  <p className={cn(
                    "font-medium text-sm",
                    isSelected ? "text-blue-600" : "text-slate-900"
                  )}>
                    {type.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {type.description}
                  </p>
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}