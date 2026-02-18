export interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
  weight: number;
}

export interface GraphStep {
  visitedNodes: string[];
  currentNode: string | null;
  queue: string[];
  path: string[];
  distances: Record<string, number>;
  explanation: string;
  operation: 'visit' | 'enqueue' | 'dequeue' | 'update' | 'done';
  highlightedEdge: string | null;
}

export const graphAlgorithmInfo: Record<string, {
  name: string;
  description: string;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
}> = {
  bfs: {
    name: 'Breadth-First Search (BFS)',
    description: 'Explores all neighbors at the present depth before moving to nodes at the next depth level. Uses a queue data structure.',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
  },
  dfs: {
    name: 'Depth-First Search (DFS)',
    description: 'Explores as far as possible along each branch before backtracking. Uses a stack (or recursion).',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
  },
  dijkstra: {
    name: "Dijkstra's Algorithm",
    description: 'Finds the shortest path from a source node to all other nodes in a weighted graph with non-negative weights.',
    timeComplexity: { best: 'O((V + E) log V)', average: 'O((V + E) log V)', worst: 'O((V + E) log V)' },
    spaceComplexity: 'O(V)',
  },
  prim: {
    name: "Prim's Algorithm",
    description: 'Finds a minimum spanning tree by greedily selecting edges from the current tree. Works on undirected weighted graphs.',
    timeComplexity: { best: 'O(E log V)', average: 'O(E log V)', worst: 'O(E log V)' },
    spaceComplexity: 'O(V)',
  },
  kruskal: {
    name: "Kruskal's Algorithm",
    description: 'Finds a minimum spanning tree by sorting edges by weight and adding them if they don\'t create a cycle using Union-Find.',
    timeComplexity: { best: 'O(E log E)', average: 'O(E log E)', worst: 'O(E log E)' },
    spaceComplexity: 'O(V)',
  },
  bellmanford: {
    name: 'Bellman-Ford Algorithm',
    description: 'Finds shortest paths from a source, handling negative edge weights. Can detect negative cycles.',
    timeComplexity: { best: 'O(VE)', average: 'O(VE)', worst: 'O(VE)' },
    spaceComplexity: 'O(V)',
  },
  floydwarshall: {
    name: 'Floyd-Warshall Algorithm',
    description: 'Computes shortest paths between all pairs of vertices in a weighted graph.',
    timeComplexity: { best: 'O(V³)', average: 'O(V³)', worst: 'O(V³)' },
    spaceComplexity: 'O(V²)',
  },
};

// Build adjacency list from edges
function buildAdjacencyList(nodes: GraphNode[], edges: GraphEdge[], directed: boolean): Map<string, { node: string; weight: number }[]> {
  const adj = new Map<string, { node: string; weight: number }[]>();
  
  nodes.forEach(node => adj.set(node.id, []));
  
  edges.forEach(edge => {
    adj.get(edge.from)?.push({ node: edge.to, weight: edge.weight });
    if (!directed) {
      adj.get(edge.to)?.push({ node: edge.from, weight: edge.weight });
    }
  });
  
  return adj;
}

export function* bfs(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNode: string,
  directed: boolean
): Generator<GraphStep> {
  const adj = buildAdjacencyList(nodes, edges, directed);
  const visited = new Set<string>();
  const queue: string[] = [startNode];
  const path: string[] = [];
  
  yield {
    visitedNodes: [],
    currentNode: null,
    queue: [startNode],
    path: [],
    distances: {},
    explanation: `Starting BFS from node ${startNode}. Added to queue.`,
    operation: 'enqueue',
    highlightedEdge: null,
  };
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (visited.has(current)) continue;
    
    visited.add(current);
    path.push(current);
    
    yield {
      visitedNodes: Array.from(visited),
      currentNode: current,
      queue: [...queue],
      path: [...path],
      distances: {},
      explanation: `Visiting node ${current}. Exploring its neighbors.`,
      operation: 'visit',
      highlightedEdge: null,
    };
    
    const neighbors = adj.get(current) || [];
    for (const { node: neighbor } of neighbors) {
      if (!visited.has(neighbor) && !queue.includes(neighbor)) {
        queue.push(neighbor);
        
        const edgeId = edges.find(e => 
          (e.from === current && e.to === neighbor) || 
          (!directed && e.from === neighbor && e.to === current)
        )?.id || null;
        
        yield {
          visitedNodes: Array.from(visited),
          currentNode: current,
          queue: [...queue],
          path: [...path],
          distances: {},
          explanation: `Adding neighbor ${neighbor} to the queue.`,
          operation: 'enqueue',
          highlightedEdge: edgeId,
        };
      }
    }
  }
  
  yield {
    visitedNodes: Array.from(visited),
    currentNode: null,
    queue: [],
    path: [...path],
    distances: {},
    explanation: `BFS complete! Visited ${path.length} nodes in order: ${path.join(' → ')}`,
    operation: 'done',
    highlightedEdge: null,
  };
}

