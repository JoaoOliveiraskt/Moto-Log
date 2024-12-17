import GoogleSignInButton from "./google-signin-button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import MotoLogLogo from "./icons/moto-log-logo";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-3xl p-0 border-none">
        <div className="mx-auto w-full flex flex-col items-center p-8">
          <div className="flex flex-col items-center space-y-4">
            <MotoLogLogo disabled={true} />
            <div className="space-y-4 text-center w-full">
              <DialogTitle className="text-2xl font-semibold text-foreground">
                Acesse sua conta 🌐
              </DialogTitle>
            </div>
          </div>
        </div>
        <DialogFooter className="py-4 border-t">
          <div className="flex flex-col justify-center gap-4 items-center w-full">
            <GoogleSignInButton className="p-6 rounded-2xl" />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
