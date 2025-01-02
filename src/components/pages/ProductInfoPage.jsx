"use client";

import { useQuery } from "@tanstack/react-query";
import BidList from "../product/BidList";
import ImageGallery from "../product/ImageGallery";
import OwnerInfo from "../product/OwnerInformation";
import ProductInfo from "../product/ProductInformation";
import { getProduct } from "@/apis/productApis";
import LoadingSpinner from "../LoadingSpinner";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Header from "../Header";
import { Skeleton } from "../ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
} from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import Link from "next/link";

export default function ProductInfoPage({ id }) {
  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  const { isAuthenticated, user: userData, isAuthLoading, logOut } = useAuth();

  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/login");
  }

  const product = {
    name: "Vintage Camera",
    description: "A beautiful vintage camera in excellent condition.",
    category: "Electronics",
    purchasedYear: 2018,
    billAvailable: true,
    boxAvailable: true,
    accessoriesAvailable: true,
    warrantyAvailable: false,
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500&text=2",
      "/placeholder.svg?height=500&width=500&text=3",
      "/placeholder.svg?height=500&width=500&text=4",
      "/placeholder.svg?height=500&width=500&text=5",
    ],
  };

  const owner = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  const bids = [
    { bidderName: "Alice", bidPrice: 150.0, bidDate: "2023-06-15T10:30:00Z" },
    { bidderName: "Bob", bidPrice: 165.5, bidDate: "2023-06-15T11:45:00Z" },
    { bidderName: "Charlie", bidPrice: 180.0, bidDate: "2023-06-15T14:20:00Z" },
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto mt-3 px-4">
      <header className="flex justify-between items-center container mx-auto py-3 mb-3 bg-muted px-3 rounded-xl">
        <Header />

        {isAuthLoading ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-green-200">
                    {userData?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {userData?.name}
                  </span>
                  <span className="truncate text-xs">{userData?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-lg"
              side={"left"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-green-200">
                      {userData?.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {userData?.name}
                    </span>
                    <span className="truncate text-xs">{userData?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup>
                <Link href={"/profile"}>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logOut()}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <ImageGallery images={data.images} />
        </div>
        <div className="space-y-8">
          <ProductInfo product={data} />
          <OwnerInfo owner={data.seller} />
          <BidList bids={bids} product={data} id={id} userId={userData._id} />
        </div>
      </div>
    </div>
  );
}
