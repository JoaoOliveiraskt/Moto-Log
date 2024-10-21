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
      <DialogContent className="overflow-hidden p-6 md:max-w-2xl min-h-[38] rounded-3xl">
        <div className="mx-auto w-full h-full flex flex-col justify-between items-center">
          <div className="flex flex-col items-center space-y-4">
            <MotoLogLogo link="#"/>
            <div className="space-y-4 text-center w-full">
              <DialogTitle className="text-3xl font-bold text-foreground">
                Bem-vindo! 👋
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Entre com sua conta
              </DialogDescription>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 items-center w-full py-4 mt-2">
            <LoginButton className="py-9 rounded-2xl px-12 lg:px-14 bg-card text-foreground border hover:bg-card/70" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
