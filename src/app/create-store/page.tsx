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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStoreSchema } from "../api/create-store-api/route";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Icon from "@/components/icons/icon-component";
import { motion } from "framer-motion";
import Container from "@/components/container";
import Link from "next/link";
import LoginDialog from "@/components/login-dialog";
import { useAuth } from "@/hooks/useAuth";
import MotoLogLogo from "@/components/icons/moto-log-logo";
import StoreCreatedDialog from "./components/store-created-dialog";
import { createStoreData } from "../api/create-store-api/route";
import TextAreaWithCounter from "@/components/text-area-with-counter";
import { ImageUpload } from "./components/image-upload";

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
  const toggleOpen = () => setOpenDialog(!openDialog);
  const { isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<createStoreData>({
    resolver: zodResolver(createStoreSchema),
    mode: "onChange",
  });

  const descriptionValue = watch("description") || "";
  const profileImage = watch("profileImage");
  const bannerImage = watch("bannerImage");

  useEffect(() => {
    if (profileImage) {
      clearErrors("profileImage");
    }
  }, [profileImage, clearErrors]);

  useEffect(() => {
    if (bannerImage) {
      clearErrors("bannerImage");
    }
  }, [bannerImage, clearErrors]);

  const onSubmit = async (data: createStoreData) => {
    try {
      setIsSubmitLoading(true);

      const formData = new FormData();
      formData.append("name", data.name);
      if (data.description) {
        formData.append("description", data.description);
      }
      if (data.profileImage) {
        formData.append("profileImage", data.profileImage);
      }
      if (data.bannerImage) {
        formData.append("bannerImage", data.bannerImage);
      }

      const response = await fetch("/api/create-store-api", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsSubmitOk(true);
        setIsConfirmDialogOpen(true);
      } else {
        const errorData = await response.json();
        console.error("Erro ao criar loja:", errorData);
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleSetError = (
    field: "profileImage" | "bannerImage",
    message: string
  ) => {
    if (message) {
      setError(field, {
        type: "manual",
        message: message,
      });
    } else {
      clearErrors(field);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Container className="h-screen w-full flex items-center justify-center flex-col space-y-10">
          <h1 className="text-xl text-center">
            Você precisa estar logado para criar uma loja!
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
  }

  return (
    <Container className="w-full flex items-center justify-center flex-col space-y-6 pt-20">
      <motion.div {...animation1}>
        <MotoLogLogo disabled={true} />
      </motion.div>

      <motion.div {...animation2}>
        <Card className="w-full sm:w-[30rem] bg-card/75 opacity-90 border-none shadow-lg">
          <CardHeader className="px-6 pt-4 space-y-2 mt-4 mb-5">
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
                    <p className="text-destructive text-xs">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Descrição */}
                <div className="grid gap-3">
                  <TextAreaWithCounter
                    className="w-full min-h-24 rounded-2xl"
                    label="Descrição"
                    value={descriptionValue}
                    maxLength={1000}
                    onChange={(e) => {
                      setValue("description", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    optional={true}
                    placeholder="Descrição da loja"
                    errorMessage={errors.description?.message}
                  />
                </div>

                {/* Imagem de perfil */}
                <div className="grid gap-3">
                  <ImageUpload
                    optional={true}
                    maxSize={5 * 1024 * 1024}
                    label="Imagem de perfil"
                    imageType="profile"
                    value={profileImage}
                    onChange={(file) => {
                      setValue("profileImage", file, { shouldValidate: true });
                      if (!file) {
                        clearErrors("profileImage");
                      }
                    }}
                    onError={(errorMessage) =>
                      handleSetError("profileImage", errorMessage)
                    }
                    error={errors.profileImage?.message?.toString()}
                    previewClassName="!h-32 !w-32 rounded-full text-center"
                    className="flex flex-col items-center justify-center"
                  />
                </div>

                {/* Imagem de capa */}
                <div className="grid gap-3">
                  <ImageUpload
                    optional={true}
                    maxSize={10 * 1024 * 1024}
                    imageType="banner"
                    label="Imagem de capa"
                    value={bannerImage}
                    onChange={(file) => {
                      setValue("bannerImage", file, { shouldValidate: true });
                      if (!file) {
                        clearErrors("bannerImage");
                      }
                    }}
                    onError={(errorMessage) =>
                      handleSetError("bannerImage", errorMessage)
                    }
                    error={errors.bannerImage?.message?.toString()}
                  />
                </div>
                <div className="w-full flex justify-end">
                  {isSubmitOk === true ? (
                    <Button
                      size={"rounded"}
                      type="submit"
                      className={`mt-6 bg-confirmed`}
                    >
                      <Icon.confirmed size={20} />
                    </Button>
                  ) : (
                    <Button size={"rounded"} type="submit" className={`mt-6`}>
                      {isSubmitLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <p className="font-semibold">Criar Loja</p>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <StoreCreatedDialog
        isConfirmDialogOpen={isConfirmDialogOpen}
        isSubmitLoading={isSubmitLoading}
        setIsConfirmDialogOpen={setIsConfirmDialogOpen}
      />
    </Container>
  );
}
