import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  isConfirmDialogOpen: boolean;
  setIsConfirmDialogOpen: (isOpen: boolean) => void;
}

export default function ModalConfirmation({
  isConfirmDialogOpen,
  setIsConfirmDialogOpen,
}: Props) {
  return (
    <AlertDialog
      open={isConfirmDialogOpen}
      onOpenChange={setIsConfirmDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Produto criado com sucesso! 🎉</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Ok</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
