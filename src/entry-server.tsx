import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";

// Import all pages
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Apartments from "./pages/Apartments";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Reviews from "./pages/Reviews";
import Contacts from "./pages/Contacts";
import Management from "./pages/Management";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";

interface RenderResult {
  html: string;
  helmet: HelmetServerState;
}

export function render(url: string): RenderResult {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

  const html = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={url}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/apartments" element={<Apartments />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/management" element={<Management />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  return {
    html,
    helmet: helmetContext.helmet!,
  };
}

// Export routes for prerender script
export const routes = [
  "/",
  "/catalog",
  "/apartments",
  "/about",
  "/faq",
  "/reviews",
  "/contacts",
  "/management",
  "/privacy-policy",
  "/statistics",
];
