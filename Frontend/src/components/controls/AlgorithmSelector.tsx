import { algorithmInfo } from '@/algorithms/sorting';

interface AlgorithmSelectorProps {
  selected: string;
  onSelect: (algorithm: string) => void;
}

const algorithms = [
  { id: 'bubble', label: 'Bubble' },
  { id: 'selection', label: 'Selection' },
  { id: 'insertion', label: 'Insertion' },
  { id: 'merge', label: 'Merge' },
  { id: 'quick', label: 'Quick' },
];

export function AlgorithmSelector({ selected, onSelect }: AlgorithmSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {algorithms.map((algo) => (
        <button
          key={algo.id}
          onClick={() => onSelect(algo.id)}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
            ${selected === algo.id
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'bg-secondary/50 text-foreground hover:bg-secondary border border-border/50'
            }
          `}
        >
          {algo.label}
        </button>
      ))}
    </div>
  );
}
