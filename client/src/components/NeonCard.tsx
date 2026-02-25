import { motion } from "framer-motion";
import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NeonCardProps {
  children: ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "accent" | "green";
  delay?: number;
}

export function NeonCard({ children, className, color = "primary", delay = 0 }: NeonCardProps) {
  const colorMap = {
    primary: "border-primary box-shadow-neon-pink hover:bg-primary/5",
    secondary: "border-secondary box-shadow-neon-blue hover:bg-secondary/5",
    accent: "border-accent box-shadow-neon-purple hover:bg-accent/5",
    green: "border-green-500 box-shadow-neon-green hover:bg-green-500/5",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "glass-panel rounded-xl p-6 transition-colors duration-300",
        colorMap[color],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
