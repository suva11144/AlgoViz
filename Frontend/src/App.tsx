import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SortingPage } from "./pages/sorting/SortingPage";
import { SortingVisualizer } from "./pages/sorting/SortingVisualizer";
import { SearchPage } from "./pages/search/SearchPage";
import { SearchVisualizer } from "./pages/search/SearchVisualizer";
import { GraphPage } from "./pages/graph/GraphPage";
import { GraphVisualizer } from "./pages/graph/GraphVisualizer";
import { DynamicPage } from "./pages/dynamic/DynamicPage";
import { DynamicVisualizer } from "./pages/dynamic/DynamicVisualizer";
import { ChatBot } from "./components/ChatBot";
import { DivideConquerVisualizer } from "./pages/divideconquer/DivideConquerVisualizer";
import DivideConquerPage from "./pages/divideconquer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ChatBot />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sorting" element={<SortingPage />}>
            <Route path=":algorithmId" element={<SortingVisualizer />} />
          </Route>
          <Route path="/search" element={<SearchPage />}>
            <Route path=":algorithmId" element={<SearchVisualizer />} />
          </Route>
          <Route path="/graph" element={<GraphPage />}>
            <Route path=":algorithmId" element={<GraphVisualizer />} />
          </Route>
            <Route path="/dynamic" element={<DynamicPage />}>
              <Route path=":algorithmId" element={<DynamicVisualizer />} />
            </Route>
          <Route path="/divideconquer" element={<DivideConquerPage />}>
            <Route index element={<Navigate to="maxmin" replace />} />
            <Route path=":algorithmId" element={<DivideConquerVisualizer />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
