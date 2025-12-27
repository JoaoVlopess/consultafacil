// src/components/dashboard/UpcomingHearings.tsx

import { format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Audiencia } from '@/src/types/dashboard';

interface UpcomingHearingsProps {
  hearings: Audiencia[];
}

export function UpcomingHearings({ hearings }: UpcomingHearingsProps) {
  const getUrgencyBadge = (date: string) => {
    const days = differenceInDays(new Date(date), new Date());
    
    if (days === 0) {
      return { text: 'Hoje', className: 'bg-red-100 text-red-800' };
    } else if (days === 1) {
      return { text: 'Amanhã', className: 'bg-orange-100 text-orange-800' };
    } else if (days <= 3) {
      return { text: `Em ${days} dias`, className: 'bg-orange-100 text-orange-800' };
    } else {
      return { text: `Em ${days} dias`, className: 'bg-blue-100 text-blue-800' };
    }
  };

  const getCardBgClass = (date: string) => {
    const days = differenceInDays(new Date(date), new Date());
    return days <= 1 ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          <i className="fas fa-calendar-alt text-blue-600 mr-2"></i>
          Próximas Audiências
        </h3>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
          Ver todas <i className="fas fa-arrow-right ml-1"></i>
        </button>
      </div>

      <div className="space-y-4">
        {hearings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Nenhuma audiência agendada para os próximos dias
          </p>
        ) : (
          hearings.map((hearing) => {
            const badge = getUrgencyBadge(hearing.data);
            const hearingDate = new Date(hearing.data);

            return (
              <div
                key={hearing.id}
                className={`flex items-start space-x-4 p-4 rounded-lg border ${getCardBgClass(hearing.data)}`}
              >
                {/* Calendar Icon */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-blue-600 rounded-lg flex flex-col items-center justify-center text-white">
                    <span className="text-xs font-semibold uppercase">
                      {format(hearingDate, 'MMM', { locale: ptBR })}
                    </span>
                    <span className="text-xl font-bold">
                      {format(hearingDate, 'dd')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {hearing.notas || 'Audiência'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Processo: {hearing.processo.numero}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    <i className="fas fa-clock mr-1"></i>
                    {format(hearingDate, "HH:mm")}
                    {hearing.local && (
                      <>
                        {' | '}
                        <i className="fas fa-map-marker-alt mr-1 ml-2"></i>
                        {hearing.local}
                      </>
                    )}
                  </p>
                </div>

                {/* Badge */}
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.className}`}
                >
                  {badge.text}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}