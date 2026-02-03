'use client';

import { ProcessCard } from './ProcessCard';
import { PaginationFooter } from './PaginationFooter';
import type { Process } from '@/src/types/process';

interface ProcessListProps {
  processes: Process[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
  loading?: boolean;
  hasFilters: boolean;
  onPageChange: (page: number) => void;
  onEdit: (process: Process) => void;
  onDelete: (id: number) => void;
}

export function ProcessList({
  processes,
  total,
  currentPage,
  itemsPerPage,
  loading = false,
  hasFilters,
  onPageChange,
  onEdit,
  onDelete,
}: ProcessListProps) {
  const totalPages = Math.ceil(total / itemsPerPage);
  const hasProcesses = processes.length > 0;

  // Estado vazio
  if (!hasProcesses && !loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Empty State */}
        <div className="p-12 text-center">
          <i className="fas fa-briefcase text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum processo encontrado
          </h3>
          <p className="text-gray-600">
            {hasFilters
              ? 'Tente ajustar os filtros de busca'
              : 'Comece adicionando seu primeiro processo'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Lista de Cards */}
      <div className="divide-y divide-gray-100">
        {loading && !hasProcesses ? (
          // Loading skeleton
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-100 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          // Cards de processos
          processes.map((processo) => (
            <div key={processo.id} className="p-6 hover:bg-gray-50 transition-colors">
              <ProcessCard
                process={processo}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          ))
        )}
      </div>

      {/* Paginação */}
      {totalPages > 0 && (
        <PaginationFooter
          totalResults={total}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}