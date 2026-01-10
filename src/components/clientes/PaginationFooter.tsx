// src/components/dashboard/clientes/PaginationFooter.tsx
'use client';

import { Button } from "@/src/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    totalResults: number;
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export function PaginationFooter({
    totalResults,
    currentPage,
    itemsPerPage,
    onPageChange
}: PaginationProps) {
    const totalPages = Math.ceil(totalResults / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalResults);

    return (
        <div className="bg-white px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-500">
                {totalResults > 0 ?
                    (<div>
                        Mostrando <span className="font-medium text-gray-900">{startItem}</span> a{" "}
                        <span className="font-medium text-gray-900">{endItem}</span> de{" "}
                        <span className="font-medium text-gray-900">{totalResults}</span> resultados
                    </div>) :
                    (<div>
                        Mostrando <span className="font-medium text-gray-900">0</span>
                        <span className="font-medium text-gray-900"></span> resultados
                    </div>)
                }



            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="text-gray-600 gap-1"
                >
                    <ChevronLeft className="h-4 w-4" /> Anterior
                </Button>

                <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            variant={page === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => onPageChange(page)}
                            className={page === currentPage
                                ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 shadow-none"
                                : "text-gray-500 border-gray-200"}
                        >
                            {page}
                        </Button>
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="text-gray-600 gap-1"
                >
                    Próxima <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}