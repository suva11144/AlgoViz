export const divideConquerAlgoInfo: Record<string, { name: string; description: string; pseudocode: string }> = {
  maxmin: {
    name: 'Max/Min Finding (D&C)',
    description: 'Finds the maximum and minimum in an array using divide and conquer.',
    pseudocode: `function maxMin(A, low, high):
  if low == high:
    return (A[low], A[low])
  else if high == low + 1:
    if A[low] < A[high]:
      return (A[high], A[low])
    else:
      return (A[low], A[high])
  else:
    mid = (low + high) // 2
    (max1, min1) = maxMin(A, low, mid)
    (max2, min2) = maxMin(A, mid+1, high)
    return (max(max1, max2), min(min1, min2))`
  },
  quicksort: {
    name: 'Quicksort',
    description: 'Sorts an array by partitioning and recursively sorting subarrays.',
    pseudocode: `function quickSort(A, low, high):
  if low < high:
    p = partition(A, low, high)
    quickSort(A, low, p-1)
    quickSort(A, p+1, high)`
  },
  binarysearch: {
    name: 'Binary Search',
    description: 'Searches for a value in a sorted array by repeatedly dividing the search interval in half.',
    pseudocode: `function binarySearch(A, target):
  low = 0, high = n-1
  while low <= high:
    mid = (low + high) // 2
    if A[mid] == target:
      return mid
    else if A[mid] < target:
      low = mid + 1
    else:
      high = mid - 1
  return -1`
  },
  mergesort: {
    name: 'Merge Sort',
    description: 'Sorts an array by dividing it into halves, sorting each half, and merging them.',
    pseudocode: `function mergeSort(A):
  if n <= 1: return A
  mid = n // 2
  left = mergeSort(A[0:mid])
  right = mergeSort(A[mid:n])
  return merge(left, right)`
  },
  strassen: {
    name: "Strassen's Matrix Multiplication",
    description: 'Multiplies two matrices using divide and conquer to reduce the number of multiplications.',
    pseudocode: `function strassen(A, B):
  if n == 1:
    return A * B
  partition A and B into n/2 x n/2 submatrices
  compute 7 products (M1 to M7) using submatrices
  combine results to get C = A * B
  return C`
  },
};
