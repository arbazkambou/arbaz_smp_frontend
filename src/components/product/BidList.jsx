import { getBidsOnProduct, placeBid } from "@/apis/bidApis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CustomModel } from "../shared/CustomModel";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Skeleton } from "../ui/skeleton";
import { formatDate } from "../helper/formateDate";

export default function BidList({ bids, product, id, userId }) {
  const [isOpenModel, setIsOpenModel] = useState(false);

  const { register, handleSubmit, formState: errors, reset } = useForm();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: placeBid,
    onSuccess: () => {
      toast.success("Bid has been placed");
      queryClient.invalidateQueries(["product", id]);
      reset();
      setIsOpenModel(false);
    },
    onError: () => toast.error("Could not place bid"),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["bids", product._id],
    queryFn: () => getBidsOnProduct(product._id),
  });

  function onSubmit(formData) {
    formData.buyer = userId;
    formData.product = product._id;
    formData.seller = product.seller._id;

    mutate(formData);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <CardTitle className="text-green-800">Bids on Product</CardTitle>
          <CustomModel
            modelTrigger={
              <Button
                variant="outline"
                className="shadow-md border-dotted border-[2px] border-green-200 disabled:cursor-not-allowed"
                onClick={() => setIsOpenModel(true)}
                disabled={userId === product.seller._id}
              >
                Place a Bid
              </Button>
            }
            setIsOpenModel={setIsOpenModel}
            openModel={isOpenModel}
            title={"New Bid"}
            descrption={"You can place your bid here"}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="bidAmount">Bid Amount</Label>
                  <Input
                    id="bidAmount"
                    type="number"
                    {...register("bidAmount", {
                      required: "Bid amount is required",
                    })}
                  />
                  {errors.bidAmount && (
                    <p className="text-red-600 text-xs">
                      {errors.bidAmount.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    {...register("message", {
                      required: "Bid message is required",
                    })}
                  />
                  {errors.message && (
                    <p className="text-red-600 text-xs">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col justify-center gap-2">
                  <Button type="submit">
                    {isPending ? "Placing..." : "Place a bid"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsOpenModel(false)}
                    type="reset"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </CustomModel>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <Skeleton />
        ) : (
          product.showBids &&
          data.map((bid, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-green-50 p-3"
            >
              <div>
                <p className="font-semibold text-green-800">{bid.buyer.name}</p>
                <p className="text-sm text-green-600">
                  {formatDate(bid.createdAt)}
                </p>
              </div>
              <p className="text-lg font-bold text-green-700">
                ${bid.bidAmount}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
