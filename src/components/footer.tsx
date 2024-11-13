import { Link } from "next-view-transitions";
import Container from "./container";
import Icon from "./icons/icon-component";
import MotoLogLogo from "./icons/moto-log-logo";

export default function Footer() {
  return (
    <>
      <Container className="mt-10 sm:mt-16 md:mt-32 pb-24 lg:pb-12">
        <footer className="flex flex-col gap-6 mx-auto max-w-[1440px]">
          <div className="flex justify-between items-center">
            <div className="space-x-4 flex items-center">
              <MotoLogLogo disabled={true} />
              <h3 className="text-2xl uppercase font-extrabold tracking-tighter">
                Moto Log
              </h3>
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

          <div className="">
            <p className="text-xs/relaxed text-muted-foreground">
              © Moto Log. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </Container>
    </>
  );
}
