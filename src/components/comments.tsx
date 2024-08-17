import { GoStarFill } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Comments() {
  return (
    <div className="mt-8 space-y-2">
      <h2 className="text-2xl mb-4">Comentários</h2>
      <div className="grid gap-4 max-w-screen-sm">
        <div className="flex gap-2">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div className="w-full space-y-1">
              <div className="flex gap-2">
                <h3 className="font-medium text-sm">Sarah Johnson</h3>
                <span className="text-sm text-muted-foreground">
                  2 days ago
                </span>
              </div>
              <div className="flex items-center gap-1">
                <GoStarFill size={12} />
                <GoStarFill size={12} />
                <GoStarFill size={12} />
                <GoStarFill size={12} />
                <GoStarFill size={12} />
              </div>
            </div>
            <div className="grid gap-2">
              <p className="text-muted-foreground text-sm">
                ve been using this backpack for a few weeks now and been a great
                addition to my daily routine. The leather is high-quality and
                the design is both stylish and practical. Highly recommend!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 max-w-screen-sm">
        <div className="flex gap-2">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div className="w-full space-y-1">
              <div className="flex gap-2">
                <h3 className="font-medium text-sm">Sarah Johnson</h3>
                <span className="text-sm text-muted-foreground">
                  2 days ago
                </span>
              </div>
              <div className="flex items-center gap-1">
                <GoStarFill size={12} />
                <GoStarFill size={12} />
                <GoStarFill size={12} />
                <GoStarFill size={12} />
                <GoStarFill size={12} />
              </div>
            </div>
            <div className="grid gap-2">
              <p className="text-muted-foreground text-sm">
                ve been using this backpack for a few weeks now and been a great
                addition to my daily routine. The leather is high-quality and
                the design is both stylish and practical. Highly recommend!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 max-w-screen-sm">
        <div className="flex gap-2">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div className="w-full space-y-1">
              <div className="flex gap-2">
                <h3 className="font-medium text-sm">Sarah Johnson</h3>
                <span className="text-sm text-muted-foreground">
                  2 days ago
                </span>
              </div>
              <div className="flex items-center gap-1">
                <GoStarFill size={12} />
                <GoStarFill size={12} />
                <GoStarFill size={12} />
                <GoStarFill size={12} />
                <GoStarFill size={12} />
              </div>
            </div>
            <div className="grid gap-2">
              <p className="text-muted-foreground text-sm">
                ve been using this backpack for a few weeks now and been a great
                addition to my daily routine. The leather is high-quality and
                the design is both stylish and practical. Highly recommend!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 max-w-screen-sm">
        <div className="flex gap-2">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div className="w-full space-y-1">
              <div className="flex gap-2">
                <h3 className="font-medium text-sm">Sarah Johnson</h3>
                <span className="text-sm text-muted-foreground">
                  2 days ago
                </span>
              </div>
              <div className="flex items-center gap-1">
                <GoStarFill size={12} />
                <GoStarFill size={12} />
                <GoStarFill size={12} />
                <GoStarFill size={12} />
                <GoStarFill size={12} />
              </div>
            </div>
            <div className="grid gap-2">
              <p className="text-muted-foreground text-sm">
                ve been using this backpack for a few weeks now and been a great
                addition to my daily routine. The leather is high-quality and
                the design is both stylish and practical. Highly recommend!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
