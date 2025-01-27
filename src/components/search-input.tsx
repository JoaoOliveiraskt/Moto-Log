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
          size={18}
          className="absolute start-4 top-1/2 -translate-y-1/2"
        />

        <Input
          type="text"
          name="search"
          className={`h-10 w-full px-12 rounded-full bg-accent  border-none ${className}`}
          placeholder="Buscar produtos..."
        />
      </div>
    </form>
  );
}
