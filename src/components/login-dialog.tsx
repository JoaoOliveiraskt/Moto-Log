import LoginButton from "./login-button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import MotoLogLogo from "./icons/moto-log-logo";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden px-4 md:max-w-2xl h-[50%] sm:h-[40%] sm:p-0 sm:rounded-3xl">
        <div className="mx-auto w-full h-full flex flex-col justify-between items-center">
          <div className="flex flex-col items-center space-y-4">
            <MotoLogLogo />
            <div className="space-y-4 text-center w-full">
              <DialogTitle className="text-3xl font-bold text-foreground">
                Login
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Faça login com sua conta
              </DialogDescription>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 items-center border-t w-full py-4 min-h-36">
            <LoginButton className="py-10 rounded-2xl px-12 lg:px-16 bg-card text-foreground border hover:bg-card/70" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
