import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code, Music, Palette, Sparkles, ArrowRight, Ticket, Dices, Trophy, Users, Target, Rocket, Wallet, MessageCircle, Zap, Gamepad2, X, Banknote, ShieldCheck, Layout } from 'lucide-react';
import { CountUp, SpotlightButton } from './UI';

// 3D Tilt Card Component - Enhanced with Spring Physics
export const TiltCard = () => {
  const cardRef = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-25, 25]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width - 0.5);
    const yPct = (mouseY / height - 0.5);

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/5] md:aspect-square max-w-[307px] mx-auto translate-x-[2px]"
      style={{ perspective: "1200px" }}
    >
      <motion.div 
        className="relative w-full h-full transition-transform duration-200 ease-out"
        style={{ 
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
        }}
      >
        <div 
          className="absolute inset-0 bg-[#111] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl"
          style={{ transform: "translateZ(0px)" }}
        >
          <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover opacity-80"
              src="/videos/step1-video.mp4" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        <div className="absolute top-6 -left-8 scale-90" style={{ transform: "translateZ(60px)" }}>
            <motion.div 
                className="bg-[#1a1a1a] p-2.5 rounded-2xl border border-white/10 shadow-xl flex items-center gap-3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
                    <Code size={16} className="text-white" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow absolute top-2 right-2 border border-[#1a1a1a]" />
            </motion.div>
        </div>

         <div className="absolute top-10 -right-8 scale-90" style={{ transform: "translateZ(40px)" }}>
            <motion.div 
                className="flex flex-col gap-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <div className="w-9 h-9 bg-[#1a1a1a] rounded-full border border-white/10 flex items-center justify-center shadow-lg cursor-pointer hover:bg-white/10 transition">
                    <Music size={16} className="text-blue-400" />
                </div>
                <div className="w-9 h-9 bg-[#1a1a1a] rounded-full border border-white/10 flex items-center justify-center shadow-lg cursor-pointer hover:bg-white/10 transition">
                    <Palette size={16} className="text-pink-400" />
                </div>
                <div className="w-9 h-9 bg-[#1a1a1a] rounded-full border border-white/10 flex items-center justify-center shadow-lg cursor-pointer hover:bg-white/10 transition">
                    <Sparkles size={16} className="text-brand-yellow" />
                </div>
            </motion.div>
        </div>

         <div className="absolute -bottom-8 -left-12 w-[121px]" style={{ transform: "translateZ(80px)" }}>
            <motion.div 
                className="bg-white text-black p-3 rounded-2xl shadow-2xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
                <p className="text-[9px] font-bold leading-tight mb-2">
                    Start your project and go live in just a few clicks.
                </p>
                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center ml-auto">
                    <ArrowRight size={10} className="text-white -rotate-45" />
                </div>
            </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// 3D Tilt Ticket Card Component - Step 2
export const TiltTicketCard = () => {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const xPct = (mouseX / width - 0.5) * 2;
      const yPct = (mouseY / height - 0.5) * 2;
  
      setRotation({
        x: -yPct * 10, 
        y: xPct * 15
      });
    };
  
    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
    };
  
    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-[4/5] md:aspect-square max-w-[307px] mx-auto translate-x-[2px]"
        style={{ perspective: "1000px" }}
      >
        <div 
          className="relative w-full h-full transition-transform duration-300 ease-out"
          style={{ 
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: "preserve-3d"
          }}
        >
          {/* Main Ticket Card - Silver Gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-200 rounded-[2rem] border border-white/60 overflow-hidden shadow-2xl"
            style={{ transform: "translateZ(0px)" }}
          >
             {/* Holographic Sheen */}
             <div className="absolute inset-0 opacity-40 bg-[conic-gradient(from_0deg,transparent_0deg,#d8b4fe_45deg,#818cf8_120deg,transparent_180deg,#d8b4fe_225deg,#818cf8_300deg,transparent_360deg)] mix-blend-overlay" />
             
             {/* Ticket Notches */}
             <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#050505] rounded-full" />
             <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#050505] rounded-full" />
             
             {/* Content */}
             <div className="relative z-10 p-6 flex flex-col h-full items-center text-center pt-8">
                  <div className="flex items-center gap-2 mb-2 opacity-80">
                      <Ticket size={14} className="text-black" />
                      <span className="text-[10px] font-black tracking-widest text-black uppercase">Golden Ticket</span>
                      <Ticket size={14} className="text-black transform scale-x-[-1]" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-black leading-[0.9] mb-6 tracking-tighter">
                      EARLY TOKEN<br/>ALLOCATION DRAW
                  </h3>
  
                  <div className="w-full grid grid-cols-3 gap-1 text-center mb-auto px-2">
                      <div className="flex flex-col">
                          <span className="text-[8px] font-bold text-gray-500 uppercase">Token</span>
                          <span className="text-xs font-black text-black">TTDYH</span>
                      </div>
                       <div className="flex flex-col">
                          <span className="text-[8px] font-bold text-gray-500 uppercase">Ticket</span>
                          <span className="text-xs font-black text-black">345 P</span>
                      </div>
                       <div className="flex flex-col">
                          <span className="text-[8px] font-bold text-gray-500 uppercase">Draw</span>
                          <span className="text-xs font-black text-black">18:00</span>
                      </div>
                  </div>
  
                  {/* 3D Dice Placeholder */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-16">
                       <Dices size={80} className="text-black drop-shadow-2xl opacity-90 rotate-12" strokeWidth={1} />
                   </div>
  
                  <div className="mt-auto w-full flex justify-between items-end pb-2">
                       <div className="text-left">
                          <div className="text-[14px] font-black text-black tracking-tighter leading-none">SPARKFUND</div>
                          <div className="text-[7px] font-bold text-gray-600 leading-tight w-24">Your Creative Work, Trading on a Tokenized Market</div>
                       </div>
                  </div>
             </div>
          </div>
  
          {/* Buy-in Winners Pill (Top Left) */}
          <div className="absolute top-12 -left-8" style={{ transform: "translateZ(50px)" }}>
              <motion.div 
                  className="bg-[#1a1a1a] p-2 pr-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-3"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                  <div className="relative">
                      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" className="w-8 h-8 rounded-lg object-cover border border-white/20" alt="Winner" />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border border-[#1a1a1a]" />
                  </div>
                  <div className="flex flex-col text-left">
                      <span className="text-[8px] text-gray-400 font-bold uppercase">Buy-in</span>
                      <span className="text-[10px] font-bold text-white">Winners</span>
                  </div>
              </motion.div>
          </div>
  
           {/* Winners Yellow Pill (Bottom) */}
           <div className="absolute -bottom-4 -right-4 md:right-auto md:left-4" style={{ transform: "translateZ(70px)" }}>
              <motion.div 
                  className="bg-brand-yellow text-black p-3 pr-6 rounded-2xl shadow-2xl flex items-center gap-3"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                  <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center">
                      <Trophy size={14} className="text-black" />
                  </div>
                  <div className="flex flex-col leading-none text-left">
                       <span className="text-[8px] font-bold opacity-60 uppercase mb-0.5">WINNERS</span>
                       <span className="text-xs font-black">James and<br/>299 others</span>
                  </div>
              </motion.div>
          </div>
  
        </div>
      </div>
    );
};

