import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GraphNode, GraphEdge, GraphStep } from '@/algorithms/graph';

interface GraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  currentStep: GraphStep | null;
  directed: boolean;
  showWeights: boolean;
  startNode: string;
  onAddNode: (x: number, y: number) => void;
  onSelectStartNode: (nodeId: string) => void;
}

export function GraphCanvas({
  nodes,
  edges,
  currentStep,
  directed,
  showWeights,
  startNode,
  onAddNode,
  onSelectStartNode,
}: GraphCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const handleCanvasClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (e.target === svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      onAddNode(x, y);
    }
  }, [onAddNode]);

  const getNodeColor = (nodeId: string) => {
    if (!currentStep) {
      return nodeId === startNode ? 'hsl(var(--primary))' : 'hsl(var(--muted))';
    }
    
    if (currentStep.currentNode === nodeId) {
      return 'hsl(var(--state-comparing))'; // Currently processing
    }
    if (currentStep.visitedNodes.includes(nodeId)) {
      return 'hsl(var(--state-sorted))'; // Visited
    }
    if (currentStep.queue.includes(nodeId)) {
      return 'hsl(var(--state-swapping))'; // In queue/stack
    }
    return nodeId === startNode ? 'hsl(var(--primary))' : 'hsl(var(--muted))';
  };

  const getEdgeColor = (edgeId: string) => {
    if (currentStep?.highlightedEdge === edgeId) {
      return 'hsl(var(--state-comparing))';
    }
    return 'hsl(var(--border))';
  };

  const getEdgeStrokeWidth = (edgeId: string) => {
    if (currentStep?.highlightedEdge === edgeId) {
      return 3;
    }
    return 2;
  };

  // Calculate edge path
  const getEdgePath = (edge: GraphEdge) => {
    const fromNode = nodes.find(n => n.id === edge.from);
    const toNode = nodes.find(n => n.id === edge.to);
    if (!fromNode || !toNode) return '';

    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Offset for node radius
    const nodeRadius = 24;
    const startX = fromNode.x + (dx / distance) * nodeRadius;
    const startY = fromNode.y + (dy / distance) * nodeRadius;
    const endX = toNode.x - (dx / distance) * nodeRadius;
    const endY = toNode.y - (dy / distance) * nodeRadius;

    return { startX, startY, endX, endY, midX: (startX + endX) / 2, midY: (startY + endY) / 2 };
  };

  return (
    <div className="relative w-full h-[400px] bg-background/50 rounded-xl border border-border/50 overflow-hidden">
      <svg
        ref={svgRef}
        className="w-full h-full cursor-crosshair"
        onClick={handleCanvasClick}
      >
        {/* Defs for arrow markers */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="hsl(var(--border))"
            />
          </marker>
          <marker
            id="arrowhead-highlighted"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="hsl(var(--state-comparing))"
            />
          </marker>
        </defs>

        {/* Edges */}
        {edges.map(edge => {
          const path = getEdgePath(edge);
          if (!path) return null;
          
          const isHighlighted = currentStep?.highlightedEdge === edge.id;
          
          return (
            <g key={edge.id}>
              <line
                x1={path.startX}
                y1={path.startY}
                x2={path.endX}
                y2={path.endY}
                stroke={getEdgeColor(edge.id)}
                strokeWidth={getEdgeStrokeWidth(edge.id)}
                markerEnd={directed ? (isHighlighted ? 'url(#arrowhead-highlighted)' : 'url(#arrowhead)') : undefined}
                className="transition-all duration-300"
              />
              {showWeights && (
                <g>
                  <rect
                    x={path.midX - 12}
                    y={path.midY - 10}
                    width="24"
                    height="20"
                    rx="4"
                    fill="hsl(var(--background))"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                  />
                  <text
                    x={path.midX}
                    y={path.midY + 4}
                    textAnchor="middle"
                    className="text-xs font-medium fill-foreground"
                  >
                    {edge.weight}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map(node => {
          const isStart = node.id === startNode;
          const distance = currentStep?.distances?.[node.id];
          
          return (
            <g
              key={node.id}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={(e) => {
                e.stopPropagation();
                onSelectStartNode(node.id);
              }}
            >
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={hoveredNode === node.id ? 28 : 24}
                fill={getNodeColor(node.id)}
                stroke={isStart ? 'hsl(var(--primary))' : 'transparent'}
                strokeWidth={isStart ? 3 : 0}
                initial={false}
                animate={{
                  scale: currentStep?.currentNode === node.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="transition-colors duration-300"
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                className="text-sm font-bold fill-white pointer-events-none"
              >
                {node.label}
              </text>
              
              {/* Show distance for Dijkstra's */}
              {distance !== undefined && (
                <text
                  x={node.x}
                  y={node.y + 40}
                  textAnchor="middle"
                  className="text-xs font-medium fill-muted-foreground"
                >
                  d={distance === Infinity ? '∞' : distance}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Instructions overlay */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-muted-foreground text-sm">
            Click anywhere to add nodes
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--state-sorted))' }} />
          <span className="text-muted-foreground">Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--state-comparing))' }} />
          <span className="text-muted-foreground">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--state-swapping))' }} />
          <span className="text-muted-foreground">In Queue</span>
        </div>
      </div>
    </div>
  );
}
