import { Link } from "next-view-transitions";

interface Props {
  className?: string;
  link?: string;
  svgStyle?: string;
  svgWidth?: number;
  svgHeight?: number;
  disabled?: boolean;
}

export default function MotoLogLogo({
  className,
  link = "/",
  svgWidth = 128,
  svgHeight = 60,
  disabled = false,
}: Props) {
  return disabled ? (
    <div className={`p-0 ${className}`}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox="0 0 128 60"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-[43px]"
      >
        <title>Moto Log</title>
        <path d="M128 28H96V60H128V28Z"></path>
        <path d="M0 59.9998V31.8268L31.8268 0H59.9998V28.1731L28.1731 59.9998H0Z"></path>
        <path d="M48 59.9998V31.8268L79.8268 0H108V28.1731L76.1731 59.9998H48Z"></path>
      </svg>
    </div>
  ) : (
    <Link className={`p-0 ${className}`} href={link}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox="0 0 128 60"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-[43px]"
      >
        <title>Moto Log</title>
        <path d="M128 28H96V60H128V28Z"></path>
        <path d="M0 59.9998V31.8268L31.8268 0H59.9998V28.1731L28.1731 59.9998H0Z"></path>
        <path d="M48 59.9998V31.8268L79.8268 0H108V28.1731L76.1731 59.9998H48Z"></path>
      </svg>
    </Link>
  );
}
