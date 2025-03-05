import TypographySmall from "@/components/typography/typography-small";
import React from "react";

interface FollowerCountProps {
  followers: number;
  className?: string;
}

const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1).replace(".", ",")} mi seguidores`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1).replace(".", ",")} mil seguidores`;
  }
  return `${num} ${num === 1 ? "seguidor" : "seguidores"}`;
};

const FormatFollowers: React.FC<FollowerCountProps> = ({
  followers,
  className,
}) => {
  return (
    <TypographySmall className={className}>
      {formatNumber(followers)}
    </TypographySmall>
  );
};

export default FormatFollowers;
