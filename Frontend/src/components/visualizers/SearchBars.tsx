import { motion } from 'framer-motion';

interface SearchBarsProps {
  array: number[];
  comparingIndices: number[];
  foundIndex: number;
}

export function SearchBars({ array, comparingIndices, foundIndex }: SearchBarsProps) {
  const maxValue = Math.max(...array);

  return (
    <div className="flex items-end justify-center gap-1 h-64 w-full px-4">
      {array.map((value, idx) => {
        let bgColor = 'bg-primary/60';
        
        if (idx === foundIndex && foundIndex !== -1) {
          bgColor = 'bg-success';
        } else if (comparingIndices.includes(idx)) {
          bgColor = 'bg-warning';
        }

        return (
          <motion.div
            key={idx}
            className={`${bgColor} rounded-t transition-colors flex flex-col items-center`}
            style={{
              height: `${(value / maxValue) * 100}%`,
              flex: 1,
            }}
            animate={{ scale: comparingIndices.includes(idx) ? 1.1 : 1 }}
            transition={{ duration: 0.1 }}
            title={`Index ${idx}: ${value}`}
          >
            {array.length <= 20 && (
              <motion.span
                className="text-xs text-foreground/80 font-mono -mb-5"
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
