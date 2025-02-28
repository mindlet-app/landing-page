import type { HTMLAttributes } from "astro/types";
import clsx from "clsx";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const Title: React.FC<TitleProps> = ({ className, children, ...props }) => {
  return (
    <h4
      className={twMerge(
        clsx(
          "text-2xl sm:text-3xl md:text-4xl font-bold font-saeada mb-6 text-zinc-900",
          className
        )
      )}
      {...props}
    >
      {children}
    </h4>
  );
};

export default Title;
