import Link from "next/link";

interface Props {
  className?: string;
  link?: string;
  svgStyle?: string;
  svgWidth?: number;
  svgHeight?: number;
}

export default function MotoLogLogo({ className, link = "/", svgWidth = 128, svgHeight = 60 }: Props) {
  return (
    <Link className={`p-0 ${className}`} href={link}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox="0 0 128 60"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-[43px] fill-fg-primary "
        data-sentry-element="svg"
        data-sentry-source-file="MoToLogLogo.tsx"
        data-sentry-component="MoToLogLogo"
      >
        <title>Moto Log</title>
        <path
          d="M128 28H96V60H128V28Z"
          data-sentry-element="path"
          data-sentry-source-file="MoToLogLogo.tsx"
        ></path>
        <path
          d="M0 59.9998V31.8268L31.8268 0H59.9998V28.1731L28.1731 59.9998H0Z"
          data-sentry-element="path"
          data-sentry-source-file="MoToLogLogo.tsx"
        ></path>
        <path
          d="M48 59.9998V31.8268L79.8268 0H108V28.1731L76.1731 59.9998H48Z"
          data-sentry-element="path"
          data-sentry-source-file="MoToLogLogo.tsx"
        ></path>
      </svg>
    </Link>
  );
}
