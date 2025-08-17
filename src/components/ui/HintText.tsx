import clsx from "clsx";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface HintTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const HintText: React.FC<HintTextProps> = ({ className, children, ...props }) => {
  return (
    <p className={twMerge(clsx("text-primary font-medium", className))} {...props}>
      {children}
    </p>
  );
};

export default HintText;
