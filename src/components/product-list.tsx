interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default async function ProductList({ children, className }: Props) {
  return (
    <div
      className={`${className} grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4`}
    >
      {children}
    </div>
  );
}
