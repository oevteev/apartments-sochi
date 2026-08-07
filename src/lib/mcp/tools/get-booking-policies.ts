import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { POLICIES } from "../data";

export default defineTool({
  name: "get_booking_policies",
  title: "Условия бронирования",
  description: "Правила бронирования, заселения/выезда и оплаты (предоплата, депозит, отмена).",
  inputSchema: {
    topic: z.enum(["booking", "checkin", "payment"]).optional().describe("Ограничить ответ одной темой."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ topic }) => {
    const items = topic ? POLICIES.filter((p) => p.topic === topic) : POLICIES;
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { policies: items },
    };
  },
});
