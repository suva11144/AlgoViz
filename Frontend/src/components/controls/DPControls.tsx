import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DPVisualizerState } from '@/hooks/useDynamicVisualizer';

interface DPControlsProps {
  state: DPVisualizerState;
  speed: number;
  algorithm: string;
  inputs: Record<string, any>;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onInputChange: (key: string, value: any) => void;
}

export function DPControls({
  state,
  speed,
  algorithm,
  inputs,
  onPlay,
  onPause,
  onStepForward,
  onReset,
  onSpeedChange,
  onInputChange,
}: DPControlsProps) {
  const renderInputs = () => {
    switch (algorithm) {
      case 'fibonacci':
        return (
          <div className="flex items-center gap-3">
            <Label htmlFor="fib-n" className="text-sm text-muted-foreground font-medium whitespace-nowrap">
              Position (n)
            </Label>
            <Input
              id="fib-n"
              type="number"
              value={inputs.n || 10}
              onChange={(e) => onInputChange('n', parseInt(e.target.value) || 1)}
              disabled={state === 'playing'}
              min={1}
              max={20}
              className="flex-1"
            />
          </div>
        );
      case 'lcs':
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Label htmlFor="lcs-str1" className="text-sm text-muted-foreground font-medium">
                String 1
              </Label>
              <Input
                id="lcs-str1"
                type="text"
                value={inputs.str1 || 'ABCD'}
                onChange={(e) => onInputChange('str1', e.target.value.toUpperCase())}
                disabled={state === 'playing'}
                maxLength={8}
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="lcs-str2" className="text-sm text-muted-foreground font-medium">
                String 2
              </Label>
              <Input
                id="lcs-str2"
                type="text"
                value={inputs.str2 || 'ACBD'}
                onChange={(e) => onInputChange('str2', e.target.value.toUpperCase())}
                disabled={state === 'playing'}
                maxLength={8}
                className="flex-1"
              />
            </div>
          </div>
        );
      case 'knapsack':
        return (
          <div className="flex items-center gap-3">
            <Label htmlFor="knapsack-capacity" className="text-sm text-muted-foreground font-medium whitespace-nowrap">
              Capacity
            </Label>
            <Input
              id="knapsack-capacity"
              type="number"
              value={inputs.capacity || 8}
              onChange={(e) => onInputChange('capacity', parseInt(e.target.value) || 1)}
              disabled={state === 'playing'}
              min={1}
              max={20}
              className="flex-1"
            />
          </div>
        );
      case 'editdistance':
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Label htmlFor="ed-str1" className="text-sm text-muted-foreground font-medium">
                String 1
              </Label>
              <Input
                id="ed-str1"
                type="text"
                value={inputs.str1 || 'KITTEN'}
                onChange={(e) => onInputChange('str1', e.target.value.toUpperCase())}
                disabled={state === 'playing'}
                maxLength={10}
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="ed-str2" className="text-sm text-muted-foreground font-medium">
                String 2
              </Label>
              <Input
                id="ed-str2"
                type="text"
                value={inputs.str2 || 'SITTING'}
                onChange={(e) => onInputChange('str2', e.target.value.toUpperCase())}
                disabled={state === 'playing'}
                maxLength={10}
                className="flex-1"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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

      {/* Algorithm-specific inputs */}
      <div className="border-t border-border/50 pt-4">
        {renderInputs()}
      </div>
    </div>
  );
}
