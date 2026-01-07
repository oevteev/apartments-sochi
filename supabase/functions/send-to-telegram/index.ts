import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  name: string;
  phone: string;
  message?: string;
  formType: "booking" | "contact";
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Missing Telegram configuration");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body: RequestBody = await req.json();
    const { name, phone, message, formType } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Name is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 10) {
      return new Response(JSON.stringify({ error: "Valid phone is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate input lengths
    if (name.length > 100 || phone.length > 30 || (message && message.length > 2000)) {
      return new Response(JSON.stringify({ error: "Input too long" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Format message based on form type
    let telegramMessage: string;
    const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

    if (formType === "booking") {
      telegramMessage = `🏠 *Запрос информации по аренде с сайта бронирования*

👤 *Имя:* ${name.trim()}
📞 *Телефон:* ${phone.trim()}

🕐 _${timestamp}_`;
    } else {
      telegramMessage = `✉️ *Сообщение с сайта бронирования (через контакты)*

👤 *Имя:* ${name.trim()}
📞 *Телефон:* ${phone.trim()}
${message ? `\n💬 *Сообщение:*\n${message.trim()}` : ""}

🕐 _${timestamp}_`;
    }

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    });

    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error("Telegram API error:", telegramResult);
      return new Response(JSON.stringify({ error: "Failed to send message" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Telegram message sent successfully, form type:", formType);

    // Send email notification via Notisend.ru
    try {
      const NOTISEND_API_KEY = Deno.env.get("NOTISEND_API_KEY");
      
      if (NOTISEND_API_KEY) {
        let emailSubject: string;
        let emailBody: string;

        if (formType === "booking") {
          emailSubject = "Запрос информации по аренде";
          emailBody = `Запрос информации по аренде от ${name.trim()}, телефон ${phone.trim()}, свяжитесь для уточнения деталей по указанному телефону.`;
        } else {
          emailSubject = "Сообщение с сайта (контакты)";
          emailBody = `Сообщение от ${name.trim()}, телефон ${phone.trim()}.${message ? `<br><br>Сообщение: ${message.trim()}` : ""}`;
        }

        const recipients = ["arendaapartmentsochi@ya.ru", "oevt@mail.ru"];
        
        for (const recipient of recipients) {
          const response = await fetch("https://api.notisend.ru/v1/email/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${NOTISEND_API_KEY}`
            },
            body: JSON.stringify({
              from_email: "info@arendaapartmentsochi.ru",
              from_name: "Бронирование",
              to: recipient,
              subject: emailSubject,
              html: emailBody
            })
          });
          
          const result = await response.json();
          console.log(`Notisend email to ${recipient}:`, response.ok ? "success" : "failed", result);
        }
      } else {
        console.log("NOTISEND_API_KEY not configured, skipping email");
      }
    } catch (emailError) {
      console.error("Email sending failed (non-critical):", emailError);
      // Email failure doesn't affect the overall success
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-to-telegram function:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
