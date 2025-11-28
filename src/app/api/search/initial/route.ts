import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {
    try {
        const [stores, categories, products] = await Promise.all([
            // Lojas em Alta - ordenadas por número de seguidores (popularidade)
            db.loja.findMany({
                take: 18,
                select: {
                    id: true,
                    nome: true,
                    profileImageUrl: true,
                    _count: {
                        select: {
                            followers: true,
                        },
                    },
                },
                orderBy: {
                    followers: {
                        _count: "desc",
                    },
                },
            }),
            // Apenas categorias que possuem produtos ativos
            db.categoria.findMany({
                where: {
                    produtos: {
                        some: {
                            status: "ATIVO",
                        },
                    },
                },
                select: {
                    id: true,
                    nome: true,
                },
            }),
            // Best Sellers - produtos mais vendidos
            db.produto.findMany({
                take: 20,
                where: {
                    status: "ATIVO",
                },
                select: {
                    id: true,
                    nome: true,
                    imagemUrl: true,
                    preco: true,
                    porcentagemDesconto: true,
                    totalVendido: true,
                    loja: {
                        select: {
                            id: true,
                            nome: true,
                            profileImageUrl: true,
                        },
                    },
                    categoria: {
                        select: {
                            id: true,
                            nome: true,
                        },
                    },
                },
                orderBy: {
                    totalVendido: "desc",
                },
            }),
        ]);

        return NextResponse.json(
            { stores, categories, products },
            {
                headers: {
                    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
                },
            }
        );
    } catch (error) {
        console.error("Search Initial Data Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
