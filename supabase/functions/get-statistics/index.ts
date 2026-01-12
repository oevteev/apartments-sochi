import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get visitor IP from headers
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const visitorIp = forwardedFor?.split(",")[0].trim() || realIp || "unknown";

    // Get owner IP from secrets
    const ownerIp = Deno.env.get("OWNER_IP");

    // Only owner can access statistics
    if (visitorIp !== ownerIp) {
      console.log(`Access denied for IP: ${visitorIp}`);
      return new Response(
        JSON.stringify({ error: "Forbidden" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      );
    }

    // Get days parameter from request body
    const body = await req.json().catch(() => ({}));
    const days = body.days === 14 ? 14 : 7;

    // Create Supabase client with service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get data for the specified period
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from("page_views")
      .select("page_path, created_at")
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching statistics:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Group data by day and page
    const pages = ["/", "/catalog", "/apartments", "/about"];
    const stats: Record<string, Record<string, number>> = {};

    // Initialize all days with zero values
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`;
      stats[dateKey] = {};
      pages.forEach(page => {
        stats[dateKey][page] = 0;
      });
    }

    // Count views
    if (data) {
      data.forEach(record => {
        const date = new Date(record.created_at);
        const dateKey = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`;
        const pagePath = record.page_path;

        if (stats[dateKey] && pages.includes(pagePath)) {
          stats[dateKey][pagePath]++;
        }
      });
    }

    // Transform to array format for charts
    const chartData = Object.entries(stats).map(([date, pageViews]) => ({
      date,
      main: pageViews["/"] || 0,
      catalog: pageViews["/catalog"] || 0,
      apartments: pageViews["/apartments"] || 0,
      about: pageViews["/about"] || 0,
    }));

    console.log(`Statistics fetched successfully for owner`);

    return new Response(
      JSON.stringify({ data: chartData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error getting statistics:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
