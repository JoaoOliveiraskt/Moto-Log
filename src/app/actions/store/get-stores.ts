interface Props {
  limit?: number;
}

export default async function GetStores({ limit }: Props) {
  try {
    const url = new URL(
      "/api/store",
      process.env.NEXT_PUBLIC_API_URL || window.location.origin
    );
    if (limit) {
      url.searchParams.append("take", limit.toString());
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const stores = await response.json();
    return stores;
  } catch (error) {
    throw new Error("Não foi possível carregar as lojas");
  }
}