export function* dfs(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNode: string,
  directed: boolean
): Generator<GraphStep> {
  const adj = buildAdjacencyList(nodes, edges, directed);
  const visited = new Set<string>();
  const stack: string[] = [startNode];
  const path: string[] = [];
  
  yield {
    visitedNodes: [],
    currentNode: null,
    queue: [startNode],
    path: [],
    distances: {},
    explanation: `Starting DFS from node ${startNode}. Added to stack.`,
    operation: 'enqueue',
    highlightedEdge: null,
  };
  
  while (stack.length > 0) {
    const current = stack.pop()!;
    
    if (visited.has(current)) continue;
    
    visited.add(current);
    path.push(current);
    
    yield {
      visitedNodes: Array.from(visited),
      currentNode: current,
      queue: [...stack],
      path: [...path],
      distances: {},
      explanation: `Visiting node ${current}. Exploring its neighbors depth-first.`,
      operation: 'visit',
      highlightedEdge: null,
    };
    
    const neighbors = adj.get(current) || [];
    // Reverse to maintain left-to-right order when popping
    for (const { node: neighbor } of [...neighbors].reverse()) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
        
        const edgeId = edges.find(e => 
          (e.from === current && e.to === neighbor) || 
          (!directed && e.from === neighbor && e.to === current)
        )?.id || null;
        
        yield {
          visitedNodes: Array.from(visited),
          currentNode: current,
          queue: [...stack],
          path: [...path],
          distances: {},
          explanation: `Adding neighbor ${neighbor} to the stack.`,
          operation: 'enqueue',
          highlightedEdge: edgeId,
        };
      }
    }
  }
  
  yield {
    visitedNodes: Array.from(visited),
    currentNode: null,
    queue: [],
    path: [...path],
    distances: {},
    explanation: `DFS complete! Visited ${path.length} nodes in order: ${path.join(' → ')}`,
    operation: 'done',
    highlightedEdge: null,
  };
}

