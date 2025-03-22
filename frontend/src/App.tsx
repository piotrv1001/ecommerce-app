import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductsContainer from "./components/products-container";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsContainer />      
    </QueryClientProvider>
  );
}
