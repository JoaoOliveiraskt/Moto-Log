import Link from "next/link";

import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import TypographyP from "./typography/typography-p";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import LikeButton from "./like-button";

interface Props {
  product: {
    lojaId: string;
    loja: {
      imagemUrl: string;
      nome: string;
      descricao: string;
    };
  };
  showHoverCard?: boolean;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

export default function StoreBadge({ product, showHoverCard = true, align = "start", side = "bottom" }: Props) {
  return (
    <HoverCard openDelay={20} closeDelay={20}>
      <HoverCardTrigger asChild className="cursor-pointer z-10 w-fit h-fit">
        <Link
          href={`/store/${product.lojaId}`}
          className="text-foreground font-medium  hover:text-cyan-600 flex items-center gap-2 w-fit h-fit "
        >
          <div className="w-9 h-9 rounded-full  overflow-hidden flex-shrink-0">
            {product.loja.imagemUrl ? (
              <Image
                src={product.loja.imagemUrl}
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
            <h5 className="text-sm ">{product.loja.nome}</h5>
          </div>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        className={cn(
          `max-w-xs w-full z-50 cursor-default rounded-2xl dark:shadow-none p-6 ${showHoverCard === true ? "" : "hidden"} `
        )}
        align={align}
        side={side}
      >
        <div className="flex justify-between items-center">
          <Link
            href={`/store/${product.lojaId}`}
            className="text-foreground font-medium w-fit h-fit hover:text-cyan-600 flex items-center gap-2"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              {product.loja.imagemUrl ? (
                <Image
                  src={product.loja.imagemUrl}
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
              <h5 className="text-xl ">{product.loja.nome}</h5>
            </div>
          </Link>

          <LikeButton>Salvar Loja</LikeButton>
        </div>

        <div className="mt-4">
          <TypographyP className="line-clamp-3 text-sm">
            {product.loja.descricao}
          </TypographyP>
        </div>
        <Button asChild className="mt-6 w-full">
          <Link href={`/store/${product.lojaId}`}>Ver loja</Link>
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}
