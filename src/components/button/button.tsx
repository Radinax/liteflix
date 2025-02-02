import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "disabled"
  | "transparent";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variantStyles = {
  primary: "bg-primary text-white",
  secondary: "bg-white text-gray-800 disabled:cursor-not-allowed",
  transparent: "text-white font-bold outline-none focus:outline-hidden",
  outline:
    "text-white border border-white bg-transparent outline-none focus:outline-hidden",
  disabled: "text-gray-600 hover:bg-gray-100 focus:ring-gray-300",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  icon,
  iconPosition = "left",
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        "flex items-center justify-center gap-2 transition-all duration-300",
        "focus:outline-none py-5 px-12 text-[18px] font-normal cursor-pointer sm:min-w-[248px]",
        "hover:opacity-80",
        variantStyles[variant],
        className
      )}
      {...rest}
    >
      {/* Render icon on the left if iconPosition is 'left' */}
      {icon && iconPosition === "left" && (
        <img src={String(icon)} alt="lefticon" />
      )}
      {children}
      {/* Render icon on the right if iconPosition is 'right' */}
      {icon && iconPosition === "right" && (
        <img src={String(icon)} alt="righticon" />
      )}
    </button>
  );
};

export default Button;
