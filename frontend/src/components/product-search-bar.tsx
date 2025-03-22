import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import ClearableInput from "./clearable-input";

type ProductSearchBarProps = {
  search: string;
  onSearchChange: (search: string) => void;
  onSubmit: () => void;
};

export default function ProductSearchBar({
  search,
  onSearchChange,
  onSubmit,
}: ProductSearchBarProps) {
  return (
    <div className="flex items-center gap-x-2 flex-1">
      <ClearableInput
        className="bg-background"
        type="text"
        placeholder="Search products..."
        search={search}
        onSearchChange={onSearchChange}
      />
      <Button onClick={onSubmit}>
        <SearchIcon className="size-4" />
      </Button>
    </div>
  );
}
