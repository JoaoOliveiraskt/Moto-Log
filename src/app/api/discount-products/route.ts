import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma'; 
import type { Produto } from 'prisma/generated/client';

export async function GET(request: Request) {
  try {
    const products: Produto[] = await db.produto.findMany({
      include: {
        loja: {
          select: { nome: true, id: true, descricao: true, imagemUrl: true },
        },
        categoria: { select: { nome: true, id: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 15, 
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json({ error: 'Erro ao buscar produtos.' }, { status: 500 });
  }
}
