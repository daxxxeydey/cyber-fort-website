import { useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { Terminal as TerminalIcon, X, Minus, Maximize2 } from "lucide-react";

interface TerminalProps {
  onClose: () => void;
  triggerMatrix: () => void;
}

interface LogEntry {
  type: 'input' | 'output' | 'error';
  content: string;
}

const COMMANDS = {
  help: "Available commands:\n- about: Info about Cyber Fort\n- events: List all events\n- register: Registration info\n- contact: Show phone numbers\n- clear: Clears terminal\n- date: Show event date\n- hack: [RESTRICTED]\n- matrix: Execute visual override",
  about: "CYBER FORT is the premier cybersecurity event presented by the Department of Cybersecurity at Nehru Institute of Technology. Main Event: CONVERGENCE.",
  events: "TECHNICAL:\n> Code Combat\n> Kernel Challenge\nNON-TECHNICAL:\n> Think & Link\n> E-Sports\n> Logo Rush",
  register: "REGISTRATION FEES:\n> Individual: ₹250\n> Group (6+): ₹200 per person\nExecute interface navigation to access full form.",
  contact: "COMM LINKS ESTABLISHED:\n> Coordinator Alpha: +91 XXXXX XXXXX\n> Coordinator Beta: +91 YYYYY YYYYY",
  date: "SYSTEM TIME TARGET: MARCH 11, 2026",
};

export function Terminal({ onClose, triggerMatrix }: TerminalProps) {
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: 'output', content: "NIT(A) Secure Terminal v2.4.1" },
    { type: 'output', content: "Type 'help' for available commands." }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, isProcessing]);

  // Keep focus on input if terminal is clicked
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = async (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    
    setLogs(prev => [...prev, { type: 'input', content: cmd }]);
    setInput("");
    setIsProcessing(true);

    // Fake delay for processing
    await new Promise(r => setTimeout(r, 600));

    setIsProcessing(false);

    if (cleanCmd === "") return;

    if (cleanCmd === "clear") {
      setLogs([]);
      return;
    }

    if (cleanCmd === "hack") {
      setLogs(prev => [...prev, { type: 'error', content: "ACCESS DENIED. SECURITY PROTOCOLS ENGAGED. LOGGING IP." }]);
      return;
    }

    if (cleanCmd === "matrix") {
      setLogs(prev => [...prev, { type: 'output', content: "OVERRIDE ACCEPTED. EXECUTING PROTOCOL M-A-T-R-I-X." }]);
      triggerMatrix();
      return;
    }

    const response = COMMANDS[cleanCmd as keyof typeof COMMANDS];
    if (response) {
      setLogs(prev => [...prev, { type: 'output', content: response }]);
    } else {
      setLogs(prev => [...prev, { type: 'error', content: `Command not found: ${cleanCmd}. Type 'help' for list.` }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleCommand(input);
    }
  };

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed top-20 right-4 md:right-20 w-[90vw] md:w-[500px] h-[400px] bg-black/90 border border-green-500 rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.3)] backdrop-blur-xl flex flex-col overflow-hidden z-40 font-mono text-sm"
      onClick={handleTerminalClick}
    >
      {/* Header bar */}
      <div 
        className="h-8 bg-green-900/40 border-b border-green-500 flex items-center justify-between px-3 cursor-move select-none"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="flex items-center gap-2 text-green-400">
          <TerminalIcon size={14} />
          <span className="font-bold tracking-wider text-xs">ROOT@CYBER-FORT:~</span>
        </div>
        <div className="flex items-center gap-2 text-green-500">
          <Minus size={14} className="cursor-pointer hover:text-white" />
          <Maximize2 size={12} className="cursor-pointer hover:text-white" />
          <X size={14} className="cursor-pointer hover:text-red-500 transition-colors" onClick={onClose} />
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-2 text-green-500">
        {logs.map((log, i) => (
          <div key={i} className={log.type === 'error' ? 'text-red-500' : ''}>
            {log.type === 'input' && <span className="text-green-300 mr-2">&gt;</span>}
            <span className="whitespace-pre-wrap">{log.content}</span>
          </div>
        ))}
        
        {isProcessing && (
          <div className="animate-pulse">processing...</div>
        )}

        {!isProcessing && (
          <div className="flex items-center mt-1">
            <span className="text-green-300 mr-2">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-green-500 font-mono shadow-none"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>
    </motion.div>
  );
}