export function* dijkstra(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNode: string,
  directed: boolean
): Generator<GraphStep> {
  const adj = buildAdjacencyList(nodes, edges, directed);
  const distances: Record<string, number> = {};
  const visited = new Set<string>();
  const path: string[] = [];
  const pq: { node: string; distance: number }[] = [];
  
  // Initialize distances
  nodes.forEach(node => {
    distances[node.id] = node.id === startNode ? 0 : Infinity;
  });
  
  pq.push({ node: startNode, distance: 0 });
  
  yield {
    visitedNodes: [],
    currentNode: null,
    queue: [startNode],
    path: [],
    distances: { ...distances },
    explanation: `Starting Dijkstra's from node ${startNode}. Initial distance: 0, all others: ∞`,
    operation: 'enqueue',
    highlightedEdge: null,
  };
  
  while (pq.length > 0) {
    // Sort by distance (simple priority queue)
    pq.sort((a, b) => a.distance - b.distance);
    const { node: current, distance: currentDist } = pq.shift()!;
    
    if (visited.has(current)) continue;
    
    visited.add(current);
    path.push(current);
    
    yield {
      visitedNodes: Array.from(visited),
      currentNode: current,
      queue: pq.map(p => p.node),
      path: [...path],
      distances: { ...distances },
      explanation: `Processing node ${current} with distance ${currentDist === Infinity ? '∞' : currentDist}.`,
      operation: 'visit',
      highlightedEdge: null,
    };
    
    const neighbors = adj.get(current) || [];
    for (const { node: neighbor, weight } of neighbors) {
      if (!visited.has(neighbor)) {
        const newDist = currentDist + weight;
        
        const edgeId = edges.find(e => 
          (e.from === current && e.to === neighbor) || 
          (!directed && e.from === neighbor && e.to === current)
        )?.id || null;
        
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          pq.push({ node: neighbor, distance: newDist });
          
          yield {
            visitedNodes: Array.from(visited),
            currentNode: current,
            queue: pq.map(p => p.node),
            path: [...path],
            distances: { ...distances },
            explanation: `Found shorter path to ${neighbor}: ${newDist} (was ${distances[neighbor] === Infinity ? '∞' : 'higher'})`,
            operation: 'update',
            highlightedEdge: edgeId,
          };
        }
      }
    }
  }
  
  const distStr = Object.entries(distances)
    .map(([k, v]) => `${k}: ${v === Infinity ? '∞' : v}`)
    .join(', ');
  
  yield {
    visitedNodes: Array.from(visited),
    currentNode: null,
    queue: [],
    path: [...path],
    distances: { ...distances },
    explanation: `Dijkstra's complete! Shortest distances from ${startNode}: ${distStr}`,
    operation: 'done',
    highlightedEdge: null,
  };
}

export function* prim(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNode: string,
  directed: boolean
): Generator<GraphStep> {
  const adj = buildAdjacencyList(nodes, edges, !directed);
  const visited = new Set<string>();
  const mstEdges: Set<string> = new Set();
  const distances: Record<string, number> = {};
  const path: string[] = [];
  const pq: { node: string; edge: string | null; weight: number }[] = [];
  
  nodes.forEach(node => {
    distances[node.id] = Infinity;
  });
  distances[startNode] = 0;
  pq.push({ node: startNode, edge: null, weight: 0 });
  
  yield {
    visitedNodes: [],
    currentNode: null,
    queue: [startNode],
    path: [],
    distances: { ...distances },
    explanation: `Starting Prim's from node ${startNode}. Finding minimum spanning tree.`,
    operation: 'enqueue',
    highlightedEdge: null,
  };
  
  while (pq.length > 0) {
    pq.sort((a, b) => a.weight - b.weight);
    const { node: current, edge: edgeId, weight } = pq.shift()!;
    
    if (visited.has(current)) continue;
    
    visited.add(current);
    path.push(current);
    if (edgeId) mstEdges.add(edgeId);
    
    yield {
      visitedNodes: Array.from(visited),
      currentNode: current,
      queue: pq.map(p => p.node),
      path: [...path],
      distances: { ...distances },
      explanation: `Adding node ${current} to MST.`,
      operation: 'visit',
      highlightedEdge: edgeId || null,
    };
    
    const neighbors = adj.get(current) || [];
    for (const { node: neighbor, weight: edgeWeight } of neighbors) {
      if (!visited.has(neighbor) && edgeWeight < distances[neighbor]) {
        distances[neighbor] = edgeWeight;
        const nextEdge = edges.find(e => 
          (e.from === current && e.to === neighbor) || (e.from === neighbor && e.to === current)
        )?.id || null;
        pq.push({ node: neighbor, edge: nextEdge, weight: edgeWeight });
        
        yield {
          visitedNodes: Array.from(visited),
          currentNode: current,
          queue: pq.map(p => p.node),
          path: [...path],
          distances: { ...distances },
          explanation: `Found edge to ${neighbor} with weight ${edgeWeight}.`,
          operation: 'enqueue',
          highlightedEdge: nextEdge,
        };
      }
    }
  }
  
  const totalWeight = Array.from(mstEdges).reduce((sum, edgeId) => {
    const edge = edges.find(e => e.id === edgeId);
    return sum + (edge?.weight || 0);
  }, 0);
  
  yield {
    visitedNodes: Array.from(visited),
    currentNode: null,
    queue: [],
    path: [...path],
    distances: { ...distances },
    explanation: `Prim's complete! MST weight: ${totalWeight}. Included ${path.length} nodes.`,
    operation: 'done',
    highlightedEdge: null,
  };
}

