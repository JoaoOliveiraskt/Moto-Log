import Link from "next/link";

import Image from "next/image";

interface Props {
  product: {
    lojaId: string;
    loja: {
      imagemUrl: string;
      nome: string;
    };
  };
}

export default function StoreBadge({ product }: Props) {
  return (
    <div className="w-fit mt-2">
      <Link
        href={`/store/${product.lojaId}`}
        className="text-foreground font-medium  hover:text-cyan-600 flex items-center gap-2"
      >
        <div className="w-9 h-9 rounded-full border overflow-hidden flex-shrink-0">
          {product.loja.imagemUrl ? (
            <Image
              src={product.loja.imagemUrl}
              width={500}
              height={500}
              alt="logo da loja"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-green-500"></div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h5 className="text-sm ">{product.loja.nome}</h5>
        </div>
      </Link>
    </div>
  );
}
