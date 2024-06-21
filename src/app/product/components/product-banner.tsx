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
    <div className="flex flex-col-reverse md:flex-row gap-6 h-fit">
      <div className="flex justify-between gap-4 md:flex-col">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-20 h-20 lg:w-32 lg:h-32 overflow-hidden rounded-md hover:shadow-md"
          >
            <Image
              src={image}
              alt="product"
              className="object-cover w-full h-full"
              layout="fill"
            />
          </div>
        ))}
      </div>

      <div className="w-full h-fit overflow-hidden">
        <div className="relative h-60 w-full md:w-[550px] md:h-[560px] rounded-md overflow-hidden">
          <Image
            src={produto.imagemUrl}
            alt={produto.nome}
            width={500}
            height={400}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
