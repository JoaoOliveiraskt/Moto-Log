import Icon from "./icons/icon-component";

interface Props {
  children?: React.ReactNode;
  className?: string;
  iconSize?: number;
}

export default function MenuBtn({ children, className, iconSize }: Props) {
  return (
    <div
      className={`cursor-pointer rounded-sm md:hover:bg-accent text-muted-foreground md:hover:text-foreground h-14 w-14 flex flex-col gap-1 items-center
      justify-center  hover:transition-colors ${className}`}
    >
      <Icon.menu size={iconSize} />

      <p className="text-xs font-medium">{children}</p>
    </div>
  );
}
