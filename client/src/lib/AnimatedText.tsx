import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
}

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const AnimatedText = ({ text, className, once = true, delay = 0 }: AnimatedTextProps) => {
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={defaultAnimations}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.p>
  );
};

export default AnimatedText;
