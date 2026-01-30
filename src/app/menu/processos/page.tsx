// src/app/(dashboard)/processos/page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/src/contexts/AuthContexts';
import { useProcessos } from '@/src/hooks/useProcesses';
import { HeaderForPage } from '@/src/components/HeaderForPage';
import { ProcessFilters } from '@/src/components/processos/ProcessosFilters';
import { ProcessesStats } from '@/src/components/processos/ProcessesStats';
import { ProcessCard } from '@/src/components/processos/ProcessCard';
import { ProcessoStatus } from '@/src/types/process';
import type { Process } from '@/src/types/process';

// Mock de clientes
export const mockClients = [
  { id: 1, nome: "Maria Silva" },
  { id: 2, nome: "João Santos" },
  { id: 3, nome: "Ana Paula Oliveira" },
  { id: 4, nome: "Carlos Lima" },
  { id: 5, nome: "Fernanda Martins" },
];

export default function ProcessosPage() {
  const { token } = useAuth();
  
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ProcessoStatus | undefined>();
  const [selectedClient, setSelectedClient] = useState<number | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);

  // Hook para buscar processos
  const { data, loading, error, refetch } = useProcessos({
    token,
    search: searchTerm,
    status: selectedStatus,
    client_id: selectedClient,
    page: currentPage,
    limit: 10,
  });

  // Calcular estatísticas
  const stats = {
    emAndamento: data?.items.filter(p => p.status === ProcessoStatus.EM_ANDAMENTO).length || 0,
    ganhos: data?.items.filter(p => p.status === ProcessoStatus.GANHO).length || 0,
    arquivados: data?.items.filter(p => p.status === ProcessoStatus.ARQUIVADO).length || 0,
    total: data?.total || 0,
  };

  // Handlers
  const handleNewProcess = () => {
    setSelectedProcess(null);
    setIsDialogOpen(true);
  };

  const handleEditProcess = (process: Process) => {
    setSelectedProcess(process);
    setIsDialogOpen(true);
  };

  const handleDeleteProcess = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este processo?')) return;
    
    try {
      // Chamar service de delete
      // await ProcessoService.delete(id, token);
      alert('Processo excluído com sucesso!');
      refetch();
    } catch (err) {
      alert('Erro ao excluir processo');
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedStatus(undefined);
    setSelectedClient(undefined);
    setCurrentPage(1);
  };

  // Loading state
  if (loading && currentPage === 1) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando processos...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erro ao carregar processos</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={refetch}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-redo mr-2"></i>
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <HeaderForPage 
        title="Processos" 
        subtitle="Acompanhe todos os processos do escritório" 
        button={true} 
        buttonLabel="Novo Processo"
        onButtonClick={handleNewProcess}
      />

      {/* Stats Cards */}
      <ProcessesStats stats={stats} />

      {/* Filtros */}
      <ProcessFilters
        searchTerm={searchTerm}
        selectedStatus={selectedStatus}
        selectedClient={selectedClient}
        onSearchChange={setSearchTerm}
        onStatusChange={setSelectedStatus}
        onClientChange={setSelectedClient}
        onClear={handleClearFilters}
        clients={mockClients}
      />

      {/* Lista de Processos em Cards */}
      <div className="space-y-4">
        {!data || data.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <i className="fas fa-briefcase text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum processo encontrado
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedStatus || selectedClient
                ? 'Tente ajustar os filtros de busca'
                : 'Comece adicionando seu primeiro processo'
              }
            </p>
          </div>
        ) : (
          <>
            {data.items.map((processo) => (
              <ProcessCard
                key={processo.id}
                process={processo}
                onEdit={handleEditProcess}
                onDelete={handleDeleteProcess}
              />
            ))}
          </>
        )}
      </div>

      {/* Paginação */}
      {data && data.totalPages > 1 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4 mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{((currentPage - 1) * 10) + 1}</span> a{' '}
            <span className="font-medium">{Math.min(currentPage * 10, data.total)}</span> de{' '}
            <span className="font-medium">{data.total}</span> processos
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <i className="fas fa-chevron-left mr-2"></i>
              Anterior
            </button>
            
            <button
              disabled={currentPage === data.totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Próxima
              <i className="fas fa-chevron-right ml-2"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}