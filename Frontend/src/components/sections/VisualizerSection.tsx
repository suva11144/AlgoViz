import { motion } from 'framer-motion';
import { SortingBars } from '@/components/visualizers/SortingBars';
import { VisualizerControls } from '@/components/controls/VisualizerControls';
import { AlgorithmSelector } from '@/components/controls/AlgorithmSelector';
import { ArraySizeControl } from '@/components/controls/ArraySizeControl';
import { StatsPanel } from '@/components/panels/StatsPanel';
import { ExplanationPanel } from '@/components/panels/ExplanationPanel';
import { Legend } from '@/components/panels/Legend';
import { useSortingVisualizer } from '@/hooks/useSortingVisualizer';

export function VisualizerSection() {
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

  return (
    <section id="visualizer" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sorting Visualizer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select an algorithm, adjust settings, and watch the magic happen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main visualization area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Algorithm selector */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Select Algorithm</h3>
              <AlgorithmSelector selected={algorithm} onSelect={changeAlgorithm} />
            </div>

            {/* Visualization */}
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-6">
                <Legend />
              </div>
              <SortingBars array={array} currentStep={currentStep} />
            </div>

            {/* Controls */}
            <div className="glass-card rounded-2xl p-6 space-y-6">
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
            </div>

            {/* Explanation */}
            <ExplanationPanel currentStep={currentStep} />
          </motion.div>

          {/* Stats panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatsPanel stats={stats} algorithm={algorithm} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
