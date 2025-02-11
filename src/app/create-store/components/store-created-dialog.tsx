import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface Props {
  isConfirmDialogOpen: boolean;
  setIsConfirmDialogOpen: (value: boolean) => void;
  isSubmitLoading: boolean;
}

export default function StoreCreatedDialog({
  isConfirmDialogOpen,
  setIsConfirmDialogOpen,
  isSubmitLoading,
}: Props) {
  const router = useRouter();
  return (
    <AlertDialog
      open={isConfirmDialogOpen}
      onOpenChange={setIsConfirmDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Loja criada com sucesso! 🎉</AlertDialogTitle>
          <AlertDialogDescription>
            Você pode começar a adicionar produtos agora mesmo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => router.push("/")}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => router.push("/dashboard/products")}
            disabled={isSubmitLoading}
          >
            Ir para a loja
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
