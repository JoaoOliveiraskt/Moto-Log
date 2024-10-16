
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma"; // Certifique-se de que este caminho está correto
import { OrderStatus } from "prisma/generated/client"; // Altere conforme seu caminho de importação

export async function POST(request: Request) {
  try {
    // Parse o corpo da requisição
    const body = await request.json();

    const { subTotalPrice, totalDiscount, totalPrice, loja, userId, products } = body;

    // Crie um novo pedido no banco de dados
    const order = await db.order.create({
      data: {
        subTotalPrice,
        totalDiscount,
        totalPrice,
        deliveryFee: loja.deliveryFee,
        deliveryTime: loja.deliveryTime,
        loja: {
          connect: { id: loja.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: userId },
        },
        products: {
          createMany: {
            data: products.map((product: { id: string; quantity: number }) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      },
    });

    // Atualizar o total vendido para cada produto em uma transação
    await db.$transaction(
      products.map((product: { id: string; quantity: number }) =>
        db.produto.update({
          where: { id: product.id },
          data: {
            totalVendido: {
              increment: product.quantity,
            },
          },
        })
      )
    );

    // Retorne o pedido criado
    return NextResponse.json({ message: "Pedido finalizado com sucesso", order }, { status: 201 });
  } catch (error) {
    console.error("Erro ao finalizar o pedido:", error); // Log do erro
    return NextResponse.json(
      { error: "Erro ao finalizar o pedido" },
      { status: 500 }
    );
  }
}
