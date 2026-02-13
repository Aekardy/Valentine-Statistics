import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Beaker, Heart, Calculator, Check, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Component for the revealable boxes
const RevealBox = ({ 
  title, 
  children, 
  delay = 0,
  isRevealable = true 
}: { 
  title: string; 
  children: React.ReactNode; 
  delay?: number;
  isRevealable?: boolean;
}) => {
  const [isRevealed, setIsRevealed] = useState(!isRevealable);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="mb-8 w-full max-w-2xl mx-auto"
    >
      <div 
        onClick={() => isRevealable && setIsRevealed(true)}
        className={`
          relative overflow-hidden border border-border rounded-lg bg-white shadow-sm transition-all duration-500
          ${isRevealable && !isRevealed ? 'cursor-pointer hover:shadow-md hover:border-primary/30' : ''}
        `}
      >
        <div className="bg-secondary/30 px-6 py-3 border-b border-border flex justify-between items-center">
          <h3 className="font-mono text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            {isRevealable && !isRevealed ? <Beaker className="w-4 h-4" /> : <Check className="w-4 h-4 text-green-500" />}
            {title}
          </h3>
          {isRevealable && !isRevealed && (
            <span className="text-xs text-muted-foreground animate-pulse">Click to Reveal Data</span>
          )}
        </div>
        
        <div className="p-8 relative min-h-[100px] flex items-center justify-center">
          <AnimatePresence>
            {!isRevealed && (
              <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 backdrop-blur-md bg-white/50 z-10 flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
                  <span className="font-serif italic">Data Obfuscated</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className={`transition-all duration-700 ${!isRevealed ? 'blur-sm opacity-50' : 'blur-0 opacity-100'} w-full`}>
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ValentineExperiment() {
  const [pValue, setPValue] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [experimentState, setExperimentState] = useState<'initial' | 'calculating' | 'concluded' | 'accepted'>('initial');
  const [showContact, setShowContact] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const calculatePValue = () => {
    setIsCalculating(true);
    setExperimentState('calculating');
    
    // Simulate complex calculation
    setTimeout(() => {
      setIsCalculating(false);
      setPValue(0.001);
      setExperimentState('concluded');
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, 2000);
  };

  const handleAccept = () => {
    setExperimentState('accepted');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fda4af', '#fff1f2']
    });
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-800 font-sans selection:bg-rose-200">
      {/* Header / Hero */}
      <header className="pt-24 pb-16 px-4 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 mb-6 border border-slate-200 rounded-full bg-white text-xs font-mono text-slate-500 uppercase tracking-widest">
            Research Paper No. 143
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-medium mb-4 text-slate-900 leading-tight">
            A Small Statistical Experiment
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-serif italic mt-4">
            Subject: <span className="text-slate-800 font-normal not-italic border-b-2 border-rose-200">Us</span>
          </p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12 flex justify-center text-slate-400"
          >
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </motion.div>
        </motion.div>
      </header>

      <main className="px-4 pb-32 max-w-4xl mx-auto space-y-2">
        
        {/* Step 1: Initialization */}
        <RevealBox title="Methodology / Initialization">
          <div className="text-center space-y-4">
            <p className="font-serif text-lg leading-relaxed text-slate-700">
              Model initialization in progress...
            </p>
            <div className="flex justify-center gap-2">
              <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></span>
              <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse delay-100"></span>
              <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse delay-200"></span>
            </div>
            <p className="font-mono text-xs text-slate-400 mt-2">
              Loading emotive parameters...
            </p>
          </div>
        </RevealBox>

        {/* Step 2: Input Features */}
        <RevealBox title="Input Features (X)">
          <ul className="space-y-4 text-center">
            <li className="p-3 bg-slate-50 rounded border border-slate-100 font-serif text-lg text-slate-700">
              <span className="font-mono text-xs text-rose-500 block mb-1">x₁</span>
              Your cuteness
            </li>
            <li className="p-3 bg-slate-50 rounded border border-slate-100 font-serif text-lg text-slate-700">
              <span className="font-mono text-xs text-rose-500 block mb-1">x₂</span>
              Our conversations
            </li>
            <li className="p-3 bg-slate-50 rounded border border-slate-100 font-serif text-lg text-slate-700">
              <span className="font-mono text-xs text-rose-500 block mb-1">x₃</span>
              Our intellectual chaos
            </li>
          </ul>
        </RevealBox>

        {/* Step 3: Hypothesis */}
        <RevealBox title="Hypothesis Testing">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 rounded-lg border border-slate-200 bg-slate-50/50">
              <h4 className="font-mono text-sm text-slate-500 mb-2">Null Hypothesis (H₀)</h4>
              <p className="font-serif text-lg text-slate-800">
                You and I remain <span className="italic text-slate-500">just</span> friends.
              </p>
              <p className="mt-2 text-xs font-mono text-slate-400">Status Quo</p>
            </div>
            
            <div className="p-6 rounded-lg border-2 border-rose-100 bg-rose-50/30">
              <h4 className="font-mono text-sm text-rose-500 mb-2">Alternative Hypothesis (H₁)</h4>
              <p className="font-serif text-lg text-slate-800">
                Asking you to be my Valentine significantly increases the happiness factor.
              </p>
              <p className="mt-2 text-xs font-mono text-rose-400">Projected Outcome: Optimal</p>
            </div>
          </div>
        </RevealBox>

        {/* Step 4: Calculation */}
        <motion.div 
          className="py-12 flex flex-col items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {!pValue ? (
            <Button 
              size="lg" 
              onClick={calculatePValue}
              disabled={isCalculating}
              className="h-16 px-8 rounded-full text-lg font-serif transition-all duration-500 hover:scale-105 shadow-lg bg-slate-900 hover:bg-rose-600 text-white border-none cursor-pointer"
            >
              {isCalculating ? (
                <div className="flex items-center gap-3">
                  <span className="animate-spin text-xl">⟳</span>
                  Calculating p-value...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Calculator className="w-5 h-5" />
                  Calculate Statistical Significance
                </div>
              )}
            </Button>
          ) : (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-8 rounded-xl border border-slate-200 shadow-xl text-center max-w-md w-full"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600">
                <Beaker className="w-6 h-6" />
              </div>
              <div className="font-mono text-sm text-slate-500 mb-2">Result Obtained</div>
              <div className="text-5xl font-mono font-bold text-slate-900 mb-4 tracking-tighter">
                p = 0.001
              </div>
              <p className="text-sm text-slate-600 font-sans">
                p &lt; 0.05 (Significant Result)
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Step 5: Conclusion & Action */}
        {experimentState === 'concluded' && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 text-center max-w-2xl mx-auto"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-serif text-slate-900">
                Conclusion: Reject H₀
              </h2>
              <p className="text-xl text-slate-600 font-light leading-relaxed">
                The data strongly supports H₁. <br/>
                Will you validate the findings?
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4">
              <Button 
                variant="outline"
                className="h-14 px-8 rounded-full text-lg hover:bg-slate-100 cursor-not-allowed opacity-50 active:scale-100"
                onClick={() => {}} // Does nothing intentionally
              >
                No
              </Button>
              
              <Button 
                size="lg"
                onClick={handleAccept}
                className="h-14 px-10 rounded-full text-lg bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Yes, Validate Results
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 6: Success State */}
        {experimentState === 'accepted' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pt-12 text-center space-y-8"
          >
            <div className="p-8 rounded-2xl bg-rose-50 border border-rose-100 max-w-xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 animate-bounce">
                  <Heart className="w-8 h-8 fill-current" />
                </div>
              </div>
              <h2 className="text-2xl font-serif font-medium text-rose-900 mb-2">
                Experiment Successful
              </h2>
              <p className="text-rose-700">
                Results validated. Happiness factor increasing exponentially.
              </p>
            </div>

            <div className="pt-8">
              {!showContact ? (
                <Button 
                  variant="ghost" 
                  onClick={() => setShowContact(true)}
                  className="text-slate-400 hover:text-slate-600 hover:bg-transparent"
                >
                  Report concerns or queries?
                </Button>
              ) : (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="inline-block p-6 rounded-xl bg-white border border-slate-200 shadow-lg">
                    <p className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-widest">
                      Principal Investigator
                    </p>
                    <a href="tel:9902299331" className="flex items-center gap-3 text-2xl font-mono text-slate-800 hover:text-rose-600 transition-colors">
                      <Phone className="w-5 h-5" />
                      9902299331
                    </a>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl md:text-5xl font-serif text-rose-500 pt-8 leading-tight"
                  >
                    Happy Valentine's Day <br/>
                    <span className="font-bold italic">puchku!!</span>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
        
        <div ref={bottomRef} className="h-4" />
      </main>
    </div>
  );
}
