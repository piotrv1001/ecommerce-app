import { Product } from "@/types/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[250px] object-cover rounded-md"
        ></img>
      </CardContent>
      <CardFooter>
        <Button>Add to cart</Button>
      </CardFooter>
    </Card>
  );
}
