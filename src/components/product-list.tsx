interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default async function ProductList({ children, className }: Props) {
  return (
    <div
      className={`${className} grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 `}
    >
      {children}
    </div>
  );
}
