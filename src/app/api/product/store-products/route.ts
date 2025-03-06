import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getUserStore } from "@/app/actions/store/get-user-store";
import { getStoreProducts } from "@/app/actions/product/get-store-products";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Obter parâmetros da URL
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const status = searchParams.get("status") || "all";

    const storeData = await getUserStore();

    if (!storeData) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    const result = await getStoreProducts(storeData.id, page, pageSize, status);

    if (!result) {
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in products API:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
