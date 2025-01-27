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
import { Link } from "next-view-transitions";
import DeleteProductDialog from "../../components/delete-product-dialog";
import Icon from "@/components/icons/icon-component";

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

interface Props {
  products: Product[];
}

export default function ProductTable({ products }: Props) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string>("");

  return (
    <>
      <Card className="bg-background border">
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
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            ) : (
              products
                .slice()
                .reverse()
                .map((product) => (
                  <TableRow key={product.id} className="px-2">
                    <TableCell className=" py-2">
                      <div className="relative h-12 w-12 sm:h-16 sm:w-16 overflow-hidden rounded-md">
                        <Image
                          alt="Product image"
                          className="absolute inset-0 h-full w-full object-cover"
                          height="500"
                          width="500"
                          src={product.imagemUrl}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
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
                            <span>Excluir</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>

        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Mostrando <strong>1-{products.length}</strong> de{" "}
            <strong>{products.length}</strong> produtos
          </div>
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
