"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDropDownLine } from "react-icons/ri";
import useCategorySearch from "@/hooks/useCategorySearch";

export default function DropdownCategory() {
  const categories = useCategorySearch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1">
          <p className="text-gray-500 transition hover:text-gray-500/75">
            Categorias
          </p>
          <RiArrowDropDownLine />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {categories.map((category) => (
          <DropdownMenuItem key={category.id}>{category.name}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
