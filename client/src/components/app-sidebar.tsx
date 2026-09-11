import { LayoutDashboard, Receipt, Link as LinkIcon, BarChart3, Settings, CreditCard } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Transactions",
    url: "/merchant",
    icon: Receipt,
    testId: "nav-transactions",
  },
  {
    title: "Payment Links",
    url: "/merchant",
    icon: LinkIcon,
    testId: "nav-payment-links",
  },
  {
    title: "Analytics",
    url: "/merchant",
    icon: BarChart3,
    testId: "nav-analytics",
  },
  {
    title: "Payouts",
    url: "/merchant",
    icon: CreditCard,
    testId: "nav-payouts",
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2">
          <img
            src="/paymerch_icon.png"
            alt="Brand logo"
            className="h-[50px] sm:h-[60px] w-auto object-contain"
          />
          <span className="font-bold text-lg sm:text-xl">PayMerch</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url} data-testid={item.testId}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <Link href="/merchant" data-testid="link-settings">
          <SidebarMenuButton className="w-full hover-elevate">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </SidebarMenuButton>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
