import ProductList from "./product-list";

export default function ProductSection() {
  return (
    <div className="px-4 md:px-20 pt-24">
      <h2 className="font-bold text-xl my-4">Recomendados para você</h2>
      <ProductList startIndex={25} endIndex={30} />

      <h2 className="font-bold text-xl my-4">Lançamentos</h2>
      <ProductList startIndex={31} endIndex={36} />

      <h2 className="font-bold text-xl my-4">Mais vendidos</h2>
      <ProductList startIndex={37} endIndex={42} />

      <h2 className="font-bold text-xl my-4">Em promoção</h2>
      <ProductList startIndex={10} endIndex={15} />
    </div>
  );
}
