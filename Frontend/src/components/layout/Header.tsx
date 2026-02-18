import { motion } from 'framer-motion';
import { Binary, Github, Laptop2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface HeaderProps {
  showVisualizer?: boolean;
}

export function Header({ showVisualizer = false }: HeaderProps) {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/sorting');
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Binary className="w-5 h-5 text-primary" />
          </div>
          <span className="font-semibold text-lg text-foreground">AlgoViz</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#features" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a 
            href="#algorithms" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Algorithms
          </a>
          <a 
            href="#about" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://vscode.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="control-btn"
                  aria-label="Go to VS Code for practice"
                >
                  <Laptop2 className="w-5 h-5" />
                </a>
              </TooltipTrigger>
              <TooltipContent>Practice coding in VS Code</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="control-btn"
          >
            <Github className="w-5 h-5" />
          </a>
          {!showVisualizer && (
            <button
              onClick={handleStartLearning}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium 
                       hover:opacity-90 transition-opacity cursor-pointer"
            >
              Start Learning
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
