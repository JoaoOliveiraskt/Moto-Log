import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  isConfirmDialogOpen: boolean;
  setIsConfirmDialogOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export default function ModalConfirmation({
  isConfirmDialogOpen,
  setIsConfirmDialogOpen,
  children,
}: Props) {
  return (
    <AlertDialog
      open={isConfirmDialogOpen}
      onOpenChange={setIsConfirmDialogOpen}
    >
      <AlertDialogContent className="w-fit">
        <AlertDialogHeader>
          <AlertDialogTitle>{children}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border">Ok</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
