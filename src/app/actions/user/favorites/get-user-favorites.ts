import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function GetUserFavorites() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new Error("Não autorizado: usuário não está autenticado");
    }

    const favorites = await db.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        product: {
          include: {
            loja: true,
            categoria: true,
          },
        },
      },
    });

    if (!Array.isArray(favorites)) {
      throw new Error("Formato de dados inválido");
    }

    return favorites.map((fav) => {
      if (!fav.product) {
        throw new Error("Dados do produto ausentes");
      }
      return {
        ...fav.product,
        favoriteId: fav.id,
      };
    });
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    throw error;
  }
}
