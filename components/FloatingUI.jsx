import React from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

export const FloatingUI = () => {
  return (
    <div className="relative w-full max-w-[280px] md:max-w-[320px] h-[140px] md:h-[175px] mx-auto mb-4 perspective-[1000px] z-10">
      
      {/* Main Container / "Screen" */}
      <motion.div 
        initial={{ opacity: 0, rotateX: 35, y: 80, scale: 0.8 }}
        animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
        className="absolute inset-x-4 inset-y-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,#000000_100%)] backdrop-blur-xl rounded-[1.5rem] border border-white/10 shadow-2xl flex items-center justify-center overflow-visible"
      >
        {/* Background Grid/Noise */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 rounded-[1.5rem]"></div>

        {/* Central Notification Pill */}
        <motion.div
           initial={{ scale: 0.5, opacity: 0, y: 20 }}
           animate={{ scale: 1, opacity: 1, y: 0 }}
           transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 25 }}
           whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
           className="relative z-30 bg-white/10 backdrop-blur-md border border-white/20 p-2.5 pr-8 rounded-full flex items-center gap-4 shadow-2xl cursor-default group overflow-hidden"
        >
            {/* Animated RGBA White Background Effect */}
            <motion.div 
                className="absolute inset-0 bg-[rgba(255,255,255,0.1)]"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="relative z-10">
                <img src="data:image/jpeg;base64,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" alt="James" className="w-16 h-16 rounded-full border-2 border-white/20 grayscale group-hover:grayscale-0 transition-all" />
                <div className="absolute -bottom-1 -right-1 bg-brand-yellow text-black p-1.5 rounded-full border border-black">
                    <Music size={16} strokeWidth={3} />
                </div>
            </div>
            <div className="text-left z-10">
                <div className="text-[11px] text-gray-300 font-bold uppercase tracking-wider leading-none mb-1">James earned</div>
                <div className="text-[16px] font-bold text-white flex items-center gap-1 leading-none">
                    <span className="text-brand-yellow">$21K</span> on music.
                </div>
            </div>
        </motion.div>

        {/* Cameron (Green) - Top Center & Phone Message Pop */}
        <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 400, damping: 20 }}
            style={{ transformOrigin: "bottom center" }}
            className="absolute top-[-12px] left-1/2 -translate-x-1/2 z-20"
        >
            <motion.div 
                whileHover={{ scale: 1.15, rotate: 0, y: -5, transition: { type: "spring", stiffness: 300 } }}
                animate={{ y: [0, -3, 0], rotate: [4, 2, 4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-green-400 text-black px-3 py-1 rounded-full font-bold text-[10px] shadow-lg relative border border-green-300 whitespace-nowrap cursor-pointer"
            >
                Cameron
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-400 transform translate-y-1/2 rotate-45 border-b border-r border-green-300"></div>
            </motion.div>
        </motion.div>

        {/* Esther (White) - Right & Phone Message Pop */}
        <motion.div
            initial={{ scale: 0.5, opacity: 0, x: 20, y: 10 }}
            animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.0, type: "spring", stiffness: 400, damping: 20 }}
            style={{ transformOrigin: "center left" }}
            className="absolute top-8 right-[-25px] z-20"
        >
            <motion.div
                whileHover={{ scale: 1.15, rotate: 0, x: 5, transition: { type: "spring", stiffness: 300 } }}
                animate={{ y: [0, 3, 0], rotate: [-2, -4, -2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="bg-white text-black px-3 py-1 rounded-full font-bold text-[10px] shadow-lg relative border border-gray-200 cursor-pointer"
            >
                Esther
                 <div className="absolute top-1/2 -translate-y-1/2 left-[-3px] w-1.5 h-1.5 bg-white transform rotate-45 border-b border-l border-gray-200"></div>
            </motion.div>
        </motion.div>

        {/* John (Yellow) - Bottom Left & Phone Message Pop */}
        <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 400, damping: 20 }}
            style={{ transformOrigin: "top left" }}
            className="absolute bottom-4 left-8 z-20"
        >
            <motion.div
                whileHover={{ scale: 1.15, rotate: 0, y: 5, transition: { type: "spring", stiffness: 300 } }}
                animate={{ x: [0, 2, 0], rotate: [8, 10, 8] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="bg-brand-yellow text-black px-3 py-1 rounded-full font-bold text-[10px] shadow-lg border border-yellow-300 cursor-pointer"
            >
                John
            </motion.div>
        </motion.div>

        {/* Floating Logos Stack (Left) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[-30px] md:left-[-40px] flex flex-col gap-2 z-20 origin-right">
             <motion.div 
                initial={{ x: 30, opacity: 0, scale: 0 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, type: "spring" }}
             >
                 <motion.div
                    whileHover={{ scale: 1.15, rotate: 0, x: -5, transition: { type: "spring", stiffness: 300 } }}
                    animate={{ x: [0, 3, 0], rotate: [-6, 0, -6] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="w-20 h-20 bg-[#002D74] rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl transform -rotate-6 translate-x-1.5 cursor-pointer"
                 >
                    <div className="text-[10px] font-bold text-white leading-tight text-center">CRYPTO<br/>.COM</div>
                 </motion.div>
             </motion.div>

             <motion.div 
                initial={{ x: 20, opacity: 0, scale: 0 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, type: "spring" }}
             >
                 <motion.div
                    whileHover={{ scale: 1.15, rotate: 0, x: -5, transition: { type: "spring", stiffness: 300 } }}
                    animate={{ x: [0, -1.5, 0], rotate: [3, -2, 3] }}
                    transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                    className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl transform rotate-3 cursor-pointer"
                 >
                    <span className="font-bold text-[11px] text-white text-center leading-tight">DWF<br/>LABS</span>
                 </motion.div>
             </motion.div>

             <motion.div 
                initial={{ x: 40, y: -20, opacity: 0, scale: 0 }}
                animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, type: "spring" }}
             >
                 <motion.div
                     whileHover={{ scale: 1.15, rotate: 0, x: -5, transition: { type: "spring", stiffness: 300 } }}
                     animate={{ y: [0, -1.5, 0], rotate: [-12, -8, -12] }}
                     transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                     className="w-20 h-20 bg-[#F3BA2F] rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl transform -rotate-12 translate-x-0.5 cursor-pointer"
                 >
                     <span className="font-bold text-[10px] text-black text-center leading-tight">BINANCE<br/>LABS</span>
                 </motion.div>
             </motion.div>
        </div>

        {/* Start Button Icon (Star) - Directly ABOVE the Circle Icon */}
        <div className="absolute top-[-25px] right-[-15px] z-20">
             <motion.div
                initial={{ x: -20, y: -20, scale: 0, opacity: 0 }}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                transition={{ delay: 1.4, type: "spring" }}
             >
                 <motion.div 
                    whileHover={{ scale: 1.15, rotate: 0, y: -5, transition: { type: "spring", stiffness: 300 } }}
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                    className="w-16 h-16 rounded-full overflow-hidden shadow-2xl border border-brand-purple cursor-pointer"
                    style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}
                >
                    <img 
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop" 
                        className="w-full h-full object-cover"
                        alt="User Star"
                    />
                </motion.div>
            </motion.div>
        </div>

        {/* Circle Icon - Moved BELOW the Star Icon */}
        <div className="absolute top-24 right-[-30px] z-20">
            <motion.div
                initial={{ x: -30, y: 30, scale: 0, opacity: 0 }}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
            >
                <motion.img 
                    whileHover={{ scale: 1.25, transition: { type: "spring", stiffness: 300 } }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" 
                    className="w-16 h-16 rounded-full border-2 border-white/20 shadow-2xl object-cover cursor-pointer"
                    alt="User"
                />
            </motion.div>
        </div>

      </motion.div>
    </div>
  );
};
