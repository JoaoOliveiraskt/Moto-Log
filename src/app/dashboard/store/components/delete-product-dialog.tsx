import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import DeleteProductBtn from "./delete-product-btn";

interface Props {
  isConfirmDialogOpen: boolean;
  setIsConfirmDialogOpen: (isOpen: boolean) => void;
  productId: string;
}

export default function DeleteProductDialog({
  isConfirmDialogOpen,
  setIsConfirmDialogOpen,
  productId,
}: Props) {
  return (
    <AlertDialog
      open={isConfirmDialogOpen}
      onOpenChange={setIsConfirmDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir este produto?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <DeleteProductBtn
            productId={productId}
            setIsConfirmDialogOpen={() => setIsConfirmDialogOpen(false)}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
