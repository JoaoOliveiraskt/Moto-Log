import Image from "next/image";
import Link from "next/link";
const descriptions = {
  Roupas: "Estilo para todas as ocasiões.",
  Calçados: "Conforto e moda para os seus pés.",
  Eletrônicos: "Inovação que simplifica sua vida.",
  Acessórios: "Descubra detalhes únicos e surpreendentes.",
  Cosméticos: "Beleza e cuidado para o seu dia a dia.",
  Livros: "Inspiração e conhecimento para sua mente.",
};

export default function CategoryItem({ category }) {
  return (
    <Link href="#" className="relative snap-center scroll-ml-6 shrink-0">
      <div className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
        <div className="px-4 py-5 sm:p-5">
          <div className="flex items-start lg:items-center">
            <div className="shrink-0">
              <Image
                className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cover"
                src={category.imageUrl}
                alt={category.nome}
                width={100}
                height={100}
              />
            </div>

            <div className="flex-1 ml-4 lg:ml-6">
              <p className="text-xs font-bold text-zinc-900 lg:text-sm">
                {category.nome}
              </p>

              <p className="mt-2 text-sm font-semibold text-zinc-500 group-hover:text-zinc-600">
               {descriptions[category.nome]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
