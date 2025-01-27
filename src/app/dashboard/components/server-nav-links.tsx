import { getUserStore } from "@/app/actions/store/get-user-store";
import NavLinks from "./nav-links";

export default async function ServerNavLinks() {
  const store = await getUserStore();
  const storeSlug = store?.slug || "";

  return <NavLinks storeSlug={storeSlug} />;
}
