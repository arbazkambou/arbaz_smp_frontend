"use client";
import { logoutUser } from "@/apis/authApis";
import Header from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/providers/AuthProvider";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductTable } from "../ProductTable";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

function Profilepage() {
  const { isAuthenticated, user: userData, isAuthLoading, logOut } = useAuth();

  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/login");
  }

  return (
    <section>
      <header className="flex justify-between items-center container mx-auto py-3">
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

                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
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
      <div className="container mx-auto">
        <div>
          <Tabs defaultValue="product" className="w-full">
            <TabsList>
              <TabsTrigger value="product">Product</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="username">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="product" className="w-full">
              <ProductTable />
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
            <TabsContent value="username">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default Profilepage;
