import icon from "./icons/icon-component";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

interface Props {
  className?: string;
  size?: number;
}

export default function LikeButton({className, size = 18}: Props) {
  const showLikedToast = () => {
    toast({
      title: "Produto adicionado aos favoritos",
    });
  };

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      onClick={showLikedToast}
      className={`flex items-center justify-center rounded-full border-none ${className}`}
    >
      <icon.like size={size} />
    </Button>
  );
}
