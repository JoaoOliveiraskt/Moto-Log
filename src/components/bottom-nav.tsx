import CartSideBar from "./cart-button";
import Menu from "./menu";
import HomeButton from "./ui/button-home";
import OrderButton from "./ui/button-order";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50 py-2">
      <nav className="flex items-center justify-around">
        <HomeButton className={cn("h-fit w-fit")} size={18}>
          Home
        </HomeButton>

        <OrderButton className={cn("h-fit w-fit")} size={18}>
          Pedidos
        </OrderButton>

        <CartSideBar iconSize={18} model="icon" className="h-fit w-fit">
          Carrinho
        </CartSideBar>

        <Menu iconSize={18} className="h-fit w-fit hover:bg-background">
          Menu
        </Menu>
      </nav>
    </div>
  );
}
