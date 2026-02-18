import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { DPTable } from '@/components/visualizers/DPTable';
import { DPControls } from '@/components/controls/DPControls';
import { DPStatsPanel } from '@/components/panels/DPStatsPanel';
import { ExplanationPanel } from '@/components/panels/ExplanationPanel';
import { useDynamicVisualizer } from '@/hooks/useDynamicVisualizer';
import { dpAlgorithmInfo } from '@/algorithms/dynamic';
import { AlgoCodeCard } from '@/components/ui/algo-code-card';

export function DynamicVisualizer() {
  const { algorithmId } = useParams<{ algorithmId: string }>();
  
  const {
    currentStep,
    state,
    algorithm,
    speed,
    inputs,
    stats,
    play,
    pause,
    stepForward,
    reset,
    setSpeed,
    changeAlgorithm,
    updateInput,
  } = useDynamicVisualizer();

  useEffect(() => {
    if (algorithmId && algorithmId !== algorithm) {
      changeAlgorithm(algorithmId);
    }
  }, [algorithmId, algorithm, changeAlgorithm]);

  const info = dpAlgorithmInfo[algorithmId || 'fibonacci'];

  // Pseudocode snippets for dynamic programming algorithms
  const pseudocodeMap: Record<string, string> = {
    fibonacci: `function fibonacci(n):
  if n <= 1: return n
  dp = array of size n+1
  dp[0] = 0, dp[1] = 1
  for i from 2 to n:
    dp[i] = dp[i-1] + dp[i-2]
  return dp[n]`,
    lcs: `function LCS(str1, str2):
  m = length of str1, n = length of str2
  dp = 2D array of size (m+1) x (n+1)
  for i from 0 to m:
    for j from 0 to n:
      if i == 0 or j == 0:
        dp[i][j] = 0
      else if str1[i-1] == str2[j-1]:
        dp[i][j] = dp[i-1][j-1] + 1
      else:
        dp[i][j] = max(dp[i-1][j], dp[i][j-1])
  return dp[m][n]`,
    knapsack: `function knapsack(weights, values, W):
  n = number of items
  dp = 2D array of size (n+1) x (W+1)
  for i from 0 to n:
    for w from 0 to W:
      if i == 0 or w == 0:
        dp[i][w] = 0
      else if weights[i-1] <= w:
        dp[i][w] = max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w])
      else:
        dp[i][w] = dp[i-1][w]
  return dp[n][W]`,
    editdistance: `function editDistance(str1, str2):
  m = length of str1, n = length of str2
  dp = 2D array of size (m+1) x (n+1)
  for i from 0 to m:
    for j from 0 to n:
      if i == 0:
        dp[i][j] = j
      else if j == 0:
        dp[i][j] = i
      else if str1[i-1] == str2[j-1]:
        dp[i][j] = dp[i-1][j-1]
      else:
        dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
  return dp[m][n]`
  };

  // Convert DPStep to a format ExplanationPanel expects
  const explanationStep = currentStep ? {
    array: [],
    comparing: [],
    swapping: [],
    sorted: [],
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
        <h2 className="text-2xl font-bold text-foreground mb-2">{info?.name || 'DP Algorithm'}</h2>
        <p className="text-muted-foreground mb-4">{info?.description}</p>
        {/* Pseudocode Card */}
        <AlgoCodeCard
          title={info?.name + ' Pseudocode'}
          pseudocode={pseudocodeMap[(algorithmId || 'fibonacci').replace(/[-']/g, '').toLowerCase()] || ''}
        />
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary">
            Time: {info?.timeComplexity}
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground">
            Space: {info?.spaceComplexity}
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main visualization area */}
        <div className="lg:col-span-2 space-y-6">
          {/* DP Table Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Dynamic Programming Table
              </h3>
            </div>
            {currentStep && (
              <DPTable
                table={currentStep.table}
                currentCell={currentStep.currentCell}
                highlightedCells={currentStep.highlightedCells}
              />
            )}
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <DPControls
              state={state}
              speed={speed}
              algorithm={algorithm}
              inputs={inputs}
              onPlay={play}
              onPause={pause}
              onStepForward={stepForward}
              onReset={reset}
              onSpeedChange={setSpeed}
              onInputChange={updateInput}
            />
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
          <DPStatsPanel stats={stats} algorithm={algorithm} />
        </motion.div>
      </div>
      <div className="flex justify-start">
        <a
          href={`https://leetcode.com/problemset/?search=${encodeURIComponent(info?.name || 'dynamic programming')}`}
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
