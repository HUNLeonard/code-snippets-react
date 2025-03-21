import { cn } from "../../utils/cn";

export const H3 = ({
  children,
  title,
  className,
}: {
  children: Readonly<React.ReactNode>;
  title?: string;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-2xl sm:text-3xl md:text-4xl text-base-content font-medium",
        className,
      )}
      title={title || String(children)}
    >
      {children}
    </h3>
  );
};
