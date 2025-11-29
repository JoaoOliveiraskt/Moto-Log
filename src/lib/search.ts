import { cache } from "react";
import { db } from "@/lib/prisma";
import { Produto, Loja, Categoria } from "../../prisma/generated/client";

export interface SearchResults {
    products: (Produto & { loja: Loja; categoria: Categoria })[];
    stores: (Loja & { _count: { followers: number } })[];
    categories: Categoria[];
}

export const searchGlobal = cache(async (query: string): Promise<SearchResults> => {
    if (!query) {
        return { products: [], stores: [], categories: [] };
    }

    const searchPattern = `%${query}%`;

    // The API route uses db.$queryRaw with `unaccent`.
    // To match perfectly, we use db.$queryRaw for fetching IDs first with unaccent logic,
    // and then fetch the full objects with Prisma Client.

    const [productIds, storeIds, categoryIds] = await Promise.all([
        db.$queryRaw<{ id: string }[]>`
            SELECT p.id FROM "Produto" p
            WHERE p.status = 'ATIVO'
            AND (
                unaccent(p.nome) ILIKE unaccent(${searchPattern})
                OR unaccent(p.descricao) ILIKE unaccent(${searchPattern})
            )
            LIMIT 50;
        `.then((res) => res.map((r) => r.id)),

        db.$queryRaw<{ id: string }[]>`
            SELECT l.id FROM "Loja" l
            WHERE unaccent(l.nome) ILIKE unaccent(${searchPattern})
            LIMIT 20;
        `.then((res) => res.map((r) => r.id)),

        db.$queryRaw<{ id: string }[]>`
            SELECT c.id FROM "Categoria" c
            WHERE unaccent(c.nome) ILIKE unaccent(${searchPattern})
            LIMIT 20;
        `.then((res) => res.map((r) => r.id)),
    ]);

    const [productsData, storesData, categoriesData] = await Promise.all([
        db.produto.findMany({
            where: { id: { in: productIds } },
            include: { loja: true, categoria: true },
        }),
        db.loja.findMany({
            where: { id: { in: storeIds } },
            include: { _count: { select: { followers: true } } },
        }),
        db.categoria.findMany({
            where: { id: { in: categoryIds } },
        }),
    ]);

    // Restore order based on the raw query result order
    const productsMap = new Map(productsData.map((p) => [p.id, p]));
    const orderedProducts = productIds
        .map((id) => productsMap.get(id))
        .filter((p): p is NonNullable<typeof p> => !!p);

    const storesMap = new Map(storesData.map((s) => [s.id, s]));
    const orderedStores = storeIds
        .map((id) => storesMap.get(id))
        .filter((s): s is NonNullable<typeof s> => !!s);

    const categoriesMap = new Map(categoriesData.map((c) => [c.id, c]));
    const orderedCategories = categoryIds
        .map((id) => categoriesMap.get(id))
        .filter((c): c is NonNullable<typeof c> => !!c);

    return {
        products: orderedProducts,
        stores: orderedStores,
        categories: orderedCategories,
    };
});
