import React from "react";
import { twMerge } from "tailwind-merge";
import DEFAULT_AVATAR from "@/assets/avatar.png";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User Avatar",
  size = "sm",
  className = "",
}) => {
  return (
    <div
      className={twMerge(
        "rounded-full overflow-hidden bg-gray-200 flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      <img
        src={!src ? DEFAULT_AVATAR : src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Avatar;
