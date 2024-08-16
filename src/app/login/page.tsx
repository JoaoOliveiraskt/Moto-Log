import LoginButton from "@/components/login-button";

export default function Component() {
  return (
    <div className="relative h-screen w-full">


      <div className="relative  flex items-center justify-center h-full w-full bg-background">
        <div className="flex items-center justify-center px-4 py-12 md:px-6">
          <div className="mx-auto w-full max-w-md space-y-10">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-foreground">Login</h1>
              <p className="text-muted-foreground">
                Faça login na sua conta para continuar
              </p>
            </div>
            <div className="space-y-4">
              <LoginButton className="w-full h-12 rounded-lg" />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
