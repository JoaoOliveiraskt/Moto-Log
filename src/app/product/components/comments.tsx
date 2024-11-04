import TypographyH3 from "@/components/typography/typography-h3";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import icon from "@/components/icons/icon-component";

export default function Comments() {
  return (
    <div className="mt-8 space-y-2">
      <TypographyH3 className="mb-4">Comentários</TypographyH3>
      <div className="grid gap-4 max-w-screen-sm">
        <div className="flex gap-2">
          <Avatar className="w-10 h-10 border">
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
                <icon.star size={12} />
                <icon.star size={12} />
                <icon.star size={12} />
                <icon.star size={12} />
                <icon.star size={12} />
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
                <icon.star size={12} />
                <icon.star size={12} />
                <icon.star size={12} />
                <icon.star size={12} />
                <icon.star size={12} />
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
                <icon.star size={12} />
                <icon.star size={12} />
                <icon.star size={12} />
                <icon.star size={12} />
                <icon.star size={12} />
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
                <icon.star size={12} />
                <icon.star size={12} />
                <icon.star size={12} />
                <icon.star size={12} />
                <icon.star size={12} />
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
