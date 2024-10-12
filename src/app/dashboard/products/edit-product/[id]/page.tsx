import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import EditProductForm from "./edit-product-form";

async function getProduto(id: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const produto = await db.produto.findFirst({
    where: {
      id: id,
      loja: { userId: session.user.id }
    },
    include: {
      loja: {
        select: { nome: true, id: true }
      }
    }
  });

  if (!produto) {
    redirect("/dashboard/products");
  }

  return produto;
}

export default async function PaginaEditarProduto({
  params
}: {
  params: { id: string };
}) {
  const produto = await getProduto(params.id);
  
  return <EditProductForm dadosIniciais={produto} />;
}