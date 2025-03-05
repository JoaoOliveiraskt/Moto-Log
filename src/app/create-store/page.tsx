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
import StoreCreatedDialog from "./components/store-created-dialog";
import { createStoreData } from "../api/create-store-api/route";
import TextAreaWithCounter from "@/components/text-area-with-counter";
import { ImageUpload } from "./components/image-upload";
import EmptyState from "@/components/empty-state";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const animation1 = {
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
        <EmptyState title="Faça login para criar sua loja">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2 w-full">
            <Button
              size={"xl"}
              onClick={toggleOpen}
              className="w-full lg:w-fit"
            >
              Fazer login
            </Button>
            <Button
              asChild
              variant={"outline"}
              size={"xl"}
              className="w-full lg:w-fit"
            >
              <Link href={"/"}>Cancelar</Link>
            </Button>
          </div>
        </EmptyState>

        <LoginDialog open={openDialog} onOpenChange={setOpenDialog} />
      </>
    );
  }

  return (
    <Container className="w-full space-y-6 pt-8 lg:pt-16 px-0 lg:flex lg:justify-center">
      <motion.div {...animation1}>
        <Card className="w-full sm:w-[32rem] bg-transparent border-none pt-4 lg:pt-0">
          <CardHeader className="pt-4 space-y-2 mb-5">
            <CardTitle className="text-2xl">Crie sua loja</CardTitle>
            <CardDescription>
              Comece a vender seus produtos agora mesmo
            </CardDescription>
          </CardHeader>
          <CardContent className="!p-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                {/* Nome da loja */}
                <div className="grid gap-3">
                  <Label htmlFor="name">Nome da loja</Label>
                  <Input
                    id="name"
                    type="text"
                    className={cn(
                      "w-full",
                      errors.name && "border-destructive"
                    )}
                    placeholder="Nome da loja"
                    required={true}
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
                    label="Descrição"
                    optional={true}
                    className={cn(
                      "w-full min-h-24 rounded-2xl",
                      errors.description && "border-destructive"
                    )}
                    value={descriptionValue}
                    maxLength={1000}
                    onChange={(e) => {
                      setValue("description", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
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
                <div className="w-full flex">
                  {isSubmitOk === true ? (
                    <Button
                      size={"xl"}
                      type="submit"
                      className={`bg-confirmed h-12 w-full`}
                    >
                      <Icon.confirmed size={20} />
                    </Button>
                  ) : (
                    <Button size={"xl"} type="submit" className="h-12 w-full">
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
