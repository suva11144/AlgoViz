import { Slider } from '@/components/ui/slider';

interface ArraySizeControlProps {
  size: number;
  onChange: (size: number) => void;
  disabled?: boolean;
}

export function ArraySizeControl({ size, onChange, disabled }: ArraySizeControlProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
        Array Size
      </span>
      <Slider
        value={[size]}
        onValueChange={([value]) => onChange(value)}
        min={5}
        max={100}
        step={1}
        disabled={disabled}
        className="flex-1 min-w-[120px]"
      />
      <span className="text-sm font-mono text-foreground w-8 text-right">{size}</span>
    </div>
  );
}
