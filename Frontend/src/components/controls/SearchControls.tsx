import { Play, Pause, SkipForward, RotateCcw, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchVisualizerState } from '@/hooks/useSearchVisualizer';

interface SearchControlsProps {
  state: SearchVisualizerState;
  speed: number;
  target: number;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onShuffle: () => void;
  onSpeedChange: (speed: number) => void;
  onTargetChange: (target: number) => void;
}

export function SearchControls({
  state,
  speed,
  target,
  onPlay,
  onPause,
  onStepForward,
  onReset,
  onShuffle,
  onSpeedChange,
  onTargetChange,
}: SearchControlsProps) {
  return (
    <div className="space-y-6">
      {/* Playback controls */}
      <div className="flex items-center justify-center gap-3">
        {state === 'playing' ? (
          <Button
            onClick={onPause}
            size="lg"
            className="px-6"
          >
            <Pause className="h-5 w-5 mr-2" />
            Pause
          </Button>
        ) : (
          <Button
            onClick={onPlay}
            size="lg"
            className="px-6"
          >
            <Play className="h-5 w-5 mr-2" />
            {state === 'complete' ? 'Replay' : 'Play'}
          </Button>
        )}

        <Button
          onClick={onStepForward}
          variant="outline"
          size="icon"
          disabled={state === 'playing'}
          title="Step Forward"
        >
          <SkipForward className="h-4 w-4" />
        </Button>

        <Button
          onClick={onReset}
          variant="outline"
          size="icon"
          title="Reset Animation"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          onClick={onShuffle}
          variant="outline"
          size="icon"
          title="Generate New Array"
        >
          <Shuffle className="h-4 w-4" />
        </Button>
      </div>

      {/* Speed control */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
          Speed
        </span>
        <Slider
          value={[speed]}
          onValueChange={([value]) => onSpeedChange(value)}
          min={1}
          max={100}
          step={1}
          className="flex-1"
        />
        <span className="text-sm font-mono text-foreground w-8 text-right">{speed}%</span>
      </div>

      {/* Target input */}
      <div className="border-t border-border/50 pt-4">
        <div className="flex items-center gap-3">
          <Label htmlFor="target" className="text-sm text-muted-foreground font-medium whitespace-nowrap">
            Search Target
          </Label>
          <Input
            id="target"
            type="number"
            value={target}
            onChange={(e) => onTargetChange(parseInt(e.target.value) || 0)}
            disabled={state === 'playing'}
            min={1}
            max={100}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
