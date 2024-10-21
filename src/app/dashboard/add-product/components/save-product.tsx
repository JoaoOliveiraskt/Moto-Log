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
      <Button variant="outline" type="button" onClick={onDiscard}>
        limpar
      </Button>
      <Button type="submit" disabled={isLoading}>
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
