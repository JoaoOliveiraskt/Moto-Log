import { PrismaClient } from '../../prisma/generated/client';

const prisma = new PrismaClient();

const FetchProductById = async (productId) => {
    try {
        const product = await prisma.produto.findUnique({
            where: {
                id: parseInt(productId)
            },
            include: {
                loja: true
            }
        });
        return product;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
};

// Exporte a função FetchProductById
export default FetchProductById;
