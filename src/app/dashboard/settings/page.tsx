import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EditStore() {
  return (
    <main className="w-full flex flex-col space-y-10">
      <Card x-chunk="dashboard-07-chunk-0" className="">
        <CardHeader className="px-6 mt-6 space-y-2 mb-5">
          <CardTitle className="text-3xl ">Atualize sua loja</CardTitle>
          <CardDescription>
            Atualize o nome da sua loja e a descrição, ou exclua
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                className="max-w-xl"
                defaultValue={"Nome da loja"}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                defaultValue={"Descrição da loja"}
                className="min-h-32 max-w-xl"
              />
            </div>
          </div>
          <Button className="mt-6">Atualizar</Button>
        </CardContent>
      </Card>
    </main>
  );
}
