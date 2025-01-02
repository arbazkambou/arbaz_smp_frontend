import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPurchaseYear } from "../helper/getPurchaseYear";

export default function ProductInfo({ product }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-green-800">{product.name}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
      </div>
      <Separator className="bg-green-200" />
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-green-700">
          Product Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Category</p>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {product.category}
            </Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Purchased Year</p>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {getPurchaseYear(product.age)}
            </Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Bill Available</p>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {product.billAvailable ? "Yes" : "No"}
            </Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Box Available</p>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {product.boxAvailable ? "Yes" : "No"}
            </Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Accessories Available</p>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {product.accessoriesAvailable ? "Yes" : "No"}
            </Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Warranty Available</p>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {product.warrantyAvailable ? "Yes" : "No"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
