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

  try {
    const produto = await db.produto.findUnique({
      where: {
        id: id,
        loja: { userId: session.user.id },
      },
      include: {
        loja: {
          select: { nome: true, id: true },
        },
      },
    });

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    return produto;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
  }
}

export default async function PaginaEditarProduto({
  params,
}: {
  params: { id: string };
}) {
  const produto = await getProduto(params.id);

  return <EditProductForm dadosIniciais={produto} />;
}
