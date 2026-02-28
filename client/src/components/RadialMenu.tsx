import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, Home, Info, Cpu, Gamepad2, Calendar, UserPlus, Phone } from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const MENU_ITEMS: MenuItem[] = [
  { icon: <Home size={20} />, label: "Home", href: "#home" },
  { icon: <Info size={20} />, label: "About", href: "#about" },
  { icon: <Cpu size={20} />, label: "Technical", href: "#technical" },
  { icon: <Gamepad2 size={20} />, label: "Non-Tech", href: "#non-technical" },
  { icon: <Calendar size={20} />, label: "Schedule", href: "#schedule" },
  { icon: <UserPlus size={20} />, label: "Register", href: "#register" },
  { icon: <Phone size={20} />, label: "Contact", href: "#contact" },
];

export function RadialMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const radius = 119; // Distance of icons from center

  return (
    <div className="left-8 z-50 flex items-center justify-center">
      <AnimatePresence>
        {isOpen && (
          <>
            {MENU_ITEMS.map((item, index) => {
              const angle = (index * (360 / MENU_ITEMS.length)) * (Math.PI / 180);
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius - 20; // slightly offset y to favor top arc if we want, but full circle is fine

              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{ opacity: 1, x, y, scale: 1 }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20, 
                    delay: index * 0.05 
                  }}
                  className="absolute flex flex-col items-center justify-center w-14 h-14 rounded-full bg-black/80 border border-secondary text-secondary box-shadow-neon-blue backdrop-blur-md hover:bg-secondary hover:text-black transition-colors"
                  title={item.label}
                >
                  {item.icon}
                </motion.a>
              );
            })}
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-primary border-2 border-white box-shadow-neon-pink text-white"
      >
        <Crosshair size={32} />
      </motion.button>
      
      {!isOpen && (
        <div className="absolute left-20 text-primary font-display tracking-widest text-sm text-shadow-neon-pink whitespace-nowrap animate-pulse pointer-events-none">
          INIT NAV
        </div>
      )}
    </div>
  );
}
