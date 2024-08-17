"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { RiArrowLeftSLine } from "react-icons/ri";
import { GoArrowLeft } from "react-icons/go";

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
            <span className="font-bold text-primary text-xl sm:text-3xl">
              {title}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default GoBackButton;
