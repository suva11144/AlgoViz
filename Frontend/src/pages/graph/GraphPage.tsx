import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AlgorithmLayout } from '@/components/layout/AlgorithmLayout';
import { AlgorithmSidebar } from '@/components/layout/AlgorithmSidebar';
import { 
  Workflow, 
  GitBranch, 
  Route,
  Network,
  Maximize2,
  Zap,
  Grid3x3
} from 'lucide-react';

const graphAlgorithms = [
  { id: 'bfs', label: 'Breadth-First Search', icon: Workflow },
  { id: 'dfs', label: 'Depth-First Search', icon: GitBranch },
  { id: 'dijkstra', label: "Dijkstra's Algorithm", icon: Route },
  { id: 'prim', label: "Prim's Algorithm", icon: Network },
  { id: 'kruskal', label: "Kruskal's Algorithm", icon: Maximize2 },
  { id: 'bellmanford', label: 'Bellman-Ford', icon: Zap },
  { id: 'floydwarshall', label: 'Floyd-Warshall', icon: Grid3x3 },
];

export function GraphPage() {
  const location = useLocation();
  
  if (location.pathname === '/graph') {
    return <Navigate to="/graph/bfs" replace />;
  }

  return (
    <AlgorithmLayout
      title="Graph Algorithms"
      sidebar={
        <AlgorithmSidebar
          title="Graph Algorithms"
          algorithms={graphAlgorithms}
          basePath="/graph"
        />
      }
    >
      <Outlet />
    </AlgorithmLayout>
  );
}
