import { RxMagnifyingGlass } from "react-icons/rx";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
  className?: string;
}

export default function SearchInput({ className }: Props) {
  return (
    <form action="#" method="POST" className={`${className}`}>
      <div className="relative">
        <label htmlFor="" className="sr-only">
          {" "}
          Buscar{" "}
        </label>
        <RxMagnifyingGlass
          size={25}
          className="absolute start-4 top-1/2 -translate-y-1/2"
        />

        <Input
          type="text"
          name="search"
          className="h-12 w-full px-14 rounded-3xl bg-accent"
          placeholder="Buscar produtos..."
        />
      </div>
    </form>
  );
}
