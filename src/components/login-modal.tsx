import GoogleSignInButton from "./google-signin-button";
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
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Faça o Login</AlertDialogTitle>
          <AlertDialogDescription>
            Você precisa estar logado para adicionar produtos ao carrinho.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border">Cancel</AlertDialogCancel>
          <GoogleSignInButton className="mr-auto border space-x-2 lg:space-x-4"/>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
