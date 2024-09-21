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
import Image from "next/image";

export default function EditStore() {
  return (
    <main className="w-full flex flex-col space-y-10 mt-4">
      <Card x-chunk="dashboard-07-chunk-0" className="">
        <CardHeader className="px-6 mt-6 space-y-2 mb-5">
          <CardTitle className="text-3xl ">Atualize sua loja</CardTitle>
          <CardDescription>
            Atualize o nome da sua loja e a descrição, ou exclua
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                className="max-w-xl"
                defaultValue={"Nome da loja"}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                defaultValue={"Descrição da loja"}
                className="min-h-32 max-w-xl"
              />
            </div>
          </div>

          <div className="grid gap-3 relative h-fit">
            <p>Imagem de banner</p>
            <Label
              htmlFor="storeImage"
              className="flex items-center justify-center max-w-xl h-20 border border-dashed rounded-md cursor-pointer"
            >
              <span className="sr-only">Adicionar imagem de banner</span>
              <Input
                id="storeImage"
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <Image
                alt="Preview"
                width={200}
                height={100}
                className="w-full h-full object-cover rounded-md"
                src={""}
              />

              <div className="flex items-center justify-center w-full h-full">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
            </Label>
          </div>
          <Button className="mt-6">Atualizar</Button>
        </CardContent>
      </Card>
    </main>
  );
}
