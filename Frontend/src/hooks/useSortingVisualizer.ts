import { useState, useCallback, useRef, useEffect } from 'react';
import { SortStep, getSortingAlgorithm, generateRandomArray } from '@/algorithms/sorting';

export type VisualizerState = 'idle' | 'playing' | 'paused' | 'complete';

export interface VisualizerStats {
  comparisons: number;
  swaps: number;
  startTime: number | null;
  elapsedTime: number;
}

export function useSortingVisualizer(initialSize: number = 20) {
  const [array, setArray] = useState<number[]>(() => generateRandomArray(initialSize));
  const [currentStep, setCurrentStep] = useState<SortStep | null>(null);
  const [state, setState] = useState<VisualizerState>('idle');
  const [algorithm, setAlgorithm] = useState<string>('bubble');
  const [speed, setSpeed] = useState<number>(50); // 1-100
  const [stats, setStats] = useState<VisualizerStats>({
    comparisons: 0,
    swaps: 0,
    startTime: null,
    elapsedTime: 0,
  });

  const generatorRef = useRef<Generator<SortStep> | null>(null);
  const animationRef = useRef<number | null>(null);
  const stepsRef = useRef<SortStep[]>([]);
  const stepIndexRef = useRef<number>(0);

  // Calculate delay from speed (1-100)
  const getDelay = useCallback(() => {
    // Speed 1 = 1000ms, Speed 100 = 10ms
    return Math.max(10, 1000 - (speed * 10));
  }, [speed]);

  // Generate new random array
  const generateNewArray = useCallback((size?: number) => {
    const newArray = generateRandomArray(size || array.length);
    setArray(newArray);
    setCurrentStep(null);
    setState('idle');
    setStats({ comparisons: 0, swaps: 0, startTime: null, elapsedTime: 0 });
    stepsRef.current = [];
    stepIndexRef.current = 0;
    generatorRef.current = null;
  }, [array.length]);

  // Pre-generate all steps
  const generateAllSteps = useCallback(() => {
    const generator = getSortingAlgorithm(algorithm, array);
    const steps: SortStep[] = [];
    let result = generator.next();
    
    while (!result.done) {
      if (result.value) {
        steps.push(result.value);
      }
      result = generator.next();
    }
    
    return steps;
  }, [algorithm, array]);

  // Play animation
  const play = useCallback(() => {
    if (state === 'complete') {
      // Reset and replay
      stepIndexRef.current = 0;
      setStats(prev => ({ ...prev, comparisons: 0, swaps: 0, startTime: Date.now(), elapsedTime: 0 }));
    }

    if (stepsRef.current.length === 0) {
      stepsRef.current = generateAllSteps();
      setStats(prev => ({ ...prev, startTime: Date.now() }));
    }

    setState('playing');
  }, [state, generateAllSteps]);

  // Pause animation
  const pause = useCallback(() => {
    setState('paused');
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  // Step forward
  const stepForward = useCallback(() => {
    if (stepsRef.current.length === 0) {
      stepsRef.current = generateAllSteps();
      setStats(prev => ({ ...prev, startTime: Date.now() }));
    }

    if (stepIndexRef.current < stepsRef.current.length) {
      const step = stepsRef.current[stepIndexRef.current];
      setCurrentStep(step);
      setArray(step.array);

      // Update stats
      setStats(prev => ({
        ...prev,
        comparisons: prev.comparisons + (step.operation === 'compare' ? 1 : 0),
        swaps: prev.swaps + (step.operation === 'swap' ? 1 : 0),
        elapsedTime: prev.startTime ? Date.now() - prev.startTime : 0,
      }));

      stepIndexRef.current++;

      if (step.operation === 'done') {
        setState('complete');
      } else {
        setState('paused');
      }
    }
  }, [generateAllSteps]);

  // Reset
  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    generateNewArray();
  }, [generateNewArray]);

  // Animation loop
  useEffect(() => {
    if (state !== 'playing') return;

    let lastTime = 0;
    const delay = getDelay();

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= delay) {
        lastTime = currentTime;

        if (stepIndexRef.current < stepsRef.current.length) {
          const step = stepsRef.current[stepIndexRef.current];
          setCurrentStep(step);
          setArray(step.array);

          setStats(prev => ({
            ...prev,
            comparisons: prev.comparisons + (step.operation === 'compare' ? 1 : 0),
            swaps: prev.swaps + (step.operation === 'swap' ? 1 : 0),
            elapsedTime: prev.startTime ? Date.now() - prev.startTime : 0,
          }));

          stepIndexRef.current++;

          if (step.operation === 'done') {
            setState('complete');
            return;
          }
        } else {
          setState('complete');
          return;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [state, getDelay]);

  // Change algorithm
  const changeAlgorithm = useCallback((newAlgorithm: string) => {
    setAlgorithm(newAlgorithm);
    reset();
  }, [reset]);

  // Change array size
  const changeArraySize = useCallback((size: number) => {
    generateNewArray(size);
  }, [generateNewArray]);

  return {
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
  };
}
