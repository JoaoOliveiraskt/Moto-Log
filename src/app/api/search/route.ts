import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { z } from "zod";

const searchSchema = z.object({
    q: z.string().min(1, "Query cannot be empty").max(100, "Query too long"),
    page: z.number().int().min(1).default(1),
    pageSize: z.number().int().min(1).max(50).default(20),
    type: z.enum(["stores", "products", "categories"]).optional(),
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
    preco: number;
    porcentagemDesconto: number;
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
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const type = searchParams.get("type") as "stores" | "products" | "categories" | null;

    const validation = searchSchema.safeParse({
        q: query,
        page,
        pageSize,
        type: type || undefined,
    });

    if (!validation.success) {
        return NextResponse.json({
            stores: [],
            products: [],
            categories: [],
            pagination: { page: 1, pageSize: 20, hasMore: false, total: 0 }
        });
    }

    const { q: safeQuery, page: safePage, pageSize: safePageSize, type: safeType } = validation.data;
    const skip = (safePage - 1) * safePageSize;

    try {
        // Use unaccent for accent-insensitive search
        const searchPattern = `%${safeQuery}%`;

        // If type is specified, only fetch that type with pagination
        // NOTE: Sorting is done client-side to prevent SQL injection
        if (safeType === "products") {
            const [productsRaw, totalCount] = await Promise.all([
                db.$queryRawUnsafe<Array<{
                    id: string;
                    nome: string;
                    imagemUrl: string;
                    preco: number;
                    porcentagemDesconto: number;
                    totalVendido: number;
                    categoriaNome: string;
                    lojaId: string;
                    lojaNome: string;
                    lojaImagem: string | null;
                }>>(
                    `SELECT 
                        p.id,
                        p.nome,
                        p."imagemUrl",
                        p.preco,
                        p."porcentagemDesconto",
                        p."totalVendido",
                        c.nome as "categoriaNome",
                        l.id as "lojaId",
                        l.nome as "lojaNome",
                        l."profileImageUrl" as "lojaImagem"
                    FROM "Produto" p
                    INNER JOIN "Categoria" c ON p."categoriaId" = c.id
                    INNER JOIN "Loja" l ON p."lojaId" = l.id
                    WHERE p.status = 'ATIVO'
                      AND (
                        unaccent(p.nome) ILIKE unaccent($1)
                        OR unaccent(p.descricao) ILIKE unaccent($1)
                      )
                    ORDER BY p.id DESC
                    LIMIT $2
                    OFFSET $3`,
                    searchPattern,
                    safePageSize,
                    skip
                ),
                db.$queryRaw<[{ count: bigint }]>`
                    SELECT COUNT(*)::int as count
                    FROM "Produto" p
                    WHERE p.status = 'ATIVO'
                      AND (
                        unaccent(p.nome) ILIKE unaccent(${searchPattern})
                        OR unaccent(p.descricao) ILIKE unaccent(${searchPattern})
                      )
                `
            ]);

            const total = Number(totalCount[0].count);
            const products = productsRaw.map((p) => ({
                id: p.id,
                nome: p.nome,
                imagemUrl: p.imagemUrl,
                preco: p.preco,
                porcentagemDesconto: p.porcentagemDesconto,
                totalVendido: p.totalVendido,
                categoria: {
                    nome: p.categoriaNome,
                },
                loja: {
                    id: p.lojaId,
                    nome: p.lojaNome,
                    profileImageUrl: p.lojaImagem,
                }
            }));

            return NextResponse.json({
                stores: [],
                products,
                categories: [],
                pagination: {
                    page: safePage,
                    pageSize: safePageSize,
                    total,
                    hasMore: skip + products.length < total,
                }
            });
        }

        if (safeType === "stores") {
            const [storesRaw, totalCount] = await Promise.all([
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
                    LIMIT ${safePageSize}
                    OFFSET ${skip}
                `,
                db.$queryRaw<[{ count: bigint }]>`
                    SELECT COUNT(*)::int as count
                    FROM "Loja" l
                    WHERE unaccent(l.nome) ILIKE unaccent(${searchPattern})
                `
            ]);

            const total = Number(totalCount[0].count);

            return NextResponse.json({
                stores: storesRaw,
                products: [],
                categories: [],
                pagination: {
                    page: safePage,
                    pageSize: safePageSize,
                    total,
                    hasMore: skip + storesRaw.length < total,
                }
            });
        }

        if (safeType === "categories") {
            const [categoriesRaw, totalCount] = await Promise.all([
                db.$queryRaw<CategoryResult[]>`
                    SELECT 
                        id,
                        nome
                    FROM "Categoria"
                    WHERE unaccent(nome) ILIKE unaccent(${searchPattern})
                    LIMIT ${safePageSize}
                    OFFSET ${skip}
                `,
                db.$queryRaw<[{ count: bigint }]>`
                    SELECT COUNT(*)::int as count
                    FROM "Categoria"
                    WHERE unaccent(nome) ILIKE unaccent(${searchPattern})
                `
            ]);

            const total = Number(totalCount[0].count);

            return NextResponse.json({
                stores: [],
                products: [],
                categories: categoriesRaw,
                pagination: {
                    page: safePage,
                    pageSize: safePageSize,
                    total,
                    hasMore: skip + categoriesRaw.length < total,
                }
            });
        }

        // Default: Return limited results for "Tudo" view (no pagination)
        const [storesRaw, productsRaw, categoriesRaw] = await Promise.all([
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
            db.$queryRaw<Array<{
                id: string;
                nome: string;
                imagemUrl: string;
                preco: number;
                porcentagemDesconto: number;
                totalVendido: number;
                categoriaNome: string;
                lojaId: string;
                lojaNome: string;
                lojaImagem: string | null;
            }>>`
                SELECT 
                    p.id,
                    p.nome,
                    p."imagemUrl",
                    p.preco,
                    p."porcentagemDesconto",
                    p."totalVendido",
                    c.nome as "categoriaNome",
                    l.id as "lojaId",
                    l.nome as "lojaNome",
                    l."profileImageUrl" as "lojaImagem"
                FROM "Produto" p
                INNER JOIN "Categoria" c ON p."categoriaId" = c.id
                INNER JOIN "Loja" l ON p."lojaId" = l.id
                WHERE p.status = 'ATIVO'
                  AND (
                    unaccent(p.nome) ILIKE unaccent(${searchPattern})
                    OR unaccent(p.descricao) ILIKE unaccent(${searchPattern})
                  )
                LIMIT 5
            `,
            db.$queryRaw<CategoryResult[]>`
                SELECT 
                    id,
                    nome
                FROM "Categoria"
                WHERE unaccent(nome) ILIKE unaccent(${searchPattern})
                LIMIT 5
            `,
        ]);

        const products = productsRaw.map((p) => ({
            id: p.id,
            nome: p.nome,
            imagemUrl: p.imagemUrl,
            preco: p.preco,
            porcentagemDesconto: p.porcentagemDesconto,
            totalVendido: p.totalVendido,
            categoria: {
                nome: p.categoriaNome,
            },
            loja: {
                id: p.lojaId,
                nome: p.lojaNome,
                profileImageUrl: p.lojaImagem,
            }
        }));

        return NextResponse.json(
            {
                stores: storesRaw,
                products,
                categories: categoriesRaw,
                pagination: {
                    page: 1,
                    pageSize: 5,
                    total: 5,
                    hasMore: false,
                }
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
