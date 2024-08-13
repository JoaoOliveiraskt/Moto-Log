import Image from "next/image";
import React from "react";

interface ProductBannerProps {
  images: string[];
  produto: {
    id: string;
    imagemUrl: string;
    nome: string;
  };
  className?: string;
}

const ProductBanner: React.FC<ProductBannerProps> = ({
  images,
  produto,
  className,
}) => {
  return (
    <div
      className={`flex flex-col-reverse gap-6 h-fit w-full rounded-xl ${className}`}
    >
      <div className="w-full h-fit overflow-hidden">
        <div className="relative w-auto h-[400px] md:h-[500px] overflow-hidden">
          <Image
            src={produto.imagemUrl}
            alt={produto.nome}
            width={600}
            height={400}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
