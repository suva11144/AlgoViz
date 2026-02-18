// Dynamic Programming Algorithm Implementations
// Each algorithm is a generator function that yields steps for visualization

export interface DPStep {
  table: (number | string)[][];
  currentCell: [number, number] | null;
  explanation: string;
  operation: 'fill' | 'compute' | 'backtrack' | 'done';
  highlightedCells: [number, number][];
  result?: string | number;
}

export interface DPAlgorithmInfo {
  name: string;
  description: string;
  spaceComplexity: string;
  timeComplexity: string;
  input: string;
}

export const dpAlgorithmInfo: Record<string, DPAlgorithmInfo> = {
  fibonacci: {
    name: 'Fibonacci Sequence',
    description: 'Computes the nth Fibonacci number using memoization (bottom-up approach). Each number is the sum of the two preceding ones.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    input: 'n (the position in Fibonacci sequence)',
  },
  lcs: {
    name: 'Longest Common Subsequence (LCS)',
    description: 'Finds the longest subsequence common to two sequences. A subsequence is a sequence that appears in both strings in the same order, but not necessarily consecutive.',
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    input: 'Two strings (str1, str2)',
  },
  knapsack: {
    name: '0/1 Knapsack Problem',
    description: 'Solves the knapsack problem where items have weights and values. Find the maximum value that can be obtained with a given weight limit.',
    timeComplexity: 'O(n × W)',
    spaceComplexity: 'O(n × W)',
    input: 'Items (weights, values) and capacity',
  },
  editdistance: {
    name: 'Edit Distance (Levenshtein)',
    description: 'Finds the minimum number of single-character edits (insertions, deletions, substitutions) required to change one word into another.',
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    input: 'Two strings (str1, str2)',
  },
};

