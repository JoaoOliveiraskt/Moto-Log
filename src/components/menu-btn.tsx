import Icon from "./icons/icon-component";

interface Props {
  className?: string;
  iconSize?: number;
}

export default function MenuBtn({ className, iconSize }: Props) {
  return (
    <div
      className={`cursor-pointer h-fit w-fit flex items-center justify-center ${className}`}
    >
      <Icon.user size={iconSize} className="text-muted lg:text-foreground" />
    </div>
  );
}
