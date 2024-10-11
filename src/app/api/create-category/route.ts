import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { z } from "zod";

const categorySchema = z.object({
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsedBody = categorySchema.parse(body);

    const newCategory = await db.categoria.create({
      data: { nome: parsedBody.nome },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar categoria" },
      { status: 500 }
    );
  }
}
