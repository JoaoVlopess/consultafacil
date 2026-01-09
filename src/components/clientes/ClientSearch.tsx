'use client';
import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

interface ClientFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

export function ClientSearch({ searchTerm, onSearchChange, onClear }: ClientFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Buscar por nome, email ou documento..." 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-10 border-gray-300 focus-visible:ring-blue-500"
          />
        </div>
        <Button variant="ghost" onClick={onClear} className="text-gray-500 hover:text-gray-700">
          Limpar
        </Button>
      </div>
    </div>
  );
}