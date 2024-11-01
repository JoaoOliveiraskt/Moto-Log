import { Skeleton } from "./ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="relative mb-6">
      <div className="cursor-pointer h-max overflow-hidden rounded-2xl transition-all">
        {/* Imagem do produto */}
        <Skeleton className="h-48 min-w-64 lg:h-[13rem] rounded-2xl mb-3" />

        <div className="min-h-full px-1 py-0.5 flex flex-col justify-between">
          {/* Categoria */}
          <Skeleton className="h-4 w-1/3 mb-1" />

          {/* Nome do produto */}
          <Skeleton className="h-5 w-3/4 mb-1" />

          {/* Preço e desconto */}
          <div className="flex flex-col-reverse gap-y-2 items-start md:flex-row md:items-center md:gap-2 mt-0.5">
            <Skeleton className="h-5 w-28" />
            <div className="flex gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-14" />
            </div>
          </div>

          {/* Informações da loja */}
          <div className="w-fit mt-1 flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-md" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}
