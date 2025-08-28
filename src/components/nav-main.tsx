"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";

type TMenu = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: Array<{
    title: string;
    url: string;
  }>;
};

type TNavMainProps = {
  menus: Array<TMenu>;
};

export function NavMain(props: TNavMainProps) {
  const { menus } = props;

  const SidebarButton = (props: { menu: TMenu; isActive?: boolean }) => {
    const { menu } = props;
    return (
      <SidebarMenuButton tooltip={menu.title} {...props}>
        {menu.icon && <menu.icon />}
        <span>{menu.title}</span>

        {menu.items?.length && (
          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        )}
      </SidebarMenuButton>
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {menus.map((menu) => (
          <Collapsible
            key={menu.title}
            asChild
            defaultOpen={menu.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {menu.items?.length ? (
                <CollapsibleTrigger asChild>
                  <SidebarButton menu={menu} />
                </CollapsibleTrigger>
              ) : (
                <NavLink to={menu.url}>
                  {({ isActive }) => (
                    <SidebarButton menu={menu} isActive={isActive} />
                  )}
                </NavLink>
              )}

              {menu.items?.length && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {menu.items?.map((subMenu) => (
                      <SidebarMenuSubItem key={subMenu.title}>
                        <NavLink to={subMenu.url}>
                          {({ isActive }) => (
                            <SidebarMenuSubButton asChild isActive={isActive}>
                              <span>{subMenu.title}</span>
                            </SidebarMenuSubButton>
                          )}
                        </NavLink>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
