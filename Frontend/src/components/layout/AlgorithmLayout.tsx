import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ReactNode } from 'react';

interface AlgorithmLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
  title: string;
}

export function AlgorithmLayout({ sidebar, children, title }: AlgorithmLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {sidebar}
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border/50 bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
