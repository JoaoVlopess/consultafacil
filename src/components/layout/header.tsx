'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Importante para detectar a rota
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';

// Definimos os itens de navegação para não repetir código
const navItems = [
    { name: 'Dashboard', href: '/', icon: 'fas fa-chart-line' }, 
    { name: 'Clientes', href: '/clientes', icon: 'fas fa-users' },
    { name: 'Processos', href: '/processos', icon: 'fas fa-briefcase' },
    { name: 'Audiências', href: '/audiencias', icon: 'fas fa-gavel' },
];

export function Header() {
    const pathname = usePathname();

    return (
        <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* LEFT SIDE */}
                    <div className="flex items-center h-full">
                        <Link href="/dashboard" className="flex items-center pr-8">
                            <i className="fas fa-balance-scale text-blue-600 text-2xl mr-3"></i>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">ConsultaFácil</h1>
                                <p className="text-xs text-gray-500">Gestão Jurídica Inteligente</p>
                            </div>
                        </Link>

                        {/* LINKS DINÂMICOS */}
                        <div className="hidden md:ml-10 md:flex md:space-x-8 h-full">
                            {navItems.map((item) => {
                                // Verifica se a rota atual começa com o href do item
                                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors h-full ${
                                            isActive
                                                ? 'border-blue-600 text-gray-900 dark:text-white' // Estilo Ativo
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300' // Estilo Inativo
                                        }`}
                                    >
                                        <i className={`${item.icon} mr-2`}></i>
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT SIDE (User Dropdown) */}
                    <div className="flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center space-x-3 focus:outline-none">
                                    <Avatar>
                                        <AvatarFallback className="bg-blue-600 text-white">AD</AvatarFallback>
                                    </Avatar>
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-medium">Dr. Advogado</p>
                                        <p className="text-xs text-gray-500">adv@demo.com</p>
                                    </div>
                                    <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-2">
                                <DropdownMenuItem>Perfil</DropdownMenuItem>
                                <DropdownMenuItem>Configurações</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Sair</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
}