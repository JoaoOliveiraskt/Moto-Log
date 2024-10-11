import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ProductFormActionButtonsProps {
  isLoading: boolean;
  onDiscard: () => void;
}

const ProductFormActionButtons: React.FC<ProductFormActionButtonsProps> = ({ isLoading, onDiscard }) => {
  return (
    <div className="hidden items-center gap-2 md:ml-auto md:flex">
      <Button
        variant="outline"
        type="button"
        onClick={onDiscard}
      >
        Descartar
      </Button>
      <Button
        type="submit"
        disabled={isLoading}
        className="min-w-28"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Salvar produto"
        )}
      </Button>
    </div>
  );
};

export default ProductFormActionButtons;
