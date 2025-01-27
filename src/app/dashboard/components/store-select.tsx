import { getUserStore } from "@/app/actions/store/get-user-store";
import Image from "next/image";

export default async function UserStoreSelector() {
  const store = await getUserStore();

  return (
    <div className="rounded-md overflow-hidden">
      {store?.imagemUrl ? (
        <Image
          src={store.imagemUrl}
          alt="logo da loja"
          width={100}
          height={100}
          className="w-8 h-8 object-cover rounded-md"
        />
      ) : (
        <div className="w-8 h-8 rounded-md border bg-accent"></div>
      )}
    </div>
  );
}
