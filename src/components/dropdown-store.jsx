"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDropDownLine } from "react-icons/ri";

const storeNames = [
  "ModaMundo",
  "TecnologiaTotal",
  "CasaConforto",
  "EstiloShoes",
  "BelezaBrilhante",
  "GadgetGaleria",
  "EsporteStyle",
  "LivroLab",
  "GastronomiaGourmet",
  "SaúdeSaudável",
];

export default function DropdownStore() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1">
          <p className="text-gray-500 transition hover:text-gray-500/75">
            Lojas
          </p>
          <RiArrowDropDownLine />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {storeNames.map((store, index) => (
          <DropdownMenuItem key={index}>{store}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
