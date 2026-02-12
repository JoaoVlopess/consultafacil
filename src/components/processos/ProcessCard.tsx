//   # Card individual de processo

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ProcessoStatus, STATUS_LABELS, STATUS_CONFIG } from '@/src/types/process';
import type { Process } from '@/src/types/process';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';

interface ProcessCardProps {
  process: Process;
  onEdit: (process: Process) => void;
  onDelete: (id: number) => void;
}

export function ProcessCard({ process, onEdit, onDelete }: ProcessCardProps) {
  const statusConfig = STATUS_CONFIG[process.status];
  
  // Formatar timestamp relativo
  const timeAgo = process.lastUpdateAt
    ? formatDistanceToNow(new Date(process.lastUpdateAt), {
        addSuffix: true,
        locale: ptBR,
      })
    : null;

  // Verificar se tem audiências próximas (mock - depois integrar com API)
  const hasUpcomingHearing = false; // TODO: Integrar com audiências
  const nextHearingDays = 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Badge de Status + Timestamp */}
          <div className="flex items-center gap-3 mb-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.badge}`}>
              <i className={`fas ${statusConfig.icon} text-xs mr-1.5`}></i>
              {STATUS_LABELS[process.status]}
            </span>
            {timeAgo && (
              <span className="text-xs text-gray-500">
                <i className="far fa-clock mr-1"></i>
                Atualizado {timeAgo}
              </span>
            )}
          </div>

          {/* Título do Processo */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {process.titulo}
          </h3>

          {/* Número do Processo */}
          <p className="text-sm text-gray-600 mb-3">
            <i className="fas fa-file-alt mr-2 text-gray-400"></i>
            Processo: <span className="font-mono font-medium">{process.numeroProcesso}</span>
          </p>

          {/* Grid de Informações */}
          <div className="flex items-center gap-6 text-sm">
            {/* Cliente */}
            <div className="flex items-center text-gray-600">
              <i className="fas fa-user mr-2 text-gray-400"></i>
              <span>{process.cliente?.nome || 'Cliente não informado'}</span>
            </div>

            {/* Fórum/Vara */}
            {process.forum && (
              <div className="flex items-center text-gray-600">
                <i className="fas fa-building mr-2 text-gray-400"></i>
                <span>{process.forum}</span>
              </div>
            )}

            {/* Próxima Audiência (se houver) */}
            {hasUpcomingHearing && (
              <div className="flex items-center text-orange-600">
                <i className="fas fa-gavel mr-2"></i>
                <span className="font-medium">Audiência em {nextHearingDays} dias</span>
              </div>
            )}
          </div>
        </div>

        {/* Menu de Ações */}
        <div className="ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(process)}>
                <i className="fas fa-edit mr-2"></i>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(process.id)}
                className="text-red-600"
              >
                <i className="fas fa-trash mr-2"></i>
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}