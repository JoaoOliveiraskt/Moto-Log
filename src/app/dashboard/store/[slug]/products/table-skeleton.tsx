import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function ProductTableSkeleton() {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <TableRow key={index} className="hover:bg-transparent">
          {/* Imagem */}
          <TableCell>
            <Skeleton className="h-12 w-12 sm:h-16 sm:w-16 rounded-md ml-2" />
          </TableCell>

          {/* Nome */}
          <TableCell>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20 mt-1 sm:hidden" />
          </TableCell>

          {/* Status */}
          <TableCell>
            <Skeleton className="h-4 w-12" />
          </TableCell>

          {/* Preço */}
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>

          {/* Estoque */}
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-4 w-12" />
          </TableCell>

          {/* Vendidos */}
          <TableCell className="hidden lg:table-cell">
            <Skeleton className="h-4 w-12" />
          </TableCell>

          {/* Data */}
          <TableCell className="hidden lg:table-cell">
            <Skeleton className="h-4 w-24" />
          </TableCell>

          {/* Ações */}
          <TableCell>
            <Skeleton className="h-4 w-10" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
