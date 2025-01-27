import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ProductFormActionButtonsProps {
  isLoading: boolean;
  onDiscard: () => void;
}

const ProductFormActionButtons: React.FC<ProductFormActionButtonsProps> = ({
  isLoading,
  onDiscard,
}) => {
  return (
    <div className="flex items-center gap-4 md:ml-auto">
      <Button
        size={"rounded"}
        variant="outline"
        type="button"
        onClick={onDiscard}
      >
        limpar
      </Button>
      <Button size={"rounded"} type="submit" disabled={isLoading}>
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
