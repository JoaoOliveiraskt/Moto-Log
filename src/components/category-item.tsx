import { Footprints, Cable, Watch } from "lucide-react";
import { GiClothes, GiLipstick } from "react-icons/gi";
import { PiBooks } from "react-icons/pi";
import Link from "next/link";
import { Card } from "./ui/card";
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
  Livros: <PiBooks size={30} />,
};

const descriptions = {
  
}

interface CategoryProps {
  category: Category;
  link: string;
}

export default function CategoryItem({ category, link }: CategoryProps) {
  return (
    <Card
      className="shadow-sm hover:shadow-lg shadow-border dark:shadow-none w-auto bg-card/5 hover:bg-card/10
       transition-all rounded-2xl text-muted-foreground"
    >
      <Link href={link}>
        <div className="w-full">
          <div className="px-4 py-5 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium lg:text-sm">
                  {category.nome}
                </p>
              </div>
              <div>{categoryIcons[category.nome]}</div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
