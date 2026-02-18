import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SearchBars } from '@/components/visualizers/SearchBars';
import { SearchControls } from '@/components/controls/SearchControls';
import { ArraySizeControl } from '@/components/controls/ArraySizeControl';
import { SearchStatsPanel } from '@/components/panels/SearchStatsPanel';
import { ExplanationPanel } from '@/components/panels/ExplanationPanel';
import { Legend } from '@/components/panels/Legend';
import { useSearchVisualizer } from '@/hooks/useSearchVisualizer';
import { searchAlgorithmInfo } from '@/algorithms/search';
import { AlgoCodeCard } from '@/components/ui/algo-code-card';

export function SearchVisualizer() {
  const { algorithmId } = useParams<{ algorithmId: string }>();
  
  const {
    array,
    target,
    currentStep,
    state,
    algorithm,
    speed,
    stats,
    play,
    pause,
    stepForward,
    reset,
    setSpeed,
    changeAlgorithm,
    changeArraySize,
    generateNewArray,
    changeTarget,
  } = useSearchVisualizer(20);

  useEffect(() => {
    if (algorithmId && algorithmId !== algorithm) {
      changeAlgorithm(algorithmId);
    }
  }, [algorithmId, algorithm, changeAlgorithm]);

  const info = searchAlgorithmInfo[algorithmId || 'linear'];

  // Pseudocode snippets for searching algorithms
  const pseudocodeMap: Record<string, string> = {
    linear: `function linearSearch(A, target):
  for i from 0 to n-1:
    if A[i] == target:
      return i
  return -1`,
    binary: `function binarySearch(A, target):
  low = 0, high = n-1
  while low <= high:
    mid = (low + high) // 2
    if A[mid] == target:
      return mid
    else if A[mid] < target:
      low = mid + 1
    else:
      high = mid - 1
  return -1`
  };

  // Convert SearchStep to a format ExplanationPanel expects
  const explanationStep = currentStep ? {
    array: currentStep.array,
    comparing: currentStep.comparing,
    swapping: [],
    sorted: currentStep.foundIndex !== -1 ? [currentStep.foundIndex] : [],
    operation: currentStep.operation as any,
    explanation: currentStep.explanation,
  } : null;

  return (
    <div className="space-y-6">
      {/* Algorithm Info Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        key={algorithmId}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">{info?.name || 'Search Algorithm'}</h2>
        <p className="text-muted-foreground mb-4">{info?.description}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary">
            Time (avg): {info?.timeComplexity?.average}
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground">
            Space: {info?.spaceComplexity}
          </div>
        </div>
        {/* Pseudocode Card */}
        <AlgoCodeCard
          title={info?.name + ' Pseudocode'}
          pseudocode={pseudocodeMap[algorithmId || 'linear'] || ''}
        />
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main visualization area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Array Values
                </h3>
                <p className="text-xs text-muted-foreground">
                  Target: <span className="font-bold text-foreground">{target}</span>
                </p>
              </div>
              <Legend />
            </div>
            <SearchBars 
              array={array} 
              comparingIndices={currentStep?.comparing || []}
              foundIndex={currentStep?.foundIndex || -1}
            />
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 space-y-6"
          >
            <SearchControls
              state={state}
              speed={speed}
              target={target}
              onPlay={play}
              onPause={pause}
              onStepForward={stepForward}
              onReset={reset}
              onShuffle={generateNewArray}
              onSpeedChange={setSpeed}
              onTargetChange={changeTarget}
            />
            <div className="border-t border-border/50 pt-4">
              <ArraySizeControl
                size={array.length}
                onChange={changeArraySize}
                disabled={state === 'playing'}
              />
            </div>
          </motion.div>

          {/* Explanation */}
          <ExplanationPanel currentStep={explanationStep} />
        </div>

        {/* Stats panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SearchStatsPanel stats={stats} algorithm={algorithm} />
        </motion.div>
      </div>
      <div className="flex justify-start">
        <a
          href={`https://leetcode.com/problemset/?search=${encodeURIComponent(info?.name || 'search')}`}
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
