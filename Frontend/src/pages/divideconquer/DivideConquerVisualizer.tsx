import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlgoCodeCard } from '@/components/ui/algo-code-card';
import { divideConquerAlgoInfo } from './algoData';
import { MaxMinVisualizer } from '@/components/visualizers/divideconquer/MaxMinVisualizer';
import { QuicksortVisualizer } from '@/components/visualizers/divideconquer/QuicksortVisualizer';
import { BinarySearchVisualizer } from '@/components/visualizers/divideconquer/BinarySearchVisualizer';
import { MergeSortVisualizer } from '@/components/visualizers/divideconquer/MergeSortVisualizer';
import { StrassenVisualizer } from '@/components/visualizers/divideconquer/StrassenVisualizer';

export function DivideConquerVisualizer() {
  const { algorithmId } = useParams<{ algorithmId: string }>();
  const algoKey = (algorithmId || 'maxmin').toLowerCase();
  const algo = divideConquerAlgoInfo[algoKey];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">{algo?.name || 'Divide and Conquer Algorithm'}</h2>
        <p className="text-muted-foreground mb-4">{algo?.description}</p>
        {algo && (
          <AlgoCodeCard
            title={algo.name + ' Pseudocode'}
            pseudocode={algo.pseudocode}
          />
        )}
        {/* Visualization */}
        {algoKey === 'maxmin' && <MaxMinVisualizer />}
        {algoKey === 'quicksort' && <QuicksortVisualizer />}
        {algoKey === 'binarysearch' && <BinarySearchVisualizer />}
        {algoKey === 'mergesort' && <MergeSortVisualizer />}
        {algoKey === 'strassen' && <StrassenVisualizer />}
      </motion.div>
      <div className="flex justify-start">
        <a
          href={`https://leetcode.com/problemset/?search=${encodeURIComponent(algo?.name || 'divide and conquer')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 px-6 py-2 rounded-lg bg-orange-500 text-white font-semibold shadow hover:bg-orange-600 transition-colors"
        >
          Practice on LeetCode
        </a>
      </div>
    </div>
  );
}
