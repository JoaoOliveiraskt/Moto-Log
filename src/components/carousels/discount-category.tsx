import GetCategories from "@/app/actions/category/get-categories";
import TypographyH3 from "../typography/typography-h3";
import { Card } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TypographyP from "../typography/typography-p";

interface CategoryContent {
  discount: string;
  message: string;
  imageUrl: string;
}

const categoryContent: Record<string, CategoryContent> = {
  Celulares: {
    discount: "20% OFF",
    message: "Smartphones com super descontos",
    imageUrl: "/categories/phones.jpg",
  },
  Calçados: {
    discount: "10% OFF",
    message: "Pise com economia",
    imageUrl: "/categories/shoes.jpeg",
  },
  Roupas: {
    discount: "20% OFF",
    message: "Vista-se com estilo por menos",
    imageUrl: "/categories/clothes.jpeg",
  },
  Eletrônicos: {
    discount: "10% OFF",
    message: "Tecnologia com preços imperdíveis!",
    imageUrl: "/categories/electronics.jpeg",
  },
  Acessórios: {
    discount: "20% OFF",
    message: "Acesse nossos acessórios com descontos imperdíveis",
    imageUrl: "/categories/accessories.jpeg",
  },
};

export default async function DiscountCategoryCarousel() {
  const categories = await GetCategories({
    categoryNames: [
      "Celulares",
      "Calçados",
      "Roupas",
      "Eletrônicos",
      "Acessórios",
    ],
  });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <TypographyH3>Categorias em Destaque</TypographyH3>
          <TypographyP className="text-muted-foreground">
            Aproveite até{" "}
            <span className="text-primary font-semibold">20% OFF</span> nas
            melhores ofertas
          </TypographyP>
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
          duration: 17,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {categories.map((category) => {
            const content = categoryContent[category.nome];
            if (!content) return null;

            return (
              <CarouselItem
                key={category.id}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Link
                  href={`/category/${category.id}?discount=true`}
                  className="group block h-[16rem] relative overflow-hidden rounded-2xl"
                >
                  <Card className="h-full relative overflow-hidden border-none">
                    {/* Imagem de fundo */}
                    <div className="absolute inset-0">
                      <Image
                        src={content.imageUrl}
                        alt={category.nome}
                        fill
                        className="object-cover transition-all duration-500 group-hover:brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                    </div>

                    {/* Conteúdo do card */}
                    <div className="relative h-full p-6 flex flex-col justify-end text-white">
                      {/* Badge de desconto */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary px-3 py-1.5 rounded-full text-sm font-bold text-primary-foreground">
                          {content.discount}
                        </span>
                      </div>

                      {/* Título e mensagem */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{category.nome}</h3>
                        <p className="text-sm text-gray-200">
                          {content.message}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2 " />
      </Carousel>
    </section>
  );
}
