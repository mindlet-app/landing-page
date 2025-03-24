import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "neutral";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className, 
  children,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        clsx(
          "px-4 py-3 text-white rounded-lg cursor-pointer border-none transition-colors duration-200",
          {
            "bg-emerald-500 hover:bg-emerald-600": variant === "primary",
            "bg-purple-500 hover:bg-purple-600": variant === "secondary",
            "bg-rose-600 hover:bg-rose-700": variant === "danger",
            "bg-zinc-200 hover:bg-zinc-300 text-zinc-800":
              variant === "neutral",
          },
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
