import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div>
      <div href="#" className="hover:shadow-lg cursor-pointer rounded-lg overflow-hidden">
        <Image
          src={product.imagemUrl}
          alt={product.nome}
          width={330}
          height={330}
          className="rounded-t-lg object-cover"
        />
        <div className="flex flex-col justify-between p-2">
          <div className="">
            <a href="#" className="hover:text-orange-400">
              <h2 className="font-medium line-clamp-1">{product.nome}</h2>
            </a>
          </div>
          <div>
            <p className="font-bold">R$ {product.preco},00</p>
          </div>
          <div>
            <p className="">{product.loja.nome}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
