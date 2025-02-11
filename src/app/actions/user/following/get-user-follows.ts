import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GetUserFollows() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new Error("Não autorizado: usuário não está autenticado");
    }

    const follows = await db.follows.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        createdAt: true,
        store: {
          select: {
            id: true,
            nome: true,
            descricao: true,
            profileImageUrl: true,
            Produtos: {
              select: {
                id: true,
                nome: true,
                preco: true,
                porcentagemDesconto: true,
                totalVendido: true,
                imagemUrl: true,
                categoria: {
                  select: {
                    id: true,
                    nome: true,
                  },
                },
                loja: {
                  select: {
                    id: true,
                    nome: true,
                    profileImageUrl: true,
                    descricao: true,
                  },
                },
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return follows.map((follow) => ({
      followId: follow.id,
      createdAt: follow.createdAt,
      store: follow.store
        ? {
            id: follow.store.id,
            nome: follow.store.nome,
            descricao: follow.store.descricao,
            profileImageUrl: follow.store.profileImageUrl,
          }
        : null,
      produtos:
        follow.store?.Produtos?.map((produto) => ({
          ...produto,
          loja: follow.store, // Adicionando a loja ao produto
        })) || [],
    }));
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    throw new Error("Erro ao buscar lojas seguidas.");
  }
}
