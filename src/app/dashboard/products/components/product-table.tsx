"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import DeleteProductDialog from "./delete-product-dialog";
import { string } from "zod";

interface Product {
  id: string;
  sku: string;
  nome: string;
  descricao: string;
  imagemUrl: string;
  imagemUrls: string[];
  estoque: number;
  preco: Decimal;
  porcentagemDesconto: Decimal | null;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
  totalVendido: number | null;
  loja: {
    id: string;
    nome: string;
  };
}

interface Props {
  products: Product[];
  title: string;
  description: string;
}

export default function ProductTable({ products, title, description }: Props) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string>("");

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedProducts(products.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => {
    if (event.target.checked) {
      setSelectedProducts((prev) => [...prev, productId]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

  return (
    <>
      <Card className="bg-background">
        <CardContent className="px-0">
          <Table className="mt-6">
            <TableHeader>
              <TableRow className="border-none">
                <TableHead className="flex items-center gap-2">
                  <input
                    className={`h-4 w-4 ml-4  accent-violet-600`}
                    type="checkbox"
                    checked={selectedProducts.length === products.length}
                    onChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-[100px]">
                  <span className="sr-only">Imagem</span>
                </TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Preço</TableHead>
                <TableHead className="hidden md:table-cell">Estoque</TableHead>
                <TableHead className="hidden lg:table-cell">Vendidos</TableHead>
                <TableHead className="hidden lg:table-cell">
                  Criado em
                </TableHead>
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
                      <TableCell className="font-medium w-fit">
                        <input
                          className="w-4 h-4 ml-4 accent-violet-600"
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={(event) =>
                            handleSelectProduct(event, product.id)
                          }
                        />
                      </TableCell>
                      <TableCell className=" py-2">
                        <div className="relative h-10 w-10 sm:h-16 sm:w-16 overflow-hidden rounded-md">
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
                        <span className="text-xs sm:text-sm font-semibold ml-2 line-clamp-2">
                          {product.nome}
                        </span>
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
                        {new Date(product.createdAt).toLocaleDateString(
                          "pt-BR"
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                              className="transition-colors duration-450"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/products/edit-product/${product.id}`}
                              >
                                Editar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() => {
                                setIsConfirmDialogOpen(true);
                                setDeleteProductId(product.id);
                              }}
                            >
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </CardContent>
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
