import { motion } from 'framer-motion';
import { ArrowDown, Play, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  const handleStartVisualizing = () => {
    navigate('/sorting');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent" />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, hsl(var(--primary) / 0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-state-visited/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Interview-Ready Algorithm Practice</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-foreground">Master Algorithms</span>
            <br />
            <span className="gradient-text">Visually</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Interactive visualizations of sorting, searching, and graph algorithms. 
            Step through each operation, understand complexities, and ace your interviews.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={handleStartVisualizing}
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground 
                       font-semibold text-lg shadow-lg hover:scale-105 transition-transform animate-glow-pulse cursor-pointer"
            >
              <Play className="w-5 h-5" />
              Start Visualizing
            </button>
            <a
              href="#algorithms"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary/50 text-foreground 
                       font-medium text-lg border border-border/50 hover:bg-secondary transition-colors"
            >
              Explore Algorithms
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">5+</div>
              <div className="text-sm text-muted-foreground">Sorting Algorithms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">3+</div>
              <div className="text-sm text-muted-foreground">Graph Algorithms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">∞</div>
              <div className="text-sm text-muted-foreground">Practice Sessions</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
