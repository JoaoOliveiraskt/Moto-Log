"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { HiOutlineArrowSmLeft } from "react-icons/hi";

interface Props {
  className?: string;
}

const GoBackButton: React.FC = ({className}: Props) => {
  const router = useRouter();

  const handleGoBack = () => router.back();
  return (
    <div className={`${className}`} title="Voltar">
      <Button
        onClick={handleGoBack}
        className="flex bg-transparent border-none h-fit hover:bg-accent"
        size="icon"
        variant="outline"
        
      >
        <HiOutlineArrowSmLeft size={32} />
      </Button>
    </div>
  );
};

export default GoBackButton;
