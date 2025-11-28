import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { z } from "zod";

const searchSchema = z.object({
    q: z.string().min(1, "Query cannot be empty").max(100, "Query too long"),
});

// Type definitions matching frontend expectations (camelCase)
interface StoreResult {
    id: string;
    nome: string;
    profileImageUrl: string | null;
    slug: string | null;
    followers: number;
}

interface ProductResult {
    id: string;
    nome: string;
    imagemUrl: string;
    categoria: {
        nome: string;
    };
}

interface CategoryResult {
    id: string;
    nome: string;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    const validation = searchSchema.safeParse({ q: query });

    if (!validation.success) {
        return NextResponse.json({ stores: [], products: [], categories: [] });
    }

    const safeQuery = validation.data.q;

    try {
        // Use unaccent for accent-insensitive search
        const searchPattern = `%${safeQuery}%`;

        const [storesRaw, productsRaw, categoriesRaw] = await Promise.all([
            // Stores query with field aliases and follower count
            db.$queryRaw<StoreResult[]>`
                SELECT 
                    l.id,
                    l.nome,
                    l."profileImageUrl",
                    l.slug,
                    COUNT(f.id)::int as followers
                FROM "Loja" l
                LEFT JOIN "Follows" f ON f."storeId" = l.id
                WHERE unaccent(l.nome) ILIKE unaccent(${searchPattern})
                GROUP BY l.id, l.nome, l."profileImageUrl", l.slug
                ORDER BY followers DESC
                LIMIT 5
            `,
            // Products query with field aliases and status filter
            db.$queryRaw<Array<{
                id: string;
                nome: string;
                imagemUrl: string;
                preco: number;
                porcentagemDesconto: number;
                categoriaNome: string;
            }>>`
                SELECT 
                    p.id,
                    p.nome,
                    p."imagemUrl",
                    p.preco,
                    p."porcentagemDesconto",
                    c.nome as "categoriaNome"
                FROM "Produto" p
                INNER JOIN "Categoria" c ON p."categoriaId" = c.id
                WHERE p.status = 'ATIVO'
                  AND (
                    unaccent(p.nome) ILIKE unaccent(${searchPattern})
                    OR unaccent(p.descricao) ILIKE unaccent(${searchPattern})
                  )
                LIMIT 5
            `,
            // Categories query with field aliases
            db.$queryRaw<CategoryResult[]>`
                SELECT 
                    id,
                    nome
                FROM "Categoria"
                WHERE unaccent(nome) ILIKE unaccent(${searchPattern})
                LIMIT 5
            `,
        ]);

        // Transform products to match frontend structure
        const products = productsRaw.map((p) => ({
            id: p.id,
            nome: p.nome,
            imagemUrl: p.imagemUrl,
            preco: p.preco,
            porcentagemDesconto: p.porcentagemDesconto,
            categoria: {
                nome: p.categoriaNome,
            },
        }));

        return NextResponse.json(
            {
                stores: storesRaw,
                products,
                categories: categoriesRaw
            },
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
                },
            }
        );
    } catch (error) {
        console.error("Search API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
