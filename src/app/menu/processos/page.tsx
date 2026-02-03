// src/app/(dashboard)/processos/page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/src/contexts/AuthContexts';
import { useProcessos } from '@/src/hooks/useProcesses';
import { HeaderForPage } from '@/src/components/HeaderForPage';
import { ProcessFilters } from '@/src/components/processos/ProcessosFilters';
import { ProcessesStats } from '@/src/components/processos/ProcessesStats';
import { ProcessList } from '@/src/components/processos/ProcessosList';
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
    limit: 5,
  });

  // Calcular estatísticas
  const stats = {
    emAndamento: data?.items.filter(p => p.status === ProcessoStatus.EM_ANDAMENTO).length || 0,
    ganhos: data?.items.filter(p => p.status === ProcessoStatus.GANHO).length || 0,
    arquivados: data?.items.filter(p => p.status === ProcessoStatus.ARQUIVADO).length || 0,
    total: data?.total || 0,
  };

  // Verificar se há filtros ativos
  const hasFilters = !!(searchTerm || selectedStatus || selectedClient);

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
      // await ProcessoService.remove(id);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll suave para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state (primeira carga)
  if (loading && currentPage === 1 && !data) {
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
  if (error && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Erro ao carregar processos
          </h2>
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

      {/* Lista de Processos com Paginação */}
      <ProcessList
        processes={data?.items || []}
        total={data?.total || 0}
        currentPage={currentPage}
        itemsPerPage={5}
        loading={loading}
        hasFilters={hasFilters}
        onPageChange={handlePageChange}
        onEdit={handleEditProcess}
        onDelete={handleDeleteProcess}
      />
    </div>
  );
}