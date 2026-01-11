import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const TRACKED_PATHS = ["/", "/catalog", "/apartments", "/about"];

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      const pagePath = location.pathname;
      
      // Only track specific pages
      if (!TRACKED_PATHS.includes(pagePath)) {
        return;
      }

      try {
        await supabase.functions.invoke("track-pageview", {
          body: { pagePath }
        });
      } catch (error) {
        // Silent fail - don't break user experience for analytics
        console.error("Page tracking error:", error);
      }
    };

    trackPageView();
  }, [location.pathname]);
};
