import Container from "@/components/container";
import LoginButton from "@/components/login-button";

export default function Component() {
  return (
    <Container className="relative h-screen w-full md:-mt-36">
      <div className="flex items-center justify-center h-full">
        <div className="mx-auto w-full max-w-xs space-y-10">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold text-foreground">Login</h1>
            <p className="text-muted-foreground">
              Faça login na sua conta para continuar
            </p>
          </div>
          <div className="space-y-4">
            <LoginButton className="w-full h-12" />
            <div className="border-b"></div>
          </div>
        </div>
      </div>
    </Container>
  );
}
