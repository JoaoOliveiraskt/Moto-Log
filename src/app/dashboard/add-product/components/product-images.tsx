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
    <div className="grid gap-2 min-h-96 pl-1 pr-6">
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
  );
}
