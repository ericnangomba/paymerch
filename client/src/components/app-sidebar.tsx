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
    url: "/dashboard/transactions",
    icon: Receipt,
    testId: "nav-transactions",
  },
  {
    title: "Payment Links",
    url: "/dashboard/payment-links",
    icon: LinkIcon,
    testId: "nav-payment-links",
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
    testId: "nav-analytics",
  },
  {
    title: "Payouts",
    url: "/dashboard/payouts",
    icon: CreditCard,
    testId: "nav-payouts",
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <Link href="/dashboard" data-testid="link-logo">
          <div className="flex items-center justify-center md:justify-start">
            <img
              src="/paymerch.png"
              alt="Brand logo"
              className="h-[120px] w-auto object-contain"
            />
          </div>
        </Link>
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
      <SidebarFooter className="p-6">
        <Link href="/dashboard/settings" data-testid="link-settings">
          <SidebarMenuButton className="w-full hover-elevate">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </SidebarMenuButton>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
