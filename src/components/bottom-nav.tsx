import CartButton from "./cart-button";
import MobileMenu from "./mobile-menu";
import HomeButton from "./ui/button-home";
import OrderButton from "./ui/button-order";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50 h-fit py-1">
      <nav className="flex items-center justify-around">
        <HomeButton className={cn("h-fit w-fit")} size={22}>
          Início
        </HomeButton>

        <OrderButton className={cn("h-fit w-fit")} size={22}>
          Pedidos
        </OrderButton>

        <CartButton
          iconSize={22}
          model="icon"
          className="h-fit w-fit gap-1 text-muted-foreground p-0"
        >
          Carrinho
        </CartButton>

        <MobileMenu className="gap-1" />
      </nav>
    </div>
  );
}
