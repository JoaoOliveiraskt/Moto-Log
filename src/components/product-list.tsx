interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default async function ProductList({ children, className }: Props) {
  return (
    <div
      className={`${className} grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5`}
    >
      {children}
    </div>
  );
}
