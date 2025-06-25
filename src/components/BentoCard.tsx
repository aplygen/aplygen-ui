
import * as React from "react";
import { LucideIcon, Search, Save, ChartBar, FileCheck, Package } from "lucide-react";
import { cn } from "@/lib/utils";

type IconName = "search" | "save" | "chart-bar" | "file-check" | "package";

const iconMap: Record<IconName, LucideIcon> = {
  search: Search,
  save: Save,
  "chart-bar": ChartBar,
  "file-check": FileCheck,
  package: Package
};

const iconColors: Record<IconName, string> = {
  search: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  save: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  "chart-bar": "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  "file-check": "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  package: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
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
  const iconColorClass = iconColors[icon];

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-background/50 backdrop-blur-sm shadow-lg border-2 border-primary/20 transition-all duration-300 hover:shadow-2xl hover:border-primary/40 p-8 flex flex-col gap-4 min-h-[200px]",
        "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
        "hover:scale-[1.02] hover:-translate-y-1",
        className
      )} 
      tabIndex={0} 
      {...props}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-2">
          <span className={cn(
            "rounded-2xl p-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm",
            iconColorClass
          )}>
            <Icon className="w-8 h-8 transition-all duration-300 group-hover:scale-110" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-200">
              {title}
            </h3>
            {description && (
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed group-hover:text-foreground/80 transition-colors duration-200">
                {description}
              </p>
            )}
          </div>
        </div>
        
        <div className="mt-4 relative z-10 transition-all duration-300 group-hover:translate-x-1">
          {children}
        </div>
      </div>

      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      </div>
    </div>
  );
};
