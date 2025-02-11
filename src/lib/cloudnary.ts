"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export type UploadResult = {
  url: string;
  publicId: string;
};

export type ImageType = "profile" | "banner";

const TRANSFORM_OPTIONS = {
  profile: {
    width: 400,
    height: 400,
    crop: "fill",
    gravity: "face",
    quality: "auto",
    format: "webp",
  },
  banner: {
    width: 1200,
    height: 400,
    crop: "fill",
    quality: "auto",
    format: "webp",
  },
};

export async function uploadImage(
  file: File,
  type: ImageType,
  oldPublicId?: string
): Promise<UploadResult> {
  try {
    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId);
    }

    const base64Data = await fileToBase64(file);

    const result = await cloudinary.uploader.upload(base64Data, {
      folder: `stores/${type}`,
      transformation: TRANSFORM_OPTIONS[type],
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}

async function fileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}
