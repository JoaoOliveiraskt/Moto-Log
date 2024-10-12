"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const patternAnimation = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { type: "spring", stiffness: 50, duration: 1 },
};

interface Props {
  enableAnimation?: boolean;
}

export default function Pattern({ enableAnimation = true }: Props) {
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(enableAnimation);

  useEffect(() => {
    setIsAnimationEnabled(enableAnimation);
  }, [enableAnimation]);

  return (
    <motion.div
      initial={isAnimationEnabled ? patternAnimation.initial : {}}
      animate={isAnimationEnabled ? patternAnimation.animate : {}}
      transition={isAnimationEnabled ? patternAnimation.transition : {}}
      className="absolute top-0 z-[-2] h-screen w-full 
      bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,1)),linear-gradient(to_right,rgba(173,216,230,0.5),transparent)] 
      dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(0,0,0,1)),linear-gradient(to_right,rgba(0,10,255,0.13),transparent)] 
      bg-[size:100%_100%,100%_50%] bg-no-repeat"
    />
  );
}
