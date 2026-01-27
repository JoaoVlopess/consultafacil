// src/components/processos/ProcessesStats.tsx

interface ProcessesStatsProps {
  stats: {
    emAndamento: number;
    ganhos: number;
    arquivados: number;
    total: number;
  };
}

export function ProcessesStats({ stats }: ProcessesStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Card 1 - Em Andamento */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Em Andamento</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">{stats.emAndamento}</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-spinner text-blue-600"></i>
          </div>
        </div>
      </div>

      {/* Card 2 - Ganhos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Ganhos</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{stats.ganhos}</p>
          </div>
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-trophy text-green-600"></i>
          </div>
        </div>
      </div>

      {/* Card 3 - Arquivados */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Arquivados</p>
            <p className="text-2xl font-bold text-gray-600 mt-1">{stats.arquivados}</p>
          </div>
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-archive text-gray-600"></i>
          </div>
        </div>
      </div>

      {/* Card 4 - Total */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">{stats.total}</p>
          </div>
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-briefcase text-purple-600"></i>
          </div>
        </div>
      </div>
    </div>
  );
}