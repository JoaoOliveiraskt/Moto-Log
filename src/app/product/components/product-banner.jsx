import Image from "next/image";

export default function ProductBanner({ images, produto }) {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-6">
      {/* products images list */}
      <div className="flex gap-4 md:flex-col">
        {images.map((image) => (
          <div
            key={produto.id}
            className="relative w-20 h-20 lg:w-32 lg:h-32 overflow-hidden rounded-md hover:shadow-md"
          >
            <Image
              src={image}
              fill
              alt="product"
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* main image */}
      <div className="w-fit h-fit overflow-hidden">
        <div className="relative h-60 w-full md:w-[550px] md:h-[560px] rounded-md overflow-hidden">
          <Image
            src={produto.imagemUrl}
            width={500}
            height={400}
            alt={produto.nome}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