export function* kruskal(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNode: string,
  directed: boolean
): Generator<GraphStep> {
  const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
  const parent: Record<string, string> = {};
  const visited = new Set<string>();
  const mstEdges: Set<string> = new Set();
  const path: string[] = [];
  
  nodes.forEach(node => {
    parent[node.id] = node.id;
  });
  
  const find = (x: string): string => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };
  
  const union = (x: string, y: string): boolean => {
    const px = find(x);
    const py = find(y);
    if (px === py) return false;
    parent[px] = py;
    return true;
  };
  
  yield {
    visitedNodes: [],
    currentNode: null,
    queue: [],
    path: [],
    distances: {},
    explanation: `Starting Kruskal's. Sorting ${sortedEdges.length} edges by weight.`,
    operation: 'enqueue',
    highlightedEdge: null,
  };
  
  for (const edge of sortedEdges) {
    if (union(edge.from, edge.to)) {
      mstEdges.add(edge.id);
      visited.add(edge.from);
      visited.add(edge.to);
      if (!path.includes(edge.from)) path.push(edge.from);
      if (!path.includes(edge.to)) path.push(edge.to);
      
      yield {
        visitedNodes: Array.from(visited),
        currentNode: null,
        queue: [],
        path: [...path],
        distances: {},
        explanation: `Adding edge ${edge.from}-${edge.to} (weight: ${edge.weight}) to MST.`,
        operation: 'update',
        highlightedEdge: edge.id,
      };
    } else {
      yield {
        visitedNodes: Array.from(visited),
        currentNode: null,
        queue: [],
        path: [...path],
        distances: {},
        explanation: `Skipping edge ${edge.from}-${edge.to} (weight: ${edge.weight}). Would create cycle.`,
        operation: 'enqueue',
        highlightedEdge: edge.id,
      };
    }
  }
  
  const totalWeight = Array.from(mstEdges).reduce((sum, edgeId) => {
    const edge = edges.find(e => e.id === edgeId);
    return sum + (edge?.weight || 0);
  }, 0);
  
  yield {
    visitedNodes: Array.from(visited),
    currentNode: null,
    queue: [],
    path: [...path],
    distances: {},
    explanation: `Kruskal's complete! MST weight: ${totalWeight}. Included ${path.length} nodes.`,
    operation: 'done',
    highlightedEdge: null,
  };
}

export function* bellmanford(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNode: string,
  directed: boolean
): Generator<GraphStep> {
  const distances: Record<string, number> = {};
  const visited = new Set<string>();
  const path: string[] = [];
  
  nodes.forEach(node => {
    distances[node.id] = node.id === startNode ? 0 : Infinity;
  });
  
  yield {
    visitedNodes: [],
    currentNode: null,
    queue: [startNode],
    path: [],
    distances: { ...distances },
    explanation: `Starting Bellman-Ford from node ${startNode}.`,
    operation: 'enqueue',
    highlightedEdge: null,
  };
  
  const adj = buildAdjacencyList(nodes, edges, directed);
  
  for (let i = 0; i < nodes.length - 1; i++) {
    for (const edge of edges) {
      if (distances[edge.from] !== Infinity) {
        const newDist = distances[edge.from] + edge.weight;
        if (newDist < distances[edge.to]) {
          distances[edge.to] = newDist;
          if (!visited.has(edge.to)) {
            visited.add(edge.to);
            path.push(edge.to);
          }
          
          yield {
            visitedNodes: Array.from(visited),
            currentNode: edge.to,
            queue: [],
            path: [...path],
            distances: { ...distances },
            explanation: `Relaxed edge ${edge.from}→${edge.to}. Distance to ${edge.to} updated to ${newDist}.`,
            operation: 'update',
            highlightedEdge: edge.id,
          };
        }
      }
    }
  }
  
  const distStr = Object.entries(distances)
    .map(([k, v]) => `${k}: ${v === Infinity ? '∞' : v}`)
    .join(', ');
  
  yield {
    visitedNodes: Array.from(visited),
    currentNode: null,
    queue: [],
    path: [...path],
    distances: { ...distances },
    explanation: `Bellman-Ford complete! Shortest distances from ${startNode}: ${distStr}`,
    operation: 'done',
    highlightedEdge: null,
  };
}

