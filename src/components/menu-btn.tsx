import Icon from "./icons/icon-component";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function MenuBtn({ children, className }: Props) {
  return (
    <div
      className={`rounded-md hover:bg-accent hover:text-foreground h-9 w-9 flex flex-col gap-1 items-center justify-center text-muted-foreground hover:transition-colors ${className}`}
    >
      <Icon.menu size={20} />

      <p className="text-muted-foreground hover:text-foreground text-sm">
        {children}
      </p>
    </div>
  );
}
