import { getProducts } from "@/actions/products";
import ProductGrid from "@/components/ui/ProductGrid";
import Image from "next/image";

export default async function Home() {

  const products = await getProducts();
  return <ProductGrid products={products} />
}
