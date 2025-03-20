type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div className="max-w-[1320px] p-4">{children}</div>;
}
