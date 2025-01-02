import { getProducts, updateProductStatus } from "@/apis/productApis";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { formatDate } from "../helper/formateDate";
import LoadingSpinner from "../LoadingSpinner";
import { Button } from "../ui/button";

export function AdminManageProductTable() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { data: products, isLoading } = useQuery({
    queryKey: ["userProducts"],
    queryFn: getProducts,
  });
  console.log("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProductStatus,
    onSuccess: () => {
      toast.success("Status update successfully!");
      queryClient.invalidateQueries(["userProducts"]);
    },
    onError: (error) => toast.error(error.message),
  });

  function handleStatusChange(productId, productStatus, index) {
    setSelectedIndex(index);
    mutate({ productId, productStatus });
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div>
        {products.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added On</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.seller.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.age}</TableCell>
                  <TableCell className=" capitalize">
                    {product.status}
                  </TableCell>
                  <TableCell>{formatDate(product.createdAt)}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {/* <CustomModel
                      title={"Edit Product"}
                      descrption={"Edit your product details here"}
                      modelTrigger={<Edit className="hover:text-green-500" />}
                      openModel={isEditModel}
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
                    </CustomModel> */}

                    {product.status === "pending" && (
                      <div className="flex justify-center items-center gap-2">
                        {isPending ? (
                          "Processing..."
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              onClick={() =>
                                handleStatusChange(
                                  product._id,
                                  "approved",
                                  index
                                )
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() =>
                                handleStatusChange(
                                  product._id,
                                  "rejected",
                                  index
                                )
                              }
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    )}

                    {product.status === "approved" && (
                      <div className="flex justify-center items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleStatusChange(product._id, "blocked", index)
                          }
                        >
                          {isPending && index === selectedIndex
                            ? "Processing..."
                            : "Block"}
                        </Button>
                      </div>
                    )}

                    {product.status === "blocked" && (
                      <div className="flex justify-center items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleStatusChange(product._id, "approved", index)
                          }
                        >
                          {isPending && index === selectedIndex
                            ? "Processing..."
                            : "Unblock"}
                        </Button>
                      </div>
                    )}

                    {product.status === "rejected" && (
                      <div className="flex justify-center items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleStatusChange(product._id, "approved", index)
                          }
                        >
                          {isPending && index === selectedIndex
                            ? "Processing..."
                            : "Approve"}
                        </Button>
                      </div>
                    )}
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
