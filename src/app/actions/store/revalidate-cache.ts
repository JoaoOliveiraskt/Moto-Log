import { CACHE_TAGS } from "@/lib/cache-constants";
import { revalidateTag } from "next/cache";

export async function revalidateStoreCache() {
  revalidateTag(CACHE_TAGS.store);
  revalidateTag(CACHE_TAGS.metrics);
  revalidateTag(CACHE_TAGS.users);
  revalidateTag(CACHE_TAGS.revenue);
}
