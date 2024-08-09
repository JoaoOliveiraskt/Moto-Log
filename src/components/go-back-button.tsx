"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RiArrowLeftSLine } from "react-icons/ri";

interface Props {
  className?: string;
  name?: string;
}

const GoBackButton: React.FC<Props> = ({ className, name }: Props) => {
  const router = useRouter();

  const handleGoBack = () => router.back();

  const title = name || "";

  return (
    <div className="flex items-center gap-4 h-10">
      <Button
        onClick={handleGoBack}
        className={`flex bg-transparent border-none h-fit hover:bg-accent ${className}`}
        size="icon"
        variant="outline"
        title="Voltar"
      >
        <RiArrowLeftSLine size={32} />
      </Button>
      {title && (
        <span className="font-bold text-primary text-xl sm:text-3xl">
          {title}
        </span>
      )}
    </div>
  );
};

export default GoBackButton;
