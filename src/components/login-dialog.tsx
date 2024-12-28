import GoogleSignInButton from "./google-signin-button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "./ui/dialog";
import MotoLogLogo from "./icons/moto-log-logo";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-3xl p-0 md:max-w-md">
        <div className="mx-auto w-full flex flex-col items-center p-6">
          <div className="flex flex-col items-center space-y-10">
            <MotoLogLogo disabled={true} />

            <DialogTitle>Entrar no Moto Log</DialogTitle>
          </div>
        </div>
        <DialogFooter className="py-4 border-t bg-card w-full flex items-center sm:justify-center">
          <GoogleSignInButton className="rounded-lg" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
