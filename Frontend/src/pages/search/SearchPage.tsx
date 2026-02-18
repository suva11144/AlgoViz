import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AlgorithmLayout } from '@/components/layout/AlgorithmLayout';
import { AlgorithmSidebar } from '@/components/layout/AlgorithmSidebar';
import { Search, Binary } from 'lucide-react';

const searchAlgorithms = [
  { id: 'linear', label: 'Linear Search', icon: Search },
  { id: 'binary', label: 'Binary Search', icon: Binary },
];

export function SearchPage() {
  const location = useLocation();
  
  if (location.pathname === '/search') {
    return <Navigate to="/search/linear" replace />;
  }

  return (
    <AlgorithmLayout
      title="Search Algorithms"
      sidebar={
        <AlgorithmSidebar
          title="Search Algorithms"
          algorithms={searchAlgorithms}
          basePath="/search"
        />
      }
    >
      <Outlet />
    </AlgorithmLayout>
  );
}
