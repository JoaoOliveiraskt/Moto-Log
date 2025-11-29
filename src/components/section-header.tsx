import Link from "next/link";
import TypographyH4 from "@/components/typography/typography-h4";
import Icon from "@/components/icons/icon-component";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    href: string;
    className?: string;
}

export default function SectionHeader({ title, href, className }: SectionHeaderProps) {
    return (
        <Link
            href={href}
            className={cn("flex items-center group w-fit", className)}
        >
            <TypographyH4>{title}</TypographyH4>
            <Icon.chevronRight
                size={20}
                className="text-muted-foreground group-hover:text-foreground transition-colors mt-0.5"
            />
        </Link>
    );
}
