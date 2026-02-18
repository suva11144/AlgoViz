// Search Algorithm Implementations
// Each algorithm is a generator function that yields steps for visualization

export interface SearchStep {
  array: number[];
  comparing: number[];
  found: boolean;
  foundIndex: number;
  explanation: string;
  operation: 'compare' | 'found' | 'done';
  comparisons: number;
}

export interface SearchAlgorithmInfo {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
  requiresSorted: boolean;
}

export const searchAlgorithmInfo: Record<string, SearchAlgorithmInfo> = {
  linear: {
    name: 'Linear Search',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    description: 'Sequentially checks each element of the array until the target value is found or the end is reached.',
    requiresSorted: false,
  },
  binary: {
    name: 'Binary Search',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    description: 'Divides the sorted array in half repeatedly to narrow down the search space, finding the target in logarithmic time.',
    requiresSorted: true,
  },
};

// Linear Search
export function* linearSearch(arr: number[], target: number): Generator<SearchStep> {
  const array = [...arr];
  let comparisons = 0;

  yield {
    array: [...array],
    comparing: [],
    found: false,
    foundIndex: -1,
    explanation: `Starting Linear Search for ${target}. Will check each element sequentially.`,
    operation: 'compare',
    comparisons: 0,
  };

  for (let i = 0; i < array.length; i++) {
    comparisons++;

    yield {
      array: [...array],
      comparing: [i],
      found: false,
      foundIndex: -1,
      explanation: `Checking index ${i}: value is ${array[i]}, looking for ${target}`,
      operation: 'compare',
      comparisons,
    };

    if (array[i] === target) {
      yield {
        array: [...array],
        comparing: [i],
        found: true,
        foundIndex: i,
        explanation: `Found ${target} at index ${i} after ${comparisons} comparisons!`,
        operation: 'found',
        comparisons,
      };

      yield {
        array: [...array],
        comparing: [i],
        found: true,
        foundIndex: i,
        explanation: `Linear Search complete! Target found at index ${i}.`,
        operation: 'done',
        comparisons,
      };

      return;
    }
  }

  yield {
    array: [...array],
    comparing: [],
    found: false,
    foundIndex: -1,
    explanation: `Linear Search complete! Target ${target} not found in array after ${comparisons} comparisons.`,
    operation: 'done',
    comparisons,
  };
}

// Binary Search
export function* binarySearch(arr: number[], target: number): Generator<SearchStep> {
  const array = [...arr].sort((a, b) => a - b); // Ensure sorted
  let left = 0;
  let right = array.length - 1;
  let comparisons = 0;

  yield {
    array: [...array],
    comparing: [],
    found: false,
    foundIndex: -1,
    explanation: `Starting Binary Search for ${target}. Array is sorted. Searching between indices 0 and ${array.length - 1}.`,
    operation: 'compare',
    comparisons: 0,
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    comparisons++;

    yield {
      array: [...array],
      comparing: [left, mid, right],
      found: false,
      foundIndex: -1,
      explanation: `Checking middle index ${mid}: value is ${array[mid]}, looking for ${target}. Search range: ${left}-${right}`,
      operation: 'compare',
      comparisons,
    };

    if (array[mid] === target) {
      yield {
        array: [...array],
        comparing: [mid],
        found: true,
        foundIndex: mid,
        explanation: `Found ${target} at index ${mid} after ${comparisons} comparisons!`,
        operation: 'found',
        comparisons,
      };

      yield {
        array: [...array],
        comparing: [mid],
        found: true,
        foundIndex: mid,
        explanation: `Binary Search complete! Target found at index ${mid}.`,
        operation: 'done',
        comparisons,
      };

      return;
    } else if (array[mid] < target) {
      left = mid + 1;
      yield {
        array: [...array],
        comparing: [mid],
        found: false,
        foundIndex: -1,
        explanation: `${array[mid]} < ${target}, search in right half (indices ${left}-${right})`,
        operation: 'compare',
        comparisons,
      };
    } else {
      right = mid - 1;
      yield {
        array: [...array],
        comparing: [mid],
        found: false,
        foundIndex: -1,
        explanation: `${array[mid]} > ${target}, search in left half (indices ${left}-${right})`,
        operation: 'compare',
        comparisons,
      };
    }
  }

  yield {
    array: [...array],
    comparing: [],
    found: false,
    foundIndex: -1,
    explanation: `Binary Search complete! Target ${target} not found in array after ${comparisons} comparisons.`,
    operation: 'done',
    comparisons,
  };
}

export function getSearchAlgorithm(
  algorithm: string,
  arr: number[],
  target: number
): Generator<SearchStep> {
  switch (algorithm) {
    case 'linear':
      return linearSearch(arr, target);
    case 'binary':
      return binarySearch(arr, target);
    default:
      return linearSearch(arr, target);
  }
}
