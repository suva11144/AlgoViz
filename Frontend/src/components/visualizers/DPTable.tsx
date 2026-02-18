import { motion } from 'framer-motion';

interface DPTableProps {
  table: (number | string)[][];
  currentCell: [number, number] | null;
  highlightedCells: [number, number][];
}

export function DPTable({ table, currentCell, highlightedCells }: DPTableProps) {
  const getCellClass = (row: number, col: number): string => {
    if (currentCell && currentCell[0] === row && currentCell[1] === col) {
      return 'bg-warning/40 border-warning';
    }
    if (highlightedCells.some(cell => cell[0] === row && cell[1] === col)) {
      return 'bg-primary/30 border-primary';
    }
    return 'bg-secondary/20 border-border/30';
  };

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-center text-xs md:text-sm">
        <tbody>
          {table.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => (
                <motion.td
                  key={`${rowIdx}-${colIdx}`}
                  className={`border-2 ${getCellClass(rowIdx, colIdx)} p-1 md:p-2 w-8 md:w-10 h-8 md:h-10`}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-mono font-semibold text-foreground">{cell}</span>
                </motion.td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
