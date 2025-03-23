import React, { CSSProperties } from "react";
import { cn } from "../../utils/cn";

interface CardProps {
  Tag?: "article" | "button" | "div";
  style?: CSSProperties;
  className?: string;
  children?: Readonly<React.ReactNode>;
}

export const Card = ({
  style = {},
  className,
  Tag = "div",
  children,
}: CardProps) => {
  return (
    <Tag
      className={cn(
        "relative bg-base-300 p-3 sm:p-4",
        "flex flex-col rounded-lg gap-4",
        "shadow:md hover:shadow-lg hover:shadow-accent/10",
        "transition-all duration-300",
        "border border-base-content/10",
        className,
      )}
      style={style}
    >
      {children}
    </Tag>
  );
};
