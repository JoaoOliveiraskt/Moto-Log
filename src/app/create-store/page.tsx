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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStoreSchema } from "../api/create-store-api/route";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Icon from "@/components/icons/icon-component";
import { motion } from "framer-motion";
import Pattern from "@/components/pattern";

const UserStatus = () => {
  const { status } = useSession();
  return status;
};

const animation1 = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { type: "spring", stiffness: 50, duration: 0.9 },
};

const animation2 = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { type: "spring", stiffness: 50, duration: 0.9, delay: 0.4 },
};

export default function CreateStore() {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isSubmitOk, setIsSubmitOk] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const status = UserStatus();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createStoreSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    setIsSubmitLoading(true);
    const response = await fetch("/api/create-store-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setIsSubmitLoading(false);
      setIsSubmitOk(true);
      setIsConfirmDialogOpen(true);
    } else {
      setIsSubmitLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = ("" + value).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  if (status !== "authenticated") {
    return (
      <>
        <main className="h-screen w-full flex items-center justify-center flex-col space-y-10 mt-[72px]">
          <h1>Você precisa estar logado para criar uma loja</h1>
          <Button onClick={() => router.push("/login")}>Fazer login</Button>
        </main>
      </>
    );
  } else {
    return (
      <main className="h-screen w-full flex items-center justify-center flex-col space-y-6 mt-[72px] lg:mt-10">
        <Pattern enableAnimation={false} />

        <motion.div {...animation1}>
          <h1 className="text-3xl font-semibold text-center mb-2">
            Crie sua loja
          </h1>
          <p className="text-center text-muted-foreground">
            Comece a vender seus produtos agora mesmo
          </p>
        </motion.div>

        <motion.div {...animation2}>
          <Card className="w-full md:w-[30rem] bg-card/50 opacity-90">
            <CardHeader className="px-6 space-y-2 mt-4 mb-5">
              <CardTitle>Informações da Loja</CardTitle>
              <CardDescription>
                Adicione informações sobre a sua loja
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  {/* Nome da loja */}
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
                      <p className="text-red-500">
                        {(errors.name as { message: string }).message}
                      </p>
                    )}
                  </div>

                  {/* Descrição */}
                  <div className="grid gap-3">
                    <Label htmlFor="description">
                      Descrição{" "}
                      <span className="text-muted-foreground"> (opcional)</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Descrição da loja"
                      className="min-h-32"
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className="text-red-500">
                        {(errors.description as { message: string }).message}
                      </p>
                    )}
                  </div>

                  {/* URL da imagem */}
                  <div className="grid gap-3">
                    <Label htmlFor="imageUrl">URL da Imagem</Label>
                    <Input
                      id="imageUrl"
                      type="text"
                      className="w-full"
                      placeholder="URL da imagem"
                      {...register("imageUrl")}
                    />
                    {errors.imageUrl && (
                      <p className="text-red-500">
                        {(errors.imageUrl as { message: string }).message}
                      </p>
                    )}
                  </div>

                  {/* Telefone */}
                  <div className="grid gap-3">
                    <Label htmlFor="phone">
                      Telefone{" "}
                      <span className="text-muted-foreground"> (opcional)</span>
                    </Label>
                    <Input
                      id="phone"
                      type="text"
                      className="w-full"
                      placeholder="Ex: (xx) xxxx-xxxx"
                      {...register("phone", {
                        onChange: (e) => {
                          const formattedValue = formatPhoneNumber(
                            e.target.value
                          );
                          setValue("phone", formattedValue);
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className="text-red-500">
                        {(errors.phone as { message: string }).message}
                      </p>
                    )}
                  </div>

                  {/* Endereço */}
                  <div className="grid gap-3">
                    <Label htmlFor="address">
                      Endereço{" "}
                      <span className="text-muted-foreground"> (opcional)</span>
                    </Label>
                    <Input
                      id="address"
                      type="text"
                      className="w-full"
                      placeholder="Ex: Rua Principal 123, Cidade Exemplo, EUA"
                      {...register("address")}
                    />
                    {errors.address && (
                      <p className="text-red-500">
                        {(errors.address as { message: string }).message}
                      </p>
                    )}
                  </div>

                  {/* Horário de Funcionamento */}
                  <div className="grid gap-3">
                    <Label htmlFor="workingHours">
                      Horário de Funcionamento{" "}
                      <span className="text-muted-foreground"> (opcional)</span>
                    </Label>
                    <Input
                      id="workingHours"
                      type="text"
                      className="w-full"
                      placeholder="Ex: Seg-Sáb: 10h - 20h, Dom: 12h - 18h"
                      {...register("workingHours")}
                    />
                    {errors.workingHours && (
                      <p className="text-red-500">
                        {(errors.workingHours as { message: string }).message}
                      </p>
                    )}
                  </div>
                </div>

                {isSubmitOk === true ? (
                  <Button type="submit" className={`mt-6 w-full bg-green-600`}>
                    <Icon.confirmed />
                  </Button>
                ) : (
                  <Button type="submit" className={`mt-6 w-full`}>
                    {isSubmitLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <p>Criar Loja</p>
                    )}
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <AlertDialog
          open={isConfirmDialogOpen}
          onOpenChange={setIsConfirmDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Loja criada com sucesso! 🎉</AlertDialogTitle>
              <AlertDialogDescription className="font-medium">
                Você pode começar a adicionar produtos agora mesmo.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => router.push("/")}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => router.push("/dashboard/products")}
                disabled={isSubmitLoading}
              >
                Ir para a loja
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    );
  }
}
