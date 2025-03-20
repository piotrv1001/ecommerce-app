import * as React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ClearableInputProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function ClearableInput({
  search,
  onSearchChange,
  className,
  ...props
}: React.ComponentProps<"input"> & ClearableInputProps) {
  return (
    <div className="relative w-full">
      <Input
        {...props}
        className={cn("w-full", className)}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Button
        hidden={!search}
        onClick={() => onSearchChange("")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 size-6"
        variant="ghost"
      >
        <XIcon className="size-4" />
      </Button>
    </div>
  );
}
