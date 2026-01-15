// src/components/ui/action-button.tsx
import { Plus } from "lucide-react";
import { Button } from "./ui/button"; // Se estiver usando shadcn/ui

interface ActionButtonProps {
  label: string| undefined;
  onClick?: () => void;
}

export function ActionButton({ label, onClick }: ActionButtonProps) {
  return (
    <Button 
      onClick={onClick}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-6 rounded-lg font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2"
    >
      <Plus className="h-5 w-5" />
      {label}
    </Button>
  );
}