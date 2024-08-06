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

const descriptions: Descriptions = {
  Roupas: "Estilo para todas as ocasiões.",
  Calçados: "Conforto e moda para os seus pés.",
  Eletrônicos: "Inovação que simplifica sua vida.",
  Acessórios: "Descubra detalhes únicos e surpreendentes.",
  Cosméticos: "Beleza e cuidado para o seu dia a dia.",
  Livros: "Inspiração e conhecimento para sua mente.",
};

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
    <Link href="#" className="relative snap-center scroll-ml-6 shrink-0">
      <div className="overflow-hidden w-[170px] lg:w-[243px] transition-all duration-200 transform bg-card dark:bg-dark-card border border-border rounded-2xl hover:shadow-lg hover:-translate-y-1">
        <div className="px-4 py-5 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="">
              <p className="text-xs font-bold text-primary lg:text-sm">
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
