import { deleteImageFromProduct, uploadImages } from "@/apis/productApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

export function UploadimagesForm({ setIsOpenModel, product }) {
  const [previews, setPreviews] = useState([]);
  const [deletingImgId, setDeletingImgId] = useState(null);
  const { register, handleSubmit, watch, reset } = useForm();
  const watchImages = watch("images");
  const queryClient = useQueryClient();
  useEffect(() => {
    if (watchImages && watchImages.length > 0) {
      const data = Array.from(watchImages);
      const imgPreviews = data.map((file) => URL.createObjectURL(file));
      setPreviews(imgPreviews);
      return () => {
        imgPreviews.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setPreviews([]);
    }
  }, [watchImages]);

  const { mutate, isPending } = useMutation({
    mutationFn: uploadImages,
    onSuccess: () => {
      toast.success("Images uploaded successuly!");
      queryClient.invalidateQueries(["userProducts"]);
      reset();
    },
    onError: () => {
      toast.error("Images uploading failed!");
    },
  });

  const { mutate: deletImageFromProductApi, isPending: isDeleting } =
    useMutation({
      mutationFn: deleteImageFromProduct,
      onSuccess: () => {
        toast.success("Images deleted successuly!");
        queryClient.invalidateQueries(["userProducts"]);
      },
      onError: () => {
        toast.error("Image deleting failed!");
      },
    });

  function onSubmit(data) {
    const formData = new FormData();
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    mutate({ productId: product._id, imagesData: formData });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {product.images.length > 0 && (
        <div className="mt-6 mb-6">
          <h2>Existing Images</h2>
          <div className="grid grid-cols-5 place-content-between mt-1 gap-3 w-full mb-3">
            {product.images.map((img, index) => (
              <Card className="p-2 ">
                {/* Image Component */}
                <Image
                  key={index}
                  src={img.url}
                  alt={`Preview ${index}`}
                  height={200}
                  width={200}
                  className="object-cover"
                />

                <div
                  aria-label="Delete Image"
                  disabled={isDeleting}
                  className="flex items-center justify-center"
                >
                  {isDeleting && deletingImgId === index ? (
                    <p className="text-red-500 text-sm font-semibold mt-2">
                      Deleting...
                    </p>
                  ) : (
                    <Trash2Icon
                      onClick={() => {
                        setDeletingImgId(index);
                        deletImageFromProductApi({
                          productId: product._id,
                          publicId: img.public_id,
                        });
                      }}
                      className=" hover:text-red-500 mt-2"
                      size={18}
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
      <Input
        type="file"
        multiple
        accept="image/*"
        disabled={isPending}
        {...register("images", {
          required: "Please select at least one image.",
        })}
      />
      {previews.length > 0 && (
        <div className="mt-6 mb-6">
          <h2>Ready for upload</h2>
          <div className="grid grid-cols-5 place-content-between mt-2 gap-3 w-full">
            {previews.map((img, index) => (
              <Card className="p-2">
                <Image
                  key={index}
                  src={img}
                  alt={`Preview ${index}`}
                  height={150}
                  width={150}
                />
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end items-center mt-4">
        <div className="space-x-2">
          <Button disabled={previews.length === 0 || isPending} type="submit">
            {isPending ? "Processing..." : "Upload"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsOpenModel(false)}
            disabled={isPending}
            type="cancel"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
