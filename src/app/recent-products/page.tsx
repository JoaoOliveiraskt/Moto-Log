import GoBackButton from "@/components/go-back-button";
import Container from "@/components/container";
import RecentProductsServer from "@/components/recent-products-server";

export default async function RecentProducts() {
  const name = "Mais recentes";
  return (
    <Container className="space-y-8 mt-20">
      <div className="flex justify-between items-center">
        <GoBackButton name={name} className="hidden lg:flex" />
      </div>
      <RecentProductsServer limit={30}/>
    </Container>
  );
}
