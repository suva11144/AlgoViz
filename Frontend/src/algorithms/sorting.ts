// Sorting Algorithm Implementations
// Each algorithm is a generator function that yields steps for visualization

export interface SortStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  explanation: string;
  operation: 'compare' | 'swap' | 'done' | 'pivot' | 'merge';
}

export interface AlgorithmInfo {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
  stable: boolean;
}

export const algorithmInfo: Record<string, AlgorithmInfo> = {
  bubble: {
    name: 'Bubble Sort',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    stable: true,
  },
  selection: {
    name: 'Selection Sort',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Divides the input into a sorted and unsorted region, repeatedly selecting the smallest element from the unsorted region.',
    stable: false,
  },
  insertion: {
    name: 'Insertion Sort',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Builds the sorted array one element at a time by inserting each element into its correct position.',
    stable: true,
  },
  merge: {
    name: 'Merge Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    description: 'Divides the array into halves, recursively sorts them, then merges the sorted halves.',
    stable: true,
  },
  quick: {
    name: 'Quick Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    description: 'Selects a pivot element and partitions the array around it, recursively sorting the partitions.',
    stable: false,
  },
};

// Bubble Sort
export function* bubbleSort(arr: number[]): Generator<SortStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Comparing step
      yield {
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        explanation: `Comparing elements at positions ${j} (value: ${array[j]}) and ${j + 1} (value: ${array[j + 1]})`,
        operation: 'compare',
      };

      if (array[j] > array[j + 1]) {
        // Swapping step
        yield {
          array: [...array],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          explanation: `${array[j]} > ${array[j + 1]}, swapping them`,
          operation: 'swap',
        };

        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }
    }

    sorted.unshift(n - 1 - i);

    if (!swapped) {
      // Array is sorted
      for (let k = 0; k < n - i - 1; k++) {
        sorted.unshift(k);
      }
      break;
    }
  }

  if (!sorted.includes(0)) sorted.unshift(0);

  yield {
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    explanation: 'Array is now fully sorted!',
    operation: 'done',
  };
}

// Selection Sort
export function* selectionSort(arr: number[]): Generator<SortStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      yield {
        array: [...array],
        comparing: [minIdx, j],
        swapping: [],
        sorted: [...sorted],
        explanation: `Finding minimum: comparing ${array[minIdx]} at position ${minIdx} with ${array[j]} at position ${j}`,
        operation: 'compare',
      };

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      yield {
        array: [...array],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sorted],
        explanation: `Swapping minimum value ${array[minIdx]} from position ${minIdx} to position ${i}`,
        operation: 'swap',
      };

      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }

    sorted.push(i);
  }

  sorted.push(n - 1);

  yield {
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    explanation: 'Array is now fully sorted!',
    operation: 'done',
  };
}

// Insertion Sort
export function* insertionSort(arr: number[]): Generator<SortStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [0];

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    yield {
      array: [...array],
      comparing: [i],
      swapping: [],
      sorted: [...sorted],
      explanation: `Inserting element ${key} at position ${i} into the sorted portion`,
      operation: 'compare',
    };

    while (j >= 0 && array[j] > key) {
      yield {
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        explanation: `${array[j]} > ${key}, shifting ${array[j]} to the right`,
        operation: 'compare',
      };

      array[j + 1] = array[j];
      j--;

      yield {
        array: [...array],
        comparing: [],
        swapping: [j + 1, j + 2],
        sorted: [...sorted],
        explanation: `Shifted element to position ${j + 2}`,
        operation: 'swap',
      };
    }

    array[j + 1] = key;
    sorted.push(i);
  }

  yield {
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    explanation: 'Array is now fully sorted!',
    operation: 'done',
  };
}

