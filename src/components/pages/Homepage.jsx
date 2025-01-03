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
import ProductCard from "../product/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/apis/productApis";
import LoadingSpinner from "../LoadingSpinner";
import { useFilter } from "@/providers/FilterProvider";

function Homepage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { ageFilter, categoryFilter, searchFilter, setSearchFilter } =
    useFilter();
  const data = [
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Premium Wireless Headphones",
      description:
        "Experience crystal-clear audio with our premium wireless headphones. Perfect for music lovers and professionals alike.",
      price: 199.99,
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Smart Fitness Tracker",
      description:
        "Track your health and fitness goals with our advanced smart fitness tracker. Features include heart rate monitoring, sleep tracking, and more.",
      price: 89.99,
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Ultra-Thin Laptop",
      description:
        "Boost your productivity with our ultra-thin, lightweight laptop. Powerful performance in a sleek design.",
      price: 1299.99,
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Ultra-Thin Laptop",
      description:
        "Boost your productivity with our ultra-thin, lightweight laptop. Powerful performance in a sleek design.",
      price: 1299.99,
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Ultra-Thin Laptop",
      description:
        "Boost your productivity with our ultra-thin, lightweight laptop. Powerful performance in a sleek design.",
      price: 1299.99,
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Ultra-Thin Laptop",
      description:
        "Boost your productivity with our ultra-thin, lightweight laptop. Powerful performance in a sleek design.",
      price: 1299.99,
    },
  ];

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (!isAuthenticated) {
    return router.push("/login");
  }

  if (isLoading) return <LoadingSpinner />;

  let filteredProduct;

  if (categoryFilter.length > 0) {
    filteredProduct = products.filter((product) =>
      categoryFilter.includes(product.category)
    );
  } else {
    filteredProduct = products;
  }

  if (searchFilter) {
    filteredProduct = filteredProduct.filter((product) =>
      product.name
        .trim()
        .toLowerCase()
        .includes(searchFilter.trim().toLowerCase())
    );
  }

  if (ageFilter.length > 0) {
    filteredProduct = filteredProduct.filter((product) =>
      ageFilter.some((filter) => {
        const ageRange = filter.split("-").map((value) => Number(value));
        return product.age >= ageRange[0] && product.age <= ageRange[1];
      })
    );
  }

  return (
    <SidebarProvider className="bg-muted/10">
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
              onChange={(e) => setSearchFilter(e.target.value)}
              value={searchFilter}
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

        {filteredProduct.length === 0 ? (
          <p className="text-center text-2xl font-bold w-full h-[70vh] flex items-center justify-center">
            No product found 🙂
          </p>
        ) : (
          <div className="mt-2 mx-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-muted/50">
            {filteredProduct.map((product) => (
              <ProductCard {...product} />
            ))}
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Homepage;
