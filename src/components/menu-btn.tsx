import Icon from "./icons/icon-component";

interface Props {
  children?: React.ReactNode;
  className?: string;
  iconSize?: number;
}

export default function MenuBtn({ children, className, iconSize }: Props) {
  return (
    <div
      className={`cursor-pointer h-fit w-fit flex flex-col items-center
      justify-center ${className}`}
    >
      <Icon.menu size={iconSize} />

      <p className="text-xs font-medium">{children}</p>
    </div>
  );
}
