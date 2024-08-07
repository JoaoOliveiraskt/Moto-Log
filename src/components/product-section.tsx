import Link from "next/link";
import ProductList from "./product-list";
import { IoIosArrowRoundForward } from "react-icons/io";
import Container from "./container";

export default function ProductSection() {
  return (
    <Container className="my-10 flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-primary text-xl sm:text-3xl">Recomendados</h2>
        <Link href="#" className="flex items-center gap-1 text-blue-700">
          <span className=" font-medium">Ver todos</span>
          <IoIosArrowRoundForward />
        </Link>
      </div>
      <ProductList />
    </Container>
  );
}
