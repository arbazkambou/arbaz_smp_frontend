import {
  deleteProduct,
  getProducts,
  getUserProducts,
} from "@/apis/productApis";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import ProductEditForm from "./ProductEditForm";
import ProductUploadForm from "./ProductUploadForm";
import { CustomModel } from "./shared/CustomModel";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { UploadimagesForm } from "./UploadimagesForm";
import BidsOnProduct from "./bids/BidsOnProduct";
import Image from "next/image";

export function ProductTable() {
  const [openModel, setIsOpenModel] = useState(false);
  const [isEditModel, setIsEditModel] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  const { data: products, isLoading } = useQuery({
    queryKey: ["userProducts"],
    queryFn: getUserProducts,
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries(["userProducts"]);
      setIsDeleteModel(false);
    },
    onError: (error) => toast.error(error.message),
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div>
        <div className="flex justify-end">
          <CustomModel
            title={"Upload Product"}
            descrption={"Enter your product details here"}
            modelTrigger={<Button variant="outline">Add Product</Button>}
            openModel={openModel}
            setIsOpenModel={setIsOpenModel}
            width={40}
          >
            <ProductUploadForm setIsOpenModel={setIsOpenModel} />
          </CustomModel>
        </div>
        {products.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>

                <TableHead>Image</TableHead>

                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  {product.images && product.images.length > 0 ? (
                    <TableHead className="relative h-[100px]">
                      <Image
                        src={product.images[0].url}
                        alt="image"
                        objectFit="cover"
                        fill
                        className="rounded-md"
                      />
                    </TableHead>
                  ) : (
                    <TableCell>{product.description}</TableCell>
                  )}
                  <TableCell>Rs {product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.age}</TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <CustomModel
                      title={"Edit Product"}
                      descrption={"Edit your product details here"}
                      modelTrigger={
                        <Edit
                          className="hover:text-green-500"
                          onClick={() => setCurrentProduct(product._id)}
                        />
                      }
                      openModel={currentProduct === product._id && isEditModel}
                      setIsOpenModel={setIsEditModel}
                    >
                      <Tabs defaultValue="general" className="w-full">
                        <TabsList>
                          <TabsTrigger value="general">General</TabsTrigger>
                          <TabsTrigger value="images">Images</TabsTrigger>
                        </TabsList>
                        <TabsContent value="general" className="w-full">
                          <ProductEditForm
                            setIsOpenModel={setIsEditModel}
                            product={product}
                          />
                        </TabsContent>
                        <TabsContent value="images">
                          <UploadimagesForm
                            setIsOpenModel={setIsEditModel}
                            product={product}
                          />
                        </TabsContent>
                      </Tabs>
                    </CustomModel>

                    <CustomModel
                      title={"Delete Product"}
                      descrption={"Are your you sure you want to delete?"}
                      modelTrigger={<Trash2 className="hover:text-red-500" />}
                      openModel={isDeleteModel}
                      setIsOpenModel={setIsDeleteModel}
                      width="50"
                    >
                      <div className="flex items-center gap-4 w-full">
                        <Button
                          variant="destructive"
                          onClick={() => mutate(product._id)}
                        >
                          {isPending ? "Deleting..." : "Delete"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsDeleteModel(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CustomModel>
                    <BidsOnProduct productId={product._id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-lg font-bold text-center">No product found 🙂</p>
        )}
      </div>
    </>
  );
}
