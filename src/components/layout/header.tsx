// components/Header.tsx
'use client'; // Este componente precisa ser um Client Component por causa do DropdownMenu e Avatar do shadcn/ui

import Link from 'next/link'; // Importa o componente Link do Next.js
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar'; // Importa os componentes Avatar do shadcn/ui
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'; // Importa os componentes DropdownMenu do shadcn/ui

export function Header() {
    return (
        // O elemento <nav> é um contêiner para a barra de navegação
        <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            {/* max-w-7xl mx-auto: Centraliza o conteúdo da nav e define uma largura máxima
                px-4 sm:px-6 lg:px-8: Define o padding horizontal para diferentes tamanhos de tela */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* flex justify-between h-16: Organiza os itens (esquerda e direita) com espaçamento entre eles e define uma altura */}
                <div className="flex justify-between h-16">
                    {/* LEFT: Logo + Navigation */}
                    <div className="flex items-center h-full">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center pr-8">
                            {/* Link do logo para a página inicial do dashboard */}
                            <Link href="/dashboard" className="flex items-center">
                                {/* Ícone da balança do Font Awesome */}
                                <i className="fas fa-balance-scale text-blue-600 text-2xl mr-3"></i>
                                <div>
                                    {/* Nome da aplicação */}
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">ConsultaFácil</h1>
                                    {/* Slogan da aplicação */}
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Gestão Jurídica Inteligente</p>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:ml-10 md:flex md:space-x-8 h-full items-center">
                            {/* Link para o Dashboard */}
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-500"
                            >
                                <i className="fas fa-chart-line mr-2"></i> Dashboard
                            </Link>
                            {/* Link para Clientes */}
                            <Link
                                href="/dashboard/clientes"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-500"
                            >
                                <i className="fas fa-users mr-2"></i> Clientes
                            </Link>
                            {/* Link para Processos */}
                            <Link
                                href="/dashboard/processos"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-500"
                            >
                                <i className="fas fa-briefcase mr-2"></i> Processos
                            </Link>
                            {/* Link para Audiências */}
                            <Link
                                href="/dashboard/audiencias"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-500"
                            >
                                <i className="fas fa-gavel mr-2"></i> Audiências
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT: Notifications + User */}
                    {/* Aumentado space-x-4 para space-x-8 para mais espaçamento */}
                    <div className="flex items-center space-x-4">
                        {/* Notification Button */}
                        <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
                            {/* Corrigido -right-1s para -right-1 */}
                            <span className="absolute -top-5 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                x
                            </span>
                        </button>

                        {/* User Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center space-x-3 focus:outline-none hover:opacity-80 transition-opacity">
                                    <Avatar>
                                        <AvatarFallback className="bg-blue-600 text-white font-semibold">
                                            AD
                                        </AvatarFallback>
                                        {/* AvatarImage pode ser adicionado aqui se houver uma URL de imagem */}
                                        {/* <AvatarImage src="/path/to/avatar.jpg" alt="Dr. Advogado" /> */}
                                    </Avatar>
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Dr. Advogado</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">adv@demo.com</p>
                                    </div>
                                    <i className="fas fa-chevron-down text-gray-400 text-sm"></i>
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <i className="fas fa-user mr-2"></i>
                                    <span>Perfil</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <i className="fas fa-cog mr-2"></i>
                                    <span>Configurações</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="text-red-600">
                                    <i className="fas fa-sign-out-alt mr-2"></i>
                                    <span>Sair</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
}