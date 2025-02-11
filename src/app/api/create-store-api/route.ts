import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { z, ZodError } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudnary";
import { createSlug } from "@/utils/create-slug";

export const createStoreSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter no mínimo 2 caracteres" })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres" }),
  description: z
    .string()
    .min(10, { message: "O mínimo de caracteres permitido é 10" })
    .max(1000, { message: "O máximo de caracteres permitido é 1000" })
    .nullable()
    .optional(),
  profileImage: z
    .any()
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "A imagem deve ter no máximo 5MB",
    })
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "Formato de imagem inválido. Use JPEG, PNG ou WebP" }
    ),
  bannerImage: z
    .any()
    .optional()
    .refine((file) => !file || file.size <= 10 * 1024 * 1024, {
      message: "A imagem deve ter no máximo 10MB",
    })
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "Formato de imagem inválido. Use JPEG, PNG ou WebP" }
    ),
});

export type createStoreData = z.infer<typeof createStoreSchema>;

const handleErrorResponse = (error: unknown) => {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "Validation failed", issues: error.errors },
      { status: 400 }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { error: "Error creating store", details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ error: "Unknown error" }, { status: 500 });
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const formData = await request.formData();

  try {
    const data = createStoreSchema.parse({
      name: formData.get("name") as string,
      description: formData.get("description"),
      profileImage: formData.get("profileImage"),
      bannerImage: formData.get("bannerImage"),
    });

    let profileImageUrl, bannerImageUrl;

    if (data.profileImage) {
      const result = await uploadImage(data.profileImage, "profile");
      profileImageUrl = result.url;
    }

    if (data.bannerImage) {
      const result = await uploadImage(data.bannerImage, "banner");
      bannerImageUrl = result.url;
    }

    const slug = createSlug(data.name);

    const store = await db.loja.create({
      data: {
        nome: data.name,
        descricao: data.description,
        profileImageUrl,
        bannerImageUrl,
        email: session.user.email,
        slug,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    await db.user.update({
      where: { id: userId },
      data: { role: "LOJISTA" },
    });

    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    return handleErrorResponse(error);
  }
}
