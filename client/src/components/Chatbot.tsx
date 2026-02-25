import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

interface Message {
  role: 'bot' | 'user';
  content: string;
}

const QA_PAIRS = [
  { keywords: ["what", "cyber", "fort", "about"], answer: "Cyber Fort is a cybersecurity themed event conducted by the Department of Cybersecurity." },
  { keywords: ["fee", "price", "cost", "register", "registration"], answer: "₹250 per person, ₹200 for a group of 6 or more." },
  { keywords: ["events", "list", "technical", "non-technical"], answer: "Technical: Code Combat, Kernel Challenge. Non-Technical: Think & Link, E-Sports, Logo Rush." },
  { keywords: ["date", "when", "time"], answer: "The event is scheduled for March 11, 2026." },
  { keywords: ["college", "where", "location"], answer: "Nehru Institute of Technology (Autonomous)." },
  { keywords: ["hi", "hello", "hey"], answer: "Greetings, User. How can I assist your navigation of the Cyber Fort systems?" }
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "SYSTEM ONLINE. Awaiting queries." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking
    setTimeout(() => {
      let response = "I do not compute. Try asking about 'events', 'fees', or 'date'.";
      const lowerInput = userMsg.toLowerCase();
      
      for (const qa of QA_PAIRS) {
        if (qa.keywords.some(kw => lowerInput.includes(kw))) {
          response = qa.answer;
          break;
        }
      }

      setMessages(prev => [...prev, { role: 'bot', content: response }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2s delay
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-black border-2 border-primary box-shadow-neon-pink text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 50 : 0 }}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-4 md:right-8 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] bg-black/95 border border-primary box-shadow-neon-pink rounded-xl flex flex-col z-50 overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="h-14 bg-primary/20 border-b border-primary flex items-center justify-between px-4">
              <div className="flex items-center gap-2 text-primary font-display tracking-widest">
                <Bot size={20} />
                <span>AI ASSISTANT</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary/20 border border-primary text-white' 
                      : 'bg-secondary/20 border border-secondary text-white'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary/20 border border-secondary rounded-lg p-3 flex gap-1 items-center">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-primary/50 bg-black flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about events..."
                className="flex-1 bg-primary/10 border border-primary/50 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary"
              />
              <button 
                onClick={handleSend}
                className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white hover:bg-primary/80 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