// Merge Sort
export function* mergeSort(arr: number[]): Generator<SortStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];

  function* mergeSortHelper(
    start: number,
    end: number
  ): Generator<SortStep> {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    yield* mergeSortHelper(start, mid);
    yield* mergeSortHelper(mid + 1, end);
    yield* merge(start, mid, end);
  }

  function* merge(
    start: number,
    mid: number,
    end: number
  ): Generator<SortStep> {
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    yield {
      array: [...array],
      comparing: Array.from({ length: end - start + 1 }, (_, idx) => start + idx),
      swapping: [],
      sorted: [...sorted],
      explanation: `Merging subarrays [${start}...${mid}] and [${mid + 1}...${end}]`,
      operation: 'merge',
    };

    while (i < left.length && j < right.length) {
      yield {
        array: [...array],
        comparing: [start + i, mid + 1 + j],
        swapping: [],
        sorted: [...sorted],
        explanation: `Comparing ${left[i]} and ${right[j]}`,
        operation: 'compare',
      };

      if (left[i] <= right[j]) {
        array[k] = left[i];
        i++;
      } else {
        array[k] = right[j];
        j++;
      }
      k++;

      yield {
        array: [...array],
        comparing: [],
        swapping: [k - 1],
        sorted: [...sorted],
        explanation: `Placed ${array[k - 1]} at position ${k - 1}`,
        operation: 'merge',
      };
    }

    while (i < left.length) {
      array[k] = left[i];
      i++;
      k++;
    }

    while (j < right.length) {
      array[k] = right[j];
      j++;
      k++;
    }

    if (start === 0 && end === n - 1) {
      for (let idx = start; idx <= end; idx++) {
        if (!sorted.includes(idx)) sorted.push(idx);
      }
    }
  }

  yield* mergeSortHelper(0, n - 1);

  yield {
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    explanation: 'Array is now fully sorted!',
    operation: 'done',
  };
}

// Quick Sort
export function* quickSort(arr: number[]): Generator<SortStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];
  const steps: SortStep[] = [];

  function partition(low: number, high: number): { pivotIndex: number; newSteps: SortStep[] } {
    const partitionSteps: SortStep[] = [];
    const pivot = array[high];

    partitionSteps.push({
      array: [...array],
      comparing: [high],
      swapping: [],
      sorted: [...sorted],
      explanation: `Selected pivot: ${pivot} at position ${high}`,
      operation: 'pivot',
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      partitionSteps.push({
        array: [...array],
        comparing: [j, high],
        swapping: [],
        sorted: [...sorted],
        explanation: `Comparing ${array[j]} with pivot ${pivot}`,
        operation: 'compare',
      });

      if (array[j] < pivot) {
        i++;
        if (i !== j) {
          partitionSteps.push({
            array: [...array],
            comparing: [],
            swapping: [i, j],
            sorted: [...sorted],
            explanation: `${array[j]} < ${pivot}, swapping elements at positions ${i} and ${j}`,
            operation: 'swap',
          });

          [array[i], array[j]] = [array[j], array[i]];
        }
      }
    }

    if (i + 1 !== high) {
      partitionSteps.push({
        array: [...array],
        comparing: [],
        swapping: [i + 1, high],
        sorted: [...sorted],
        explanation: `Placing pivot ${pivot} at its correct position ${i + 1}`,
        operation: 'swap',
      });

      [array[i + 1], array[high]] = [array[high], array[i + 1]];
    }

    return { pivotIndex: i + 1, newSteps: partitionSteps };
  }

  function quickSortHelper(low: number, high: number): void {
    if (low < high) {
      const { pivotIndex, newSteps } = partition(low, high);
      steps.push(...newSteps);
      sorted.push(pivotIndex);
      quickSortHelper(low, pivotIndex - 1);
      quickSortHelper(pivotIndex + 1, high);
    } else if (low === high && !sorted.includes(low)) {
      sorted.push(low);
    }
  }

  quickSortHelper(0, n - 1);

  // Yield all collected steps
  for (const step of steps) {
    yield step;
  }

  yield {
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    explanation: 'Array is now fully sorted!',
    operation: 'done',
  };
}

// Helper function to generate random array
export function generateRandomArray(size: number, min: number = 5, max: number = 100): number[] {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

// Get sorting algorithm generator by name
export function getSortingAlgorithm(name: string, array: number[]): Generator<SortStep> {
  switch (name) {
    case 'bubble':
      return bubbleSort(array);
    case 'selection':
      return selectionSort(array);
    case 'insertion':
      return insertionSort(array);
    case 'merge':
      return mergeSort(array);
    case 'quick':
      return quickSort(array);
    default:
      return bubbleSort(array);
  }
}
