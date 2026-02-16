import { getProducts } from "@/actions/products";
import ProductGrid from "@/components/ui/ProductGrid";

export default async function Hoodies() {
  const products = await getProducts();
  
  const filteredProducts = products.filter(
    (product) => product.categories?.some((cat: any) => cat.name.toLowerCase() === 'hoodies')
  );

  return <ProductGrid products={filteredProducts} />;
}
