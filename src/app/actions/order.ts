'use server';

import { Prisma } from "../../../prisma/generated/client";
import { db } from "@/lib/prisma";

export const CreateOrder = async (data: Prisma.OrderCreateInput) => {
    return db.order.create({data});
};