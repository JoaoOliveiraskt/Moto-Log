interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Container({ children, className, id }: ContainerProps) {
  return (
    <div
      id={`${id}`}
      className={`${className} mx-auto max-w-screen-lg lg:max-w-[1520px] px-4 md:px-12`}
    >
      {children}
    </div>
  );
}
