interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function ProductList({ children, className }: Props) {
  return (
    <div
      className={`${className} grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 lg:gap-x-0 gap-y-2`}
    >
      {children}
    </div>
  );
}
