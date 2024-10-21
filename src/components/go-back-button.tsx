"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";
import TypographyH2 from "./typography/typography-h2";

interface Props {
  className?: string;
  name?: string;
}

const GoBackButton: React.FC<Props> = ({ className, name }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const isHome = pathName === "/";

  const handleGoBack = () => router.back();

  const title = name || "";

  return (
    <>
      {!isHome && (
        <div className="flex items-center gap-4 h-12 w-fit">
          <Button
            onClick={handleGoBack}
            className={`flex items-center rounded-full ${className}`}
            size="icon"
            variant="ghost"
            title="Voltar"
          >
            <GoArrowLeft size={30} />
          </Button>
          {title && (
            <TypographyH2 className="text-primary">
              {title}
            </TypographyH2>
          )}
        </div>
      )}
    </>
  );
};

export default GoBackButton;
