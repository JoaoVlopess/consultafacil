// src/components/processos/ProcessFilters.tsx
'use client';

import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { ProcessoStatus, STATUS_LABELS } from "@/src/types/process";

interface Client {
  id: number;
  nome: string;
}

interface ProcessFiltersProps {
  searchTerm: string;
  selectedStatus: ProcessoStatus | undefined; 
  selectedClient: number | undefined;         
  onSearchChange: (value: string) => void;
  onStatusChange: (status: ProcessoStatus | undefined) => void;  
  onClientChange: (clientId: number | undefined) => void;        
  onClear: () => void;
  clients: Client[];
}

export function ProcessFilters({
  searchTerm,
  selectedStatus,
  selectedClient,
  onSearchChange,
  onStatusChange,
  onClientChange,
  onClear,
  clients,
}: ProcessFiltersProps) {
  
  
  const handleStatusChange = (value: string) => {
    if (value === "all_status") {
      onStatusChange(undefined);
    } else {
      onStatusChange(value as ProcessoStatus);
    }
  };

  
  const handleClientChange = (value: string) => {
    if (value === "all_clients") {
      onClientChange(undefined);
    } else {
      onClientChange(parseInt(value));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Campo de Busca */}
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Buscar por número ou título do processo..." 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-10 border-gray-300 focus-visible:ring-blue-500"
          />
        </div>

        {/* Dropdown de Status */}
        <Select 
          value={selectedStatus || "all_status"} 
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px] h-10 border-gray-300 focus:ring-blue-500">
            <SelectValue placeholder="Todos os Status" />
          </SelectTrigger>
          <SelectContent side="bottom" align="start">
            <SelectItem value="all_status">Todos os Status</SelectItem>
            {Object.values(ProcessoStatus).map(status => (
              <SelectItem key={status} value={status}>
                {STATUS_LABELS[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Dropdown de Cliente */}
        <Select 
          value={selectedClient?.toString() || "all_clients"} 
          onValueChange={handleClientChange}
        >
          <SelectTrigger className="w-[200px] h-10 border-gray-300 focus:ring-blue-500">
            <SelectValue placeholder="Todos os Clientes" />
          </SelectTrigger>
          <SelectContent side="bottom" align="start">
            <SelectItem value="all_clients">Todos os Clientes</SelectItem>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id.toString()}>
                {client.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Botão Limpar */}
        {(searchTerm || selectedStatus || selectedClient) && (
          <Button 
            variant="ghost" 
            onClick={onClear} 
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times mr-2"></i>
            Limpar Filtros
          </Button>
        )}
      </div>
    </div>
  );
}