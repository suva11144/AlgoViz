import { Play, Pause, SkipForward, RotateCcw, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { GraphVisualizerState } from '@/hooks/useGraphVisualizer';

interface GraphControlsProps {
  state: GraphVisualizerState;
  speed: number;
  directed: boolean;
  showWeights: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onResetGraph: () => void;
  onSpeedChange: (speed: number) => void;
  onDirectedChange: (directed: boolean) => void;
  onShowWeightsChange: (show: boolean) => void;
}

export function GraphControls({
  state,
  speed,
  directed,
  showWeights,
  onPlay,
  onPause,
  onStepForward,
  onReset,
  onResetGraph,
  onSpeedChange,
  onDirectedChange,
  onShowWeightsChange,
}: GraphControlsProps) {
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
          onClick={onResetGraph}
          variant="outline"
          size="icon"
          title="Reset to Sample Graph"
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

      {/* Graph options */}
      <div className="flex flex-wrap gap-6 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <Switch
            id="directed"
            checked={directed}
            onCheckedChange={onDirectedChange}
            disabled={state === 'playing'}
          />
          <Label htmlFor="directed" className="text-sm text-muted-foreground cursor-pointer">
            Directed Graph
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="weights"
            checked={showWeights}
            onCheckedChange={onShowWeightsChange}
          />
          <Label htmlFor="weights" className="text-sm text-muted-foreground cursor-pointer">
            Show Weights
          </Label>
        </div>
      </div>
    </div>
  );
}
