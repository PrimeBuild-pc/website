import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
}

const offsets = {
  up: ["0px", "28px"],
  down: ["0px", "-28px"],
  left: ["28px", "0px"],
  right: ["-28px", "0px"],
} as const;

const AnimatedElement = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  once = true,
}: AnimatedElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting && once) observer.disconnect();
    }, { rootMargin: "0px 0px -8%", threshold: 0.05 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  const [x, y] = offsets[direction];
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-x": x, "--reveal-y": y, transitionDelay: `${delay}s`, transitionDuration: `${duration}s` } as CSSProperties}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;
