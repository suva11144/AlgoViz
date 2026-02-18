import { useState, useCallback, useRef, useEffect } from 'react';
import { DPStep, getDPAlgorithm } from '@/algorithms/dynamic';

export type DPVisualizerState = 'idle' | 'playing' | 'paused' | 'complete';

export interface DPVisualizerStats {
  cellsFilled: number;
  startTime: number | null;
  elapsedTime: number;
}

export function useDynamicVisualizer() {
  const [currentStep, setCurrentStep] = useState<DPStep | null>(null);
  const [state, setState] = useState<DPVisualizerState>('idle');
  const [algorithm, setAlgorithm] = useState<string>('fibonacci');
  const [speed, setSpeed] = useState<number>(50);
  const [inputs, setInputs] = useState<Record<string, any>>({
    n: 10,
    str1: 'ABCD',
    str2: 'ACBD',
    weights: [2, 3, 4, 5],
    values: [3, 4, 5, 6],
    capacity: 8,
  });
  const [stats, setStats] = useState<DPVisualizerStats>({
    cellsFilled: 0,
    startTime: null,
    elapsedTime: 0,
  });

  const stepsRef = useRef<DPStep[]>([]);
  const stepIndexRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);

  const getDelay = useCallback(() => {
    return Math.max(100, 2000 - (speed * 18));
  }, [speed]);

  const generateAllSteps = useCallback(() => {
    const generator = getDPAlgorithm(algorithm, inputs);
    const steps: DPStep[] = [];
    let result = generator.next();
    
    while (!result.done) {
      if (result.value) {
        steps.push(result.value);
      }
      result = generator.next();
    }
    
    return steps;
  }, [algorithm, inputs]);

  const play = useCallback(() => {
    if (state === 'complete') {
      stepIndexRef.current = 0;
      setStats(prev => ({ ...prev, cellsFilled: 0, startTime: Date.now(), elapsedTime: 0 }));
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
        cellsFilled: step.table.flat().filter(cell => cell !== 0 && cell !== '').length,
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
    setStats({ cellsFilled: 0, startTime: null, elapsedTime: 0 });
    stepsRef.current = [];
    stepIndexRef.current = 0;
  }, []);

  const changeAlgorithm = useCallback((newAlgorithm: string) => {
    setAlgorithm(newAlgorithm);
    reset();
  }, [reset]);

  const updateInput = useCallback((key: string, value: any) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    reset();
  }, [reset]);

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
            cellsFilled: step.table.flat().filter(cell => cell !== 0 && cell !== '').length,
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
  };
}
