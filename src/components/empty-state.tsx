import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row items-center gap-5 rounded-lg border border-dashed px-10 py-5">
        <span className="flex items-center justify-center rounded-full border border-muted-foreground p-3">
          <Icon />
        </span>
        <div>
          <p className="font-semibold">{title}</p>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
