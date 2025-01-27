import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Você precisa estar logado" },
        { status: 401 }
      );
    }

    const { productId } = await request.json();
    if (!productId) {
      return NextResponse.json(
        { message: "ID do produto é obrigatório" },
        { status: 400 }
      );
    }

    const favorite = await db.favorite.create({
      data: {
        userId: session.user.id as string,
        productId,
      },
    });

    return NextResponse.json({ success: true, favorite });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Produto já está nos favoritos" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Erro ao adicionar favorito" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Você precisa estar logado" },
        { status: 401 }
      );
    }

    const { productId } = await request.json();
    if (!productId) {
      return NextResponse.json(
        { message: "ID do produto é obrigatório" },
        { status: 400 }
      );
    }

    await db.favorite.deleteMany({
      where: {
        userId: session.user.id as string,
        productId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao remover favorito" },
      { status: 500 }
    );
  }
}
