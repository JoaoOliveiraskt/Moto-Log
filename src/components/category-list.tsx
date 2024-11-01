import Link from "next/link";
import TypographyH1 from "./typography/typography-h1";
import CategoryCarousel from "./category-carousel";

export default function CategoryList() {
  return (
    <div id="category-list" className="w-full space-y-5">
      <TypographyH1 className="text-primary">Explorar</TypographyH1>

      <div className="flex items-center gap-8">
        <Link
          href="/recent-products"
          className="text-muted-foreground hover:text-foreground font-bold transition-all"
        >
          <span>Mais recentes</span>
        </Link>
        <Link
          href="/discount"
          className="text-muted-foreground hover:text-foreground font-bold transition-all"
        >
          <span>Ofertas</span>
        </Link>
      </div>

      <CategoryCarousel />
    </div>
  );
}
