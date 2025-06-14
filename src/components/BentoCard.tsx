
import * as React from "react";
import { LucideIcon, Search, Save, ChartBar, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type IconName = "search" | "save" | "chart-bar" | "file-check";

const iconMap: Record<IconName, LucideIcon> = {
  search: Search,
  save: Save,
  "chart-bar": ChartBar,
  "file-check": FileCheck,
};

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: IconName;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  icon,
  title,
  description,
  children,
  className,
  ...props
}) => {
  const Icon = iconMap[icon];
  return (
    <div
      className={cn(
        "group rounded-2xl bg-background shadow-lg border transition hover:shadow-xl hover:border-primary/30 p-6 flex flex-col gap-3 min-h-[180px]",
        "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
      tabIndex={0}
      {...props}
    >
      <div className="flex items-center gap-3 mb-1">
        <span className="bg-primary/10 text-primary rounded-xl p-2">
          <Icon className="w-7 h-7" aria-hidden="true" />
        </span>
        <span className="text-xl font-semibold">{title}</span>
      </div>
      {description && <div className="text-muted-foreground text-sm">{description}</div>}
      {children}
    </div>
  );
};
