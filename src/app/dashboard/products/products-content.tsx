import Image from "next/image";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

async function getProductsForUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return [];
  }

  const userId = session.user.id;

  const products = await db.produto.findMany({
    where: { loja: { userId: userId } },
    include: { loja: { select: { nome: true, id: true } } },
  });

  return products || [];
}

export default async function ProductsContent() {
  const products = await getProductsForUser();

  const activeProducts = products.filter(
    (product) => product.status === "ATIVO"
  );
  const archivedProducts = products.filter(
    (product) => product.status === "ARQUIVADO"
  );

  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8 mt-4">
      <Tabs defaultValue="all">
        <div className="flex items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Ativo</TabsTrigger>
            <TabsTrigger value="archived">Arquivado</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button className="gap-1">
              <Link
                href="/dashboard/add-product"
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Adicionar produto
                </span>
              </Link>
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <ProductTable
            products={products}
            title="Produtos"
            description="Gerencie seus produtos e visualize seu desempenho de vendas."
          />
        </TabsContent>

        <TabsContent value="active">
          <ProductTable
            products={activeProducts}
            title="Produtos Ativos"
            description="Gerencie seus produtos ativos."
          />
        </TabsContent>

        <TabsContent value="archived">
          <ProductTable
            products={archivedProducts}
            title="Produtos Arquivados"
            description="Gerencie seus produtos arquivados."
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}

interface Props {
  products: any[];
  title: string;
  description: string;
}

function ProductTable({ products, title, description }: Props) {
  return (
    <Card>
      <CardHeader className="px-6 mt-6 space-y-2 mb-5">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Imagem</span>
              </TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="hidden md:table-cell">Criado em</TableHead>
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
                  <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          alt="Product image"
                          className="absolute inset-0 h-full w-full object-cover"
                          height="1000"
                          width="1000"
                          src={product.imagemUrl}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <span className="text-xs sm:text-sm">{product.nome}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <span className="text-xs">{product.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs sm:text-sm">{`R$${product.preco.toFixed(
                        2
                      )}`}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(product.createdAt).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Deletar</DropdownMenuItem>
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
  );
}
