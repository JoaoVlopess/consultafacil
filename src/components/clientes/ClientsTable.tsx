'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";


interface ClientTableProps {
  clients: Client[];
}

export function ClientsTable({ clients }: ClientTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50 ">
          <TableRow>
            <TableHead className="text-xs font-semibold text-gray-500 uppercase px-6">Nome</TableHead>
            <TableHead className="text-xs font-semibold text-gray-500 uppercase px-6">Email</TableHead>
            <TableHead className="text-xs font-semibold text-gray-500 uppercase px-6">Telefone</TableHead>
            <TableHead className="text-xs font-semibold text-gray-500 uppercase px-6">Documento</TableHead>
            <TableHead className="text-right text-xs font-semibold text-gray-500 uppercase px-6">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100">
          {clients.length > 0 ? (
            clients.map((client) => (
              <TableRow key={client.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`h-10 w-10 bg-gradient-to-br ${client.color} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                      {client.iniciais}
                    </div>
                    <span className="ml-4 font-medium text-gray-900">{client.nome}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-600">{client.email}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-600">{client.telefone}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-600">{client.documento}</TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Ver Processos</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                Nenhum cliente encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Paginação */}
      {/* <PaginationFooter totalResults={12} currentPage={2} /> */}
    </div>
  );
}