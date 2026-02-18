import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AlgorithmLayout } from '@/components/layout/AlgorithmLayout';
import { AlgorithmSidebar } from '@/components/layout/AlgorithmSidebar';
import { Repeat, GitCompare, Boxes, Edit } from 'lucide-react';

const dpAlgorithms = [
  { id: 'fibonacci', label: 'Fibonacci Sequence', icon: Repeat },
  { id: 'lcs', label: 'Longest Common Subsequence', icon: GitCompare },
  { id: 'knapsack', label: '0/1 Knapsack', icon: Boxes },
  { id: 'editdistance', label: 'Edit Distance', icon: Edit },
];

export function DynamicPage() {
  const location = useLocation();
  
  if (location.pathname === '/dynamic') {
    return <Navigate to="/dynamic/fibonacci" replace />;
  }

  return (
    <AlgorithmLayout
      title="Dynamic Programming"
      sidebar={
        <AlgorithmSidebar
          title="Dynamic Programming"
          algorithms={dpAlgorithms}
          basePath="/dynamic"
        />
      }
    >
      <Outlet />
    </AlgorithmLayout>
  );
}
