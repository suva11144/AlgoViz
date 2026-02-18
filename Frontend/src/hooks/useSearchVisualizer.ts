import { useState, useCallback, useRef, useEffect } from 'react';
import { SearchStep, getSearchAlgorithm } from '@/algorithms/search';

export type SearchVisualizerState = 'idle' | 'playing' | 'paused' | 'complete';

export interface SearchVisualizerStats {
  comparisons: number;
  startTime: number | null;
  elapsedTime: number;
}

export function useSearchVisualizer(initialSize: number = 20) {
  const [array, setArray] = useState<number[]>(() => {
    const arr: number[] = [];
    for (let i = 0; i < initialSize; i++) {
      arr.push(Math.floor(Math.random() * 100) + 1);
    }
    return arr.sort((a, b) => a - b);
  });
  
  const [target, setTarget] = useState<number>(50);
  const [currentStep, setCurrentStep] = useState<SearchStep | null>(null);
  const [state, setState] = useState<SearchVisualizerState>('idle');
  const [algorithm, setAlgorithm] = useState<string>('linear');
  const [speed, setSpeed] = useState<number>(50);
  const [stats, setStats] = useState<SearchVisualizerStats>({
    comparisons: 0,
    startTime: null,
    elapsedTime: 0,
  });

  const stepsRef = useRef<SearchStep[]>([]);
  const stepIndexRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);

  const getDelay = useCallback(() => {
    return Math.max(100, 2000 - (speed * 18));
  }, [speed]);

  const generateNewArray = useCallback((size?: number) => {
    const newSize = size || array.length;
    const newArr: number[] = [];
    for (let i = 0; i < newSize; i++) {
      newArr.push(Math.floor(Math.random() * 100) + 1);
    }
    const sorted = newArr.sort((a, b) => a - b);
    setArray(sorted);
    setCurrentStep(null);
    setState('idle');
    setStats({ comparisons: 0, startTime: null, elapsedTime: 0 });
    stepsRef.current = [];
    stepIndexRef.current = 0;
  }, [array.length]);

  const generateAllSteps = useCallback(() => {
    const generator = getSearchAlgorithm(algorithm, array, target);
    const steps: SearchStep[] = [];
    let result = generator.next();
    
    while (!result.done) {
      if (result.value) {
        steps.push(result.value);
      }
      result = generator.next();
    }
    
    return steps;
  }, [algorithm, array, target]);

  const play = useCallback(() => {
    if (state === 'complete') {
      stepIndexRef.current = 0;
      setStats(prev => ({ ...prev, comparisons: 0, startTime: Date.now(), elapsedTime: 0 }));
    }

    if (stepsRef.current.length === 0) {
      stepsRef.current = generateAllSteps();
      setStats(prev => ({ ...prev, startTime: Date.now() }));
    }

    setState('playing');
  }, [state, generateAllSteps]);

  const pause = useCallback(() => {
    setState('paused');
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const stepForward = useCallback(() => {
    if (stepsRef.current.length === 0) {
      stepsRef.current = generateAllSteps();
      setStats(prev => ({ ...prev, startTime: Date.now() }));
    }

    if (stepIndexRef.current < stepsRef.current.length) {
      const step = stepsRef.current[stepIndexRef.current];
      setCurrentStep(step);

      setStats(prev => ({
        ...prev,
        comparisons: step.comparisons,
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

  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setCurrentStep(null);
    setState('idle');
    setStats({ comparisons: 0, startTime: null, elapsedTime: 0 });
    stepsRef.current = [];
    stepIndexRef.current = 0;
  }, []);

  const changeAlgorithm = useCallback((newAlgorithm: string) => {
    setAlgorithm(newAlgorithm);
    reset();
  }, [reset]);

  const changeArraySize = useCallback((size: number) => {
    generateNewArray(size);
  }, [generateNewArray]);

  const changeTarget = useCallback((newTarget: number) => {
    setTarget(newTarget);
    setCurrentStep(null);
    setState('idle');
    setStats({ comparisons: 0, startTime: null, elapsedTime: 0 });
    stepsRef.current = [];
    stepIndexRef.current = 0;
  }, []);

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

          setStats(prev => ({
            ...prev,
            comparisons: step.comparisons,
            elapsedTime: prev.startTime ? Date.now() - prev.startTime : 0,
          }));

          stepIndexRef.current++;

          if (step.operation === 'done') {
            setState('complete');
            return;
          }
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

  return {
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
  };
}
