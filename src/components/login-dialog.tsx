import Balancer from "react-wrap-balancer";
import LoginButton from "./login-button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import Image from "next/image";
import { DialogDescription } from "@radix-ui/react-dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden max-w-xs md:max-w-3xl h-max md:h-[55%]   md:p-4 sm:rounded-3xl">
        <div className="md:grid grid-cols-2 gap-4 h-full">
          <div className="mx-auto w-full max-w-xs space-y-8 flex flex-col justify-center items-center">
            <div className="space-y-4 text-center">
              <DialogTitle className="text-3xl font-bold text-foreground">
                Login
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Faça login com sua conta
              </DialogDescription>
            </div>
            <div className="flex gap-4 items-center">
              <LoginButton className="py-6" />
            </div>
          </div>

          <div className="border relative h-full rounded-3xl hidden md:flex overflow-hidden items-center justify-center">
            <Image
              src="/login-2.png"
              alt="Login"
              width={1000}
              height={1000}
              className="object-cover w-full h-full"
            />
            <div className="max-w-72 absolute bottom-0 left-0 ml-6 mb-6">
              <p className="text-6xl font-medium text-white tracking-tighter">
                <Balancer>O Melhor em um só Lugar!</Balancer>
              </p>
              <p className="text-sm mt-4 text-white">
                Aproveite promoções imperdíveis todos os dias!
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
