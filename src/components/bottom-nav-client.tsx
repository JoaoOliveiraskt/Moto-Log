"use client";

import CartButton from "./cart-button";
import MobileMenu from "./mobile-menu";
import Icon from "./icons/icon-component";
import HomeButton from "./ui/button-home";
import SearchDialog from "./search-dialog";
import { usePathname } from "next/navigation";

export default function BottomNavClient() {
    const router = usePathname();

    const hiddenRoutes = ["/welcome-create-store", "/create-store"];

    if (
        hiddenRoutes.includes(router) ||
        router.startsWith("/dashboard/store/edit-product/")
    ) {
        return null;
    }

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background z-50 h-fit py-1.5">
            <nav className="flex items-center justify-around">
                <HomeButton />

                <SearchDialog>
                    <button className="flex items-center justify-center h-fit w-fit text-muted-foreground hover:text-foreground">
                        <Icon.search size={28} className="stroke-muted" />
                    </button>
                </SearchDialog>

                <CartButton iconSize={27} model="icon" className="text-muted" />

                <MobileMenu iconSize={24} />
            </nav>
        </div>
    );
}
