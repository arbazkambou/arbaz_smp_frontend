"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/providers/AuthProvider";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

function Homepage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    return router.push("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center  gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 w-full">
          <div className="flex items-center justify-content-between gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Header />
          </div>
        </header>
        <div className="mx-4 mb-3">
          <form className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
            >
              <Search className="h-5 w-5 text-gray-400" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Homepage;