// Step 3 Visual Component - Rotating Social Graph with Enhanced Tilt & Counting
export const Step3Visual = () => {
    const containerRef = useRef(null);
    
    // Physics-based Tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
    const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });
    
    // Smooth rotation based on mouse position
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = (mouseX / width - 0.5);
        const yPct = (mouseY / height - 0.5);
        
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-square max-w-[550px] mx-auto flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
         <motion.div
            className="relative w-full h-full flex items-center justify-center"
            style={{ 
                transformStyle: "preserve-3d",
                rotateX,
                rotateY
            }}
         >
             {/* Background Grid/Rings */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30" style={{ transform: "translateZ(-30px)" }}>
                  <div className="w-[35%] h-[35%] border border-white/20 rounded-full absolute" />
                  <div className="w-[65%] h-[65%] border border-white/20 rounded-full absolute" />
                  <div className="w-[95%] h-[95%] border border-white/10 rounded-full absolute" />
                  {/* Radial Lines */}
                  <div className="absolute w-full h-[1px] bg-white/5 rotate-45" />
                  <div className="absolute w-full h-[1px] bg-white/5 -rotate-45" />
                  <div className="absolute w-[1px] h-full bg-white/5" />
                  <div className="absolute w-full h-[1px] bg-white/5" />
             </div>
      
             {/* Rotating Container */}
             <motion.div
               className="absolute inset-0"
               animate={{ rotate: 360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               style={{ transformStyle: "preserve-3d" }}
             >
                {/* 1. Top Left - Chat Bubbles (Further out) */}
                <div className="absolute top-[5%] left-[15%] w-48" style={{ transform: "translateZ(30px)" }}>
                   <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className="flex flex-col gap-2"
                   >
                       <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl rounded-tl-sm p-3 flex items-start gap-3 shadow-xl backdrop-blur-sm z-20">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" className="w-8 h-8 rounded-full border border-white/10" alt="User" />
                            <div className="text-[10px] text-gray-300 leading-tight font-medium">
                                I'm very bullish on this project 🚀
                            </div>
                       </div>
                       <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl rounded-bl-sm p-3 flex items-start gap-3 shadow-xl backdrop-blur-sm ml-4 opacity-70 scale-95 -mt-2 z-10">
                             <div className="text-[10px] text-gray-400 leading-tight font-medium">
                                Let's do it! let's keep pushing these ICOs forward ⚡️
                            </div>
                       </div>
                   </motion.div>
                </div>
      
                {/* 2. Right - Green Pill (Buy-in) - Further out */}
                 <div className="absolute top-[42%] right-[-12%]" style={{ transform: "translateZ(40px)" }}>
                   <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className="bg-[#1a1a1a] border border-green-500/30 rounded-full pl-1 pr-4 py-1.5 flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                   >
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                            <Users size={12} className="text-black" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-green-400 leading-none">Just participated</span>
                            <span className="text-[8px] text-gray-400 font-medium">in Buy-in</span>
                        </div>
                   </motion.div>
                </div>
      
                {/* 3. Bottom Right - Winners Group - RESTORED */}
                 <div className="absolute bottom-[10%] right-[0%]" style={{ transform: "translateZ(30px)" }}>
                   <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className="flex flex-col items-center"
                   >
                       <div className="flex -space-x-2 mb-1.5">
                           {[1,2,3].map(i => (
                               <div key={i} className="w-7 h-7 rounded-full border border-black bg-gray-800 overflow-hidden">
                                   <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000}?w=50&h=50&fit=crop`} className="w-full h-full object-cover" alt="User" />
                               </div>
                           ))}
                           <div className="w-7 h-7 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-[9px] font-bold text-white relative z-10">
                               +300
                           </div>
                       </div>
                       <div className="text-[9px] font-bold text-gray-300 text-center leading-tight">
                            +300 winners<br/><span className="text-gray-500 font-normal">for allocation draw</span>
                       </div>
                   </motion.div>
                </div>
      
                {/* 4. Bottom Center - Purchase Notification - Further out */}
                 <div className="absolute bottom-[-10%] left-[45%]" style={{ transform: "translateZ(50px)" }}>
                   <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className="bg-[#1a1a1a] border border-blue-500/30 rounded-xl p-2 flex items-center gap-3 shadow-lg backdrop-blur-md"
                   >
                       <div className="relative">
                            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop" className="w-8 h-8 rounded-lg object-cover grayscale" alt="Buyer" />
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 w-3 h-3 rounded-full border border-[#1a1a1a]" />
                       </div>
                       <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-white">Just bought $10k</span>
                            <span className="text-[8px] text-blue-400 font-medium">Project Token</span>
                       </div>
                   </motion.div>
                </div>
      
                {/* 5. Left - Fessi Notifications - Further out */}
                 <div className="absolute top-[45%] left-[-18%]" style={{ transform: "translateZ(40px)" }}>
                   <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className="relative"
                   >
                        {/* Main Card */}
                       <div className="relative z-20 bg-[#1a1a1a] border border-pink-500/30 rounded-xl p-2.5 flex items-center gap-3 shadow-xl pr-6 backdrop-blur-md">
                           <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 font-bold text-xs">F</div>
                                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-[#1a1a1a]" />
                           </div>
                           <div className="flex flex-col">
                               <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-white">Fessi</span>
                                    <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded text-white font-bold">+250 SPARK</span>
                               </div>
                               <span className="text-[8px] text-gray-500 font-medium mt-0.5">From Chris • 1m</span>
                           </div>
                       </div>
                       
                       {/* Stacked Card Behind */}
                        <div className="absolute top-2 left-2 z-10 w-full h-full bg-[#1a1a1a] border border-pink-500/10 rounded-xl p-2 flex items-center gap-3 shadow-lg opacity-40 scale-95">
                            <div className="w-8 h-8 rounded-full bg-pink-500/10" />
                            <div className="flex flex-col gap-1">
                                 <div className="w-12 h-2 bg-white/10 rounded" />
                                 <div className="w-8 h-2 bg-white/5 rounded" />
                            </div>
                       </div>
                   </motion.div>
                </div>

                {/* 6. Top Right - Simple Avatar - Further out */}
                <div className="absolute top-[12%] right-[12%]" style={{ transform: "translateZ(20px)" }}>
                     <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                     >
                         <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop" className="w-9 h-9 rounded-full border border-[#1a1a1a] shadow-lg grayscale transition-all opacity-80" alt="User" />
                     </motion.div>
                </div>
      
             </motion.div>
      
             {/* Static Center Card - Robert Fox - Reduced Size by 15% (Scale 0.85) */}
             <div className="z-20 bg-[#0a0a0a] rounded-[2rem] border border-white/10 w-44 aspect-square flex flex-col items-center justify-center text-center relative shadow-2xl scale-[0.85]" style={{ transform: "translateZ(20px)" }}>
                  {/* Internal Glow */}
                  <div className="absolute inset-0 bg-white/5 rounded-[2rem] pointer-events-none" />
                  
                  <div className="relative mb-3">
                      <div className="p-0.5 bg-[#1a1a1a] rounded-full border border-white/10">
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" className="w-12 h-12 rounded-full object-cover" alt="Creator" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px] border-2 border-[#0a0a0a]">
                           ✓
                      </div>
                  </div>

                  <h3 className="text-[11px] font-black text-white leading-none mb-1 tracking-tight">ROBERT FOX</h3>
                  <div className="text-[7px] font-bold text-gray-500 uppercase tracking-widest mb-3">Project Creator</div>
                  
                  {/* Revenue Counter */}
                  <div className="text-3xl font-black text-brand-yellow leading-none tracking-tight flex items-center justify-center">
                    $<CountUp to={148.989} decimals={3} />
                  </div>
                  <div className="text-[9px] font-bold text-gray-600 mt-1">Total Revenues</div>
             </div>
         </motion.div>
      </div>
    )
}

export const CreatorsCommunitiesSection = () => {
    // Variants for staggered reveals
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
  
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } }
    };
  
    return (
      <section className="relative z-20 min-h-screen bg-black flex flex-col items-center justify-center py-24 px-6 border-t border-white/5">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6 font-bold text-sm md:text-base">
            <span className="text-white">ideas</span>
            <span className="bg-[#eebb00] text-black px-2 py-0.5 rounded-sm">→ don't grow</span>
            <span className="text-white">in</span>
            <span className="bg-[#4ade80] text-black px-2 py-0.5 rounded-sm">→ silence</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
            Built for creators,<br />
            Loved by communities
          </h2>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
          {/* Left Card - Creators */}
          <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
              className="bg-gradient-to-br from-[#d946ef] to-[#c026d3] rounded-[2.5rem] p-8 md:p-12 flex flex-col relative overflow-hidden min-h-[600px]"
          >
              <motion.div variants={itemVariants} className="bg-black text-white px-4 py-1.5 rounded-full text-sm font-bold w-fit mb-8 shadow-lg">
                  Creators
              </motion.div>
  
              <div className="space-y-6 relative z-10">
                  <motion.div variants={itemVariants} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white/20 shadow-sm backdrop-blur-sm">
                          <Target size={20} className="text-white" />
                      </div>
                      <span className="text-xl font-bold text-black leading-tight max-w-[250px]">Raise funds tied to long-term success</span>
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white/20 shadow-sm backdrop-blur-sm">
                          <Rocket size={20} className="text-white" />
                      </div>
                      <span className="text-xl font-bold text-black leading-tight max-w-[250px]">Gain visibility & genuine traction</span>
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white/20 shadow-sm backdrop-blur-sm">
                          <Sparkles size={20} className="text-white" />
                      </div>
                      <span className="text-xl font-bold text-black leading-tight max-w-[250px]">Zero upfront cost, zero insider allocations</span>
                  </motion.div>
              </div>
  
              {/* Floating Collage at Bottom */}
              <div className="mt-auto relative w-full h-[300px] pointer-events-none">
                  
                  {/* Orange Wallet Sticker */}
                  <motion.div 
                      animate={{ y: [0, -10, 0], rotate: [-10, -12, -10] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-[80px] left-[10%] w-24 h-24 bg-white rounded-[2rem] rotate-[-10deg] flex items-center justify-center shadow-2xl z-20"
                  >
                      <div className="w-20 h-20 bg-[#ff6b00] rounded-[1.5rem] flex items-center justify-center">
                          <Wallet size={32} className="text-white" />
                      </div>
                  </motion.div>
  
                   {/* Photo Sticker 1 */}
                   <motion.div 
                      animate={{ y: [0, 15, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute bottom-[20px] left-[0%] w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl z-10 overflow-hidden border-[6px] border-white"
                  >
                      <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop" className="w-full h-full object-cover" alt="User 1" />
                  </motion.div>
  
                  {/* Purple Chat Sticker */}
                  <motion.div 
                       animate={{ y: [0, -8, 0], rotate: [5, 8, 5] }}
                       transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                       className="absolute bottom-[50px] left-[35%] w-28 h-28 bg-white rounded-[2rem] rotate-[5deg] flex items-center justify-center shadow-2xl z-30"
                  >
                       <div className="w-24 h-24 bg-[#a855f7] rounded-[1.5rem] flex items-center justify-center">
                          <MessageCircle size={40} className="text-white fill-white" />
                      </div>
                  </motion.div>
  
                   {/* Photo Sticker 2 */}
                   <motion.div 
                      animate={{ y: [0, 10, 0], rotate: [15, 12, 15] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                      className="absolute bottom-[100px] right-[5%] w-24 h-24 bg-white rounded-[2rem] rotate-[15deg] flex items-center justify-center shadow-2xl z-10 overflow-hidden border-[6px] border-white"
                  >
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop" className="w-full h-full object-cover" alt="User 2" />
                  </motion.div>
  
                  {/* Black Dollar Sticker */}
                  <motion.div 
                       animate={{ y: [0, -12, 0], rotate: [-5, -8, -5] }}
                       transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                       className="absolute bottom-[10px] right-[15%] w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl z-40"
                  >
                       <div className="w-28 h-28 bg-black rounded-full flex items-center justify-center">
                          <span className="text-4xl font-black text-white">$</span>
                      </div>
                  </motion.div>
              </div>
          </motion.div>
  
          {/* Right Card - Communities */}
          <motion.div 
               initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
              className="bg-[#111] border border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col relative overflow-hidden min-h-[600px]"
          >
               {/* Animation Zone Top */}
               <div className="h-[250px] w-full relative mb-8 flex items-center justify-center">
                  {/* SVG Drawing Animation */}
                  <svg width="300" height="200" viewBox="0 0 300 200" className="opacity-80 absolute top-0 left-0 w-full h-full">
                      {/* Loop Arrow */}
                      <motion.path
                          d="M 50 150 C 50 50, 150 50, 150 100 C 150 150, 50 150, 50 50"
                          stroke="#666"
                          strokeWidth="4"
                          fill="transparent"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                      />
                       <motion.path
                          d="M 150 50 L 250 150"
                          stroke="#666"
                          strokeWidth="4"
                          fill="transparent"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
                      />
                      {/* Arrow head */}
                      <motion.path
                          d="M 240 150 L 250 150 L 250 140"
                          stroke="#666"
                          strokeWidth="4"
                          fill="transparent"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 2.5 }}
                      />
                      {/* Small Star Doodle */}
                       <motion.path
                          d="M 270 40 L 280 60 L 260 60 Z"
                          stroke="#888"
                          strokeWidth="2"
                          fill="transparent"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: 2.8, type: "spring" }}
                      />
                  </svg>
  
                  {/* Floating Coin */}
                   <motion.div
                      animate={{ rotateY: 360 }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="absolute top-1/2 right-[20%] w-20 h-20 rounded-full border-[3px] border-brand-yellow flex items-center justify-center bg-black/80 backdrop-blur-md shadow-[0_0_30px_rgba(238,255,0,0.2)]"
                   >
                      <span className="text-3xl font-black text-brand-yellow">$</span>
                      <div className="absolute inset-0 rounded-full border border-white/20 scale-125 opacity-50" />
                   </motion.div>
  
                   {/* Decorative Floating Shapes */}
                   <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5], rotate: [0, 45, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-[20%] right-[10%] text-brand-yellow"
                   >
                      <Sparkles size={28} />
                   </motion.div>
               </div>
  
              <motion.div variants={itemVariants} className="bg-[#333] text-white px-4 py-1.5 rounded-full text-sm font-bold w-fit mb-8 shadow-lg">
                  Communities
              </motion.div>
  
              <div className="space-y-6 relative z-10">
                   <motion.div variants={itemVariants} className="flex items-start gap-4 p-4 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group cursor-default">
                      <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Sparkles size={24} className="text-brand-yellow" />
                      </div>
                      <div className="flex flex-col justify-center h-12">
                          <span className="text-lg font-bold text-white leading-tight">Back early, reap unlimited upside</span>
                      </div>
                  </motion.div>
  
                   <motion.div variants={itemVariants} className="flex items-start gap-4 p-4 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group cursor-default">
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Zap size={24} className="text-green-500" />
                      </div>
                      <div className="flex flex-col justify-center h-12">
                          <span className="text-lg font-bold text-white leading-tight">Easily discover projects doing real good</span>
                      </div>
                  </motion.div>
  
                   <motion.div variants={itemVariants} className="flex items-start gap-4 p-4 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group cursor-default">
                      <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <MessageCircle size={24} className="text-pink-500" />
                      </div>
                      <div className="flex flex-col justify-center h-12">
                          <span className="text-lg font-bold text-white leading-tight">Co-create and engage directly</span>
                      </div>
                  </motion.div>
              </div>
          </motion.div>
        </div>
      </section>
    )
}

export const FooterSection = () => {
    return (
        <footer className="relative z-20 bg-black pt-32 pb-8 px-6 md:px-12 border-t border-white/10 overflow-hidden">
            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-32">
                     {/* Brand Column */}
                    <div className="flex flex-col gap-10">
                        <div className="text-3xl font-black uppercase tracking-tighter text-white">SPARKFUND</div>
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Fake Logos */}
                             <div className="flex items-center gap-3 bg-[#111] border border-white/10 px-5 py-3 rounded-xl">
                                <div className="w-6 h-6 bg-yellow-500 rounded-sm rotate-45 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-black rotate-45" />
                                </div>
                                <span className="font-bold text-white tracking-tight">YZILabs</span>
                             </div>
                             <div className="flex items-center gap-3 bg-[#111] border border-white/10 px-5 py-3 rounded-xl">
                                <div className="w-6 h-6 bg-[#002D74] rounded-full flex items-center justify-center">
                                     <div className="w-3 h-3 border-2 border-white rounded-full" />
                                </div>
                                <span className="font-bold text-white tracking-tight">crypto.com</span>
                                <span className="text-gray-500 font-bold text-xs tracking-widest border-l border-gray-700 pl-3">CAPITAL</span>
                             </div>
                        </div>
                    </div>

                    {/* CTA Card */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-[#eeff00] w-full md:w-[450px] p-8 rounded-[2.5rem] relative group cursor-pointer"
                    >
                        <h3 className="text-3xl font-bold text-black mb-8 tracking-tight">Get started</h3>
                        <div className="flex items-center justify-between bg-black text-white p-2 pl-6 rounded-full">
                            <span className="font-bold text-sm">Start My Launch</span>
                            <div className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                                <ArrowRight size={18} />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Navigation & Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 mb-32">
                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold text-lg cursor-pointer hover:text-[#eeff00] transition-colors w-fit">Home</span>
                        <span className="text-gray-400 font-medium cursor-pointer hover:text-white transition-colors w-fit">About us</span>
                        <span className="text-gray-400 font-medium cursor-pointer hover:text-white transition-colors w-fit">Prices</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold text-lg cursor-pointer hover:text-[#eeff00] transition-colors w-fit">Programs</span>
                        <span className="text-gray-400 font-medium cursor-pointer hover:text-white transition-colors w-fit">FAQ</span>
                        <span className="text-gray-400 font-medium cursor-pointer hover:text-white transition-colors w-fit">Support</span>
                    </div>
                    
                    <div className="col-span-2 flex flex-col items-end justify-between md:h-full">
                         <div className="flex gap-3 mb-8 md:mb-0">
                             <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer">
                                 <X size={20} />
                             </div>
                             <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer">
                                 <Gamepad2 size={20} />
                             </div>
                         </div>
                         <div className="text-right text-gray-500 text-[10px] font-bold tracking-wider leading-relaxed">
                            © 2025 SPARKFUND —<br/>ALL RIGHTS RESERVED
                         </div>
                    </div>
                </div>

                {/* Big Typography */}
                <div className="w-full border-b border-white/10 pb-4 mb-4">
                     <h1 className="text-[14vw] leading-[0.8] font-medium tracking-tighter text-white text-center md:text-left -ml-2">
                        SparkFund
                     </h1>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest gap-4">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left">
                        <span className="cursor-pointer hover:text-white transition-colors">Terms & Conditions</span>
                        <span className="cursor-pointer hover:text-white transition-colors">Information Security Policy</span>
                    </div>
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                    >
                        Back to the top <ArrowRight size={12} className="-rotate-90" />
                    </button>
                </div>
            </div>
        </footer>
    )
}
