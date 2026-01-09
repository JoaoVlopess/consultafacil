// src/components/dashboard/QuickActions.tsx

export function QuickActions() {
  const actions = [
    { icon: 'fa-user-plus', label: 'Novo Cliente', href: '/clientes/novo' },
    { icon: 'fa-briefcase', label: 'Novo Processo', href: '/processos/novo' },
    { icon: 'fa-calendar-plus', label: 'Agendar Audiência', href: '/audiencias/nova' },
    { icon: 'fa-file-alt', label: 'Gerar Relatório', href: '/relatorios' },
  ];

  return (
    <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm p-6 text-white">
      <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-center transition-all text-black"
          >
            <i className={`fas ${action.icon} text-3xl mb-2`}></i>
            <p className="text-sm font-medium">{action.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}