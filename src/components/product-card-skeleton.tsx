import { Skeleton } from "./ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="relative mb-6">
      <div className="cursor-pointer h-max overflow-hidden rounded-2xl transition-all">
        {/* Imagem do produto */}
        <Skeleton className="h-48 w-full lg:min-w-64 lg:h-[13rem] rounded-2xl mb-3" />

        <div className="min-h-full px-1 py-0.5 flex flex-col justify-between">
          {/* Nome do produto */}
          <Skeleton className="h-5 w-3/4 mb-1" />

          {/* Categoria */}
          <Skeleton className="h-2 w-1/3" />

          {/* Preço e desconto */}
          <div className="flex flex-col gap-y-2 items-start mt-2">
            <div className="flex gap-2">
              <Skeleton className="h-2 w-24" />
              <Skeleton className="h-2 w-14" />
            </div>
            <Skeleton className="h-5 w-28" />
          </div>

          {/* Total vendidos */}
          <Skeleton className="h-2 w-28 mt-3" />

          {/* Informações da loja */}
          <div className="w-fit mt-2 flex items-center gap-2 mt-2">
            <Skeleton className="w-7 h-7 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}
