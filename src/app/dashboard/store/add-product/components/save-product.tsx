import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ProductFormActionButtonsProps {
  isLoading: boolean;
}

const ProductFormActionButtons: React.FC<ProductFormActionButtonsProps> = ({
  isLoading,
}) => {
  return (
    <div className="flex items-center gap-4 md:ml-auto">
      <Button
        size={"roundedXl"}
        type="submit"
        disabled={isLoading}
        className="w-24"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          "Adicionar"
        )}
      </Button>
    </div>
  );
};

export default ProductFormActionButtons;
