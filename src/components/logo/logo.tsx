import { twMerge } from "tailwind-merge";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-4xl",
  md: "text-6xl",
  lg: "text-9xl",
};

export function Logo({ size = "sm" }: LogoProps) {
  return (
    <h1
      className={twMerge(
        "text-4xl font-bold text-title-primary",
        sizeClasses[size]
      )}
    >
      <span className="font-[700]">Lite</span>
      <span className="font-[400]">flix</span>
    </h1>
  );
}
