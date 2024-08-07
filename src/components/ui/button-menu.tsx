import IconComponent from "../icons/icon-component";
import { Button } from "./button";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function MenuButton({ children, onClick }: Props) {
  return (
    <div
      className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
    >
      <Button
        variant="icon"
        size="icon"
        className={`flex flex-col gap-1 cursor-pointer outline-none h-14 w-14 border-none`}
      >
        <IconComponent iconName="order" color="foreground"/>
        {children}
      </Button>

    </div>
  );
}
