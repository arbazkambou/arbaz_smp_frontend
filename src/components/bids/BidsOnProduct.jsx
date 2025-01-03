import { useState } from "react";
import { CustomModel } from "../shared/CustomModel";
import { Button } from "../ui/button";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useQuery } from "@tanstack/react-query";
import { getBidsOnProduct } from "@/apis/bidApis";
import { formatDate } from "../helper/formateDate";

function BidsOnProduct({ productId }) {
  const [isBidModel, setIsBidModel] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["productBid", productId],
    queryFn: () => getBidsOnProduct(productId),
  });

  if (isLoading)
    return (
      <Button variant="outline" disabled>
        Show Bids
      </Button>
    );

  if (!data || data?.length === 0)
    return (
      <Button variant="outline" disabled>
        Show Bids
      </Button>
    );

  return (
    <CustomModel
      title={"Bids"}
      descrption={"Here is a list of bids placed on this product"}
      modelTrigger={<Button variant="outline">Show Bids</Button>}
      openModel={isBidModel}
      setIsOpenModel={setIsBidModel}
      width="50"
    >
      <div className="flex items-center gap-4 w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Contact</TableHead>
            </TableRow>
          </TableHeader>

          {data.map((bid, index) => (
            <TableRow>
              <TableCell>{bid.buyer.name}</TableCell>
              <TableCell>Rs {bid.bidAmount}</TableCell>
              <TableCell>{formatDate(bid.createdAt)}</TableCell>
              <TableCell>{bid.message}</TableCell>
              <TableCell>{bid.buyer.email}</TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </CustomModel>
    // null
  );
}

export default BidsOnProduct;
