"use client";

import Icon from "@/components/icons/icon-component";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/responsive-modal";
import TypographyH4 from "@/components/typography/typography-h4";
import TypographyP from "@/components/typography/typography-p";
import TypographySmall from "@/components/typography/typography-small";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface StoreData {
  storeId: string;
  name: string | null;
  description: string | null;
  followers: number;
  createdAt: Date;
  totalProducts: number;
}

interface StoreDateProps {
  createdAt: Date;
}

function storeDate({ createdAt }: StoreDateProps) {
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(createdAt));

  return formattedDate;
}

export default function StoreAbout({ ...store }: StoreData) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const storeDetailsData = [
    {
      icon: Icon.users,
      text: `${store.followers} inscritos`,
    },
    {
      icon: Icon.package,
      text: `${store.totalProducts} produtos`,
    },
    {
      icon: Icon.clock,
      text: `Inscreveu-se em ${storeDate({ createdAt: store.createdAt })}`,
    },
  ];

  return (
    <>
      <Button
        variant="link"
        onClick={openModal}
        className={cn(
          "text-left w-full",
          "text-muted-foreground max-w-lg",
          "p-0 h-auto text-start"
        )}
      >
        <TypographySmall
          className={cn(
            "flex-grow pr-8 w-full line-clamp-2 lg:line-clamp-1 sm:text-sm"
          )}
        >
          {store.description}
        </TypographySmall>
        <span
          className={cn(
            "absolute right-0 bottom-0 text-xs lg:text-sm text-foreground font-bold ml-1",
            "transition-opacity duration-300",
            "relative after:absolute after:bg-foreground",
            "after:bottom-0 after:left-0 after:h-px after:w-[100%]",
            "after:origin-bottom-right after:scale-x-0",
            "group-hover:after:origin-bottom-left group-hover:after:scale-x-100",
            "after:transition-transform after:ease-in-out after:duration-300"
          )}
        >
          ...mais
        </span>
      </Button>
      <ResponsiveModal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <ResponsiveModalContent className="px-6 pb-8 md:w-[35rem] md:max-w-full max-h-[90vh] lg:bg-card">
          <ResponsiveModalHeader className="px-0 ">
            <ResponsiveModalTitle className="text-start">
              Sobre
            </ResponsiveModalTitle>
          </ResponsiveModalHeader>

          <ScrollArea className="max-h-[30rem] lg:max-h-[45rem] h-full overflow-y-auto">
            <TypographyP className="text-sm font-light">
              {store.description}
            </TypographyP>

            <div className="space-y-4 mt-6">
              <TypographyH4>Detalhes da loja</TypographyH4>

              <div className="space-y-6 flex flex-col text-sm">
                {storeDetailsData.map((data, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <data.icon size={20} />
                    <p className="text-sm font-light">{data.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}
