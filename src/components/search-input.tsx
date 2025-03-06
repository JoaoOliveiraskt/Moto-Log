import { Input } from "@/components/ui/input";
import Icon from "@/components/icons/icon-component";

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
        <Icon.search
          size={18}
          className="absolute start-3 lg:start-4 top-1/2 -translate-y-1/2 text-muted lg:text-muted-foreground"
        />

        <Input
          id="search"
          type="text"
          name="search"
          className={`h-12 w-full px-10 lg:px-12 rounded-full bg-accent border-none placeholder:text-muted lg:placeholder:text-muted-foreground  ${className}`}
          placeholder="Pesquisar..."
        />
      </div>
    </form>
  );
}
