import { cn } from "@/lib/utils";
import Icon from "../icons/icon-component";

interface Props {
  size?: number;
  className?: string;
}

export default function Loader({ size = 18, className }: Props) {
  return <Icon.loading size={size} className={cn("animate-[spin_1.5s_linear_infinite]", className)} />;
}
