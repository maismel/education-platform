"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface CourseCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  children?: React.ReactNode;
  variant?: "default" | "compact";
}

export const CourseCard = ({
  title,
  description,
  imageUrl,
  children,
  variant = "default",
}: CourseCardProps) => {
  const imageSrc = imageUrl?.trim() || "/placeholder.jpeg";

  return (
    <div
      className={cn(
        "border h-full rounded-lg shadow-sm hover:shadow-md transition flex flex-col",
        variant === "default" && "w-full sm:max-w-72",
        variant === "compact" && "w-full",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden shrink-0 w-full rounded-md",
          variant === "default" ? "h-40" : "h-28",
        )}
      >
        <Image src={imageSrc} alt={title} fill className="object-cover" />
      </div>

      <div className="flex flex-col flex-1 gap-2 p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 line-clamp-2">{description}</p>

        <div className="mt-auto self-end ">{children}</div>
      </div>
    </div>
  );
};
