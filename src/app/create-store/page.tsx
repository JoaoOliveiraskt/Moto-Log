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
import Container from "@/components/container";
import Link from "next/link";
import LoginDialog from "@/components/login-dialog";
import { useAuth } from "@/hooks/useAuth";
import MotoLogLogo from "@/components/icons/moto-log-logo";

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
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const toggleOpen = () => setOpenDialog(!openDialog);
  const { isAuthenticated } = useAuth();

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

  if (!isAuthenticated) {
    return (
      <>
        <Container className="h-screen w-full flex items-center justify-center flex-col space-y-10 md:-mt-36">
          <h1 className="text-xl text-center">
            Você precisa estar logado para criar uma loja
          </h1>
          <div className="flex items-center gap-5">
            <Button asChild variant={"outline"} size={"rounded"}>
              <Link href={"/"}>Cancelar</Link>
            </Button>
            <Button size={"rounded"} onClick={toggleOpen}>
              Fazer login
            </Button>
          </div>
        </Container>

        <LoginDialog open={openDialog} onOpenChange={setOpenDialog} />
      </>
    );
  } else {
    return (
      <Container className="h-screen w-full flex items-center flex-col space-y-6 mt-[72px] md:mt-36">
        <motion.div {...animation1}>
          <MotoLogLogo disabled={true}/>
        </motion.div>

        <motion.div {...animation2}>
          <Card className="w-full sm:w-[30rem] bg-card/75 opacity-90 ">
            <CardHeader className="px-6 space-y-2 mt-4 mb-5">
              <CardTitle className="text-2xl">Crie sua loja</CardTitle>
              <CardDescription>
                Comece a vender seus produtos agora mesmo
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
                      className="min-h-24"
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
                </div>

                <div className="w-full">
                  {isSubmitOk === true ? (
                    <Button
                      size={"rounded"}
                      type="submit"
                      className={`mt-6 bg-confirmed w-full `}
                    >
                      <Icon.confirmed />
                    </Button>
                  ) : (
                    <Button
                      size={"rounded"}
                      type="submit"
                      className={`mt-6 w-full `}
                    >
                      {isSubmitLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                      ) : (
                        <p className="font-semibold">Criar Loja</p>
                      )}
                    </Button>
                  )}
                </div>
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
      </Container>
    );
  }
}
