import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  try {
    const store = await db.loja.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        pedidos: true,
      },
      orderBy: { createdAt: "asc" },
    });

    if (!store) {
      return NextResponse.json(
        { message: "Loja não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar a loja", error },
      { status: 500 }
    );
  }
}
