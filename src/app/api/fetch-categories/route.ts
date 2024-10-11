import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import { db } from "@/lib/prisma"; 

export async function GET(req: Request) {

  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { message: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  try {
    const categories = await db.categoria.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return NextResponse.json(
      { message: "Erro ao buscar categorias", error },
      { status: 500 }
    );
  }
}
