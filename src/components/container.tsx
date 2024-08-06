interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={`${className} mx-auto max-w-screen-xl px-4 lg:px-0`}>
      {children}
    </div>
  );
}