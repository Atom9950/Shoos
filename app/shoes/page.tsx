import { getProducts } from "@/actions/products";
import ProductGrid from "@/components/ui/ProductGrid";

export default async function Shoes() {
  const products = await getProducts();
  
  const filteredProducts = products.filter(
    (product) => product.categories?.some((cat: any) => cat.name.toLowerCase() === 'shoes')
  );

  return <ProductGrid products={filteredProducts} category="Shoes" />;
}
