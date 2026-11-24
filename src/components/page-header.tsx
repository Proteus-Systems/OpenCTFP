import { cn } from "cn";

export function PageHeader({
  title,
  description,
  centered = false,
  className,
}: {
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-1 md:gap-2",
        centered && "items-center text-center",
        className,
      )}
    >
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
      {description && (
        <p className="text-sm font-semibold text-muted-foreground md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
