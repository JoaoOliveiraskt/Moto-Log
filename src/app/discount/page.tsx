import Container from "@/components/container";
import GoBackButton from "@/components/go-back-button";
import DiscountProductsServer from "@/components/discount-products-server";

export default async function DiscountPage() {
  const title = "Com desconto";

  return (
    <Container className="space-y-8 mt-20">
      <GoBackButton name={title} className="hidden lg:flex" />
      <DiscountProductsServer limit={200} />
    </Container>
  );
}
