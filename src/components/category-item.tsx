import { Footprints, Cable, Watch } from "lucide-react";
import { GiClothes, GiLipstick } from "react-icons/gi";
import { PiBooks } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
interface Category {
  id: string;
  nome: string;
  imageUrl: string;
}

interface Descriptions {
  [key: string]: string;
}

const categoryIcons: { [key: string]: JSX.Element } = {
  Roupas: <GiClothes size={30} />,
  Calçados: <Footprints size={30} />,
  Eletrônicos: <Cable size={30} />,
  Acessórios: <Watch size={30} />,
  Cosméticos: <GiLipstick size={30} />,
  Livros: <PiBooks />,
};

interface CategoryProps {
  category: Category;
}

export default function CategoryItem({ category }: CategoryProps) {
  return (
    <Link href="#" className="overflow-hidden relative bg-card border border-border hover:border-accent rounded-2xl text-muted-foreground hover:text-foreground w-[170px] lg:w-[243px] transition-all duration-200 transform">
      <div className="">
        <div className="px-4 py-5 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="">
              <p className="text-xs font-bold lg:text-sm">
                {category.nome}
              </p>
            </div>
            <div className="">{categoryIcons[category.nome]}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
