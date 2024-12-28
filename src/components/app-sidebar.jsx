"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { FilterProduct } from "./FilterProduct";
import { NavUser } from "./NavUser";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar open={true} {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <FilterProduct />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
