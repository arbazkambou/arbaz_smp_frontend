import { getProduct } from "@/apis/productApis";
import ProductInfoPage from "@/components/pages/ProductInfoPage";

async function page({ params }) {
  return <ProductInfoPage id={params.id} />;
}

export default page;
