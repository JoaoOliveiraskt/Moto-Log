import Icon from "../icons/icon-component";

interface Props {
  size?: number;
}

export default function Loader({size = 18}: Props) {
  return (
    <Icon.loading size={size} className="animate-spin" />
  )
}