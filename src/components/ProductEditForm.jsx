"use client";

import { addProduct, updateProduct } from "@/apis/productApis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ProductEditForm({ setIsOpenModel, product }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: product,
  });
  const queryCLient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryCLient.invalidateQueries(["userProducts"]);
      toast.success("Product updated!");
      reset();
      setIsOpenModel(false);
    },
    onError: () => {
      toast.error("Updating product failed");
    },
  });

  function onSubmit(formData) {
    mutate({ productId: product._id, productData: formData });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            {...register("name", {
              required: "Product name is required",
              minLength: {
                value: 4,
                message: "Product name should be greater than 3 characters",
              },
            })}
            disabled={isPending}
            defaultValue={product.name}
          />
          {errors.name && (
            <p className="text-red-600 text-xs">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description", {
              required: "Product description is required",
              minLength: {
                value: 4,
                message:
                  "Product description should be greater than 3 characters",
              },
            })}
            disabled={isPending}
          />
          {errors.description && (
            <p className="text-red-600 text-xs">{errors.description.message}</p>
          )}
        </div>
        <div className="grid lg:grid-cols-3 gap-3">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              {...register("price", {
                required: "Product price is required",
              })}
              disabled={isPending}
            />
            {errors.price && (
              <p className="text-red-600 text-xs">{errors.price.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              {...register("age", {
                required: "Product age is required",
              })}
              disabled={isPending}
            />
            {errors.age && (
              <p className="text-red-600 text-xs">{errors.age.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              disabled={isPending}
              rules={{ required: "Product category is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-600 text-xs">{errors.category.message}</p>
            )}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="flex items-center space-x-2">
            <Controller
              name="billAvailable"
              control={control}
              disabled={isPending}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="billAvailable"
                />
              )}
            />
            <label htmlFor="billAvailable">Bill Available</label>
          </div>
          <div className="flex items-center space-x-2">
            <Controller
              name="warrantyAvailable"
              control={control}
              disabled={isPending}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="warrantyAvailable"
                />
              )}
            />

            <label htmlFor="warrantyAvailable">Warranty Available</label>
          </div>
          <div className="flex items-center space-x-2">
            <Controller
              name="boxAvailable"
              control={control}
              disabled={isPending}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="boxAvailable"
                />
              )}
            />
            <label htmlFor="boxAvailable">Box Available</label>
          </div>
          <div className="flex items-center space-x-2">
            <Controller
              name="accessoriesAvailable"
              control={control}
              disabled={isPending}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="accessoriesAvailable"
                />
              )}
            />

            <label htmlFor="accessoriesAvailable">Accessories Available</label>
          </div>
          <div className="flex items-center space-x-2">
            <Controller
              name="showBids"
              control={control}
              disabled={isPending}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="showBids"
                />
              )}
            />

            <label htmlFor="showBids">Show Bids on product</label>
          </div>
        </div>
        <div className="grid gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Processing..." : "Upload"}
          </Button>
          <Button
            variant="outline"
            type="reset"
            onClick={() => {
              setIsOpenModel(false);
            }}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
