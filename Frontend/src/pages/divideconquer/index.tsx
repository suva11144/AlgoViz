import { AlgorithmLayout } from '@/components/layout/AlgorithmLayout';
import { AlgorithmSidebar } from '@/components/layout/AlgorithmSidebar';
import { DivideConquerVisualizer } from './DivideConquerVisualizer';
import { ArrowDownUp, Search, GitBranch, BrainCircuit, Layers3 } from 'lucide-react';
import { Outlet } from 'react-router-dom';

const algorithms = [
  { id: 'maxmin', label: 'Max/Min Finding (D&C)', icon: ArrowDownUp },
  { id: 'quicksort', label: 'Quicksort', icon: ArrowDownUp },
  { id: 'binarysearch', label: 'Binary Search', icon: Search },
  { id: 'mergesort', label: 'Merge Sort', icon: ArrowDownUp },
  { id: 'strassen', label: "Strassen's Matrix Multiplication", icon: Layers3 },
];

export default function DivideConquerPage() {
  return (
    <AlgorithmLayout
      sidebar={<AlgorithmSidebar title="Divide & Conquer" algorithms={algorithms} basePath="/divideconquer" />}
      title="Divide and Conquer"
    >
      <Outlet />
    </AlgorithmLayout>
  );
}
