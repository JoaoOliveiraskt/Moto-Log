import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import LoginButton from "@/components/login-button"

export default function Component() {
  return (
    <div className="grid md:grid-cols-2 h-screen w-full">
      <div className="flex items-center justify-center px-4 py-12 md:px-6">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground">Faça login na sua conta para continuar</p>
          </div>
          <div className="space-y-4">
            <LoginButton className="w-full"/>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted hidden md:block">
      <Image
          src="/placeholder.svg"
          alt="Login Image"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}