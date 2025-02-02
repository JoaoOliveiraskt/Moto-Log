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
      <div className="fixed inset-0 lg:hidden -z-20">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 via-background via-50% to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/10 via-background via-50% to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-rose-600/20 opacity-0" />
      </div>
      <Container className="pt-12 lg:pt-28 lg:max-w-[1104px]">
        <div className="grid justify-center">
          <div className="flex flex-col items-center space-y-12">
            <div className="flex flex-col items-center space-y-4 lg:space-y-12">
              <div className="flex items-center justify-center w-16 h-16 bg-card rounded-2xl border">
                <MotoLogLogo disabled />
              </div>

              <div className="text-center space-y-2">
                <TypographyH1 className="tracking-tighter text-4xl lg:text-6xl">
                  <Balancer>Bem vindo ao Moto Log Mobile</Balancer>
                </TypographyH1>
                <TypographyP className="text-muted-foreground lg:hidden">
                  <Balancer>instale o web app Moto Log</Balancer>
                </TypographyP>
              </div>
            </div>

            <div className="hidden lg:flex gap-x-6">
              <div className="w-fit h-fit p-1 bg-white rounded-2xl overflow-hidden">
                <Canvas
                  text={pwaUrl}
                  options={{
                    errorCorrectionLevel: "M",
                    width: 80,
                    color: {
                      dark: "#000000",
                      light: "#FFFFFF",
                    },
                  }}
                />
              </div>

              <div className="space-y-2">
                <TypographyH4 className="max-w-60">
                  Escaneie o QR Code para instalar o aplicativo
                </TypographyH4>
                <TypographyP className="text-muted-foreground text-sm">
                  Moto Log será instalado como
                  <br />
                  um aplicativo web progressivo (PWA)
                </TypographyP>
              </div>
            </div>
          </div>

          <div className="w-fit h-fit mt-8 lg:-mt-12 overflow-hidden -z-10">
            <Image
              src="/ml-mockup/mockup-3-so.png"
              width={1000}
              height={1000}
              priority={true}
              alt="Moto Log App Mockup"
              className="rounded-3xl scale-150 w-fit h-fit md:scale-100"
            />
          </div>

          <div className="text-center lg:hidden mt-12 ">
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
