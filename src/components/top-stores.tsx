"use client";

import { useEffect, useState } from "react";
import TypographyH3 from "./typography/typography-h3";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import TypographyP from "./typography/typography-p";

interface StoreProps {
  id: string;
  nome: string;
  imagemUrl: string;
}

export default function TopStores() {
  const [topStores, setTopStores] = useState<StoreProps[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopStores = async () => {
      try {
        const take = 10;
        const response = await fetch(`/api/store?take=${take}`);
        const data = await response.json();
        setTopStores(data);
      } catch (error) {
        setError("Error loading top stores.");
      } finally {
        setLoading(false);
      }
    };
    fetchTopStores();
  }, []);

  return (
    <div className="md:hidden space-y-4">
      <div className="flex items-center justify-between ">
        <TypographyH3>Top Lojas</TypographyH3>
      </div>
      <div>
        {loading ? (
          <div className="grid grid-cols-5 w-full gap-x-10 gap-y-1.5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 max-w-10"
              >
                <Skeleton className="h-14 w-14 rounded-full" />
                <Skeleton className="h-4 w-10" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-5 w-full gap-x-10 gap-y-1 pl-2 pr-3">
            {topStores &&
              topStores.map((store, index) => (
                <div className="w-fit" key={store.id}>
                  <Link
                    href={`/store/${store.id}`}
                    className="text-foreground font-medium hover:text-cyan-600 mb-2 flex flex-col items-center gap-1 max-w-10"
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                      {store.imagemUrl ? (
                        <Image
                          src={store.imagemUrl}
                          width={500}
                          height={500}
                          alt="logo da loja"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-green-500"></div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <TypographyP className="text-sm md:text-base">
                        {store.nome.split(" ")[0]}
                      </TypographyP>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
