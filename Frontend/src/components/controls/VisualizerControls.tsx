import { Play, Pause, RotateCcw, SkipForward, Shuffle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { VisualizerState } from '@/hooks/useSortingVisualizer';

interface VisualizerControlsProps {
  state: VisualizerState;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onShuffle: () => void;
  onSpeedChange: (speed: number) => void;
}

export function VisualizerControls({
  state,
  speed,
  onPlay,
  onPause,
  onStepForward,
  onReset,
  onShuffle,
  onSpeedChange,
}: VisualizerControlsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Playback controls */}
      <div className="flex items-center gap-2">
        {state === 'playing' ? (
          <button
            onClick={onPause}
            className="control-btn-primary"
            aria-label="Pause"
          >
            <Pause className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onPlay}
            className="control-btn-primary"
            aria-label="Play"
          >
            <Play className="w-5 h-5 ml-0.5" />
          </button>
        )}

        <button
          onClick={onStepForward}
          disabled={state === 'playing'}
          className="control-btn disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Step Forward"
        >
          <SkipForward className="w-5 h-5" />
        </button>

        <button
          onClick={onReset}
          className="control-btn"
          aria-label="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={onShuffle}
          className="control-btn"
          aria-label="Shuffle"
        >
          <Shuffle className="w-5 h-5" />
        </button>
      </div>

      {/* Speed control */}
      <div className="flex items-center gap-3 min-w-[200px]">
        <span className="text-sm text-muted-foreground font-medium">Speed</span>
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
    </div>
  );
}
