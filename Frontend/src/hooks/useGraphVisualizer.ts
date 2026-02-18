import { useState, useCallback, useRef, useEffect } from 'react';
import { GraphNode, GraphEdge, GraphStep, getGraphAlgorithm, generateSampleGraph } from '@/algorithms/graph';

export type GraphVisualizerState = 'idle' | 'playing' | 'paused' | 'complete';

export interface GraphVisualizerStats {
  nodesVisited: number;
  edgesExplored: number;
  startTime: number | null;
  elapsedTime: number;
}

export function useGraphVisualizer() {
  const [nodes, setNodes] = useState<GraphNode[]>(() => generateSampleGraph().nodes);
  const [edges, setEdges] = useState<GraphEdge[]>(() => generateSampleGraph().edges);
  const [currentStep, setCurrentStep] = useState<GraphStep | null>(null);
  const [state, setState] = useState<GraphVisualizerState>('idle');
  const [algorithm, setAlgorithm] = useState<string>('bfs');
  const [speed, setSpeed] = useState<number>(50);
  const [directed, setDirected] = useState<boolean>(false);
  const [startNode, setStartNode] = useState<string>('A');
  const [showWeights, setShowWeights] = useState<boolean>(true);
  const [stats, setStats] = useState<GraphVisualizerStats>({
    nodesVisited: 0,
    edgesExplored: 0,
    startTime: null,
    elapsedTime: 0,
  });

  const animationRef = useRef<number | null>(null);
  const stepsRef = useRef<GraphStep[]>([]);
  const stepIndexRef = useRef<number>(0);

  const getDelay = useCallback(() => {
    return Math.max(100, 2000 - (speed * 18));
  }, [speed]);

  const generateAllSteps = useCallback(() => {
    const generator = getGraphAlgorithm(algorithm, nodes, edges, startNode, directed);
    const steps: GraphStep[] = [];
    let result = generator.next();
    
    while (!result.done) {
      if (result.value) {
        steps.push(result.value);
      }
      result = generator.next();
    }
    
    return steps;
  }, [algorithm, nodes, edges, startNode, directed]);

  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setCurrentStep(null);
    setState('idle');
    setStats({ nodesVisited: 0, edgesExplored: 0, startTime: null, elapsedTime: 0 });
    stepsRef.current = [];
    stepIndexRef.current = 0;
  }, []);

  const play = useCallback(() => {
    if (state === 'complete') {
      stepIndexRef.current = 0;
      setStats(prev => ({ ...prev, nodesVisited: 0, edgesExplored: 0, startTime: Date.now(), elapsedTime: 0 }));
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
        nodesVisited: step.visitedNodes.length,
        edgesExplored: prev.edgesExplored + (step.highlightedEdge ? 1 : 0),
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
            nodesVisited: step.visitedNodes.length,
            edgesExplored: prev.edgesExplored + (step.highlightedEdge ? 1 : 0),
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

  const changeAlgorithm = useCallback((newAlgorithm: string) => {
    setAlgorithm(newAlgorithm);
    reset();
  }, [reset]);

  const addNode = useCallback((x: number, y: number) => {
    const id = String.fromCharCode(65 + nodes.length); // A, B, C, ...
    if (nodes.length >= 26) return; // Max 26 nodes
    
    setNodes(prev => [...prev, { id, x, y, label: id }]);
    reset();
  }, [nodes.length, reset]);

  const addEdge = useCallback((from: string, to: string, weight: number = 1) => {
    const id = `e${edges.length + 1}`;
    setEdges(prev => [...prev, { id, from, to, weight }]);
    reset();
  }, [edges.length, reset]);

  const removeNode = useCallback((nodeId: string) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setEdges(prev => prev.filter(e => e.from !== nodeId && e.to !== nodeId));
    if (startNode === nodeId && nodes.length > 1) {
      setStartNode(nodes.find(n => n.id !== nodeId)?.id || 'A');
    }
    reset();
  }, [nodes, startNode, reset]);

  const removeEdge = useCallback((edgeId: string) => {
    setEdges(prev => prev.filter(e => e.id !== edgeId));
    reset();
  }, [reset]);

  const updateEdgeWeight = useCallback((edgeId: string, weight: number) => {
    setEdges(prev => prev.map(e => e.id === edgeId ? { ...e, weight } : e));
    reset();
  }, [reset]);

  const resetGraph = useCallback(() => {
    const sample = generateSampleGraph();
    setNodes(sample.nodes);
    setEdges(sample.edges);
    setStartNode('A');
    reset();
  }, [reset]);

  const clearGraph = useCallback(() => {
    setNodes([]);
    setEdges([]);
    reset();
  }, [reset]);

  return {
    nodes,
    edges,
    currentStep,
    state,
    algorithm,
    speed,
    directed,
    startNode,
    showWeights,
    stats,
    play,
    pause,
    stepForward,
    reset,
    setSpeed,
    setDirected,
    setStartNode,
    setShowWeights,
    changeAlgorithm,
    addNode,
    addEdge,
    removeNode,
    removeEdge,
    updateEdgeWeight,
    resetGraph,
    clearGraph,
  };
}
