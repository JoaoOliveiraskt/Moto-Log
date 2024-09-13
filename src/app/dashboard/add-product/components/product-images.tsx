import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload } from "lucide-react";
import Image from "next/image";

export default function ProductImages() {
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
      <CardHeader className="px-6 mt-6 space-y-2 mb-5">
        <CardTitle>Imagens do Produto</CardTitle>
        <CardDescription>
          Adicione imagens do produto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt="Imagem do produto"
            className="aspect-square w-full rounded-md object-cover border"
            height="300"
            src="/placeholder.svg"
            width="300"
          />
          <div className="grid grid-cols-3 gap-2">
            <button>
              <Image
                alt="Imagem do produto"
                className="aspect-square w-full rounded-md object-cover border"
                height="84"
                src="/placeholder.svg"
                width="84"
              />
            </button>
            <button>
              <Image
                alt="Imagem do produto"
                className="aspect-square w-full rounded-md object-cover border"
                height="84"
                src="/placeholder.svg"
                width="84"
              />
            </button>
            <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Adicionar</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
