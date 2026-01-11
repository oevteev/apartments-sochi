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
    const { pagePath } = await req.json();

    if (!pagePath) {
      return new Response(
        JSON.stringify({ tracked: false, error: "Missing pagePath" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Get visitor IP from headers
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const visitorIp = forwardedFor?.split(",")[0].trim() || realIp || "unknown";

    // Get owner IP from secrets
    const ownerIp = Deno.env.get("OWNER_IP");

    // Don't track owner's visits
    if (visitorIp === ownerIp) {
      console.log(`Skipping owner visit: ${pagePath}`);
      return new Response(
        JSON.stringify({ tracked: false, reason: "owner" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Create Supabase client with service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert page view
    const { error } = await supabase
      .from("page_views")
      .insert({
        page_path: pagePath,
        visitor_ip: visitorIp
      });

    if (error) {
      console.error("Error inserting page view:", error);
      return new Response(
        JSON.stringify({ tracked: false, error: error.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    console.log(`Tracked page view: ${pagePath} from ${visitorIp}`);

    return new Response(
      JSON.stringify({ tracked: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error tracking page view:", error);
    return new Response(
      JSON.stringify({ tracked: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
