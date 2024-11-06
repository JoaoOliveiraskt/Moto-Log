import { Input } from "./ui/input";
import icon from "@/components/icons/icon-component";

interface Props {
  className?: string;
}

export default function SearchInput({ className }: Props) {
  return (
    <form action="#" method="POST" className="w-full h-fit">
      <div className="relative">
        <label htmlFor="" className="sr-only">
          {" "}
          Buscar{" "}
        </label>
        <icon.search
          size={25}
          className="absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <Input
          type="text"
          name="search"
          className={`h-12 w-full px-16 rounded-3xl bg-accent border-none ${className}`}
          placeholder="Buscar produtos..."
        />
      </div>
    </form>
  );
}
