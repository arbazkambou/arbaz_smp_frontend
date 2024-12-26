"use client";
import { logoutUser } from "@/apis/authApis";
import Header from "@/components/Header";
import ProductUploadForm from "@/components/ProductUploadForm";
import { CustomModel } from "@/components/shared/CustomModel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarMenuButton } from "@/components/ui/sidebar";
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
import { useState } from "react";
import { ProductTable } from "../ProductTable";

function Profilepage() {
  const [openModel, setIsOpenModel] = useState(false);
  const { isAuthenticated, user: userData } = useAuth();

  const router = useRouter();
  if (!isAuthenticated) {
    router.push("/login");
  }
  return (
    <section>
      <header className="flex justify-between items-center container mx-auto py-3">
        <Header />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage src={userData.avatar} alt={userData.name} /> */}
                <AvatarFallback className="rounded-lg bg-green-200">
                  {userData.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{userData?.name}</span>
                <span className="truncate text-xs">{userData?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-lg"
            // side={isMobile ? "bottom" : "right"}
            side={"left"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
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
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
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
            <DropdownMenuItem onClick={() => logoutUser()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div>
        <div>
          <Tabs defaultValue="account" className="w-full">
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
      <div>
        <CustomModel
          title={"Upload Product"}
          descrption={"Enter your product details here"}
          modelTrigger={<Button variant="outline">Add Product</Button>}
          openModel={openModel}
          setIsOpenModel={setIsOpenModel}
        >
          <ProductUploadForm setIsOpenModel={setIsOpenModel} />
        </CustomModel>
      </div>
    </section>
  );
}

export default Profilepage;
