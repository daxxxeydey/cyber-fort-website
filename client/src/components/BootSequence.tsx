import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  "SYSTEM BOOTING...",
  "Initializing Cyber Fort kernel...",
  "Loading event modules...",
  "Bypassing firewall...",
  "Decrypting mainframe...",
  "Establishing secure connection...",
  "ACCESS GRANTED."
];

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (currentLine < BOOT_MESSAGES.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, currentLine === BOOT_MESSAGES.length - 1 ? 1000 : 400 + Math.random() * 400);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 500);
      }, 500);
    }
  }, [currentLine, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex flex-col justify-center items-start p-8 md:p-24 font-mono text-green-500"
        >
          <div className="max-w-3xl w-full">
            {BOOT_MESSAGES.slice(0, currentLine + 1).map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-lg md:text-2xl mb-2 ${idx === BOOT_MESSAGES.length - 1 ? 'text-primary font-bold text-shadow-neon-pink' : ''}`}
              >
                {idx === BOOT_MESSAGES.length - 1 ? `> ${msg}` : `> ${msg}`}
              </motion.div>
            ))}
            {currentLine < BOOT_MESSAGES.length && (
              <div className="w-4 h-6 bg-green-500 inline-block blink mt-2 ml-4"></div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
