import { getProducts } from "@/actions/products";
import ProductGrid from "@/components/ui/ProductGrid";
import Image from "next/image";

export default async function Home() {

  const products = await getProducts();
  const shoeProducts = products.filter(
    (product: any) => product.categories?.some((cat: any) => cat.name.toLowerCase() === 'shoes')
  );
  const limitedProducts = shoeProducts.slice(0, 8);
  return <ProductGrid products={limitedProducts} />
}
