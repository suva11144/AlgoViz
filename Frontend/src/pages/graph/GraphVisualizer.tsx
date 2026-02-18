import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraphCanvas } from '@/components/visualizers/GraphCanvas';
import { GraphControls } from '@/components/controls/GraphControls';
import { GraphStatsPanel } from '@/components/panels/GraphStatsPanel';
import { ExplanationPanel } from '@/components/panels/ExplanationPanel';
import { useGraphVisualizer } from '@/hooks/useGraphVisualizer';
import { graphAlgorithmInfo } from '@/algorithms/graph';
import { AlgoCodeCard } from '@/components/ui/algo-code-card';

export function GraphVisualizer() {
  const { algorithmId } = useParams<{ algorithmId: string }>();
  const navigate = useNavigate();
  
  const {
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
    resetGraph,
  } = useGraphVisualizer();

  useEffect(() => {
    if (algorithmId && algorithmId !== algorithm) {
      changeAlgorithm(algorithmId);
    }
  }, [algorithmId, algorithm, changeAlgorithm]);

  const info = graphAlgorithmInfo[algorithmId || 'bfs'];

  // Pseudocode snippets for graph algorithms
  const pseudocodeMap: Record<string, string> = {
    bfs: `function BFS(graph, start):
  create empty queue Q
  mark start as visited and enqueue it
  while Q is not empty:
    node = Q.dequeue()
    for each neighbor of node:
      if neighbor not visited:
        mark neighbor as visited
        Q.enqueue(neighbor)` ,
    dfs: `function DFS(graph, node, visited):
  mark node as visited
  for each neighbor of node:
    if neighbor not visited:
      DFS(graph, neighbor, visited)`,
    dijkstra: `function Dijkstra(graph, source):
  dist = [∞ for each node]
  dist[source] = 0
  Q = all nodes in graph
  while Q is not empty:
    u = node in Q with min dist[u]
    remove u from Q
    for each neighbor v of u:
      alt = dist[u] + weight(u, v)
      if alt < dist[v]:
        dist[v] = alt`,
    prim: `function Prim(graph):
  MST = []
  visited = set()
  start from any node, add to visited
  while MST has fewer than n-1 edges:
    find edge (u, v) with min weight where u in visited, v not in visited
    add (u, v) to MST
    add v to visited`,
    kruskal: `function Kruskal(graph):
  MST = []
  sort all edges by weight
  for each edge (u, v):
    if u and v are in different sets:
      add (u, v) to MST
      union(u, v)`,
    bellmanford: `function BellmanFord(graph, source):
  dist = [∞ for each node]
  dist[source] = 0
  for i from 1 to n-1:
    for each edge (u, v, w):
      if dist[u] + w < dist[v]:
        dist[v] = dist[u] + w
  for each edge (u, v, w):
    if dist[u] + w < dist[v]:
      report negative cycle`,
    floydwarshall: `function FloydWarshall(graph):
  for k from 1 to n:
    for i from 1 to n:
      for j from 1 to n:
        if dist[i][j] > dist[i][k] + dist[k][j]:
          dist[i][j] = dist[i][k] + dist[k][j]`
  };

  // Convert GraphStep to a format ExplanationPanel expects (supports graph operations: visit, enqueue, dequeue, update, done)
  const explanationStep = currentStep ? {
    array: [],
    comparing: [],
    swapping: [],
    sorted: [],
    operation: currentStep.operation,
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
        <h2 className="text-2xl font-bold text-foreground mb-2">{info?.name || 'Graph Algorithm'}</h2>
        <p className="text-muted-foreground mb-4">{info?.description}</p>
        {/* Pseudocode Card */}
        <AlgoCodeCard
          title={info?.name + ' Pseudocode'}
          pseudocode={pseudocodeMap[(algorithmId || 'bfs').replace(/[-']/g, '').toLowerCase()] || ''}
        />
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main visualization area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Graph Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Graph Visualization
              </h3>
              <p className="text-xs text-muted-foreground">
                Click on a node to set it as the start node
              </p>
            </div>
            <GraphCanvas
              nodes={nodes}
              edges={edges}
              currentStep={currentStep}
              directed={directed}
              showWeights={showWeights}
              startNode={startNode}
              onAddNode={addNode}
              onSelectStartNode={setStartNode}
            />
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <GraphControls
              state={state}
              speed={speed}
              directed={directed}
              showWeights={showWeights}
              onPlay={play}
              onPause={pause}
              onStepForward={stepForward}
              onReset={reset}
              onResetGraph={resetGraph}
              onSpeedChange={setSpeed}
              onDirectedChange={setDirected}
              onShowWeightsChange={setShowWeights}
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
          <GraphStatsPanel
            stats={stats}
            algorithm={algorithm}
            queueLength={currentStep?.queue.length || 0}
          />
        </motion.div>
      </div>
      <div className="flex justify-start">
        <a
          href={`https://leetcode.com/problemset/?search=${encodeURIComponent(info?.name || 'graph')}`}
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
