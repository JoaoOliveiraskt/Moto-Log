import { RxMagnifyingGlass } from "react-icons/rx";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
  className?: string;
}

export default function SearchInput({ className }: Props) {
  return (
    <form action="#" method="POST" className={`${className} bg-background h-fit rounded-xl`}>
      <div className="w-full h-full relative rounded-lg overflow-hidden">
        <label htmlFor="" className="sr-only">
          {" "}
          Buscar{" "}
        </label>
        <RxMagnifyingGlass
          size={16}
          className="absolute start-4 top-1/2 -translate-y-1/2"
        />

        <Input
          type="text"
          name="search"
          className=" rounded-lg h-10 w-full px-10 text-lg"
          placeholder="Buscar produtos..."
        />
        <Button
          variant={"secondary"}
          type="button"
          className="absolute rounded-none text-popover h-full end-0 top-1/2 -translate-y-1/2 text-sm font-medium transition"
        >
          <p> Buscar </p>
        </Button>
      </div>
    </form>
  );
}
