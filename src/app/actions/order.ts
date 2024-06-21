"use server";

import { db } from "@/lib/prisma";
import { Prisma } from "prisma/generated/client";

export const CreateOrder = async (data: Prisma.OrderCreateInput) => {
  const order = await db.order.create({ data });
};
