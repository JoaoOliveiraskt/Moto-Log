interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Container({ children, className, id }: ContainerProps) {
  return (
    <div className="w-full max-w-screen">
      <div
        id={`${id}`}
        className={`${className} mx-auto max-w-screen-lg lg:max-w-[1290px] px-4 xl:px-0 pb-20`}
      >
        {children}
      </div>
    </div>
  );
}
