import clsx from "clsx";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface SubTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const SubTitle: React.FC<SubTitleProps> = ({ className, children, ...props }) => {
  return (
    <h2
      className={twMerge(
        clsx(
          "text-lg sm:text-xl md:text-xl font-semibold text-center mb-12 text-primary max-w-4xl mx-auto",
          className
        )
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

export default SubTitle;
