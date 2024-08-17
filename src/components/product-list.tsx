interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default async function ProductList({ children, className }: Props) {
  return (
    <div
      className={`${className} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4`}
    >
      {children}
    </div>
  );
}
