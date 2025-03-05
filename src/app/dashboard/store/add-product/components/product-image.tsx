// components/ProductImage.tsx

import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { UseFormRegister } from "react-hook-form";

interface ProductImageProps {
  imagePreview: string | null;
  setImagePreview: (value: string) => void;
  dadosIniciais: {
    imagemUrl: string;
  };
  register: UseFormRegister<any>;
}

const ProductImage: React.FC<ProductImageProps> = ({
  imagePreview,
  setImagePreview,
  dadosIniciais,
  register,
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-6 mt-6 space-y-2 mb-5">
        <CardTitle>Imagem do Produto</CardTitle>
        <CardDescription>Atualize a imagem do produto</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          id="imagemUrl"
          type="text"
          placeholder="URL da imagem"
          {...register("imagemUrl", { required: true })}
          onChange={(e) => setImagePreview(e.target.value)}
        />
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Pré-visualização da nova imagem:
            </p>
            <Image
              src={imagePreview}
              alt="Pré-visualização da imagem do produto"
              className="w-40 h-32 object-cover rounded-md"
              width={400}
              height={400}
            />
          </div>
        )}
        {!imagePreview && dadosIniciais.imagemUrl && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Imagem atual:</p>
            <Image
              src={dadosIniciais.imagemUrl}
              alt="Imagem atual do produto"
              className="w-full h-32 object-cover rounded-md"
              width={400}
              height={400}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductImage;
