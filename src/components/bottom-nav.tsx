import CartButton from "./cart-button";
import MobileMenu from "./mobile-menu";
import SearchButton from "./search-button";
import HomeButton from "./ui/button-home";

export default function BottomNav() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background z-50 h-fit py-3">
      <nav className="flex items-center justify-around">
        <HomeButton />

        <SearchButton />

        <CartButton iconSize={27} model="icon" className="text-muted" />

        <MobileMenu iconSize={24} />
      </nav>
    </div>
  );
}
