import Link from "next/link";
import ProductList from "./product-list";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function ProductSection() {
  return (
    <div className="px-4 md:px-16 lg:p-24 flex flex-col gap-10">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl my-4">Recomendados</h2>
          <Link href="#" className="flex items-center gap-1 text-blue-700">
            <span className=" font-medium">Ver todos</span>
            <IoIosArrowRoundForward />
          </Link>
        </div>
        <ProductList />
      </div>
    </div>
  );
}
