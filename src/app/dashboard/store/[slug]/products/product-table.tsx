"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Decimal } from "@prisma/client/runtime/library";
import formatCurrency from "@/app/helpers/format-currency";
import { useState } from "react";
import Link from "next/link";
import DeleteProductDialog from "../../components/delete-product-dialog";
import Icon from "@/components/icons/icon-component";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import ProductTableSkeleton from "./table-skeleton";

interface Product {
  id: string;
  nome: string;
  descricao: string;
  imagemUrl: string;
  estoque: number;
  preco: Decimal;
  porcentagemDesconto: Decimal | null;
  status: string;
  createdAt: Date;
  totalVendido: number | null;
}

interface PaginationData {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

interface Props {
  initialProducts: Product[];
  initialPagination: PaginationData;
  status: string;
}

async function fetchProducts(page: number, pageSize: number, status: string) {
  const response = await fetch(
    `/api/product/store-products?page=${page}&pageSize=${pageSize}&status=${status}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}
export default function ProductTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string>("");

  // Obter parâmetros da URL
  const status = searchParams.get("status") || "all";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page, pageSize, status],
    queryFn: () => fetchProducts(page, pageSize, status),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });

  // Função para mudar a página
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.replace(`?${params.toString()}`);
  };

  const products = data?.products || [];
  const pagination = data?.pagination || {};

  // Função para gerar links de paginação
  const generatePaginationLinks = () => {
    const { totalPages, currentPage } = pagination;
    const paginationItems = [];
    const maxPagesToShow = 4;

    paginationItems.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          className={
            currentPage <= 1
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    if (totalPages > maxPagesToShow) {
      paginationItems.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={1 === currentPage}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        paginationItems.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          paginationItems.push(
            <PaginationItem key={i}>
              <PaginationLink
                isActive={i === currentPage}
                onClick={() => handlePageChange(i)}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }

      // Elipse final
      if (currentPage < totalPages - 2) {
        paginationItems.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Última página
      paginationItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={totalPages === currentPage}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    } else {
      // Exibe todas as páginas se for menos que o máximo
      for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    // Botão Próximo
    paginationItems.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          className={
            currentPage >= totalPages
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    return paginationItems;
  };

  return (
    <>
      <Card className="bg-transparent lg:bg-card/60 border-none">
        <Table className="mt-2 sm:mt-4">
          <TableHeader>
            <TableRow className="border-none hover:bg-background dark:hover:bg-background">
              <TableHead className="sr-only">Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Preço</TableHead>
              <TableHead className="hidden md:table-cell">Estoque</TableHead>
              <TableHead className="hidden lg:table-cell">Vendidos</TableHead>
              <TableHead className="hidden lg:table-cell">Criado em</TableHead>
              <TableHead>
                <span className="sr-only">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <ProductTableSkeleton />
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product: Product) => (
                <TableRow key={product.id}>
                  <TableCell className="py-2">
                    <div className="relative h-12 w-12 sm:h-16 sm:w-16 overflow-hidden rounded-md ml-2">
                      <Image
                        alt="Product image"
                        className="absolute inset-0 h-full w-full object-cover"
                        height="500"
                        width="500"
                        src={product.imagemUrl}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="max-w-20">
                    <Link
                      href={`/product/${product.id}`}
                      className="text-xs sm:text-sm font-semibold line-clamp-2"
                    >
                      {product.nome}
                    </Link>
                  </TableCell>
                  <TableCell className="">
                    <div className="flex gap-2 items-center w-fit rounded-full px-1.5 py-0.5 ">
                      <div
                        className={`h-2.5 w-2.5 rounded-full border ${
                          product.status === "ATIVO"
                            ? "bg-teal-500"
                            : "bg-yellow-500"
                        }`}
                      ></div>
                      <span className="text-xs sm:text-sm text-muted-foreground font-semibold">
                        {product.status === "ATIVO" ? "Ativo" : "Arquivado"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs sm:text-sm font-semibold">
                      {`${formatCurrency(Number(product.preco))}`}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs sm:text-sm hidden md:table-cell items-center text-muted-foreground font-semibold">
                      {product.estoque}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground font-semibold">
                    {product.totalVendido}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground font-semibold">
                    {new Date(product.createdAt).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="iconShaped"
                          variant="ghost"
                          className="transition-colors duration-450"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="font-semibold p-1"
                      >
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/store/edit-product/${product.id}`}
                            className="flex items-center gap-x-2"
                          >
                            <Icon.edit />
                            <span>Editar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500 flex items-center gap-x-2"
                          onClick={() => {
                            setIsConfirmDialogOpen(true);
                            setDeleteProductId(product.id);
                          }}
                        >
                          <Icon.trash />
                          <span>Remover</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <CardFooter className="flex justify-center sm:justify-between flex-wrap gap-4">
          <div className="hidden sm:block text-sm text-muted-foreground">
            Mostrando {products.length} de {pagination.totalItems} produtos
          </div>
          <Pagination>
            <PaginationContent>{generatePaginationLinks()}</PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
      <DeleteProductDialog
        productId={deleteProductId}
        isConfirmDialogOpen={isConfirmDialogOpen}
        setIsConfirmDialogOpen={setIsConfirmDialogOpen}
      />
    </>
  );
}
