// import { useState } from "react";
// import { CustomModel } from "../shared/CustomModel";
// import { Button } from "../ui/button";
// import {
//   Table,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { useQuery } from "@tanstack/react-query";
// import { getAllBids, getBidsOnProduct } from "@/apis/bidApis";
// import { formatDate } from "../helper/formateDate";

// function MyBidsTable() {
//   const [isBidModel, setIsBidModel] = useState(false);
//   const { data, isLoading } = useQuery({
//     queryKey: ["myBids"],
//     queryFn: () => getAllBids(),
//   });

//   if (isLoading)
//     return (
//       <Button variant="outline" disabled>
//         Show Bids
//       </Button>
//     );

//   if (!data)
//     return (
//       <Button variant="outline" disabled>
//         Show Bids
//       </Button>
//     );

//   return (
//     <CustomModel
//       title={"Bids"}
//       descrption={"Here is a list of bids placed on this product"}
//       modelTrigger={<Button variant="outline">Show Bids</Button>}
//       openModel={isBidModel}
//       setIsOpenModel={setIsBidModel}
//       width="50"
//     >
//       <div className="flex items-center gap-4 w-full">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Product</TableHead>
//               <TableHead>Bid Placed</TableHead>
//               <TableHead>Seller</TableHead>
//               <TableHead>Bid Amount</TableHead>
//               <TableHead>Message</TableHead>
//               <TableHead>Contact Detail</TableHead>
//             </TableRow>
//           </TableHeader>

//           {data.map((bid, index) => (
//             <TableRow>
//               <TableCell>{bid.buyer.name}</TableCell>
//               <TableCell>Rs {bid.bidAmount}</TableCell>
//               <TableCell>{formatDate(bid.createdAt)}</TableCell>
//               <TableCell>{bid.message}</TableCell>
//               <TableCell>{bid.buyer.email}</TableCell>
//             </TableRow>
//           ))}
//         </Table>
//       </div>
//     </CustomModel>
//   );
// }

// export default MyBidsTable;

import { getUserProducts } from "@/apis/productApis";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";
import { getAllBids } from "@/apis/bidApis";
import { useAuth } from "@/providers/AuthProvider";
import { formatDate } from "../helper/formateDate";

export default function ProductTable() {
  const { data: myBids, isLoading } = useQuery({
    queryKey: ["myBids"],
    queryFn: getAllBids,
  });

  const { user, isAuthenticated, isAuthLoading } = useAuth();

  if (isLoading || isAuthLoading) return <LoadingSpinner />;

  // const myBids=myBids.filter((bid)=>)
  return (
    <>
      <div>
        {myBids.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Bid Placed</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Bid Amount</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Contact Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myBids.map((bid) => (
                <TableRow>
                  <TableCell>{bid.product.name}</TableCell>
                  <TableCell>{formatDate(bid.createdAt)}</TableCell>
                  <TableCell>{bid.seller.name}</TableCell>
                  <TableCell>Rs {bid.bidAmount}</TableCell>
                  <TableCell>{bid.message}</TableCell>
                  <TableCell>{bid.buyer.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-lg font-bold text-center">No bids found 🙂</p>
        )}
      </div>
    </>
  );
}
