// src/components/processos/PaginationFooter.tsx
'use client';

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationFooterProps {
  totalResults: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function PaginationFooter({
  totalResults,
  currentPage,
  itemsPerPage,
  onPageChange
}: PaginationFooterProps) {
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalResults);

  return (
    <div className="bg-white px-6 py-4 border-t border-gray-100 flex items-center justify-between">
      {/* Informação de resultados */}
      <div className="text-sm text-gray-500">
        {totalResults > 0 ? (
          <div>
            Mostrando <span className="font-medium text-gray-900">{startItem}</span> a{" "}
            <span className="font-medium text-gray-900">{endItem}</span> de{" "}
            <span className="font-medium text-gray-900">{totalResults}</span> resultados
          </div>
        ) : (
          <div>
            Mostrando <span className="font-medium text-gray-900">0</span> resultados
          </div>
        )}
      </div>

      {/* Controles de paginação */}
      <div className="flex items-center gap-2">
        {/* Botão Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </button>

        {/* Números das páginas */}
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                page === currentPage
                  ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                  : 'text-gray-500 border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Botão Próxima */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Próxima
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}