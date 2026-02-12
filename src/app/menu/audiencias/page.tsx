'use client';

import { AudienciasStats } from "@/src/components/audiencias/Audienciasstats";
import { HeaderForPage } from "@/src/components/HeaderForPage";
import { useAuth } from "@/src/contexts/AuthContexts";
import { useProcessos } from "@/src/hooks/useProcesses";
import { Process, ProcessoStatus } from "@/src/types/process";
import { useState } from "react";

const Page = () => {

   const { token } = useAuth();
    
  //   // Estados para filtros
  //   const [searchTerm, setSearchTerm] = useState('');
  //   const [selectedStatus, setSelectedStatus] = useState<ProcessoStatus | undefined>();
  //   const [selectedClient, setSelectedClient] = useState<number | undefined>();
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [isDialogOpen, setIsDialogOpen] = useState(false);
  //   const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);


      // const { data, loading, error, refetch } = useProcessos({
      //   token,
      //   search: searchTerm,
      //   status: selectedStatus,
      //   client_id: selectedClient,
      //   page: currentPage,
      //   limit: 5,
      // });

    //       const stats = {
    //   emAndamento: data?.items.filter(p => p.status === ProcessoStatus.EM_ANDAMENTO).length || 0,
    //   ganhos: data?.items.filter(p => p.status === ProcessoStatus.GANHO).length || 0,
    //   arquivados: data?.items.filter(p => p.status === ProcessoStatus.ARQUIVADO).length || 0,
    //   total: data?.total || 0,
    
    // }; usar <AudienciasStats stats={stats} />

  const handleNewAudience = () => {

  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <HeaderForPage 
              title="Audiências" 
              subtitle="Gerencie todas as audiências agendadas" 
              button={true} 
              buttonLabel="Nova audiência"
              onButtonClick={handleNewAudience}
            />
       
    </div>
  )
}

export default Page;