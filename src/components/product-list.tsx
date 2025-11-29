interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function ProductList({ children, className }: Props) {
  return (
    <div
      className={`${className} grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4`}
    >
      {children}
    </div>
  );
}
