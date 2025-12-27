// src/components/dashboard/RecentUpdates.tsx

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Processo, ProcessoStatus } from '@/types/dashboard';

interface RecentUpdatesProps {
  cases: Processo[];
}

export function RecentUpdates({ cases }: RecentUpdatesProps) {
  const getStatusInfo = (status: ProcessoStatus) => {
    const statusMap = {
      EM_ANDAMENTO: { label: 'Em Andamento', color: 'border-blue-500' },
      ARQUIVADO: { label: 'Arquivado', color: 'border-gray-500' },
      GANHO: { label: 'Ganho', color: 'border-green-500' },
      PERDIDO: { label: 'Perdido', color: 'border-red-500' },
    };
    return statusMap[status] || statusMap.EM_ANDAMENTO;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          <i className="fas fa-history text-blue-600 mr-2"></i>
          Atualizações Recentes
        </h3>
      </div>

      <div className="space-y-4">
        {cases.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Nenhuma atualização recente
          </p>
        ) : (
          cases.map((processo) => {
            const statusInfo = getStatusInfo(processo.status);
            const timeAgo = processo.lastUpdateAt
              ? formatDistanceToNow(new Date(processo.lastUpdateAt), {
                  addSuffix: true,
                  locale: ptBR,
                })
              : 'Sem data';

            return (
              <div
                key={processo.id}
                className={`border-l-4 ${statusInfo.color} pl-4 py-2`}
              >
                <p className="text-sm font-semibold text-gray-900">
                  {statusInfo.label}
                </p>
                <p className="text-xs text-gray-600 mt-1">{processo.titulo}</p>
                <p className="text-xs text-gray-400 mt-1">
                  <i className="fas fa-clock mr-1"></i>
                  {timeAgo}
                </p>
              </div>
            );
          })
        )}
      </div>

      <button className="w-full mt-4 text-center text-sm text-blue-600 font-medium hover:text-blue-700 py-2 border-t border-gray-200">
        Ver todo histórico
      </button>
    </div>
  );
}