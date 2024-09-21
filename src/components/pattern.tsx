import { motion } from "framer-motion";

const patternAnimation = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { type: "spring", stiffness: 50, duration: 1 },
};

export default function Pattern() {
  return (
    <motion.div
      {...patternAnimation}
      className="absolute top-0 z-[-2] h-screen w-screen bg-white dark:bg-neutral-950 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
    ></motion.div>
  );
}
