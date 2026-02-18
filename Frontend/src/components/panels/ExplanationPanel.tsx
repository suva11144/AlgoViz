import type { ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SortStep } from '@/algorithms/sorting';
import {
  MessageCircle,
  ArrowRightLeft,
  Eye,
  CheckCircle,
  Target,
  GitMerge,
  Footprints,
  ListOrdered,
  ListEnd,
  RefreshCw,
} from 'lucide-react';

/** Supports both sorting steps (SortStep) and graph steps (visit/enqueue/dequeue/update/done) */
interface ExplanationPanelProps {
  currentStep: (SortStep & { operation?: string }) | null;
}

const operationIcons: Record<string, ComponentType<{ className?: string }>> = {
  compare: Eye,
  swap: ArrowRightLeft,
  done: CheckCircle,
  pivot: Target,
  merge: GitMerge,
  // Graph algorithm operations
  visit: Footprints,
  enqueue: ListOrdered,
  dequeue: ListEnd,
  update: RefreshCw,
};

const operationColors: Record<string, string> = {
  compare: 'text-state-comparing',
  swap: 'text-state-swapping',
  done: 'text-state-sorted',
  pivot: 'text-state-active',
  merge: 'text-state-visited',
  visit: 'text-state-visited',
  enqueue: 'text-state-comparing',
  dequeue: 'text-state-swapping',
  update: 'text-state-active',
};

export function ExplanationPanel({ currentStep }: ExplanationPanelProps) {
  if (!currentStep) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 text-muted-foreground">
          <MessageCircle className="w-5 h-5" />
          <p className="text-sm">Click Play or Step Forward to begin visualization</p>
        </div>
      </div>
    );
  }

  const Icon = operationIcons[currentStep.operation] ?? MessageCircle;
  const colorClass = operationColors[currentStep.operation] ?? 'text-muted-foreground';

  return (
    <div className="glass-card rounded-2xl p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.explanation}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="flex items-start gap-4"
        >
          <div className={`p-2 rounded-lg bg-secondary/50 ${colorClass}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-foreground leading-relaxed">{currentStep.explanation}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {currentStep.comparing.length > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-state-comparing/20 text-state-comparing text-xs font-medium">
                  <Eye className="w-3 h-3" />
                  Comparing: [{currentStep.comparing.join(', ')}]
                </span>
              )}
              {currentStep.swapping.length > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-state-swapping/20 text-state-swapping text-xs font-medium">
                  <ArrowRightLeft className="w-3 h-3" />
                  Swapping: [{currentStep.swapping.join(', ')}]
                </span>
              )}
              {currentStep.sorted.length > 0 && currentStep.operation !== 'done' && (
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-state-sorted/20 text-state-sorted text-xs font-medium">
                  <CheckCircle className="w-3 h-3" />
                  Sorted: {currentStep.sorted.length} elements
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
