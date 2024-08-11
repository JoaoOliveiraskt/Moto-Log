interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`${className} mx-auto max-w-screen-sm md:max-w-screen-lg lg:max-w-screen-xl px-4`}
    >
      {children}
    </div>
  );
}
