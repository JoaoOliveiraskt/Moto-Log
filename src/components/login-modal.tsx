import {} from "@radix-ui/react-alert-dialog";
import LoginButton from "./login-button";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Faça o Login</AlertDialogTitle>
          <AlertDialogDescription>
            Você precisa estar logado para adicionar produtos ao carrinho.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoginButton className="w-full" />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
