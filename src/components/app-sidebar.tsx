"use client";

import {
  BriefcaseBusiness,
  CircuitBoard,
  LayoutDashboard,
  LayoutList,
} from "lucide-react";
import * as React from "react";

import { AppLogo } from "@/components/app-logo";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getUserProfileQuery } from "@/services/user.service";

const data = {
  logo: {
    name: "Career Tracker",
    icon: BriefcaseBusiness,
    quote: "Grow with Focus",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Board",
      url: "/board",
      icon: CircuitBoard,
    },
    {
      title: "Application",
      url: "/application",
      icon: LayoutList,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userRes } = getUserProfileQuery();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppLogo logo={data.logo} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain menus={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userRes?.data} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
