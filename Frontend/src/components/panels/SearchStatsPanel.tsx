import { motion } from 'framer-motion';
import { Timer, Eye, Clock, Cpu, HardDrive } from 'lucide-react';
import { searchAlgorithmInfo } from '@/algorithms/search';

interface SearchStats {
  comparisons: number;
  startTime: number | null;
  elapsedTime: number;
}

interface SearchStatsPanelProps {
  stats: SearchStats;
  algorithm: string;
}

export function SearchStatsPanel({ stats, algorithm }: SearchStatsPanelProps) {
  const info = searchAlgorithmInfo[algorithm];

  if (!info) {
    return <div className="glass-card rounded-2xl p-6">No algorithm info found</div>;
  }

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
          <div className="text-lg font-mono text-primary pl-6">
            {info.spaceComplexity}
          </div>
          <div className="text-xs text-muted-foreground pl-6 pt-2">
            {info.requiresSorted ? '⚠️ Requires sorted array' : '✓ Works on any array'}
          </div>
        </div>
      </div>

      {/* Live Statistics */}
      <div className="border-t border-border/50 pt-4 space-y-3">
        <h4 className="text-sm font-medium text-foreground">Current Run</h4>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between py-2"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="w-4 h-4" />
            <span className="text-sm">Comparisons</span>
          </div>
          <span className="text-lg font-semibold text-state-comparing">{stats.comparisons}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between py-2"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Elapsed Time</span>
          </div>
          <span className="text-lg font-semibold text-state-sorted">
            {formatTime(stats.elapsedTime)}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
