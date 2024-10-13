import CartSideBar from "./cart-button";
import Menu from "./menu";
import HomeButton from "./ui/button-home";
import OrderButton from "./ui/button-order";


export default function BottomNav() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50 py-1">
      <nav className="flex items-center justify-around">
      
        <HomeButton className="h-14 w-14" size={22}>
          Home
        </HomeButton>
        

        <OrderButton className="h-14 w-14" size={22}>
          Pedidos
        </OrderButton>

        <CartSideBar iconSize={22} model="icon" className="h-14 w-14">
          Carrinho
        </CartSideBar>

        <Menu iconSize={22} className="h-14 w-14 ">
          Menu
        </Menu>
      </nav>
    </div>
  );
}