// Fibonacci using DP
export function* fibonacci(n: number): Generator<DPStep> {
  if (n <= 0) {
    yield {
      table: [[0]],
      currentCell: null,
      explanation: 'Invalid input: n must be greater than 0',
      operation: 'done',
      highlightedCells: [],
      result: 0,
    };
    return;
  }

  const dp: number[] = [];
  const table: (number | string)[][] = [dp];

  yield {
    table: [['Computing Fibonacci sequence...']],
    currentCell: null,
    explanation: `Starting Fibonacci computation for n=${n}. Initializing DP array.`,
    operation: 'fill',
    highlightedCells: [],
  };

  // Initialize
  dp[0] = 0;
  dp[1] = 1;

  yield {
    table: [[0, 1]],
    currentCell: [0, 1],
    explanation: `Base cases: F(0) = 0, F(1) = 1`,
    operation: 'fill',
    highlightedCells: [[0, 0], [0, 1]],
  };

  // Fill the table
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];

    const displayTable = [dp.slice(0, i + 1)];

    yield {
      table: displayTable,
      currentCell: [0, i],
      explanation: `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
      operation: 'compute',
      highlightedCells: [[0, i], [0, i - 1], [0, i - 2]],
    };
  }

  yield {
    table: [[...dp]],
    currentCell: null,
    explanation: `Fibonacci computation complete! F(${n}) = ${dp[n]}`,
    operation: 'done',
    highlightedCells: [[0, n]],
    result: dp[n],
  };
}

// Longest Common Subsequence
export function* lcs(str1: string, str2: string): Generator<DPStep> {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  yield {
    table: [['Computing LCS...']],
    currentCell: null,
    explanation: `Starting LCS between "${str1}" and "${str2}". Creating ${m + 1}×${n + 1} DP table.`,
    operation: 'fill',
    highlightedCells: [],
  };

  // Fill the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }

      if (i % Math.max(1, Math.floor(m / 3)) === 0 && j % Math.max(1, Math.floor(n / 3)) === 0) {
        const displayTable = dp.map((row, idx) =>
          row.map((val, jdx) => val)
        );

        yield {
          table: displayTable,
          currentCell: [i, j],
          explanation: `Comparing "${str1[i - 1]}" with "${str2[j - 1]}": ${str1[i - 1] === str2[j - 1] ? 'Match!' : 'No match'}. dp[${i}][${j}] = ${dp[i][j]}`,
          operation: 'compute',
          highlightedCells: [[i, j]],
        };
      }
    }
  }

  yield {
    table: dp,
    currentCell: null,
    explanation: `LCS computation complete! Length of LCS: ${dp[m][n]}`,
    operation: 'done',
    highlightedCells: [],
    result: dp[m][n],
  };
}

// 0/1 Knapsack Problem
export function* knapsack(
  weights: number[],
  values: number[],
  capacity: number
): Generator<DPStep> {
  const n = weights.length;
  const dp: number[][] = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

  yield {
    table: [['Computing 0/1 Knapsack...']],
    currentCell: null,
    explanation: `Starting 0/1 Knapsack with ${n} items and capacity ${capacity}. Creating ${n + 1}×${capacity + 1} DP table.`,
    operation: 'fill',
    highlightedCells: [],
  };

  // Fill the DP table
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }

      if (i % Math.max(1, Math.floor(n / 3)) === 0 && w % Math.max(1, Math.floor(capacity / 5)) === 0) {
        const displayTable = dp.map((row) => [...row]);

        yield {
          table: displayTable,
          currentCell: [i, w],
          explanation: `Item ${i-1}: weight=${weights[i - 1]}, value=${values[i - 1]}. At capacity ${w}: dp[${i}][${w}] = ${dp[i][w]}`,
          operation: 'compute',
          highlightedCells: [[i, w]],
        };
      }
    }
  }

  yield {
    table: dp,
    currentCell: null,
    explanation: `Knapsack computation complete! Maximum value: ${dp[n][capacity]}`,
    operation: 'done',
    highlightedCells: [],
    result: dp[n][capacity],
  };
}

// Edit Distance (Levenshtein)
export function* editDistance(str1: string, str2: string): Generator<DPStep> {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  yield {
    table: dp.map((row) => [...row]),
    currentCell: null,
    explanation: `Computing Edit Distance between "${str1}" and "${str2}". Creating ${m + 1}×${n + 1} DP table.`,
    operation: 'fill',
    highlightedCells: [],
  };

  // Fill the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],      // deletion
          dp[i][j - 1],      // insertion
          dp[i - 1][j - 1]   // substitution
        );
      }

      if (i % Math.max(1, Math.floor(m / 3)) === 0 && j % Math.max(1, Math.floor(n / 3)) === 0) {
        const displayTable = dp.map((row) => [...row]);

        yield {
          table: displayTable,
          currentCell: [i, j],
          explanation: `Comparing "${str1[i - 1]}" with "${str2[j - 1]}": ${str1[i - 1] === str2[j - 1] ? 'Match!' : 'Edit needed'}. dp[${i}][${j}] = ${dp[i][j]}`,
          operation: 'compute',
          highlightedCells: [[i, j]],
        };
      }
    }
  }

  yield {
    table: dp,
    currentCell: null,
    explanation: `Edit Distance computation complete! Minimum edits needed: ${dp[m][n]}`,
    operation: 'done',
    highlightedCells: [],
    result: dp[m][n],
  };
}

export function getDPAlgorithm(
  algorithm: string,
  inputs: Record<string, any>
): Generator<DPStep> {
  switch (algorithm) {
    case 'fibonacci':
      return fibonacci(inputs.n || 10);
    case 'lcs':
      return lcs(inputs.str1 || 'ABCD', inputs.str2 || 'ACBD');
    case 'knapsack':
      return knapsack(
        inputs.weights || [2, 3, 4, 5],
        inputs.values || [3, 4, 5, 6],
        inputs.capacity || 8
      );
    case 'editdistance':
      return editDistance(inputs.str1 || 'KITTEN', inputs.str2 || 'SITTING');
    default:
      return fibonacci(10);
  }
}
