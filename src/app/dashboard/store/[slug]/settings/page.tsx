import TypographyH4 from "@/components/typography/typography-h4";
import StoreSettingsSkeleton from "./components/settings-skeleton";
import EditStoreForm from "./components/edit-store-form";
import { getUserStore } from "@/app/actions/store/get-user-store";
import { Suspense } from "react";

interface Loja {
  id: string;
  nome: string;
  descricao: string | null;
  profileImageUrl: string | null;
}

export default async function EditStore() {
  const store: Loja = await getUserStore();

  return (
    <main>
      <div className="max-w-4xl mt-4 px-4 lg:px-0">
        <TypographyH4 className="mb-8 text-2xl">
          Personalização da loja
        </TypographyH4>

        <Suspense fallback={<StoreSettingsSkeleton />}>
          <EditStoreForm store={store} />
        </Suspense>
      </div>
    </main>
  );
}
