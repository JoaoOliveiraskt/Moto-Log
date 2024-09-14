import Link from "next/link";
import Container from "./container";
import Icon from "./icons/icon-component";
import MotoLogLogo from "./icons/moto-log-logo";

export default function Footer() {
  return (
    <>
      <Container className="mt-10 sm:mt-16 md:mt-32 pb-24 lg:pb-12">
        <footer className="flex flex-col gap-5 md:gap-16 mx-auto max-w-screen-lg">
          <div className="flex flex-col sm:flex-row gap-6 justify-between sm:items-center border-t">
            <div className="max-w-sm flex w-full">
              <div className="flex flex-col">
                <div className="space-x-4 flex items-center">
                  <MotoLogLogo />
                  <h3 className="text-2xl uppercase">Moto Log</h3>
                </div>
                <p className="text-foreground text-center tracking-tight lg:text-left ">
                  Uma plataforma digital para lojas e entregas.
                </p>
              </div>
            </div>
            <div className="flex sm:justify-center gap-4 lg:justify-start text-muted-foreground">
              <Link
                className="hover:text-foreground"
                href="https://github.com/JoaoOliveiraskt/Moto-Log"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Github </span>
                <Icon.github size={24} />
              </Link>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-center text-xs/relaxed text-muted-dforeground">
              © Moto Log. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </Container>
    </>
  );
}
