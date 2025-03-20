import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import Container from "./container";
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
    <Container className="flex items-center gap-x-2 bg-gray-200">
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
    </Container>
  );
}
