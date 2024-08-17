interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Container({ children, className, id }: ContainerProps) {
  return (
    <div
      id={`${id}`}
      className={`${className} mx-auto max-w-screen-lg lg:max-w-screen-xl px-4`}
    >
      {children}
    </div>
  );
}
