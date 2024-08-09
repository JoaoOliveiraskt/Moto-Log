import Image from "next/image";
import React from "react";

interface ProductBannerProps {
  images: string[];
  produto: {
    id: string;
    imagemUrl: string;
    nome: string;
  };
}

const ProductBanner: React.FC<ProductBannerProps> = ({ images, produto }) => {
  return (
    <div className="flex flex-col-reverse gap-6 h-fit w-full">
      <div className="flex justify-between gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-20 sm:h-32 overflow-hidden rounded-md hover:shadow-md"
          >
            <Image
              src={image}
              alt="product"
              className="object-cover w-full h-full"
              width={600}
            height={400}
            />
          </div>
        ))}
      </div>

      <div className="w-full h-fit overflow-hidden">
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[400px] rounded-md overflow-hidden">
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
