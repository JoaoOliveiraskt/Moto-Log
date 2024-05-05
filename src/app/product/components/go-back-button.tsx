"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { HiOutlineArrowSmLeft } from "react-icons/hi";

const GoBackButton: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => router.back();
  return (
    <div>
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
