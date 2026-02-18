import { motion } from 'framer-motion';
import { Clock, Network, Route, Layers } from 'lucide-react';
import { GraphVisualizerStats } from '@/hooks/useGraphVisualizer';
import { graphAlgorithmInfo } from '@/algorithms/graph';

interface GraphStatsPanelProps {
  stats: GraphVisualizerStats;
  algorithm: string;
  queueLength: number;
}

export function GraphStatsPanel({ stats, algorithm, queueLength }: GraphStatsPanelProps) {
  const info = graphAlgorithmInfo[algorithm];
  const dataStructure = algorithm === 'bfs' ? 'Queue' : algorithm === 'dfs' ? 'Stack' : 'Priority Queue';

  const statItems = [
    {
      label: 'Nodes Visited',
      value: stats.nodesVisited,
      icon: Network,
      color: 'text-emerald-500',
    },
    {
      label: `${dataStructure} Size`,
      value: queueLength,
      icon: Layers,
      color: 'text-amber-500',
    },
    {
      label: 'Edges Explored',
      value: stats.edgesExplored,
      icon: Route,
      color: 'text-blue-500',
    },
    {
      label: 'Elapsed Time',
      value: `${(stats.elapsedTime / 1000).toFixed(1)}s`,
      icon: Clock,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 space-y-6 sticky top-20">
      <h3 className="text-lg font-semibold text-foreground">Statistics</h3>

      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-secondary/30 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <item.icon className={`h-4 w-4 ${item.color}`} />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
            <p className="text-xl font-bold text-foreground">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Complexity info */}
      <div className="pt-4 border-t border-border/50 space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Complexity Analysis</h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time (avg)</span>
            <span className="font-mono text-foreground">{info?.timeComplexity.average}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Space</span>
            <span className="font-mono text-foreground">{info?.spaceComplexity}</span>
          </div>
        </div>
      </div>

      {/* Data structure info */}
      <div className="pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{algorithm.toUpperCase()}</span> uses a{' '}
          <span className="font-medium text-primary">{dataStructure}</span> to track nodes to visit.
          {algorithm === 'dijkstra' && ' It always processes the node with the smallest distance first.'}
        </p>
      </div>
    </div>
  );
}
