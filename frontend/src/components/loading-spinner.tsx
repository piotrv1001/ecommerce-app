import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";

type LoadingSpinnerProps = {
  className?: string;
};

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <LoaderCircleIcon
      className={cn("animate-spin size-6 mx-auto", className)}
    />
  );
}
