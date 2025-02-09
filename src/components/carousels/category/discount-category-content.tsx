import GetCategories from "@/app/actions/category/get-categories";
import TypographyP from "../../typography/typography-p";
import TypographyH4 from "@/components/typography/typography-h4";
import CarouselClient from "./discount-category-carousel";

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
      "Roupas",
      "Celulares",
      "Calçados",
      "Eletrônicos",
      "Acessórios",
    ],
  });

  return (
    <section className="space-y-8">
      <div className="space-y-1 mb-6 px-4 lg::px-0 lg:pl-4">
        <TypographyH4>Categorias em Destaque</TypographyH4>
        <TypographyP className="text-muted-foreground text-sm md:text-base">
          Aproveite até{" "}
          <span className="text-primary font-semibold">20% OFF</span> nas
          melhores ofertas
        </TypographyP>
      </div>

      <CarouselClient
        categories={categories}
        categoryContent={categoryContent}
      />
    </section>
  );
}
