import { motion } from 'framer-motion';
import { VisualizerStats } from '@/hooks/useSortingVisualizer';
import { algorithmInfo } from '@/algorithms/sorting';
import { Timer, ArrowRightLeft, Eye, Clock, Cpu, HardDrive } from 'lucide-react';

interface StatsPanelProps {
  stats: VisualizerStats;
  algorithm: string;
}

export function StatsPanel({ stats, algorithm }: StatsPanelProps) {
  const info = algorithmInfo[algorithm];
  
  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="glass-card rounded-2xl p-6 space-y-6">
      {/* Algorithm Info */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{info.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{info.description}</p>
      </div>

      {/* Complexity */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Cpu className="w-4 h-4" />
            <span className="text-sm font-medium">Time Complexity</span>
          </div>
          <div className="space-y-1 pl-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Best</span>
              <span className="font-mono text-state-sorted">{info.timeComplexity.best}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Average</span>
              <span className="font-mono text-state-comparing">{info.timeComplexity.average}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Worst</span>
              <span className="font-mono text-state-swapping">{info.timeComplexity.worst}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <HardDrive className="w-4 h-4" />
            <span className="text-sm font-medium">Space Complexity</span>
          </div>
          <div className="pl-6">
            <span className="font-mono text-primary">{info.spaceComplexity}</span>
          </div>
          <div className="pl-6 pt-2">
            <span className="text-sm text-muted-foreground">
              {info.stable ? '✓ Stable' : '✗ Unstable'}
            </span>
          </div>
        </div>
      </div>

      {/* Live Stats */}
      <div className="border-t border-border/50 pt-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Live Statistics</h4>
        <div className="grid grid-cols-3 gap-4">
          <motion.div 
            className="text-center"
            key={stats.comparisons}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Eye className="w-3.5 h-3.5" />
              <span className="text-xs">Comparisons</span>
            </div>
            <span className="text-2xl font-mono font-bold text-state-comparing">
              {stats.comparisons}
            </span>
          </motion.div>

          <motion.div 
            className="text-center"
            key={stats.swaps}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span className="text-xs">Swaps</span>
            </div>
            <span className="text-2xl font-mono font-bold text-state-swapping">
              {stats.swaps}
            </span>
          </motion.div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Timer className="w-3.5 h-3.5" />
              <span className="text-xs">Time</span>
            </div>
            <span className="text-2xl font-mono font-bold text-primary">
              {formatTime(stats.elapsedTime)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
