"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createStoreSchema from "@/schemas/storeSchema";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserStatus = () => {
  const { status } = useSession();
  return status;
};

export default function CreateStore() {
  const [output, setOutput] = useState("");
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const status = UserStatus();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createStoreSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description || "");

    console.log(data);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (status !== "authenticated") {
    router.push("/login");
    return null;
  } else {
    return (
      <main className="h-screen w-full flex items-center justify-center flex-col space-y-10">
        <div>
          <h1 className="text-3xl font-semibold text-center mb-2">
            Crie sua loja
          </h1>
          <p className="text-center text-muted-foreground">
            Comece a vender seus produtos agora mesmo
          </p>
        </div>

        <Card x-chunk="dashboard-07-chunk-0" className="max-w-lg md:w-96">
          <CardHeader className="px-6 mt-6 space-y-2 mb-5">
            <CardTitle>Informações da Loja</CardTitle>
            <CardDescription>
              Adicione informações sobre a sua loja
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    type="text"
                    className="w-full"
                    placeholder="Nome da loja"
                    {...register("name")}
                  />
                 {errors.name && (
                  <p className="text-red-500">{(errors.name as { message: string }).message}</p>
                )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="description">
                    Descrição{" "}
                    <span className="text-muted-foreground"> (opcional)</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Descrição da loja por exemplo: 'somos uma loja de roupas que preza pela qualidade e conforto'"
                    className="min-h-32"
                    {...register("description")}
                  />
                </div>

                <div className="grid gap-3 relative h-fit">
                  <p>Imagem de banner</p>
                  <Label
                    htmlFor="storeImage"
                    className="flex items-center justify-center w-full h-20 border border-dashed rounded-md cursor-pointer"
                  >
                    <span className="sr-only">Adicionar imagem de banner</span>
                    <Input
                      id="storeImage"
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      {...register("storeImage")}
                      onChange={handleImageChange}
                    />
                    {selectedImage ? (
                      <Image
                        src={selectedImage as string}
                        alt="Preview"
                        width={200}
                        height={100}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </Label>
                  {errors.storeImage && (
                  <p className="text-red-500">{(errors.storeImage as { message: string }).message}</p>
                )}
                </div>
              </div>

              <Button type="submit" className="mt-6 w-full">
                Criar Loja
              </Button>
            </form>
          </CardContent>
          <pre className="mt-6 text-sm text-foreground">{output}</pre>
        </Card>
      </main>
    );
  }
}
