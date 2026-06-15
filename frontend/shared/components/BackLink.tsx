import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

interface BackLinkProps {
  href: string;
  text: string;
}

export const BackLink = ({ href, text }: BackLinkProps) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 text-muted-foreground text-sm hover:text-foreground transition group"
    >
      <ChevronLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      <span>{text}</span>
    </Link>
  );
};
