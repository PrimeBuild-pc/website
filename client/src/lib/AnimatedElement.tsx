import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
}

const AnimatedElement = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
  once = true,
}: AnimatedElementProps) => {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 50, opacity: 0 };
      case "down":
        return { y: -50, opacity: 0 };
      case "left":
        return { x: 50, opacity: 0 };
      case "right":
        return { x: -50, opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0, opacity: 1 };
      case "left":
      case "right":
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 1 } : getInitialPosition()}
      whileInView={getFinalPosition()}
      viewport={{ once, amount: 0.15 }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedElement;
