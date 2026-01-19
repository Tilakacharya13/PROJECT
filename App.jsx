import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ThreeBackground } from './components/ThreeBackground';
import { FloatingUI } from './components/FloatingUI';
import { translateText } from './services/geminiService';
import { Sparkles, Menu, X, Activity, Bitcoin, Gamepad2, Users, Code, BrainCircuit, Heart, Sprout, GraduationCap, Palette, Trophy, Music, Ticket, ShieldCheck, Banknote, Layout, Zap } from 'lucide-react';
import { CountUp, SpotlightButton } from './components/UI';
import { TiltCard, TiltTicketCard, Step3Visual, CreatorsCommunitiesSection, FooterSection } from './components/PageSections';

// Initial Content
const INITIAL_HEADLINE = "Your Creative Work, Trading\non a Tokenized Market";
const INITIAL_SUBHEADLINE = "Fund your passion project with an easy, transparent token launch.\nReward your supporters as you change lives—together.";

// Animation Variants - Enhanced Orchestration
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1
    }
  }
};

const contentItemVariants = {
  hidden: { y: 40, opacity: 0, filter: "blur(10px)", scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 15, duration: 0.8 }
  }
};

const statsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const statsItemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

const menuOverlayVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { opacity: 1, backdropFilter: "blur(12px)", transition: { duration: 0.3 } },
    exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.2 } }
};

const menuContentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.1, duration: 0.4, ease: "easeOut" } }
};

// Advanced Reveal Variants for "How It Works"
const revealContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const revealItemVariants = {
  hidden: { y: 100, rotateX: 40, opacity: 0, filter: "blur(15px)" },
  visible: { 
    y: 0, 
    rotateX: 0, 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { 
      type: "spring", 
      stiffness: 70, 
      damping: 20,
      duration: 1.2
    } 
  }
};

