import React from "react";
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div>
      <div className="hover:shadow-lg cursor-pointer rounded-lg overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.title}
          width={330}
          height={330}
          className="rounded-t-lg object-cover"
        />
        <div className="flex flex-col justify-between p-2 gap-2">
          <div className="">
            <a href="#" className="hover:text-orange-400">
              <h2 className="font-medium line-clamp-1">{product.title}</h2>
            </a>
          </div>
          <div>
            <h2 className="font-bold">R$ {product.price},00</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
