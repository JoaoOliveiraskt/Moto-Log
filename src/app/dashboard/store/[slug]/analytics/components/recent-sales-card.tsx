import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Props {
  recentUsers: {
    userId: string;
    image: string | null;
    name: string | null;
    email: string | null;
    totalPrice: string;
  }[];
}

export default function RecentSalesCard({ recentUsers }: Props) {
  return (
    <Card className="relative overflow-hidden border-2 border-border/25">
      <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-white/[0.04] to-transparent" />
      <CardHeader className="p-6 relative">
        <CardTitle>Vendas Recentes</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8 relative">
        {!recentUsers.length && (
          <p className="text-center">Não há vendas recentes</p>
        )}
        {recentUsers.length > 0 &&
          recentUsers.map((user) => (
            <div key={user.userId} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage
                  src={user?.image ?? ""}
                  alt={`Imagem do usuário ${user.name}`}
                />
                <AvatarFallback>
                  {(user.name ?? "")
                    .split(" ")
                    .filter((_, index) => index < 2)
                    .map((name) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm  leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="ml-auto ">{user.totalPrice}</div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
