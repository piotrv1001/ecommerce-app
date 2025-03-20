import { cn } from "@/lib/utils";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Container({ children, className }: ContainerProps) {
  return <div className={cn("max-w-[1320px] p-4", className)}>{children}</div>;
}
