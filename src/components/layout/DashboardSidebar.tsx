import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarItem {
  label: string;
  href: string;
  icon?: string;
}

const sidebarItems: SidebarItem[] = [
  { label: "Overview", href: "/dashboard", icon: "📊" },
  { label: "Problems", href: "/problems", icon: "📝" },
  { label: "Progress", href: "/dashboard/progress", icon: "📈" },
  { label: "Admin", href: "/admin", icon: "⚙️" },
];

interface DashboardSidebarProps {
  activePath?: string;
}

export function DashboardSidebar({ activePath }: DashboardSidebarProps) {
  return (
    <aside className="hidden w-56 flex-shrink-0 border-r border-border/40 md:block">
      <nav className="flex flex-col gap-1 p-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              activePath === item.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
