import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { z, ZodError } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const createStoreSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .max(200, "O máximo de caracteres permitido é 200")
    .optional(),
  imageUrl: z.string().url("A URL da imagem deve ser válida"),
});

const handleErrorResponse = (error: unknown) => {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "Validação falhou", issues: error.errors },
      { status: 400 }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { error: "Erro ao criar a loja", details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ error: "Erro desconhecido" }, { status: 500 });
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  try {
    const body = await request.json();
    const data = createStoreSchema.parse(body);

    const store = await db.loja.create({
      data: {
        nome: data.name,
        descricao: data.description,
        imagemUrl: data.imageUrl,
        email: session.user.email,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    await db.user.update({
      where: { id: userId },
      data: { role: "LOJISTA" },
    });

    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    console.error("Error creating store", error);
    return handleErrorResponse(error);
  }
}
