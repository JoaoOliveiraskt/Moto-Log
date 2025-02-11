"use client";

import { useState } from "react";
import { useQRCode } from "next-qrcode";
import Container from "@/components/container";
import TypographyH4 from "@/components/typography/typography-h4";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import TypographyH1 from "@/components/typography/typography-h1";
import TypographyP from "@/components/typography/typography-p";
import Balancer from "react-wrap-balancer";
import MotoLogLogo from "@/components/icons/moto-log-logo";
import { Badge } from "@/components/ui/badge";
import { Smartphone } from "lucide-react";

const DownloadAppPage = () => {
  const [isInstallPromptVisible, setInstallPromptVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const { Canvas } = useQRCode();

  const pwaUrl = "https://moto-log-app.vercel.app/download-app";

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Usuário aceitou a instalação");
        } else {
          console.log("Usuário recusou a instalação");
        }
        setDeferredPrompt(null);
      });
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallPromptVisible(true);
    });
  }

  return (
    <div>
      <Container className="pt-12 lg:pt-28 lg:max-w-[1104px]">
        <div className="grid justify-center">
          <div className="flex flex-col items-center space-y-12">
            <div className="flex flex-col items-center space-y-4 lg:space-y-8">
              <div className="flex items-center justify-center w-16 h-16 bg-card rounded-2xl dark:border">
                <MotoLogLogo disabled />
              </div>

              <div className="text-center space-y-2 flex flex-col items-center max-w-3xl">
                <Badge
                  className="flex items-center gap-x-2 w-fit text-sm text-foreground py-0.5 px-2 bg-card hover:bg-card"
                  variant={"secondary"}
                >
                  <MotoLogLogo logoClassName="w-6" disabled />
                  <span>Apresentando: Moto Log Mobile</span>
                </Badge>
                <TypographyH1>
                  <Balancer>
                    Leve o seu negócio para o próximo nível com o Moto Log
                  </Balancer>
                </TypographyH1>
                <TypographyP className="text-muted-foreground ">
                  <Balancer>
                    Baixe o app agora e descubra como é fácil comprar e vender
                    online. Apoie os lojistas e tenha acesso a ofertas
                    exclusivas!
                  </Balancer>
                </TypographyP>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-start gap-x-8">
              <Button
                size="lg"
                onClick={handleInstallClick}
                className="px-6 h-11 text-base font-medium"
              >
                Baixar para desktop
              </Button>

              <div className="flex items-center gap-x-8">
                <span className="text-base text-muted-foreground">Ou</span>

                <div className="flex items-center gap-x-6">
                  <div className="flex items-center gap-x-3">
                    <Smartphone className="text-muted-foreground w-6 h-6" />
                    <p className="text-sm font-medium">
                      Escaneie o QR Code para
                      <br />
                      baixar no celular
                    </p>
                  </div>

                  <div className="bg-white rounded-xl overflow-hidden">
                    <Canvas
                      text={pwaUrl}
                      options={{
                        errorCorrectionLevel: "M",
                        width: 90,
                        color: {
                          dark: "#000000",
                          light: "#FFFFFF",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-fit h-fit mt-8 lg:-mt-12 overflow-hidden -z-10 mx-auto">
            <Image
              src="/ml-mockup/mockup-3-so.png"
              width={1000}
              height={1000}
              priority={true}
              alt="Moto Log App Mockup"
              className="rounded-3xl scale-125 w-fit h-fit md:scale-100"
            />
          </div>

          <div className="text-center lg:hidden mt-4">
            <Button
              size={"xl"}
              onClick={handleInstallClick}
              className="w-full sm:w-auto"
            >
              Instalar aplicativo
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DownloadAppPage;
