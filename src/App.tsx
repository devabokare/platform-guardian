import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Institutions from "./pages/Institutions";
import Students from "./pages/Students";
import Counselors from "./pages/Counselors";
import Events from "./pages/Events";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Security from "./pages/Security";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/students" element={<Students />} />
          <Route path="/counselors" element={<Counselors />} />
          <Route path="/events" element={<Events />} />
          <Route path="/users" element={<Users />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/security" element={<Security />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
