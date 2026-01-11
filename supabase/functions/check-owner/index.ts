import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

    const isOwner = visitorIp === ownerIp;

    console.log(`Check owner: visitor=${visitorIp}, isOwner=${isOwner}`);

    return new Response(
      JSON.stringify({ isOwner }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error checking owner:", error);
    return new Response(
      JSON.stringify({ isOwner: false, error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
