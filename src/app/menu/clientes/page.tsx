// src/app/(dashboard)/page.tsx

'use client';

import { useAuth } from '@/src/contexts/AuthContexts';
import { useDashboard } from '@/src/hooks/useDashboard';
import { 
  StatsGrid, 
  UpcomingHearings, 
  RecentUpdates, 
  QuickActions 
} from '@/src/components/dashboard';
import { ActionButton } from '@/src/components/actionButton';
import { ClientSearch } from '@/src/components/clientes/ClientSearch';
import { ClientsTable } from '@/src/components/clientes/ClientsTable';
import { useState } from 'react';
import { StatsGridCli } from '@/src/components/clientes/StatsGridCli';
import { HeaderForPage } from '@/src/components/HeaderForPage';

export const mockClients = [
  { id: 1, nome: "Maria Silva", email: "maria.silva@email.com", telefone: "(85) 98765-4321", documento: "123.456.789-00", iniciais: "MS", color: "from-blue-500 to-indigo-600" },
  { id: 2, nome: "João Santos", email: "joao.santos@empresa.com", telefone: "(85) 99123-4567", documento: "987.654.321-00", iniciais: "JS", color: "from-purple-500 to-pink-600" },
  { id: 3, nome: "Ana Paula Oliveira", email: "ana.oliveira@email.com", telefone: "(85) 98888-9999", documento: "456.789.123-00", iniciais: "AP", color: "from-green-500 to-emerald-600" },
  { id: 4, nome: "Carlos Lima", email: "carlos.lima@gmail.com", telefone: "(85) 97777-8888", documento: "789.123.456-00", iniciais: "CL", color: "from-orange-500 to-red-600" },
  { id: 5, nome: "Fernanda Martins", email: "fernanda.m@outlook.com", telefone: "(85) 96666-7777", documento: "321.654.987-00", iniciais: "FM", color: "from-cyan-500 to-blue-600" },
  { id: 6, nome: "Ricardo Souza", email: "ricardo.souza@yahoo.com", telefone: "(85) 95555-4444", documento: "654.321.987-11", iniciais: "RS", color: "from-yellow-500 to-orange-600" },
];



export default function ClientsPage() {
  const { user, token } = useAuth();
  const { data, loading, error } = useDashboard(token ?? undefined);
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [searchTerm, setSearchTerm] = useState<string>("");

  const itemsPerPage = 5



const filteredData = mockClients.filter((client) => {
    const search = searchTerm.toLowerCase();
    return (
      client.nome.toLowerCase().includes(search) ||
      client.email.toLowerCase().includes(search) ||
      client.documento.includes(search)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentClients = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); 
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
          <p className="text-gray-600">Carregando sues clientes...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-exclamation-circle text-4xl text-red-600 mb-4"></i>
          <p className="text-red-600 font-semibold mb-2">Erro ao carregar dados</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Nenhum dado disponível</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl space-y-6 mx-auto px-4 sm:px-6 lg:px-8 py-8">
  {/* Lado Esquerdo: Título e Subtítulo */}
    <HeaderForPage 
    title={'Clientes'} 
    subtitle={'Gerencie os clientes do seu escritório'} 
    button= {true}
    buttonLabel={'Novo Cliente'}
    // onButtonClick={handleNewClient}
     />

      {/* Stats Grid - 4 Cards */}
      <ClientSearch 
        searchTerm={searchTerm} 
        onSearchChange={handleSearch} 
        onClear={() => handleSearch("")}
      />

      <ClientsTable 
        clients={currentClients} 
        pagination={{
          totalResults: filteredData.length, // Total baseado no filtro
          currentPage: currentPage,
          itemsPerPage: itemsPerPage,
          onPageChange: (page) => setCurrentPage(page)
        }}
      />


    <StatsGridCli/>

  
    </div>
  );
}