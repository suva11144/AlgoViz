import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AlgorithmLayout } from '@/components/layout/AlgorithmLayout';
import { AlgorithmSidebar } from '@/components/layout/AlgorithmSidebar';
import { 
  ArrowDownUp, 
  ListOrdered, 
  ArrowDown01, 
  GitMerge, 
  Zap 
} from 'lucide-react';

const sortingAlgorithms = [
  { id: 'bubble', label: 'Bubble Sort', icon: ArrowDownUp },
  { id: 'selection', label: 'Selection Sort', icon: ListOrdered },
  { id: 'insertion', label: 'Insertion Sort', icon: ArrowDown01 },
  { id: 'merge', label: 'Merge Sort', icon: GitMerge },
  { id: 'quick', label: 'Quick Sort', icon: Zap },
];

export function SortingPage() {
  const location = useLocation();
  
  // Redirect to bubble sort by default
  if (location.pathname === '/sorting') {
    return <Navigate to="/sorting/bubble" replace />;
  }

  return (
    <AlgorithmLayout
      title="Sorting Algorithms"
      sidebar={
        <AlgorithmSidebar
          title="Sorting Algorithms"
          algorithms={sortingAlgorithms}
          basePath="/sorting"
        />
      }
    >
      <Outlet />
    </AlgorithmLayout>
  );
}
