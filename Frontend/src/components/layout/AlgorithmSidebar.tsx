import { NavLink } from '@/components/NavLink';
import { useSidebar, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '@/components/ui/sidebar';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AlgorithmItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AlgorithmSidebarProps {
  title: string;
  algorithms: AlgorithmItem[];
  basePath: string;
}

export function AlgorithmSidebar({ title, algorithms, basePath }: AlgorithmSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarContent className="bg-background/80 backdrop-blur-xl">
        <div className="p-4 border-b border-border/50">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            {!collapsed && <span>Back to Home</span>}
          </Link>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-3">
            {!collapsed && <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</span>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {algorithms.map((algo) => (
                <SidebarMenuItem key={algo.id}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={`${basePath}/${algo.id}`}
                      className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                      activeClassName="bg-primary/10 text-primary border-r-2 border-primary"
                    >
                      <algo.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="text-sm font-medium">{algo.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
