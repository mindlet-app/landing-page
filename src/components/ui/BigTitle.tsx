import type { HTMLAttributes } from "astro/types";
import clsx from "clsx";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface BigTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const BigTitle: React.FC<BigTitleProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h2
      className={twMerge(
        clsx(
          "text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 font-saeada text-zinc-900",
          className
        )
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

export default BigTitle;