const App = () => {
  const [headline, setHeadline] = useState(INITIAL_HEADLINE);
  const [subheadline, setSubheadline] = useState(INITIAL_SUBHEADLINE);
  const [language, setLanguage] = useState('English');
  const [isTranslating, setIsTranslating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  // Logic to hide bottom bar when NOT in Hero section
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { margin: "-40% 0px -40% 0px" }); // Adjusted margin for better toggle feel

  // Parallax Logic
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 800], [0, 250]);
  const opacityParallax = useTransform(scrollY, [0, 600], [1, 0]);

  // Translation Handler
  const handleLanguageChange = async (newLang) => {
    if (newLang === language) return;
    setLanguage(newLang);
    
    if (newLang === 'English') {
      setHeadline(INITIAL_HEADLINE);
      setSubheadline(INITIAL_SUBHEADLINE);
      return;
    }

    setIsTranslating(true);
    const result = await translateText(INITIAL_HEADLINE, INITIAL_SUBHEADLINE, newLang);
    setHeadline(result.headline);
    setSubheadline(result.subheadline);
    setIsTranslating(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveTab(id === 'home' ? 'Home' : id === 'how-it-works' ? 'How It Works' : 'Home');
    }
    setMobileMenuOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-brand-dark text-white relative font-sans overflow-x-hidden flex flex-col">
      {/* 3D Background */}
      <ThreeBackground />

      {/* Unified Island Navbar - Wide with increased padding */}
      <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-6 md:px-32 pointer-events-none">
        <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="pointer-events-auto bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-full p-3 pl-8 pr-3 shadow-2xl flex items-center justify-between gap-4 w-full max-w-7xl"
        >
            {/* Logo */}
            <div className="text-lg font-black uppercase tracking-tighter cursor-pointer flex-shrink-0" onClick={() => scrollToSection('home')}>
                SPARK<span className="text-gray-500">FUND</span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center bg-white/5 rounded-full p-1 mx-auto">
                <button 
                    onClick={() => scrollToSection('home')}
                    className={`px-6 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 flex items-center gap-2 relative z-10 ${activeTab === 'Home' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    {activeTab === 'Home' && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-white/10 rounded-full z-[-1]" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                    Home
                </button>
                <button 
                    onClick={() => scrollToSection('how-it-works')}
                    className={`px-6 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 flex items-center gap-2 relative z-10 ${activeTab === 'How It Works' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    {activeTab === 'How It Works' && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-white/10 rounded-full z-[-1]" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                    How It Works
                </button>
                <button 
                    onClick={() => setActiveTab("Who It's For")}
                    className={`px-6 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 flex items-center gap-2 relative z-10 ${activeTab === "Who It's For" ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    Who It's For
                </button>
                <button 
                    onClick={() => setActiveTab('Join Now')}
                    className={`px-6 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 flex items-center gap-2 relative z-10 ${activeTab === 'Join Now' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    Join Now
                </button>
            </div>

             {/* Right Actions */}
            <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2 pr-2 border-r border-white/10 mr-2">
                    <button className="w-8 h-8 rounded-full bg-transparent hover:bg-white/10 flex items-center justify-center transition group text-gray-400 hover:text-white">
                        <X size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-transparent hover:bg-white/10 flex items-center justify-center transition group text-gray-400 hover:text-white">
                        <Gamepad2 size={16} />
                    </button>
                </div>

                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:flex bg-brand-yellow text-black px-4 py-2 rounded-full font-bold text-[11px] items-center gap-2 shadow-[0_0_15px_rgba(238,255,0,0.1)] hover:shadow-[0_0_25px_rgba(238,255,0,0.3)] transition-shadow"
                >
                    <Sparkles size={10} className="fill-black" />
                    Launch
                </motion.button>
                
                {/* Mobile Menu Toggle */}
                <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                    <Menu size={18} />
                </button>
            </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <motion.section
        id="home" 
        ref={heroRef}
        style={{ y: heroParallax, opacity: opacityParallax }}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20 pointer-events-none"
      >
        <div className="pointer-events-auto w-full flex flex-col items-center">
            {/* Main Hero Visual Card - Smaller & Darker */}
            <motion.div variants={contentItemVariants} className="w-full flex justify-center z-30">
                <FloatingUI />
            </motion.div>

            {/* Content Container - Increased Max Width */}
            <div className="max-w-6xl text-center relative z-20 mt-1 w-full">
                
                <AnimatePresence mode="wait">
                    <motion.h1
                        variants={contentItemVariants}
                        key={headline}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-3 break-words whitespace-pre-line"
                    >
                        {isTranslating ? (
                            <span className="animate-pulse opacity-50">Translating...</span>
                        ) : (
                            headline
                        )}
                    </motion.h1>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.p
                        variants={contentItemVariants}
                        key={subheadline}
                        className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed mb-1 px-2 font-medium whitespace-pre-line"
                    >
                        {isTranslating ? "..." : subheadline}
                    </motion.p>
                </AnimatePresence>

                {/* Stats with Counting Animation - Small, Thin, Close */}
                <motion.div 
                    variants={statsContainerVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-1 md:gap-2 max-w-2xl mx-auto w-full px-2 items-start mt-2"
                >
                    <motion.div variants={statsItemVariants} className="text-center group cursor-default">
                        <div className="text-xs md:text-sm font-thin tracking-tight flex items-center justify-center gap-1 text-white group-hover:scale-105 transition-transform">
                            <Sparkles size={16} className="text-purple-500 fill-purple-500" /> 
                            <CountUp to={206} />
                        </div>
                        <div className="text-[8px] uppercase tracking-widest text-gray-600 mt-0.5 font-bold">Projects Launched</div>
                    </motion.div>
                    <motion.div variants={statsItemVariants} className="text-center group cursor-default">
                        <div className="text-xs md:text-sm font-thin tracking-tight flex items-center justify-center gap-1 text-white group-hover:scale-105 transition-transform">
                            <Users size={16} className="text-green-500 fill-green-500" />
                            <CountUp to={9.180} decimals={3} />
                        </div>
                        <div className="text-[8px] uppercase tracking-widest text-gray-600 mt-0.5 font-bold">Supporters Empowered</div>
                    </motion.div>
                    <motion.div variants={statsItemVariants} className="text-center group cursor-default">
                        <div className="text-xs md:text-sm font-thin tracking-tight flex items-center justify-center gap-1 text-white group-hover:scale-105 transition-transform">
                            <Activity size={16} className="text-brand-yellow fill-brand-yellow" />
                            <CountUp to={6.4} suffix=" M" decimals={1} />
                        </div>
                        <div className="text-[8px] uppercase tracking-widest text-gray-600 mt-0.5 font-bold">Total Market Cap</div>
                    </motion.div>
                    <motion.div variants={statsItemVariants} className="text-center group cursor-default">
                        <div className="text-xs md:text-sm font-thin tracking-tight flex items-center justify-center gap-1 text-white group-hover:scale-105 transition-transform">
                            <Bitcoin size={16} className="text-blue-500 fill-blue-500" />
                            <CountUp to={0.6} prefix="$" suffix=" M" decimals={1} />
                        </div>
                        <div className="text-[8px] uppercase tracking-widest text-gray-600 mt-0.5 font-bold">Earned by Creators</div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
      </motion.section>

      {/* How It Works Section - Centered with Professional Reveal */}
      <section 
        id="how-it-works" 
        className="relative z-20 min-h-[80vh] flex flex-col items-center justify-center bg-black overflow-hidden perspective-1000"
      >
        
        {/* Subtle spotlight background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none"></div>

        <motion.div 
            variants={revealContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="text-center z-10 flex flex-col items-center"
        >
             <div className="flex flex-col gap-2">
                <motion.h2 variants={revealItemVariants} className="text-5xl md:text-8xl font-black tracking-tighter text-white">
                    3 Steps to
                </motion.h2>
                <motion.h2 variants={revealItemVariants} className="text-5xl md:text-8xl font-black tracking-tighter text-white">
                     LAUNCH
                </motion.h2>
             </div>

            <motion.div
                variants={revealItemVariants}
                className="mt-4 md:mt-6 inline-block"
            >
                <motion.div
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-brand-yellow">
                        ( FREE )
                    </h2>
                </motion.div>
            </motion.div>
        </motion.div>
      </section>

      {/* Step 1 Section - Tell Your Story */}
      <section className="relative z-20 min-h-screen bg-black flex items-center justify-center py-20 px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            
            {/* Left Column: 3D Video Card */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="perspective-1000"
            >
                <TiltCard />
            </motion.div>

            {/* Right Column: Typography & Tags */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
                className="flex flex-col gap-6"
            >
                <div className="flex flex-col gap-2">
                     <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">— Step 1 —</span>
                     <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                        Tell your <span className="relative inline-block">
                            story
                            <span className="absolute bottom-1 left-0 w-full h-3 bg-white/20 -z-10 -rotate-2"></span>
                        </span>
                     </h2>
                </div>

                <div className="space-y-3 text-gray-400 text-sm md:text-base font-medium">
                    <div className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0"></span>
                        <p>Share your vision, roadmap & impact</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0"></span>
                        <p>Define token supply & allocation</p>
                    </div>
                </div>

                {/* Tags Grid */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {[
                        { label: 'Software & Dev', color: 'bg-gray-800 text-gray-200', icon: Code },
                        { label: 'AI Agents', color: 'bg-yellow-900/40 text-yellow-200 border border-yellow-800/50', icon: BrainCircuit },
                        { label: 'Gaming', color: 'bg-purple-900/40 text-purple-200 border border-purple-800/50', icon: Gamepad2 },
                        { label: 'Crazy Stuff', color: 'bg-green-900/40 text-green-200 border border-green-800/50', icon: Zap },
                        { label: 'Digital Arts', color: 'bg-blue-900/40 text-blue-200 border border-blue-800/50', icon: Palette },
                        { label: 'Music', color: 'bg-emerald-900/40 text-emerald-200 border border-emerald-800/50', icon: Music },
                        { label: 'Sport', color: 'bg-gray-800 text-gray-300', icon: Trophy },
                        { label: 'DeSci', color: 'bg-yellow-900/20 text-yellow-400', icon: Sprout },
                        { label: 'Dao', color: 'bg-indigo-900/40 text-indigo-300', icon: Users },
                        { label: 'Charity', color: 'bg-pink-900/20 text-pink-300', icon: Heart },
                        { label: 'Education', color: 'bg-purple-900/20 text-purple-300', icon: GraduationCap },
                    ].map((tag, i) => (
                        <span 
                            key={i} 
                            className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1.5 transition hover:scale-105 cursor-default ${tag.color}`}
                        >
                            <tag.icon size={10} strokeWidth={3} />
                            {tag.label}
                        </span>
                    ))}
                </div>

            </motion.div>
        </div>
      </section>

      {/* Step 2 Section - Fair Buy-in */}
      <section className="relative z-20 min-h-screen bg-black flex items-center justify-center py-20 px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            
            {/* Left Column: 3D Ticket Card */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="perspective-1000"
            >
                <TiltTicketCard />
            </motion.div>

            {/* Right Column: Typography & Info */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
                className="flex flex-col gap-6"
            >
                <div className="flex flex-col gap-2">
                     <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">— Step 2 —</span>
                     <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                        Community fair <br/>buy - <span className="text-[#818cf8] bg-clip-text">in raffle</span>
                     </h2>
                </div>

                <div className="space-y-3 text-gray-400 text-sm md:text-base font-medium mt-2">
                    <div className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"></span>
                        <p>60-minute ticket draw for early access</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"></span>
                        <p>Tickets cheaper the earlier you join</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"></span>
                        <p>Winners picked via VRF Oracle</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"></span>
                        <p>Full refunds if you're not drawn</p>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-white/10 text-xs font-bold text-gray-300 flex items-center gap-2">
                         <Layout size={12} /> No Code
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-white/10 text-xs font-bold text-gray-300 flex items-center gap-2">
                         <Banknote size={12} /> No VC
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-white/10 text-xs font-bold text-green-400 flex items-center gap-2">
                         <ShieldCheck size={12} /> No BS
                    </span>
                </div>

                <div className="text-xs text-gray-500 font-medium mt-2">
                    Insight: No gas wars. No whale snipes. Fair for everyone.
                </div>

                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-bold text-xs w-fit flex items-center gap-2 border border-white/10 transition-colors"
                >
                    <Zap size={14} className="fill-white" />
                    Create My Project Now
                </motion.button>

            </motion.div>
        </div>
      </section>

      {/* Step 3 Section - Earn Progress */}
      <section className="relative z-20 min-h-screen bg-black flex items-center justify-center py-20 px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            
            {/* Left Column: Rotating Social Graph Visual */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ type: "spring", duration: 0.8 }}
            >
                <Step3Visual />
            </motion.div>

            {/* Right Column: Typography & Info */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
                className="flex flex-col gap-6"
            >
                <div className="flex flex-col gap-2">
                     <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">— Step 3 —</span>
                     <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.95] -ml-1">
                        Earn as Your <br/>Project <span className="text-green-500">Progress</span>
                     </h2>
                </div>

                <div className="space-y-4 text-gray-400 text-sm md:text-base font-medium mt-4">
                    <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"></span>
                        <p>Bonding-curve launch <span className="text-gray-600 mx-1">→</span> PancakeSwap LP</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"></span>
                        <p>Creators vest 2% of sale over 30 days</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"></span>
                        <p>Creators share 50% of all trading & DEX fees</p>
                    </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-4 py-2 rounded-full bg-[#1a1a1a] border border-white/10 text-xs font-bold text-gray-200 flex items-center gap-2">
                         <Layout size={14} className="opacity-80" /> No Code
                    </span>
                    <span className="px-4 py-2 rounded-full bg-yellow-900/10 border border-yellow-500/10 text-xs font-bold text-yellow-200 flex items-center gap-2">
                         <Banknote size={14} className="text-yellow-400" /> No VC
                    </span>
                    <span className="px-4 py-2 rounded-full bg-green-900/10 border border-green-500/10 text-xs font-bold text-green-400 flex items-center gap-2">
                         <ShieldCheck size={14} /> No BS
                    </span>
                </div>

                <div className="text-xs text-gray-500 font-medium mt-2">
                    Insight: No gas wars. No whale snipes. Fair for everyone.
                </div>

                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 bg-[#1a1a1a] hover:bg-[#252525] text-white px-8 py-4 rounded-full font-bold text-sm w-fit flex items-center gap-2 border border-white/10 transition-colors shadow-xl"
                >
                    <Zap size={16} className="fill-white" />
                    Create My Project Now
                </motion.button>

            </motion.div>
        </div>
      </section>

      {/* Creators vs Communities Section */}
      <CreatorsCommunitiesSection />

      {/* Floating Bottom Bar with Spotlight Animations - Only Visible in Hero Section */}
       <motion.div 
        initial={{ y: 150, x: "-50%", opacity: 0 }}
        animate={{ 
            y: isHeroInView ? 0 : 200, 
            x: "-50%", 
            opacity: isHeroInView ? 1 : 0 
        }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="fixed bottom-6 left-1/2 z-40"
      >
        <div className="bg-[#111] border border-white/10 p-1.5 rounded-full shadow-2xl flex items-center justify-center gap-3">
             <SpotlightButton 
                className="bg-brand-yellow text-black px-6 py-3 rounded-full font-bold text-xs"
                spotlightColor="rgba(255, 255, 255, 0.6)"
            >
                <Sparkles size={12} className="fill-black" /> Launch Your Project
            </SpotlightButton>

             <SpotlightButton
                className="bg-transparent text-gray-300 px-6 py-3 rounded-full font-bold text-xs hover:text-white transition-colors"
                spotlightColor="rgba(255, 255, 255, 0.15)"
            >
                <Zap size={12} className="fill-gray-300 group-hover:fill-white transition-colors" /> Explore Live Projects
            </SpotlightButton>
        </div>
      </motion.div>

      {/* New Footer Section */}
      <FooterSection />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div
                variants={menuOverlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center"
            >
                <motion.div 
                    variants={menuContentVariants}
                    className="flex flex-col items-center gap-8 text-3xl font-black tracking-tight"
                >
                    <a href="#home" onClick={() => scrollToSection('home')} className="hover:text-brand-yellow transition">Home</a>
                    <a href="#how-it-works" onClick={() => scrollToSection('how-it-works')} className="hover:text-brand-yellow transition">How It Works</a>
                    <a href="#" onClick={() => { setActiveTab("Who It's For"); setMobileMenuOpen(false); }} className="hover:text-brand-yellow transition">Who It's For</a>
                    <a href="#" onClick={() => { setActiveTab('Join Now'); setMobileMenuOpen(false); }} className="hover:text-brand-yellow transition">Join Now</a>
                    
                    <div className="flex flex-wrap justify-center gap-4 mt-8 px-8">
                            {['English', 'Spanish', 'French', 'Japanese', 'German'].map((lang) => (
                                <button 
                                    key={lang}
                                    onClick={() => { handleLanguageChange(lang); setMobileMenuOpen(false); }}
                                    className={`text-sm px-4 py-2 rounded-full border ${language === lang ? 'bg-brand-yellow text-black border-brand-yellow' : 'border-gray-800 text-gray-500'}`}
                                >
                                    {lang}
                                </button>
                            ))}
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
};

export default App;
