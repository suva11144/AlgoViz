import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SortingBars } from '@/components/visualizers/SortingBars';
import { VisualizerControls } from '@/components/controls/VisualizerControls';
import { ArraySizeControl } from '@/components/controls/ArraySizeControl';
import { StatsPanel } from '@/components/panels/StatsPanel';
import { ExplanationPanel } from '@/components/panels/ExplanationPanel';
import { Legend } from '@/components/panels/Legend';
import { useSortingVisualizer } from '@/hooks/useSortingVisualizer';
import { algorithmInfo } from '@/algorithms/sorting';
import { AlgoCodeCard } from '@/components/ui/algo-code-card';

export function SortingVisualizer() {
  const { algorithmId } = useParams<{ algorithmId: string }>();
  
  const {
    array,
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
  } = useSortingVisualizer(25);

  // Change algorithm when route changes
  useEffect(() => {
    if (algorithmId && algorithmId !== algorithm) {
      changeAlgorithm(algorithmId);
    }
  }, [algorithmId, algorithm, changeAlgorithm]);

  const info = algorithmInfo[algorithmId || 'bubble'];

  // Pseudocode snippets for sorting algorithms
  const pseudocodeMap: Record<string, string> = {
    bubble: `function bubbleSort(A):
  for i from 0 to n-1:
    for j from 0 to n-i-2:
      if A[j] > A[j+1]:
        swap A[j], A[j+1]`,
    selection: `function selectionSort(A):
  for i from 0 to n-1:
    min = i
    for j from i+1 to n-1:
      if A[j] < A[min]:
        min = j
    swap A[i], A[min]`,
    insertion: `function insertionSort(A):
  for i from 1 to n-1:
    key = A[i]
    j = i-1
    while j >= 0 and A[j] > key:
      A[j+1] = A[j]
      j = j-1
    A[j+1] = key`,
    merge: `function mergeSort(A):
  if n <= 1: return A
  mid = n // 2
  left = mergeSort(A[0:mid])
  right = mergeSort(A[mid:n])
  return merge(left, right)`,
    quick: `function quickSort(A, low, high):
  if low < high:
    p = partition(A, low, high)
    quickSort(A, low, p-1)
    quickSort(A, p+1, high)`
  };

  return (
    <div className="space-y-6">
      {/* Algorithm Info Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        key={algorithmId}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">{info?.name || 'Sorting Algorithm'}</h2>
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
          pseudocode={pseudocodeMap[algorithmId || 'bubble'] || ''}
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
              <Legend />
            </div>
            <SortingBars array={array} currentStep={currentStep} />
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 space-y-6"
          >
            <VisualizerControls
              state={state}
              speed={speed}
              onPlay={play}
              onPause={pause}
              onStepForward={stepForward}
              onReset={reset}
              onShuffle={generateNewArray}
              onSpeedChange={setSpeed}
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
          <ExplanationPanel currentStep={currentStep} />
        </div>

        {/* Stats panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatsPanel stats={stats} algorithm={algorithm} />
        </motion.div>
      </div>
      <div className="flex justify-start">
        <a
          href={`https://leetcode.com/problemset/?search=${encodeURIComponent(info?.name || 'sorting')}`}
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
