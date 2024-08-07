import MenuSideBar from "./menu-sidebar";
import HomeButton from "./ui/button-home";
import OrderButton from "./ui/button-order";
import CartSideBar from "./ui/cart-button";

export default function BottomNav() {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-zinc-400 dark:border-border z-50">
      <nav className="flex items-center justify-around py-3">
        <HomeButton className="h-14 w-14">
          <p>Início</p>
        </HomeButton>

        <OrderButton className="h-14 w-14">
          <p>Pedidos</p>
        </OrderButton>

        <CartSideBar className="h-14 w-14">
          <span>Carrinho</span>
        </CartSideBar>

        <MenuSideBar className="h-14 w-14">
          <span>Menu</span>
        </MenuSideBar>
      </nav>
    </div>
  );
}
