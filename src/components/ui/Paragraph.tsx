import type { HTMLAttributes } from "astro/types";
import clsx from "clsx";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const Paragraph: React.FC<ParagraphProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <p
      className={twMerge(clsx("text-zinc-700 leading-relaxed", className))}
      {...props}
    >
      {children}
    </p>
  );
};

export default Paragraph;
