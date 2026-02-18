import { motion } from 'framer-motion';
import { SortStep } from '@/algorithms/sorting';

interface SortingBarsProps {
  array: number[];
  currentStep: SortStep | null;
  maxValue?: number;
}

export function SortingBars({ array, currentStep, maxValue }: SortingBarsProps) {
  const max = maxValue || Math.max(...array, 100);
  
  const getBarClass = (index: number): string => {
    if (!currentStep) return 'bar-default';
    
    if (currentStep.sorted.includes(index)) return 'bar-sorted';
    if (currentStep.swapping.includes(index)) return 'bar-swapping';
    if (currentStep.comparing.includes(index)) return 'bar-comparing';
    
    return 'bar-default';
  };

  return (
    <div className="flex items-end justify-center gap-[2px] h-[400px] w-full px-4">
      {array.map((value, index) => {
        const height = (value / max) * 100;
        const barClass = getBarClass(index);
        
        return (
          <motion.div
            key={index}
            className={`rounded-t-sm min-w-[4px] ${barClass}`}
            style={{
              height: `${height}%`,
              flex: `1 1 ${100 / array.length}%`,
              maxWidth: '60px',
            }}
            layout
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            {array.length <= 20 && (
              <motion.span 
                className="block text-center text-xs font-mono text-foreground/80 -mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {value}
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
