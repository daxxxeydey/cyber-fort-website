import { useState, useEffect } from "react";
import { BootSequence } from "@/components/BootSequence";
import { MatrixBackground } from "@/components/MatrixBackground";
import { GlitchText } from "@/components/GlitchText";
import { RadialMenu } from "@/components/RadialMenu";
import { Terminal } from "@/components/Terminal";
import { Chatbot } from "@/components/Chatbot";
import { NeonCard } from "@/components/NeonCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, insertRegistrationSchema, type InsertContactMessage, type InsertRegistration } from "@shared/schema";
import { useSubmitContact, useSubmitRegistration } from "@/hooks/use-forms";
import { Terminal as TerminalIcon, Calendar, MapPin, Shield, Cpu, Gamepad2, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [matrixOverride, setMatrixOverride] = useState(false);

  // Registration Form
  const regForm = useForm<InsertRegistration>({
    resolver: zodResolver(insertRegistrationSchema),
    defaultValues: { name: "", email: "", phone: "", college: "", eventType: "Technical" }
  });
  const regMutation = useSubmitRegistration();

  const onRegSubmit = (data: InsertRegistration) => {
    regMutation.mutate(data, {
      onSuccess: () => regForm.reset()
    });
  };

  // Contact Form
  const contactForm = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: { name: "", email: "", message: "" }
  });
  const contactMutation = useSubmitContact();

  const onContactSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => contactForm.reset()
    });
  };

  useEffect(() => {
    if (matrixOverride) {
      setTimeout(() => setMatrixOverride(false), 5000);
    }
  }, [matrixOverride]);

  if (booting) {
    return <BootSequence onComplete={() => setBooting(false)} />;
  }

  return (
    <div className="relative min-h-screen selection:bg-primary selection:text-white">
      <div className="scanlines" />
      <MatrixBackground />
      
      {/* Matrix Override Intense Flash */}
      <AnimatePresence>
        {matrixOverride && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-green-500 z-[9998] mix-blend-overlay pointer-events-none"
          />
        )}
      </AnimatePresence>

      <RadialMenu />
      <Chatbot />
      
      <AnimatePresence>
        {terminalOpen && (
          <Terminal 
            onClose={() => setTerminalOpen(false)} 
            triggerMatrix={() => setMatrixOverride(true)}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center relative p-4 overflow-hidden">
        <div className="absolute top-8 left-8 text-primary font-display tracking-[0.5em] text-sm hidden md:block opacity-50">
          SECURE_NODE_NIT_A
        </div>
        
        <button 
          onClick={() => setTerminalOpen(true)}
          className="absolute top-8 right-8 flex items-center gap-2 text-green-500 border border-green-500/50 bg-black/50 px-4 py-2 rounded-md hover:bg-green-500/20 transition-all font-mono text-sm group z-30"
        >
          <TerminalIcon size={16} className="group-hover:animate-pulse" />
          <span>OPEN_TERMINAL</span>
        </button>

        <div className="text-center z-10 space-y-6 max-w-4xl">
          <p className="text-secondary tracking-widest font-display text-sm md:text-xl uppercase mb-4">
            Department of Cybersecurity presents CONVERGENCE
          </p>
          <GlitchText text="CYBER FORT" className="text-6xl md:text-[8rem] leading-none text-shadow-neon-pink" as="h1" />
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12 font-mono text-lg text-white/80">
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 border border-white/10 rounded-lg backdrop-blur-sm">
              <Calendar className="text-secondary" />
              <span>MARCH 11, 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 border border-white/10 rounded-lg backdrop-blur-sm">
              <MapPin className="text-primary" />
              <span>NIT (AUTONOMOUS)</span>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-16"
          >
            <a 
              href="#register" 
              className="inline-block px-12 py-4 bg-primary text-white font-display text-xl tracking-widest uppercase rounded-sm border-2 border-primary box-shadow-neon-pink hover:bg-transparent transition-all duration-300 relative group overflow-hidden"
            >
              <span className="relative z-10">ENTER SYSTEM</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 relative z-10 border-t border-white/10 bg-black/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Shield className="text-secondary w-10 h-10" />
            <h2 className="text-4xl text-white font-display text-shadow-neon-blue">MISSION BRIEFING</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 font-mono text-lg text-white/70 leading-relaxed">
              <p>
                <span className="text-primary font-bold">CYBER FORT</span> is the ultimate proving ground for digital defenders and technological innovators. Hosted by the Department of Cybersecurity at Nehru Institute of Technology.
              </p>
              <p>
                Engage in intense technical challenges to test your cryptography, networking, and kernel exploitation skills. Or participate in our non-technical events designed to test logic, teamwork, and gaming prowess.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-white/10 p-6 bg-white/5 rounded-xl text-center flex flex-col items-center justify-center">
                <div className="text-4xl font-display text-primary mb-2">4+</div>
                <div className="text-sm tracking-widest font-mono">EVENTS</div>
              </div>
              <div className="border border-white/10 p-6 bg-white/5 rounded-xl text-center flex flex-col items-center justify-center">
                <div className="text-4xl font-display text-secondary mb-2">1000+</div>
                <div className="text-sm tracking-widest font-mono">PARTICIPANTS</div>
              </div>
              <div className="border border-white/10 p-6 bg-white/5 rounded-xl text-center flex flex-col items-center justify-center col-span-2">
                <div className="text-4xl font-display text-accent mb-2">₹1Lakhs+</div>
                <div className="text-sm tracking-widest font-mono">PRIZE POOL</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Events */}
      <section id="technical" className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Cpu className="text-primary w-10 h-10" />
            <h2 className="text-4xl text-white font-display text-shadow-neon-pink">TECHNICAL SECTOR</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <NeonCard color="primary" onClick={() => setSelectedEvent("Code Combat")}>
              <h3 className="text-2xl font-display text-white mb-4">CODE COMBAT</h3>
              <p className="font-mono text-white/70 mb-6"></p>
              <ul className="space-y-2 font-mono text-sm text-primary">
                <li className="flex items-center gap-2"><ChevronRight size={16}/> Solo / Duo Teams</li>
                <li className="flex items-center gap-2"><ChevronRight size={16}/> 3 Rounds</li>
              </ul>
            </NeonCard>
            
            <NeonCard color="primary" delay={0.2} onClick={() => setSelectedEvent("Kernel Challenge")}>
              <h3 className="text-2xl font-display text-white mb-4">KERNEL CHALLENGE</h3>
              <p className="font-mono text-white/70 mb-6">Deep system exploitation, reverse engineering, and finding vulnerabilities in custom kernels.</p>
              <ul className="space-y-2 font-mono text-sm text-primary">
                <li className="flex items-center gap-2"><ChevronRight size={16}/> CTF Format</li>
                <li className="flex items-center gap-2"><ChevronRight size={16}/> Linux Environment</li>
              </ul>
            </NeonCard>
          </div>
        </div>
      </section>

      {/* Non-Technical Events */}
      <section id="non-technical" className="py-24 px-4 relative z-10 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12 justify-end">
            <h2 className="text-4xl text-white font-display text-shadow-neon-blue">NON-TECHNICAL SECTOR</h2>
            <Gamepad2 className="text-secondary w-10 h-10" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <NeonCard color="secondary" onClick={() => setSelectedEvent("thinklink")}>
              <h3 className="text-xl font-display text-white mb-4">THINK & LINK</h3>
              <p className="font-mono text-sm text-white/70">Connect the dots in this rapid-fire trivia and logic puzzle gauntlet.</p>
            </NeonCard>
            
            <NeonCard color="secondary" delay={0.2} onClick={() => setSelectedEvent("esports")}>
              <h3 className="text-xl font-display text-white mb-4">E-SPORTS</h3>
              <p className="font-mono text-sm text-white/70">Valroant and FreeFire tournaments. Bring your squad and dominate the servers.</p>
            </NeonCard>
            
            <NeonCard color="secondary" delay={0.4} onClick={() => setSelectedEvent("logo")}>
              <h3 className="text-xl font-display text-white mb-4">LOGO RUSH</h3>
              <p className="font-mono text-sm text-white/70">Test your brand recognition and design deduction skills under time pressure.</p>
            </NeonCard>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-white font-display text-shadow-neon-purple text-center mb-16">TIMELINE_EVENTS</h2>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-accent before:to-transparent">
            
            {[
              { time: "09:00 AM", title: "SYSTEM BOOT (Inauguration)", desc: "Main auditorium. Keynote speakers." },
              { time: "10:30 AM", title: "CODE COMBAT: ROUND 1", desc: "Lab 3 & 4. Setup required." },
              { time: "01:00 PM", title: "RECHARGE (Lunch)", desc: "Food court. Coupons provided." },
              { time: "02:00 PM", title: "KERNEL CHALLENGE", desc: "Main server room." },
              { time: "04:30 PM", title: "SYSTEM SHUTDOWN (Valedictory)", desc: "Prize distribution." }
            ].map((item, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-black bg-accent text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 box-shadow-neon-purple z-10">
                  {idx + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm group-hover:border-accent transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display text-xl text-white">{item.title}</h4>
                    <span className="font-mono text-accent text-sm">{item.time}</span>
                  </div>
                  <p className="font-mono text-sm text-white/60">{item.desc}</p>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </section>

      {/* Registration */}
      <section id="register" className="py-24 px-4 relative z-10 bg-black/80 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-white font-display text-shadow-neon-pink text-center mb-16">SECURE ACCESS PASS</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <NeonCard color="primary">
                <h3 className="text-2xl font-display text-white mb-2">SOLO OPERATIVE</h3>
                <div className="text-4xl font-mono text-primary mb-4">₹250 <span className="text-sm text-white/50">/person</span></div>
                <ul className="space-y-3 font-mono text-sm text-white/80">
                  <li className="flex items-center gap-2"><ChevronRight className="text-primary" size={16}/> Access to all Technical events</li>
                  <li className="flex items-center gap-2"><ChevronRight className="text-primary" size={16}/> Access to all Non-Technical events</li>
                  <li className="flex items-center gap-2"><ChevronRight className="text-primary" size={16}/> Participation Certificate</li>
                  <li className="flex items-center gap-2"><ChevronRight className="text-primary" size={16}/> Lunch provided</li>
                </ul>
              </NeonCard>
              
              <NeonCard color="secondary">
                <h3 className="text-2xl font-display text-white mb-2">SQUAD (6+ MEMBERS)</h3>
                <div className="text-4xl font-mono text-secondary mb-4">₹200 <span className="text-sm text-white/50">/person</span></div>
                <ul className="space-y-3 font-mono text-sm text-white/80">
                  <li className="flex items-center gap-2"><ChevronRight className="text-secondary" size={16}/> All Solo Operative benefits</li>
                  <li className="flex items-center gap-2"><ChevronRight className="text-secondary" size={16}/> Priority Seating</li>
                  <li className="flex items-center gap-2"><ChevronRight className="text-secondary" size={16}/> Squad Registration Discount</li>
                </ul>
              </NeonCard>
            </div>

            <div className="glass-panel p-8 rounded-xl border-primary box-shadow-neon-pink">
              <h3 className="text-2xl font-display text-white mb-6 border-b border-white/10 pb-4">INITIALIZE REGISTRATION</h3>
              <form onSubmit={regForm.handleSubmit(onRegSubmit)} className="space-y-4 font-mono">
                <div>
                  <label className="block text-primary text-sm mb-1">OPERATIVE NAME</label>
                  <input {...regForm.register("name")} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-primary focus:outline-none transition-colors" />
                  {regForm.formState.errors.name && <span className="text-red-500 text-xs mt-1">{regForm.formState.errors.name.message}</span>}
                </div>
                <div>
                  <label className="block text-primary text-sm mb-1">COMM LINK (EMAIL)</label>
                  <input {...regForm.register("email")} type="email" className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-primary focus:outline-none transition-colors" />
                  {regForm.formState.errors.email && <span className="text-red-500 text-xs mt-1">{regForm.formState.errors.email.message}</span>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-primary text-sm mb-1">PHONE</label>
                    <input {...regForm.register("phone")} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-primary focus:outline-none transition-colors" />
                    {regForm.formState.errors.phone && <span className="text-red-500 text-xs mt-1">{regForm.formState.errors.phone.message}</span>}
                  </div>
                  <div>
                    <label className="block text-primary text-sm mb-1">BASE (COLLEGE)</label>
                    <input {...regForm.register("college")} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-primary focus:outline-none transition-colors" />
                    {regForm.formState.errors.college && <span className="text-red-500 text-xs mt-1">{regForm.formState.errors.college.message}</span>}
                  </div>
                </div>
                <div>
                  <label className="block text-primary text-sm mb-1">PRIMARY DOMAIN</label>
                  <select {...regForm.register("eventType")} className="w-full bg-black border border-white/20 rounded p-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none">
                    <option value="Technical">Technical Operations</option>
                    <option value="Non-Technical">Non-Technical Operations</option>
                    <option value="Both">Full Spectrum (Both)</option>
                  </select>
                </div>
                
                <button 
                  type="submit" 
                  disabled={regMutation.isPending}
                  className="w-full py-4 mt-6 bg-primary text-black font-bold tracking-widest uppercase hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {regMutation.isPending ? "TRANSMITTING..." : "EXECUTE REGISTRATION"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white font-display text-shadow-neon-green mb-4">COMMUNICATION CHANNELS</h2>
            <p className="font-mono text-white/60">Need clearance? Contact command.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-xl border-l-4 border-l-green-500 hover:bg-green-500/5 transition-colors">
                <h4 className="font-display text-lg text-white mb-1">Faculty Coordinator</h4>
                <p className="font-mono text-green-400">Mrs.P.Showmiya Asst.prof -Cyber Security</p>
                <p className="font-mono text-white/50 text-sm mt-2">+91 9384949279</p>
              </div>
              <div className="glass-panel p-6 rounded-xl border-l-4 border-l-green-500 hover:bg-green-500/5 transition-colors">
                <h4 className="font-display text-lg text-white mb-1">Student Coordinator</h4>
                <p className="font-mono text-green-400">S.Muthumani</p>
                <p className="font-mono text-white/50 text-sm mt-2">+91 8098088892</p>
              </div>
              <div className="glass-panel p-6 rounded-xl border-l-4 border-l-green-500 hover:bg-green-500/5 transition-colors">
                <h4 className="font-display text-lg text-white mb-1">Student Coordinator</h4>
                <p className="font-mono text-green-400">S.Anusuya</p>
                <p className="font-mono text-white/50 text-sm mt-2">+91 9629207480</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border-green-500/30">
              <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-4 font-mono">
                <div>
                  <input {...contactForm.register("name")} placeholder="IDENTIFIER (NAME)" className="w-full bg-black/50 border border-green-500/30 rounded p-3 text-white focus:border-green-500 focus:outline-none transition-colors placeholder:text-white/20" />
                  {contactForm.formState.errors.name && <span className="text-red-500 text-xs">{contactForm.formState.errors.name.message}</span>}
                </div>
                <div>
                  <input {...contactForm.register("email")} type="email" placeholder="RETURN NODE (EMAIL)" className="w-full bg-black/50 border border-green-500/30 rounded p-3 text-white focus:border-green-500 focus:outline-none transition-colors placeholder:text-white/20" />
                  {contactForm.formState.errors.email && <span className="text-red-500 text-xs">{contactForm.formState.errors.email.message}</span>}
                </div>
                <div>
                  <textarea {...contactForm.register("message")} placeholder="ENCRYPTED MESSAGE" rows={4} className="w-full bg-black/50 border border-green-500/30 rounded p-3 text-white focus:border-green-500 focus:outline-none transition-colors placeholder:text-white/20 resize-none" />
                  {contactForm.formState.errors.message && <span className="text-red-500 text-xs">{contactForm.formState.errors.message.message}</span>}
                </div>
                <button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full py-3 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors disabled:opacity-50 tracking-widest"
                >
                  {contactMutation.isPending ? "SENDING..." : "TRANSMIT"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 bg-black text-center font-mono text-sm text-white/40 relative z-10">
        <p>NEHRU INSTITUTE OF TECHNOLOGY (AUTONOMOUS)</p>
        <p className="mt-2">DEPARTMENT OF CYBERSECURITY © 2026</p>
      </footer>
    </div>
  );
}