export function* floydwarshall(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNode: string,
  directed: boolean
): Generator<GraphStep> {
  const n = nodes.length;
  const nodeMap = new Map(nodes.map((node, i) => [node.id, i]));
  const dist: number[][] = Array(n).fill(null).map(() => Array(n).fill(Infinity));
  const path: string[] = [];
  
  nodes.forEach((node, i) => {
    dist[i][i] = 0;
  });
  
  edges.forEach(edge => {
    const from = nodeMap.get(edge.from)!;
    const to = nodeMap.get(edge.to)!;
    dist[from][to] = Math.min(dist[from][to], edge.weight);
    if (!directed) {
      dist[to][from] = Math.min(dist[to][from], edge.weight);
    }
  });
  
  yield {
    visitedNodes: [],
    currentNode: null,
    queue: [],
    path: [],
    distances: {},
    explanation: `Starting Floyd-Warshall. Computing shortest paths for ${n} nodes.`,
    operation: 'enqueue',
    highlightedEdge: null,
  };
  
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
          const newDist = dist[i][k] + dist[k][j];
          if (newDist < dist[i][j]) {
            dist[i][j] = newDist;
          }
        }
      }
    }
    
    if (k % Math.max(1, Math.floor(n / 5)) === 0 || k === n - 1) {
      const nodeId = nodes[k].id;
      if (!path.includes(nodeId)) path.push(nodeId);
      
      yield {
        visitedNodes: path,
        currentNode: nodeId,
        queue: [],
        path: [...path],
        distances: {},
        explanation: `Iteration ${k + 1}/${n}. Using node ${nodeId} as intermediate.`,
        operation: 'update',
        highlightedEdge: null,
      };
    }
  }
  
  yield {
    visitedNodes: path,
    currentNode: null,
    queue: [],
    path: [...path],
    distances: {},
    explanation: `Floyd-Warshall complete! All shortest paths computed.`,
    operation: 'done',
    highlightedEdge: null,
  };
}

export function getGraphAlgorithm(
  algorithm: string,
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNode: string,
  directed: boolean
): Generator<GraphStep> {
  switch (algorithm) {
    case 'bfs':
      return bfs(nodes, edges, startNode, directed);
    case 'dfs':
      return dfs(nodes, edges, startNode, directed);
    case 'dijkstra':
      return dijkstra(nodes, edges, startNode, directed);
    case 'prim':
      return prim(nodes, edges, startNode, directed);
    case 'kruskal':
      return kruskal(nodes, edges, startNode, directed);
    case 'bellmanford':
      return bellmanford(nodes, edges, startNode, directed);
    case 'floydwarshall':
      return floydwarshall(nodes, edges, startNode, directed);
    default:
      return bfs(nodes, edges, startNode, directed);
  }
}

// Generate a sample graph
export function generateSampleGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [
    { id: 'A', x: 100, y: 100, label: 'A' },
    { id: 'B', x: 250, y: 50, label: 'B' },
    { id: 'C', x: 250, y: 150, label: 'C' },
    { id: 'D', x: 400, y: 100, label: 'D' },
    { id: 'E', x: 400, y: 200, label: 'E' },
    { id: 'F', x: 550, y: 150, label: 'F' },
  ];
  
  const edges: GraphEdge[] = [
    { id: 'e1', from: 'A', to: 'B', weight: 4 },
    { id: 'e2', from: 'A', to: 'C', weight: 2 },
    { id: 'e3', from: 'B', to: 'D', weight: 3 },
    { id: 'e4', from: 'C', to: 'D', weight: 1 },
    { id: 'e5', from: 'C', to: 'E', weight: 5 },
    { id: 'e6', from: 'D', to: 'F', weight: 2 },
    { id: 'e7', from: 'E', to: 'F', weight: 1 },
  ];
  
  return { nodes, edges };
}
