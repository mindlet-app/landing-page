import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "card relative rounded-xl bg-white backface-hidden overflow-hidden",
          "flex items-center justify-center p-6 border border-zinc-300",
          className
        )
      )}
      style={{
        transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        boxShadow:
          "0 15px 35px rgba(16, 185, 129, 0.12), 0 5px 15px rgba(16, 185, 129, 0.06)",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

interface QuestionCardProps extends CardProps {
  absolute?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  absolute = false,
  className,
  children,
  ...props
}) => {
  return (
    <Card
      className={twMerge(
        clsx({ "absolute w-[80%] h-[80%]": absolute }, className)
      )}
      {...props}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 opacity-90"></div>
      {children}
    </Card>
  );
};

interface AnswerCardProps extends CardProps {
  absolute?: boolean;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  absolute = false,
  className,
  children,
  ...props
}) => {
  return (
    <Card
      className={clsx(
        "bg-linear-120 from-[#f8fafc] to-[#eef2ff]",
        { "absolute w-[80%] h-[80%]": absolute },
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
};
